
'use client';

import { useEffect } from 'react';
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
import { Coins, Trophy, Users, Settings, Hash, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import type { Account, Bet } from '@/lib/types';

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
  const { user, isLoading: isUserLoading } = useUser();
  const { data: account, isLoading: isAccountLoading } = useDoc<Account>('accounts', user?.uid || '---');

  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar');

  useEffect(() => {
    // If user loading is finished and there's no user, redirect to sign-in.
    if (!isUserLoading && !user) {
      router.push('/sign-in');
    }
  }, [isUserLoading, user, router]);

  const isLoading = isUserLoading || isAccountLoading;

  if (isLoading) {
    return <AccountPageSkeleton />;
  }

  if (!account) {
    // This can happen if the user is authenticated but their account doc doesn't exist yet,
    // or if there was an error fetching the document.
    return <div>Could not load account details. Please try again later.</div>;
  }

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
              {account.betHistory.length > 0 ? (
                <ul className="space-y-4">
                  {account.betHistory.map((bet) => (
                    <li key={bet.id} className="flex items-center justify-between rounded-md border p-4">
                      <div>
                        <p className="font-semibold">{bet.race}</p>
                        <p className="text-sm text-muted-foreground">
                          Bet against @{bet.opponent} - {bet.date}
                        </p>
                      </div>
                      <div className={`text-right ${bet.status === 'Won' ? 'text-green-500' : bet.status === 'Lost' ? 'text-red-500' : ''}`}>
                          <p className="font-bold">{bet.status}</p>
                          <p className="text-sm">{bet.amount} {bet.coinType}</p>
                          <SocialShareButtons bet={bet} account={account} />
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
