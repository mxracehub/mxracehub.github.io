
'use client';

import { useEffect, useState } from 'react';
import { useUser, useDoc } from '@/firebase';
import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Coins, Trophy, Users, Settings, Hash, Facebook, Instagram, RefreshCw, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import type { Account, Bet } from '@/lib/types';
import { updateAccount, getRiderPosition } from '@/lib/firebase-config';
import { useToast } from '@/hooks/use-toast';


function AccountPageSkeleton() {
    return (
        <div>
            <PageHeader title="My Account" description="View your profile, balances, and betting history."/>
            <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-1 space-y-4">
                    <Card>
                        <CardHeader className="items-center text-center">
                            <Skeleton className="h-24 w-24 rounded-full" />
                            <Skeleton className="h-6 w-32 mt-2" />
                            <Skeleton className="h-4 w-24" />
                        </CardHeader>
                         <CardContent>
                             <Skeleton className="h-10 w-full" />
                         </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                           <Skeleton className="h-8 w-24" />
                        </CardHeader>
                         <CardContent className="space-y-2">
                             <Skeleton className="h-8 w-full" />
                             <Skeleton className="h-8 w-full" />
                             <Skeleton className="h-10 w-full" />
                             <Skeleton className="h-10 w-full" />
                         </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-2 space-y-4">
                    <Card>
                        <CardHeader>
                             <Skeleton className="h-8 w-40" />
                        </CardHeader>
                        <CardContent>
                           <Skeleton className="h-24 w-full" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

const SocialShareButtons = ({ bet, account }: { bet: Bet; account: Account }) => {
    if (bet.status === 'Pending') return null;

    const outcome = bet.status === 'Won' ? 'won' : 'lost';
    const text = `I just ${outcome} a bet of ${bet.amount} ${bet.coinType} against @${bet.opponent} on the ${bet.race} at #MxRaceHub!`;
    const url = 'https://www.mxracehub.site';

    const handleFacebookShare = () => {
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
        window.open(facebookShareUrl, '_blank', 'noopener,noreferrer');
    };
    
    // Instagram doesn't have a web sharer API like Facebook. 
    // The best we can do is inform the user to share manually.
    const handleInstagramShare = () => {
        navigator.clipboard.writeText(text);
        alert('Your bet result has been copied to your clipboard. Paste it into your next Instagram story or post!');
    };

    return (
        <div className="flex gap-2 mt-2">
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleFacebookShare} title="Share on Facebook">
                <Facebook className="h-4 w-4 text-blue-600" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleInstagramShare} title="Share on Instagram">
                <Instagram className="h-4 w-4 text-pink-600" />
            </Button>
        </div>
    );
};


