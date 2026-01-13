
'use client';

import { db, auth } from "@/firebase";
import { collection, doc, getDoc, getDocs, setDoc, query, where, addDoc, updateDoc, writeBatch } from "firebase/firestore";
import type { Account, ExchangeRequest } from "./types";
import { mainEventResults } from "./results-data";

// --- DUMMY RESULTS DATA ---
// In a real app, this would come from a secure API or Firestore after an admin updates it.

// This function simulates fetching results for various race types.
export const getRaceResults = async (
  raceId: string,
  raceType: 'Main Event' | 'Heat 1' | 'Heat 2' | 'Heat 3'
): Promise<{ rider: string; pos: number; holeshot?: boolean }[] | null> => {
    // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  const raceKey = raceId.includes('supercross') ? raceId : raceId;
  const allRaceResults = mainEventResults[raceKey as keyof typeof mainEventResults];
  
  if (!allRaceResults) {
    return null; // Race results not posted
  }

  let eventKey: string;
  switch (raceType) {
    case 'Main Event':
      eventKey = '450'; // Default to 450, class is not in Bet type
      break;
    case 'Heat 1':
      eventKey = '450_heat1';
      break;
    case 'Heat 2':
      eventKey = '450_heat2';
      break;
    case 'Heat 3':
       eventKey = '450_heat3'; // For triple crown
      break;
    default:
      return null;
  }
  // This is a simplified lookup. A real implementation would handle 250/450 classes.
  const results = allRaceResults[eventKey as keyof typeof allRaceResults] || allRaceResults['250_heat1' as keyof typeof allRaceResults] || allRaceResults['250_heat2' as keyof typeof allRaceResults] || allRaceResults['250' as keyof typeof allRaceResults];

  return results || null;
};


// --- END DUMMY DATA ---


// Firestore collection references
const accountsCollection = collection(db, "accounts");
const exchangeRequestsCollection = collection(db, "exchangeRequests");

// Account functions
export const getAccountById = async (id: string): Promise<Account | null> => {
    const docRef = doc(db, "accounts", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Account;
    }
    return null;
};

export const getAccountByEmail = async (email: string): Promise<Account | null> => {
    const q = query(accountsCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];
        return { id: docSnap.id, ...docSnap.data() } as Account;
    }
    return null;
};

export const createAccount = async (id: string, accountData: Omit<Account, 'id'>): Promise<void> => {
    const accountRef = doc(db, "accounts", id);
    // New accounts are not admins by default
    const dataToSet = { ...accountData, isAdmin: false };
    await setDoc(accountRef, dataToSet);
};

export const updateAccount = async (id: string, updates: Partial<Account>): Promise<void> => {
    const docRef = doc(db, "accounts", id);
    await updateDoc(docRef, updates);
};

export const isUsernameTaken = async (username: string): Promise<boolean> => {
    const q = query(accountsCollection, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
};

export const isRiderNumberTaken = async (riderNumber: string, currentUserId?: string): Promise<boolean> => {
    const q = query(accountsCollection, where("riderNumber", "==", riderNumber));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        return false;
    }
    // If we're checking for an update, make sure the taken number doesn't belong to the current user
    if (currentUserId) {
        return querySnapshot.docs.some(doc => doc.id !== currentUserId);
    }
    return true;
};

export const getFriends = async (friendIds: string[]): Promise<Account[]> => {
    if (!friendIds || friendIds.length === 0) return [];
    const friends: Account[] = [];
    // Firestore 'in' query is limited to 30 elements. Chunk if necessary.
    for (let i = 0; i < friendIds.length; i += 30) {
        const chunk = friendIds.slice(i, i + 30);
        const q = query(accountsCollection, where("__name__", "in", chunk));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            friends.push({ id: doc.id, ...doc.data() } as Account);
        });
    }
    return friends.sort((a, b) => a.name.localeCompare(b.name));
};

export const getAccountByUsername = async (username: string): Promise<Account | null> => {
    const q = query(accountsCollection, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];
        return { id: docSnap.id, ...docSnap.data() } as Account;
    }
    return null;
}


// Exchange Request functions
export const getExchangeRequests = async (): Promise<ExchangeRequest[]> => {
    const querySnapshot = await getDocs(exchangeRequestsCollection);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ExchangeRequest));
};

export const getExchangeRequestsByAccountId = async (accountId: string): Promise<ExchangeRequest[]> => {
    const q = query(exchangeRequestsCollection, where("accountId", "==", accountId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ExchangeRequest));
};

export const addExchangeRequest = async (request: Omit<ExchangeRequest, 'id'>): Promise<string> => {
    const docRef = await addDoc(exchangeRequestsCollection, request);
    return docRef.id;
};

export const processExchangeRequest = async (request: ExchangeRequest, newStatus: 'Approved' | 'Rejected'): Promise<void> => {
    const batch = writeBatch(db);

    const requestRef = doc(db, "exchangeRequests", request.id);
    batch.update(requestRef, { status: newStatus });

    if (newStatus === 'Rejected') {
        const accountRef = doc(db, "accounts", request.accountId);
        const accountSnap = await getDoc(accountRef);
        if (accountSnap.exists()) {
            const accountData = accountSnap.data() as Account;
            let newGoldBalance = accountData.balances.gold;
            let newSweepsBalance = accountData.balances.sweeps;

            if (request.type === 'Gold Coin') {
                newGoldBalance += request.amount;
            } else if (request.type === 'Sweeps Coin') {
                newSweepsBalance += request.amount;
            }
            
            batch.update(accountRef, { 
                balances: { 
                    gold: newGoldBalance, 
                    sweeps: newSweepsBalance 
                } 
            });
        } else {
            throw new Error(`Account with ID ${request.accountId} not found.`);
        }
    }
    
    await batch.commit();
}
