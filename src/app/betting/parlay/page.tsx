
'use client';

import { useState, useMemo, useEffect } from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Layers, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { isUsernameTaken } from '@/lib/firebase-config';
import type { Account } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useUser, useDoc } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';


function ParlayBetPageSkeleton() {
  const parlayImage = PlaceHolderImages.find((p) => p.id === 'race-banner-1');
  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Parlay Bet" />
      
      {parlayImage && (
        <div className="mb-8 overflow-hidden rounded-lg">
          <Image
            src={parlayImage.imageUrl}
            alt={parlayImage.description}
            width={800}
            height={300}
            className="w-full object-cover"
            data-ai-hint={parlayImage.imageHint}
          />
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Create Your Parlay</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-10 w-full" /></div>
            <div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-10 w-full" /></div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-10 w-full" /></div>
            <div className="space-y-2"><Skeleton className="h-4 w-32" /><Skeleton className="h-10 w-full" /></div>
          </div>
           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Skeleton className="h-4 w-28" /><Skeleton className="h-10 w-full" /></div>
            <div className="space-y-2"><Skeleton className="h-4 w-28" /><Skeleton className="h-10 w-full" /></div>
          </div>
          <div className="rounded-lg border bg-muted/50 p-4">
              <h3 className="font-semibold">Total Win Value</h3>
              <Skeleton className="h-8 w-24 mt-1" />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-11 w-full" />
        </CardFooter>
      </Card>
    </div>
  );
}


export default function ParlayBetPage() {
  const parlayImage = PlaceHolderImages.find((p) => p.id === 'race-banner-1');
  const { toast } = useToast();
  const router = useRouter();
  const { user, isLoading: isUserLoading } = useUser();
  const { data: currentUser, isLoading: isAccountLoading } = useDoc<Account>('accounts', user?.uid || '---');

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/sign-in');
    }
  }, [isUserLoading, user, router]);
  
  const [firstRaceDate, setFirstRaceDate] = useState('');
  const [parlayRaceDate, setParlayRaceDate] = useState('');
  const [friendUsername, setFriendUsername] = useState('');
  const [firstBetValue, setFirstBetValue] = useState('');
  const [secondBetValue, setSecondBetValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalWinValue = useMemo(() => {
    const firstBet = Number(firstBetValue) || 0;
    const secondBet = Number(secondBetValue) || 0;

    if(firstBet > 0 && secondBet > 0) {
        // As per description: Parlay is first bet winnings (assuming 1:1 odds) + second bet value, then doubled.
        return (firstBet + secondBet) * 2;
    }
    return 0;
  }, [firstBetValue, secondBetValue]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstRaceDate || !parlayRaceDate || !friendUsername || !firstBetValue || !secondBetValue) {
        toast({
            title: 'Missing Information',
            description: 'Please fill out all fields to create a parlay bet.',
            variant: 'destructive'
        });
        return;
    }

    if (!currentUser) {
         toast({
            title: 'Error',
            description: 'Could not find your account. Please sign in again.',
            variant: 'destructive'
        });
        router.push('/sign-in');
        return;
    }
    
    if (friendUsername.replace('@', '') === currentUser.username) {
        toast({
            title: 'Invalid Friend',
            description: "You can't place a parlay bet against yourself.",
            variant: 'destructive'
        });
        return;
    }

    setIsSubmitting(true);
    const friendExists = await isUsernameTaken(friendUsername.replace('@', ''));
    if (!friendExists) {
        toast({
            title: 'Friend not found',
            description: `We couldn't find a user with the username ${friendUsername}.`,
            variant: 'destructive'
        });
        setIsSubmitting(false);
        return;
    }

    const totalBetCost = Number(firstBetValue) + Number(secondBetValue);
    // Assuming the user is betting with Gold Coins for this example
    if (totalBetCost > currentUser.balances.gold) {
         toast({
            title: 'Insufficient Balance',
            description: 'You do not have enough Gold Coins to place this parlay bet.',
            variant: 'destructive'
        });
         setIsSubmitting(false);
        return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);

    toast({
        title: 'Parlay Bet Placed!',
        description: `Your parlay bet against ${friendUsername} has been submitted.`
    });

    // Reset form
    setFirstRaceDate('');
    setParlayRaceDate('');
    setFriendUsername('');
    setFirstBetValue('');
    setSecondBetValue('');
  }
  
  const isLoading = isUserLoading || isAccountLoading;
  
  if (isLoading) {
      return <ParlayBetPageSkeleton />
  }
  
  if (!currentUser) {
      return (
        <div className="mx-auto max-w-2xl text-center">
            <PageHeader title="Parlay Bet" />
            <p>Could not load your account details. Please try signing in again.</p>
            <Button onClick={() => router.push('/sign-in')} className="mt-4">Sign In</Button>
        </div>
      )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Parlay Bet" />
      
      {parlayImage && (
        <div className="mb-8 overflow-hidden rounded-lg">
          <Image
            src={parlayImage.imageUrl}
            alt={parlayImage.description}
            width={800}
            height={300}
            className="w-full object-cover"
            data-ai-hint={parlayImage.imageHint}
          />
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Create Your Parlay</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first-race-date">First Race Date</Label>
                <Input id="first-race-date" type="date" value={firstRaceDate} onChange={(e) => setFirstRaceDate(e.target.value)} disabled={isSubmitting} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parlay-race-date">Parlay Race Date</Label>
                <Input id="parlay-race-date" type="date" value={parlayRaceDate} onChange={(e) => setParlayRaceDate(e.target.value)} disabled={isSubmitting} />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                 <div className="space-y-2">
                    <Label htmlFor="account-name">Your Account Name</Label>
                    <Input id="account-name" placeholder="e.g., @johndoe" value={`@${currentUser?.username}` || ''} disabled />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="friend-account-name">Friend's Account Name</Label>
                    <Input id="friend-account-name" placeholder="e.g., @janesmith" value={friendUsername} onChange={(e) => setFriendUsername(e.target.value)} disabled={isSubmitting}/>
                </div>
            </div>
             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                 <div className="space-y-2">
                    <Label htmlFor="first-bet-value">First Bet Value</Label>
                    <Input id="first-bet-value" type="number" placeholder="Enter amount" value={firstBetValue} onChange={(e) => setFirstBetValue(e.target.value)} disabled={isSubmitting} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="second-bet-value">Second Bet Value</Label>
                    <Input id="second-bet-value" type="number" placeholder="Enter amount" value={secondBetValue} onChange={(e) => setSecondBetValue(e.target.value)} disabled={isSubmitting} />
                </div>
            </div>

            <div className="rounded-lg border bg-muted/50 p-4">
              <h3 className="font-semibold">Total Win Value</h3>
              <p className="mt-1 text-2xl font-bold">{totalWinValue > 0 ? `${totalWinValue.toLocaleString()} GC` : '--'}</p>
              <p className="text-xs text-muted-foreground mt-2">
                  Parlay bets are doubled by the second bet value and winnings from first race bet value.
              </p>
            </div>

          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Layers className="mr-2 h-4 w-4" />
                )}
                {isSubmitting ? 'Submitting Bet...' : 'Bet this Parlay Now'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
