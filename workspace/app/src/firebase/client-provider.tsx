
'use client';
import { useEffect, useState, type ReactNode } from 'react';
import { FirebaseProvider } from './provider';

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <FirebaseProvider>{children}</FirebaseProvider>;
}
