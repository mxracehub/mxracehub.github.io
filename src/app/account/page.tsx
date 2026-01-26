
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
import { Coins, Trophy, Users, Settings, Hash, Facebook, Instagram, RefreshCw, Loader2, Clock } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import type { Account, Play } from '@/lib/types';
import { updateAccount, getRaceResults } from '@/lib/firebase-config';
import { useToast } from '@/hooks/use-toast';
import { getManufacturersPoints } from '@/lib/manufacturers-points-service';
import { Badge } from '@/components/ui/badge';


function AccountPageSkeleton() {
    return (
        <div>
            <PageHeader title="My Account" description="View your profile, balances, and playing history."/>
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

const SocialShareButtons = ({ play, account }: { play: Play; account: Account }) => {
    if (play.status === 'Pending') return null;

    const outcome = play.status === 'Won' ? 'won' : 'lost';
    const text = `I just ${outcome} a play of ${play.amount} ${play.coinType} against @${play.opponent} on the ${play.race} at #MxRaceHub!`;
    const url = 'https://www.mxracehub.site';

    const handleFacebookShare = () => {
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
        window.open(facebookShareUrl, '_blank', 'noopener,noreferrer');
    };
    
    // Instagram doesn't have a web sharer API like Facebook. 
    // The best we can do is inform the user to share manually.
    const handleInstagramShare = () => {
        navigator.clipboard.writeText(text);
        alert('Your play result has been copied to your clipboard. Paste it into your next Instagram story or post!');
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
  const { data: account, isLoading: isAccountLoading } = useDoc<Account>('accounts', user?.uid, { listen: true });

  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar');

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/sign-in');
    }
  }, [isUserLoading, user, router]);

  const isLoading = isUserLoading || isAccountLoading;

  if (isLoading || !account) {
    return <AccountPageSkeleton />;
  }

  if (!account && !isAccountLoading) {
    return <div>Could not load account details. Please try again later.</div>;
  }

  const sortedPlayHistory = [...(account?.playHistory || [])].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const todayString = new Date().toISOString().split('T')[0];

  return (
    <div>
      <PageHeader
        title="My Account"
        description="View your profile, balances, and playing history."
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
              <CardTitle className="flex items-center gap-2"><Trophy /> Playing History</CardTitle>
            </CardHeader>
            <CardContent>
              {sortedPlayHistory.length > 0 ? (
                <ul className="space-y-4">
                  {sortedPlayHistory.map((play) => {
                    const isLive = play.status === 'Pending' && play.date === todayString;
                    return (
                        <li key={play.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-md border p-4 gap-4">
                          <div className="flex-1">
                            <p className="font-semibold">{play.race} - {play.playType}</p>
                            <p className="text-sm text-muted-foreground">
                              Play against @{play.opponent} - {play.date}
                            </p>
                            <div className="text-xs mt-2 space-y-1">
                                <p><strong>Your Pick:</strong> {play.userRider}</p>
                                <p><strong>Friend's Pick:</strong> {play.opponentRider}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className={`text-right ${play.status === 'Won' ? 'text-green-500' : play.status === 'Lost' ? 'text-red-500' : play.status === 'Voided' ? 'text-yellow-500' : ''}`}>
                                {isLive ? (
                                    <Badge variant="destructive" className="animate-pulse mb-1">
                                        <Clock className="mr-1 h-3 w-3" />
                                        LIVE
                                    </Badge>
                                ) : (
                                    <p className="font-bold">{play.status}</p>
                                )}
                                <p className="text-sm">{play.amount} {play.coinType}</p>
                                <SocialShareButtons play={play} account={account} />
                            </div>
                          </div>
                        </li>
                    )
                  })}
                </ul>
              ) : (
                <div className="py-10 text-center text-muted-foreground">
                  <p>You haven't placed any plays yet.</p>
                  <Button variant="link" asChild><Link href="/play">Place your first play</Link></Button>
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
