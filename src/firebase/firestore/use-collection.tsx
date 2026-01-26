
'use client';
import {
  onSnapshot,
  query,
  collection,
  where,
  type DocumentData,
  type Firestore,
  type Query,
  type WhereFilterOp,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useFirestore } from '../provider';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

interface HookOptions {
  listen?: boolean;
}

export function useCollection<T = DocumentData>(
  collectionName: string,
  queryString?: [string, WhereFilterOp, any],
  options: HookOptions = { listen: false }
) {
  const db = useFirestore();
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!db) {
        setIsLoading(false);
        return;
    };
    
    // If a query string is provided but the value to compare against is falsy (e.g., undefined user ID),
    // don't run the query. This prevents permission errors for queries that depend on user authentication
    // before the user state is resolved.
    if (queryString && (queryString[2] === undefined || queryString[2] === null)) {
        setData([]);
        setIsLoading(false);
        return;
    }

    let q: Query;
    if (queryString) {
      q = query(
        collection(db, collectionName),
        where(queryString[0], queryString[1], queryString[2])
      );
    } else {
      q = query(collection(db, collectionName));
    }

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const documents = querySnapshot.docs.map(
          (doc) => ({ ...doc.data(), id: doc.id } as T)
        );
        setData(documents);
        setIsLoading(false);
      },
      (error) => {
        console.error(`Error fetching collection: ${collectionName}`, error);
        const permissionError = new FirestorePermissionError({
          path: collectionName,
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, collectionName, options.listen, ...(queryString || [])]);

  return { data, isLoading };
}
