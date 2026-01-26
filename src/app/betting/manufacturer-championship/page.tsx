
'use client';

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Coins, Mic, Search, Users, X, CheckCircle, Loader2, Trophy } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { getFriends, updateAccount } from '@/lib/firebase-config';
import type { Account, Play } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useUser, useDoc } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { manufacturersPoints } from '@/lib/manufacturers-points-data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const allManufacturers = manufacturersPoints.map(m => m.manufacturer);

function ManufacturerBettingPageSkeleton() {
    return (
        <div className="mx-auto max-w-2xl">
            <PageHeader
                title="Play on Manufacturer Championship"
                description="Place a play with a friend on which manufacturer will win the 2026 Championship."
            />
            <Card>
                <CardContent className="space-y-8 pt-6">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-4 rounded-lg border bg-background p-4">
                        <Skeleton className="h-6 w-32" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                         <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <div className="flex gap-4">
                                <Skeleton className="h-12 w-32" />
                                <Skeleton className="h-12 w-32" />
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Skeleton className="h-11 w-full" />
                </CardFooter>
            </Card>
        </div>
    );
}

export default function ManufacturerBettingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, isLoading: isUserLoading } = useUser();
  const { data: currentUser, isLoading: isAccountLoading } = useDoc<Account>('accounts', user?.uid);

  const [playAmount, setPlayAmount] = useState('');
  const [coinType, setCoinType] = useState('gold');
  const [friendSearch, setFriendSearch] = useState('');
  const [selectedFriend, setSelectedFriend] = useState<Account | null>(null);
  const [friends, setFriends] = useState<Account[]>([]);
  const [isLoadingFriends, setIsLoadingFriends] = useState(true);
  const [userManufacturer, setUserManufacturer] = useState('');
  const [opponentManufacturer, setOpponentManufacturer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (!isUserLoading && !user) {
        router.push('/sign-in');
    }
  }, [isUserLoading, user, router]);

  useEffect(() => {
      if (currentUser && currentUser.friendIds && currentUser.friendIds.length > 0) {
          setIsLoadingFriends(true);
          getFriends(currentUser.friendIds).then(friendList => {
              setFriends(friendList);
              setIsLoadingFriends(false);
          });
      } else if (currentUser) {
          setFriends([]);
          setIsLoadingFriends(false);
      }
  }, [currentUser]);

  
  const filteredFriends = useMemo(() => {
    if (!friendSearch) return [];
    return friends.filter(friend => 
        friend.name.toLowerCase().includes(friendSearch.toLowerCase()) ||
        friend.username.toLowerCase().includes(friendSearch.toLowerCase())
    ).slice(0, 5);
  }, [friendSearch, friends]);
  
  const handleSelectFriend = (friend: Account) => {
      setSelectedFriend(friend);
      setFriendSearch('');
  }
  
  const handlePlacePlay = async () => {
    setIsSubmitting(true);
    if (!currentUser || !user) {
        toast({ title: "Please sign in", description: "You need to be signed in to place a play.", variant: "destructive" });
        router.push('/sign-in');
        setIsSubmitting(false);
        return;
    }
    if (!selectedFriend) {
        toast({ title: "No friend selected", description: "Please select a friend to play against.", variant: "destructive" });
        setIsSubmitting(false);
        return;
    }
    if (!userManufacturer) {
        toast({ title: "Your pick not selected", description: "Please select your manufacturer pick.", variant: "destructive" });
        setIsSubmitting(false);
        return;
    }
    if (!opponentManufacturer) {
        toast({ title: "Opponent's pick not selected", description: "Please select your friend's manufacturer pick.", variant: "destructive" });
        setIsSubmitting(false);
        return;
    }
    const amount = Number(playAmount);
    if (!amount || amount < 100) {
        toast({ title: "Invalid Amount", description: "The minimum play amount is 100 coins.", variant: "destructive" });
        setIsSubmitting(false);
        return;
    }

    const balance = coinType === 'gold' ? currentUser.balances.gold : currentUser.balances.sweeps;
    if (amount > balance) {
        toast({ title: "Insufficient Balance", description: `You do not have enough ${coinType === 'gold' ? 'Gold' : 'Sweeps'} Coins.`, variant: "destructive" });
        setIsSubmitting(false);
        return;
    }
    
    const newPlay: Play = {
        id: `${new Date().getTime()}-${user.uid}`,
        race: "2026 SX Manufacturers Championship",
        raceId: "manufacturer-championship-2026",
        playType: 'Championship Winner',
        opponent: selectedFriend.username,
        opponentId: selectedFriend.id,
        date: "2026-09-27", // End of season
        amount: amount,
        coinType: coinType === 'gold' ? 'Gold Coins' : 'Sweeps Coins',
        status: 'Pending',
        userRider: userManufacturer,
        opponentRider: opponentManufacturer,
    };

    const newUserBalance = {
        gold: coinType === 'gold' ? currentUser.balances.gold - amount : currentUser.balances.gold,
        sweeps: coinType === 'sweeps' ? currentUser.balances.sweeps - amount : currentUser.balances.sweeps,
    };

    try {
        await updateAccount(currentUser.id, {
            playHistory: [...currentUser.playHistory, newPlay],
            balances: newUserBalance,
        });

        toast({
            title: "Play Placed!",
            description: `Your championship play against @${selectedFriend.username} has been placed.`,
        });

        router.push('/account');

    } catch (error) {
        console.error("Failed to place play:", error);
        toast({ title: "Error", description: "Failed to place play. Please try again.", variant: "destructive" });
    } finally {
        setIsSubmitting(false);
    }
  }
  
  const isLoading = isUserLoading || isAccountLoading || isLoadingFriends;

  if (isLoading) {
    return <ManufacturerBettingPageSkeleton />;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader
        title="Play on Manufacturer Championship"
        description="Place a play with a friend on which manufacturer will win the 2026 Championship."
      />
      <Card>
        <CardContent className="space-y-8 pt-6">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-lg font-semibold"><Users className="h-5 w-5"/>Find a Friend</Label>
            {!selectedFriend ? (
              <>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="find-friend"
                    placeholder="Search by username..."
                    className="pl-10 pr-10"
                    value={friendSearch}
                    onChange={(e) => setFriendSearch(e.target.value)}
                    disabled={isSubmitting}
                  />
                  <Mic className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer text-muted-foreground" />
                </div>
                {friendSearch && filteredFriends.length > 0 && (
                    <div className="relative">
                        <ul className="absolute z-10 w-full bg-card border rounded-md mt-1 max-h-60 overflow-y-auto">
                            {filteredFriends.map(friend => (
                                <li key={friend.id} onClick={() => handleSelectFriend(friend)} className="px-4 py-2 hover:bg-muted cursor-pointer">
                                    <p className="font-semibold">{friend.name}</p>
                                    <p className="text-sm text-muted-foreground">@{friend.username}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
              </>
            ) : (
                <div className="rounded-lg border bg-muted/50 p-4 flex items-center justify-between">
                    <div>
                        <p className="font-semibold flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> {selectedFriend.name}</p>
                        <p className="text-sm text-muted-foreground ml-7">@{selectedFriend.username}</p>
                    </div>
                     <Button variant="ghost" size="icon" onClick={() => setSelectedFriend(null)} disabled={isSubmitting}>
                        <X className="h-5 w-5" />
                    </Button>
                </div>
            )}
          </div>

          <div className="space-y-4 rounded-lg border bg-background p-4">
             <Label className="flex items-center gap-2 text-lg font-semibold"><Trophy className="h-5 w-5" />Make Your Picks</Label>
            
            <div className="space-y-2">
                <Label>Your Manufacturer Pick</Label>
                <Select onValueChange={setUserManufacturer} value={userManufacturer} disabled={isSubmitting}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a manufacturer" />
                    </SelectTrigger>
                    <SelectContent>
                        {allManufacturers.map(manufacturer => (
                            <SelectItem key={manufacturer} value={manufacturer}>{manufacturer}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label>Opponent's Manufacturer Pick</Label>
                <Select onValueChange={setOpponentManufacturer} value={opponentManufacturer} disabled={isSubmitting}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a manufacturer" />
                    </SelectTrigger>
                    <SelectContent>
                        {allManufacturers.map(manufacturer => (
                            <SelectItem key={manufacturer} value={manufacturer}>{manufacturer}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="play-amount">Play Amount</Label>
                <Input
                id="play-amount"
                type="number"
                placeholder="Minimum 100 coins"
                value={playAmount}
                onChange={(e) => setPlayAmount(e.target.value)}
                disabled={isSubmitting}
                />
            </div>
            <div className="space-y-2">
                <Label>Coin Type</Label>
                <RadioGroup defaultValue="gold" value={coinType} onValueChange={setCoinType} className="flex gap-4">
                    <Label htmlFor="gold" className="flex cursor-pointer items-center gap-2 rounded-md border p-3 data-[state=checked]:border-primary">
                        <RadioGroupItem value="gold" id="gold" disabled={isSubmitting}/>
                        Gold Coins
                    </Label>
                    <Label htmlFor="sweeps" className="flex cursor-pointer items-center gap-2 rounded-md border p-3 data-[state=checked]:border-primary">
                         <RadioGroupItem value="sweeps" id="sweeps" disabled={isSubmitting}/>
                        Sweeps Coins
                    </Label>
                </RadioGroup>
                 <p className="pt-2 text-xs text-muted-foreground">
                Use Gold Coins for fun or Sweeps Coins for a chance to win real prizes.
              </p>
            </div>
          </div>

        </CardContent>
        <CardFooter className="flex flex-col gap-4">
            <Button size="lg" className="w-full" onClick={handlePlacePlay} disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="animate-spin" /> : "Place Championship Play"}
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