export default function AccountPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, isLoading: isUserLoading } = useUser();
  // Using a local state for account to allow optimistic updates
  const { data: initialAccount, isLoading: isAccountLoading } = useDoc<Account>('accounts', user?.uid || '---');
  const [account, setAccount] = useState<Account | null>(null);
  const [settlingBetId, setSettlingBetId] = useState<string | null>(null);

  useEffect(() => {
    if (initialAccount) {
      setAccount(initialAccount);
    }
  }, [initialAccount]);

  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar');

  useEffect(() => {
    // If user loading is finished and there's no user, redirect to sign-in.
    if (!isUserLoading && !user) {
      router.push('/sign-in');
    }
  }, [isUserLoading, user, router]);

  const handleSettleBet = async (betToSettle: Bet) => {
    if (!account) return;
    setSettlingBetId(betToSettle.id);

    try {
        const userRiderPosition = await getRiderPosition(betToSettle.raceId, betToSettle.userRider);
        const opponentRiderPosition = await getRiderPosition(betToSettle.raceId, betToSettle.opponentRider);

        if (userRiderPosition === null || opponentRiderPosition === null) {
            toast({
                title: "Race results not available",
                description: "The results for this race may not be posted yet. Please try again later.",
                variant: "destructive"
            });
            setSettlingBetId(null);
            return;
        }

        const userWon = userRiderPosition < opponentRiderPosition;
        const newStatus = userWon ? 'Won' : 'Lost';

        // Update bet status locally for optimistic update
        const updatedBetHistory = account.betHistory.map(bet => 
            bet.id === betToSettle.id ? { ...bet, status: newStatus } : bet
        );

        let newBalances = account.balances;
        if (userWon) {
             const winnings = betToSettle.amount * 2;
             if (betToSettle.coinType === 'Gold Coins') {
                 newBalances = { ...newBalances, gold: newBalances.gold + winnings };
             } else {
                 newBalances = { ...newBalances, sweeps: newBalances.sweeps + winnings };
             }
        }
        
        const updatedAccount = {
            ...account,
            betHistory: updatedBetHistory,
            balances: newBalances
        };
        
        // Optimistically update the local state
        setAccount(updatedAccount);
        
        // Persist to Firestore
        await updateAccount(account.id, {
            betHistory: updatedBetHistory,
            balances: newBalances
        });
        
        toast({
            title: `You ${newStatus}!`,
            description: userWon ? `You won ${betToSettle.amount.toLocaleString()} ${betToSettle.coinType}!` : `You lost the bet.`,
            variant: userWon ? "default" : "destructive"
        });

    } catch (error) {
        console.error("Failed to settle bet:", error);
        toast({
            title: "Error",
            description: "Could not settle the bet. Please try again.",
            variant: "destructive"
        });
        // Revert optimistic update on error
        setAccount(initialAccount);
    } finally {
        setSettlingBetId(null);
    }
  };


  const isLoading = isUserLoading || isAccountLoading;

  if (isLoading || !account) {
    return <AccountPageSkeleton />;
  }

  // This can happen if the user is authenticated but their account doc doesn't exist yet,
  if (!initialAccount && !isAccountLoading) {
    return <div>Could not load account details. Please try again later.</div>;
  }

  const sortedBetHistory = [...(account?.betHistory || [])].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());


  return (
    <div>
      <PageHeader
        title="My Account"
        description="View your profile, balances, and betting history."
      >
        <div className="absolute top-0 right-0 mt-4 mr-4">
            <Button asChild variant="outline">
                <Link href="/account/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                </Link>
            </Button>
        </div>
      </PageHeader>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
            <Card>
                <CardHeader className="items-center text-center">
                    <Avatar className="h-24 w-24 border-4 border-primary">
                        {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={account.name} />}
                        <AvatarFallback>{account.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="mt-2">{account.name}</CardTitle>
                    <CardDescription>@{account.username}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-center">
                    <p className="text-sm text-muted-foreground">{account.bio || 'No bio yet.'}</p>
                     <div className="flex items-center justify-center gap-2 text-sm">
                        <Hash className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">Rider #: {account.riderNumber || 'N/A'}</span>
                    </div>
                </CardContent>
            </Card>
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Coins className="text-yellow-500" /> Balances</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div>
                        <p className="font-bold text-2xl">{account.balances.gold.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Gold Coins</p>
                    </div>
                    <div>
                        <p className="font-bold text-2xl">{account.balances.sweeps.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        <p className="text-sm text-muted-foreground">Sweeps Coins</p>
                    </div>
                    <Button className="w-full" asChild>
                        <Link href="/bank">Purchase Gold Coins</Link>
                    </Button>
                    <Button className="w-full" variant="outline" asChild>
                        <Link href="/account/exchange-gold">Exchange Gold Coins</Link>
                    </Button>
                     <Button className="w-full" variant="outline" asChild>
                        <Link href="/account/exchange-sweeps">Exchange Sweeps Coins</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Trophy /> Betting History</CardTitle>
            </CardHeader>
            <CardContent>
              {sortedBetHistory.length > 0 ? (
                <ul className="space-y-4">
                  {sortedBetHistory.map((bet) => (
                    <li key={bet.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-md border p-4 gap-4">
                      <div className="flex-1">
                        <p className="font-semibold">{bet.race}</p>
                        <p className="text-sm text-muted-foreground">
                          Bet against @{bet.opponent} - {bet.date}
                        </p>
                        <div className="text-xs mt-2 space-y-1">
                            <p><strong>Your Pick:</strong> {bet.userRider}</p>
                            <p><strong>Friend's Pick:</strong> {bet.opponentRider}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className={`text-right ${bet.status === 'Won' ? 'text-green-500' : bet.status === 'Lost' ? 'text-red-500' : ''}`}>
                            <p className="font-bold">{bet.status}</p>
                            <p className="text-sm">{bet.amount} {bet.coinType}</p>
                            <SocialShareButtons bet={bet} account={account} />
                        </div>
                        {bet.status === 'Pending' && (
                            <Button size="sm" variant="outline" onClick={() => handleSettleBet(bet)} disabled={settlingBetId === bet.id}>
                                {settlingBetId === bet.id ? <Loader2 className="h-4 w-4 animate-spin"/> : <RefreshCw className="h-4 w-4" />}
                                <span className="ml-2 hidden sm:inline">Settle</span>
                            </Button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-10 text-center text-muted-foreground">
                  <p>You haven't placed any bets yet.</p>
                  <Button variant="link" asChild><Link href="/betting">Place your first bet</Link></Button>
                </div>
              )}
            </CardContent>
          </Card>
           <Card className="mt-4">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Users /> Friends</CardTitle>
                </CardHeader>
                 <CardContent>
                    <p className="text-muted-foreground mb-4">View your friends list and manage connections.</p>
                     <Button asChild>
                         <Link href="/friends">View Friends</Link>
                     </Button>
                 </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
