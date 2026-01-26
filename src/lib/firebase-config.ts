
'use client';

import { db } from "@/firebase";
import { collection, doc, getDoc, getDocs, setDoc, query, where, addDoc, updateDoc, writeBatch, deleteDoc, DocumentReference } from "firebase/firestore";
import type { Account, ExchangeRequest, GoldCoinPurchase, Race, RaceResult, Rider } from "./types";
import { mainEventResults } from "./results-data";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

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
  const allRaceResults = mainEventResults[raceKey as keyof typeof mainEventResults] as any;
  
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
const goldCoinPurchasesCollection = collection(db, "goldCoinPurchases");
const racesCollection = collection(db, "races");
const ridersCollection = collection(db, "riders");


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

export const createAccount = (id: string, accountData: Omit<Account, 'id'>): void => {
    const accountRef = doc(db, "accounts", id);
    const dataToSet = { ...accountData, isAdmin: false };
    setDoc(accountRef, dataToSet).catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: accountRef.path,
            operation: 'create',
            requestResourceData: dataToSet,
        });
        errorEmitter.emit('permission-error', permissionError);
    });
};

export const updateAccount = (id: string, updates: Partial<Account>): void => {
    const docRef = doc(db, "accounts", id);
    updateDoc(docRef, updates).catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: docRef.path,
            operation: 'update',
            requestResourceData: updates,
        });
        errorEmitter.emit('permission-error', permissionError);
    });
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
    if (currentUserId) {
        return querySnapshot.docs.some(doc => doc.id !== currentUserId);
    }
    return true;
};

export const getFriends = async (friendIds: string[]): Promise<Account[]> => {
    if (!friendIds || friendIds.length === 0) return [];
    const friends: Account[] = [];
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
    try {
        const docRef = await addDoc(exchangeRequestsCollection, request);
        return docRef.id;
    } catch (serverError) {
        const permissionError = new FirestorePermissionError({
            path: exchangeRequestsCollection.path,
            operation: 'create',
            requestResourceData: request,
        });
        errorEmitter.emit('permission-error', permissionError);
        throw serverError;
    }
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
    
    try {
        await batch.commit();
    } catch (serverError) {
        const permissionError = new FirestorePermissionError({
            path: `/exchangeRequests/${request.id}`,
            operation: 'update',
            requestResourceData: { status: newStatus },
        });
        errorEmitter.emit('permission-error', permissionError);
        throw serverError;
    }
}

// Gold Coin Purchase Functions
export const addGoldCoinPurchase = async (purchaseData: Omit<GoldCoinPurchase, 'id'>): Promise<string> => {
    try {
        const docRef = await addDoc(goldCoinPurchasesCollection, purchaseData);
        return docRef.id;
    } catch (serverError) {
        const permissionError = new FirestorePermissionError({
            path: goldCoinPurchasesCollection.path,
            operation: 'create',
            requestResourceData: purchaseData,
        });
        errorEmitter.emit('permission-error', permissionError);
        throw serverError;
    }
};

export const updateGoldCoinPurchase = (id: string, updates: Partial<GoldCoinPurchase>): void => {
    const docRef = doc(db, "goldCoinPurchases", id);
    updateDoc(docRef, updates).catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: docRef.path,
            operation: 'update',
            requestResourceData: updates,
        });
        errorEmitter.emit('permission-error', permissionError);
    });
};

export const processRefundRequest = async (purchase: GoldCoinPurchase, newStatus: 'Refunded' | 'Completed'): Promise<void> => {
    const batch = writeBatch(db);
    const purchaseRef = doc(db, "goldCoinPurchases", purchase.id);

    if (newStatus === 'Refunded') {
        const accountRef = doc(db, "accounts", purchase.userId);
        const accountSnap = await getDoc(accountRef);
        if (accountSnap.exists()) {
            const accountData = accountSnap.data() as Account;
            if (accountData.balances.gold >= purchase.amount) {
                batch.update(accountRef, { 'balances.gold': accountData.balances.gold - purchase.amount });
                batch.update(purchaseRef, { status: newStatus });
            } else {
                throw new Error("Insufficient balance to process refund.");
            }
        } else {
            throw new Error(`Account with ID ${purchase.userId} not found.`);
        }
    } else { // 'Completed' (i.e., request rejected)
        batch.update(purchaseRef, { status: newStatus });
    }

    try {
        await batch.commit();
    } catch(serverError) {
        const permissionError = new FirestorePermissionError({
            path: purchaseRef.path,
            operation: 'update',
            requestResourceData: { status: newStatus },
        });
        errorEmitter.emit('permission-error', permissionError);
        throw serverError;
    }
}

// Race Functions
export const addRace = (raceData: Omit<Race, 'id'>) => {
    addDoc(racesCollection, raceData).catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: racesCollection.path,
            operation: 'create',
            requestResourceData: raceData
        });
        errorEmitter.emit('permission-error', permissionError);
    });
};
export const updateRace = (id: string, updates: Partial<Race>) => {
    const docRef = doc(db, 'races', id);
    updateDoc(docRef, updates).catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: docRef.path,
            operation: 'update',
            requestResourceData: updates
        });
        errorEmitter.emit('permission-error', permissionError);
    });
};
export const deleteRace = (id: string) => {
    const docRef = doc(db, 'races', id);
    deleteDoc(docRef).catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: docRef.path,
            operation: 'delete'
        });
        errorEmitter.emit('permission-error', permissionError);
    });
};

// Rider Functions
export const addRider = (riderData: Omit<Rider, 'id'>) => {
    addDoc(ridersCollection, riderData).catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: ridersCollection.path,
            operation: 'create',
            requestResourceData: riderData
        });
        errorEmitter.emit('permission-error', permissionError);
    });
};
export const updateRider = (id: string, updates: Partial<Rider>) => {
    const docRef = doc(db, 'riders', id);
    updateDoc(docRef, updates).catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: docRef.path,
            operation: 'update',
            requestResourceData: updates
        });
        errorEmitter.emit('permission-error', permissionError);
    });
};
export const deleteRider = (id: string) => {
    const docRef = doc(db, 'riders', id);
    deleteDoc(docRef).catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: docRef.path,
            operation: 'delete'
        });
        errorEmitter.emit('permission-error', permissionError);
    });
};

// Race Result Functions
export const getRaceResult = async (raceId: string): Promise<RaceResult | null> => {
    const docRef = doc(db, "raceResults", raceId);
    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as RaceResult;
        }
        return null;
    } catch(serverError) {
        const permissionError = new FirestorePermissionError({
            path: docRef.path,
            operation: 'get'
        });
        errorEmitter.emit('permission-error', permissionError);
        return null;
    }
}
export const setRaceResult = (raceId: string, results: Omit<RaceResult, 'id'>) => {
    const docRef = doc(db, 'raceResults', raceId);
    setDoc(docRef, results).catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: docRef.path,
            operation: 'create',
            requestResourceData: results
        });
        errorEmitter.emit('permission-error', permissionError);
    });
};
