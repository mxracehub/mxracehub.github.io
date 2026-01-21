
'use client';

import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, UserPlus, Mic } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getFriends, getAccountByUsername, updateAccount } from '@/lib/firebase-config';
import type { Account } from '@/lib/types';
import Link from 'next/link';
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useUser, useDoc } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';

function FriendsPageSkeleton() {
    return (
        <div className="max-w-4xl mx-auto">
            <PageHeader
                title="Find and Make Friends"
                description="Search for friends, manage your connections, and start playing."
            />
            <div className="mb-8 flex gap-4">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-28" />
            </div>
            <div>
                <Skeleton className="h-8 w-48 mb-4" />
                <div className="space-y-4">
                    {[...Array(2)].map((_, i) => (
                        <Card key={i}>
                            <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4">
                                <Skeleton className="h-24 w-24 rounded-full" />
                                <div className="flex-1 space-y-2 text-center sm:text-left">
                                    <Skeleton className="h-6 w-32" />
                                    <Skeleton className="h-4 w-24" />
                                    <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
                                        <Skeleton className="h-4 w-20" />
                                        <Skeleton className="h-4 w-20" />
                                        <Skeleton className="h-4 w-20" />
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <Skeleton className="h-4 w-40" />
                                    <Skeleton className="h-10 w-36" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default function FriendsPage() {
    const router = useRouter();
    const { toast } = useToast();
    const { user, isLoading: isUserLoading } = useUser();
    const { data: currentUser, isLoading: isAccountLoading } = useDoc<Account>('accounts', user?.uid || '---');
    
    const [friends, setFriends] = useState<Account[]>([]);
    const [isLoadingFriends, setIsLoadingFriends] = useState(true);
    const [friendSearch, setFriendSearch] = useState('');

    useEffect(() => {
        if (!isUserLoading && !user) {
            router.push('/sign-in');
        }
    }, [isUserLoading, user, router]);

    useEffect(() => {
        const fetchFriendsData = async () => {
            if (currentUser && currentUser.friendIds) {
                if (currentUser.friendIds.length > 0) {
                    setIsLoadingFriends(true);
                    const friendList = await getFriends(currentUser.friendIds);
                    setFriends(friendList);
                    setIsLoadingFriends(false);
                } else {
                    setFriends([]);
                    setIsLoadingFriends(false);
                }
            } else if (currentUser) {
                // User has account but no friendIds field or it's empty
                 setFriends([]);
                 setIsLoadingFriends(false);
            }
        };

        fetchFriendsData();
    }, [currentUser]);
      
    const handleAddFriend = async () => {
        if (!friendSearch.trim()) {
            toast({
                title: "Username required",
                description: "Please enter a username to add a friend.",
                variant: 'destructive'
            });
            return;
        }

        if (!currentUser) return;

        const friendToAdd = await getAccountByUsername(friendSearch.trim().toLowerCase());

        if (!friendToAdd) {
            toast({
                title: "User not found",
                description: `Could not find a user with the username "${friendSearch}".`,
                variant: 'destructive'
            });
            return;
        }
        
        if (friendToAdd.id === currentUser.id) {
             toast({
                title: "Cannot add yourself",
                description: "You cannot add yourself as a friend.",
                variant: 'destructive'
            });
            return;
        }

        if (currentUser.friendIds?.includes(friendToAdd.id)) {
            toast({
                title: "Already friends",
                description: `You are already friends with ${friendToAdd.name}.`,
            });
            setFriendSearch('');
            return;
        }

        try {
            const updatedFriendIds = [...(currentUser.friendIds || []), friendToAdd.id];
            await updateAccount(currentUser.id, { friendIds: updatedFriendIds });
            
            // The useEffect will refetch friends, but we can optimistically update UI
            setFriends(prev => [...prev, friendToAdd].sort((a,b) => a.name.localeCompare(b.name)));

            toast({
                title: "Friend Added!",
                description: `You are now friends with ${friendToAdd.name}.`
            });
            
            setFriendSearch('');
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to add friend. Please try again.",
                variant: "destructive"
            });
        }
    }

    const isLoading = isUserLoading || isAccountLoading || isLoadingFriends;

    if (isLoading) {
        return <FriendsPageSkeleton />
    }


  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Find and Make Friends"
        description="Search for friends, manage your connections, and start playing."
      />
      <div className="mb-8 flex gap-4">
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
            id="find-friend"
            placeholder="Search by username..."
            className="pl-10 pr-10"
            value={friendSearch}
            onChange={(e) => setFriendSearch(e.target.value)}
            />
            <Mic className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer text-muted-foreground" />
        </div>
        <Button onClick={handleAddFriend}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Friend
        </Button>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Your Friends ({friends.length})</h2>
        {friends.length > 0 ? (
          <div className="space-y-4">
            {friends.map(friend => (
              <Card key={friend.id}>
                <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4">
                    <Avatar className="h-24 w-24 border-4 border-primary">
                        <AvatarImage src={`https://picsum.photos/seed/${friend.id}/200`} alt={friend.name} />
                        <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-xl font-bold">{friend.name}</h3>
                        <p className="text-sm text-muted-foreground">@{friend.username}</p>
                        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                            <p><strong>Rider's #</strong> {friend.riderNumber || 'N/A'}</p>
                            <p><strong>Play Wins:</strong> {friend.playHistory.filter(b => b.status === 'Won').length}</p>
                            <p><strong>Standings:</strong> {friend.mxhubStanding || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-sm font-medium text-center">Play with this Friend Next Race</p>
                        <Button asChild className="w-full sm:w-auto bg-red-600 hover:bg-red-700">
                            <Link href="/play">Play Next Race</Link>
                        </Button>
                    </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 rounded-lg border border-dashed">
            <p className="text-muted-foreground">You haven't added any friends yet.</p>
            <p className="text-muted-foreground">Use the search bar to find and add friends.</p>
          </div>
        )}
      </div>
    </div>
  );
}
