
'use client';

import { db } from "@/firebase";
import { collection, doc, getDoc, getDocs, setDoc, query, where, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import type { Account, ExchangeRequest } from "./types";

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
    await setDoc(accountRef, accountData);
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

export const updateExchangeRequestStatus = async (id: string, status: 'Approved' | 'Rejected'): Promise<void> => {
    const docRef = doc(db, "exchangeRequests", id);
    await setDoc(docRef, { status }, { merge: true });
}
