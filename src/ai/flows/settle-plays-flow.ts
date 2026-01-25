
'use server';

/**
 * @fileOverview A flow to settle all pending plays across all user accounts.
 *
 * - settleAllPlays - A function that triggers the play settlement process.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { collection, doc, getDocs, writeBatch, addDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import type { Account, Play } from '@/lib/types';
import { getRaceResults } from '@/lib/firebase-config';

const SettlePlaysInputSchema = z.object({
  triggeredBy: z.string().describe('Identifier for who or what triggered the settlement.'),
});
export type SettlePlaysInput = z.infer<typeof SettlePlaysInputSchema>;

const SettlePlaysOutputSchema = z.object({
  settledPlays: z.number().describe('The number of plays that were settled.'),
  updatedAccounts: z.number().describe('The number of accounts that were updated.'),
});
export type SettlePlaysOutput = z.infer<typeof SettlePlaysOutputSchema>;

export async function settleAllPlays(input: SettlePlaysInput): Promise<SettlePlaysOutput> {
  return settlePlaysFlow(input);
}

const parseRaceDate = (dateString: string): Date => {
  let fullDateString = dateString;
  // All races in this app are in 2026
  if (!/\d{4}/.test(dateString)) {
    fullDateString = `${dateString}, 2026`;
  }
  return new Date(fullDateString);
};

const settlePlaysFlow = ai.defineFlow(
  {
    name: 'settlePlaysFlow',
    inputSchema: SettlePlaysInputSchema,
    outputSchema: SettlePlaysOutputSchema,
  },
  async (input) => {
    if (!db) {
        throw new Error("Firestore is not initialized.");
    }
    const accountsRef = collection(db, 'accounts');
    const accountsSnapshot = await getDocs(accountsRef);
    const allAccounts = accountsSnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Account)
    );

    const batch = writeBatch(db);
    let settledPlaysCount = 0;
    const updatedAccountIds = new Set<string>();
    const today = new Date();

    for (const account of allAccounts) {
      if (!account.playHistory || account.playHistory.length === 0) {
        continue;
      }

      let accountNeedsUpdate = false;
      const updatedPlayHistory = JSON.parse(JSON.stringify(account.playHistory));
      const updatedBalances = { ...account.balances };

      for (const play of updatedPlayHistory) {
        
        const raceDate = parseRaceDate(play.date);
        raceDate.setHours(23, 59, 59, 999); // Set to end of day for comparison

        if (play.status !== 'Pending' || today < raceDate) {
          continue;
        }

        if (play.playType === 'Championship Winner') continue;

        const results = await getRaceResults(
          play.raceId,
          play.raceType || 'Main Event'
        );
        if (!results) continue;

        const winner =
          play.playType === 'Holeshot'
            ? results.find((r) => r.holeshot)?.rider
            : results.find((r) => r.pos === 1)?.rider;

        if (!winner) {
          play.status = 'Voided';
          if (play.coinType === 'Gold Coins') {
              updatedBalances.gold += play.amount;
          } else {
              updatedBalances.sweeps += play.amount;
          }
          accountNeedsUpdate = true;
          settledPlaysCount++;
          continue;
        }

        const userWon = play.userRider === winner;
        const opponentWon = play.opponentRider === winner;

        if (userWon) {
          play.status = 'Won';
          if (play.coinType === 'Gold Coins') {
            updatedBalances.gold += play.amount * 2;
          } else {
            updatedBalances.sweeps += play.amount * 2;
          }
          accountNeedsUpdate = true;
          settledPlaysCount++;
        } else if (opponentWon) {
          play.status = 'Lost';
          accountNeedsUpdate = true;
          settledPlaysCount++;
        } else {
            play.status = 'Voided';
            if (play.coinType === 'Gold Coins') {
                updatedBalances.gold += play.amount;
            } else {
                updatedBalances.sweeps += play.amount;
            }
            accountNeedsUpdate = true;
            settledPlaysCount++;
        }
      }

      if (accountNeedsUpdate) {
        const accountRef = doc(db, 'accounts', account.id);
        batch.update(accountRef, {
          playHistory: updatedPlayHistory,
          balances: updatedBalances,
        });
        updatedAccountIds.add(account.id);
      }
    }
    
    if (updatedAccountIds.size > 0) {
        await batch.commit();
        
        // Create settlement record
        const settlementRecord = {
            date: new Date().toISOString(),
            settledPlays: settledPlaysCount,
            updatedAccounts: updatedAccountIds.size,
            triggeredBy: input.triggeredBy
        };
        const settlementRecordsRef = collection(db, 'settlementRecords');
        await addDoc(settlementRecordsRef, settlementRecord);
    }

    return {
      settledPlays: settledPlaysCount,
      updatedAccounts: updatedAccountIds.size,
    };
  }
);
