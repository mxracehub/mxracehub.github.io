
'use client';
import { onSnapshot, doc, type DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useFirestore } from '../provider';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

interface HookOptions {
  listen?: boolean;
}

export function useDoc<T = DocumentData>(
  collectionName: string,
  docId: string | undefined | null,
  options: HookOptions = { listen: false }
) {
  const db = useFirestore();
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!db || !docId) {
      setData(null);
      setIsLoading(false);
      return;
    };

    const docRef = doc(db, collectionName, docId);

    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setData({ ...docSnap.data(), id: docSnap.id } as T);
        } else {
          setData(null);
        }
        setIsLoading(false);
      },
      (error) => {
        console.error('Error fetching document:', error);
        const permissionError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'get',
        });
        errorEmitter.emit('permission-error', permissionError);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [db, collectionName, docId, options.listen]);

  return { data, isLoading };
}
