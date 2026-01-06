
'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { getAccountById, isRiderNumberTaken, updateAccount } from '@/lib/firebase-config';
import type { Account } from '@/lib/types';
import { useRouter } from 'next/navigation';

export default function ChangeRiderNumberPage() {
  const [account, setAccount] = useState<Account | null>(null);
  const [newRiderNumber, setNewRiderNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  
  useEffect(() => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
      getAccountById(loggedInUserId).then(userAccount => {
        if (userAccount) {
          setAccount(userAccount);
          setNewRiderNumber(userAccount.riderNumber || '');
        } else {
          router.push('/sign-in');
        }
      });
    } else {
      router.push('/sign-in');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedRiderNumber = newRiderNumber.trim();
    if (!trimmedRiderNumber) {
      toast({
        title: 'Error',
        description: 'New rider number cannot be empty.',
        variant: 'destructive',
      });
      return;
    }
    if (!account) {
        toast({
            title: 'Error',
            description: 'Could not find user account.',
            variant: 'destructive',
        });
        return;
    }
    
    if (await isRiderNumberTaken(trimmedRiderNumber, account.id)) {
        toast({
            title: 'Error',
            description: 'This rider number is already taken. Please choose another one.',
            variant: 'destructive',
        });
        return;
    }


    setIsLoading(true);
    
    try {
        await updateAccount(account.id, { riderNumber: trimmedRiderNumber });

        toast({
            title: 'Success!',
            description: 'Your rider number has been changed.',
        });

        router.push('/account');
    } catch (error) {
        console.error(error);
        toast({
            title: 'Error',
            description: 'Failed to update rider number. Please try again.',
            variant: 'destructive',
        });
    } finally {
        setIsLoading(false);
    }
  };
  
    if (!account) {
        return <div className="max-w-2xl mx-auto">Loading...</div>;
    }

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader title="Change Rider Number" />
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Update Your Rider Number</CardTitle>
            <CardDescription>
              This is the number that will be associated with your account for races.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="old-rider-number">Current Rider Number</Label>
              <Input
                id="old-rider-number"
                type="text"
                value={account?.riderNumber || 'N/A'}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-rider-number">New Rider Number</Label>
              <Input
                id="new-rider-number"
                type="text"
                value={newRiderNumber}
                onChange={(e) => setNewRiderNumber(e.target.value)}
                required
                disabled={isLoading}
                placeholder="Enter your new rider number"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
