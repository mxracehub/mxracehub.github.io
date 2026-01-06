
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
import { updateAccount } from '@/lib/firebase-config';
import type { Account } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useUser, useDoc } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';

function ChangeNameSkeleton() {
    return (
        <div className="max-w-2xl mx-auto">
            <PageHeader title="Change Account Name" />
            <Card>
                <CardHeader>
                    <CardTitle>Update Your Account Name</CardTitle>
                    <CardDescription>
                    This is the name that will be displayed on your public profile.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="old-name">Current Account Name</Label>
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-name">New Account Name</Label>
                        <Skeleton className="h-10 w-full" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Skeleton className="h-10 w-28" />
                </CardFooter>
            </Card>
        </div>
    )
}

export default function ChangeNamePage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, isLoading: isUserLoading } = useUser();
  const { data: account, isLoading: isAccountLoading } = useDoc<Account>('accounts', user?.uid || '---');
  
  const [newName, setNewName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/sign-in');
    }
    if (account) {
      setNewName(account.name);
    }
  }, [isUserLoading, user, router, account]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      toast({
        title: 'Error',
        description: 'New name cannot be empty.',
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

    setIsLoading(true);
    
    try {
        await updateAccount(account.id, { name: newName.trim() });

        toast({
            title: 'Success!',
            description: 'Your account name has been changed.',
        });

        router.push('/account');

    } catch (error) {
        console.error(error);
        toast({
            title: 'Error',
            description: 'Failed to update name. Please try again.',
            variant: 'destructive',
        });
    } finally {
        setIsLoading(false);
    }
  };

  const pageIsLoading = isUserLoading || isAccountLoading;

  if (pageIsLoading) {
    return <ChangeNameSkeleton />;
  }

  if (!account) {
    return <div className="max-w-2xl mx-auto">Account data could not be loaded.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader title="Change Account Name" />
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Update Your Account Name</CardTitle>
            <CardDescription>
              This is the name that will be displayed on your public profile.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="old-name">Current Account Name</Label>
              <Input
                id="old-name"
                type="text"
                value={account.name}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-name">New Account Name</Label>
              <Input
                id="new-name"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
                disabled={isLoading}
                placeholder="Enter your new account name"
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
