
'use client';

import { db, auth } from "@/firebase";
import { collection, doc, getDoc, getDocs, setDoc, query, where, addDoc, updateDoc, writeBatch } from "firebase/firestore";
import type { Account, ExchangeRequest } from "./types";

// --- DUMMY RESULTS DATA ---
// In a real app, this would come from a secure API or Firestore after an admin updates it.
const raceResultsData: Record<string, {rider: string, pos: number}[]> = {
    'pala': [
        { rider: 'Eli Tomac', pos: 1 }, { rider: 'Ken Roczen', pos: 2 }, { rider: 'Jorge Prado', pos: 3 },
        { rider: 'Hunter Lawrence', pos: 4 }, { rider: 'Jason Anderson', pos: 5 }, { rider: 'Justin Cooper', pos: 6 },
        { rider: 'Cooper Webb', pos: 7 }, { rider: 'Chase Sexton', pos: 8 }, { rider: 'Dylan Ferrandis', pos: 9 },
        { rider: 'Aaron Plessinger', pos: 10 }
    ],
    'supercross-7': [ // Triple Crown example (Arlington)
        { rider: 'Jett Lawrence', pos: 1 }, { rider: 'Cooper Webb', pos: 2 }, { rider: 'Eli Tomac', pos: 3 }
    ]
};

export const getRiderPosition = async (raceId: string, riderName: string): Promise<number | null> => {
    // Simulate API call to get results
    await new Promise(resolve => setTimeout(resolve, 500));
    const results = raceResultsData[raceId];
    if (!results) {
        return null; // Results not posted yet
    }
    const riderResult = results.find(r => r.rider === riderName);
    return riderResult ? riderResult.pos : null; // Return position or null if rider not in top results
}
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
