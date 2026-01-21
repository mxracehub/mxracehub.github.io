'use client';

import { useEffect, useState } from 'react';
import { useUser, useDoc } from '@/firebase';
import type { Account } from '@/lib/types';
import { TriviaGame } from './trivia-game';

export function TriviaController() {
  const { user, isLoading: isUserLoading } = useUser();
  const { data: account, isLoading: isAccountLoading } = useDoc<Account>(
    'accounts',
    user?.uid || '---'
  );
  const [shouldShowTrivia, setShouldShowTrivia] = useState(false);

  useEffect(() => {
    if (isUserLoading || isAccountLoading || !account) {
      return;
    }

    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    const now = new Date().getTime();

    if (!account.lastTriviaPlayed) {
      // First time playing
      setShouldShowTrivia(true);
    } else {
      const lastPlayedTime = new Date(account.lastTriviaPlayed).getTime();
      if (now - lastPlayedTime > thirtyDays) {
        setShouldShowTrivia(true);
      }
    }
  }, [user, account, isUserLoading, isAccountLoading]);

  if (shouldShowTrivia && account) {
    return <TriviaGame userAccount={account} onGameEnd={() => setShouldShowTrivia(false)} />;
  }

  return null;
}
