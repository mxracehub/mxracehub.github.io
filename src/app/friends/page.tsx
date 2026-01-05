
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
import { accounts, type Account } from '@/lib/accounts-data';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';


export default function FriendsPage() {
    const [currentUser, setCurrentUser] = useState<Account | null>(null);
    const [friends, setFriends] = useState<Account[]>([]);
    const [friendSearch, setFriendSearch] = useState('');
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        const loggedInUserId = localStorage.getItem('loggedInUserId');
        if (loggedInUserId) {
          const userAccount = accounts.find((a) => a.id === loggedInUserId);
          if (userAccount) {
            setCurrentUser(userAccount);
            const userFriends = accounts.filter(a => userAccount.friendIds?.includes(a.id)).sort((a, b) => a.name.localeCompare(b.name));
            setFriends(userFriends);
          } else {
            router.push('/sign-in');
          }
        } else {
          router.push('/sign-in');
        }
      }, [router]);
      
    const handleAddFriend = () => {
        if (!friendSearch.trim()) {
            toast({
                title: "Username required",
                description: "Please enter a username to add a friend.",
                variant: 'destructive'
            });
            return;
        }

        if (!currentUser) return;

        const friendToAdd = accounts.find(acc => acc.username.toLowerCase() === friendSearch.trim().toLowerCase());

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
            return;
        }

        // Add friend
        if(currentUser.friendIds) {
            currentUser.friendIds.push(friendToAdd.id);
        } else {
            currentUser.friendIds = [friendToAdd.id];
        }

        const updatedFriends = accounts.filter(a => currentUser.friendIds?.includes(a.id)).sort((a, b) => a.name.localeCompare(b.name));
        setFriends(updatedFriends);

        toast({
            title: "Friend Added!",
            description: `You are now friends with ${friendToAdd.name}.`
        });
        
        setFriendSearch('');
    }


    if (!currentUser) {
        return <div>Loading...</div>
    }


  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Find and Make Friends"
        description="Search for friends, manage your connections, and start betting."
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
                        <AvatarImage src={`https://picsum.photos/seed/${friend.username}/200`} alt={friend.name} />
                        <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-xl font-bold">{friend.name}</h3>
                        <p className="text-sm text-muted-foreground">@{friend.username}</p>
                        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                            <p><strong>Rider's #</strong> {friend.riderNumber || 'N/A'}</p>
                            <p><strong>Bet Wins:</strong> {friend.betHistory.filter(b => b.status === 'Won').length}</p>
                            <p><strong>Standings:</strong> {friend.mxhubStanding || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-sm font-medium text-center">Bet with this Friend Next Race</p>
                        <Button asChild className="w-full sm:w-auto bg-red-600 hover:bg-red-700">
                            <Link href="/betting">Bet Next Race</Link>
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
