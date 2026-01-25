'use server';

/**
 * @fileOverview Automated triggers for settling plays.
 *
 * This file defines Genkit flows that run automatically on a schedule or
 * in response to Firestore events to settle pending plays.
 */

import { ai } from '@/ai/genkit';
import { settleAllPlays } from './settle-plays-flow';

// This flow runs every hour.
const hourlySettlementFlow = ai.defineFlow(
  {
    name: 'hourlySettlementFlow',
    trigger: {
      schedule: {
        cron: '0 * * * *', // Every hour at the beginning of the hour
      },
    },
  },
  async () => {
    console.log('Running hourly play settlement...');
    try {
        const result = await settleAllPlays({ triggeredBy: 'hourly-schedule' });
        console.log(`Hourly settlement complete. Settled ${result.settledPlays} plays across ${result.updatedAccounts} accounts.`);
    } catch (error) {
        console.error('Hourly settlement flow failed:', error);
    }
  }
);

// This flow runs whenever a document in the 'raceResults' collection is created or updated.
const onResultUpdateSettlementFlow = ai.defineFlow(
  {
    name: 'onResultUpdateSettlementFlow',
    trigger: {
      firestore: {
        document: 'raceResults/{raceId}',
        on: ['write'],
      },
    },
  },
  async (change) => {
    // We can use `change.after.data()` to see the new data if needed.
    // For now, we just trigger a full settlement check.
    console.log(`Race result changed, running play settlement...`);
    try {
        const result = await settleAllPlays({ triggeredBy: 'race-result-update' });
        console.log(`Settlement on result update complete. Settled ${result.settledPlays} plays across ${result.updatedAccounts} accounts.`);
    } catch (error) {
        console.error('Settlement on result update failed:', error);
    }
  }
);
