
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
import { auth } from '@/firebase';
import type { Account } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail } from 'firebase/auth';
import { useUser, useDoc } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';

function ChangeEmailSkeleton() {
    return (
        <div className="max-w-2xl mx-auto">
            <PageHeader title="Change Email" />
            <Card>
                <CardHeader>
                    <CardTitle>Update Your Email Address</CardTitle>
                    <CardDescription>
                    We will send a confirmation to your new email address. This requires you to re-enter your password.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="old-email">Current Email</Label>
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-email">New Email</Label>
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
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

export default function ChangeEmailPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, isLoading: isUserLoading } = useUser();
  const { data: account, isLoading: isAccountLoading } = useDoc<Account>('accounts', user?.uid || '---');

  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/sign-in');
    }
  }, [isUserLoading, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim() || !/^\S+@\S+\.\S+$/.test(newEmail)) {
        toast({
            title: 'Error',
            description: 'Please enter a valid email address.',
            variant: 'destructive',
        });
        return;
    }
    if (!password) {
        toast({
            title: 'Error',
            description: 'Please enter your password to confirm.',
            variant: 'destructive',
        });
        return;
    }
    
    if (!auth.currentUser || !account) {
        toast({
            title: 'Error',
            description: 'You must be signed in to change your email.',
            variant: 'destructive',
        });
        return;
    }

    setIsLoading(true);

    try {
        const credential = EmailAuthProvider.credential(account.email, password);
        await reauthenticateWithCredential(auth.currentUser, credential);
        
        await updateEmail(auth.currentUser, newEmail);
        await updateAccount(account.id, { email: newEmail });

        toast({
            title: 'Success!',
            description: 'Your email has been changed successfully.',
        });

        setNewEmail('');
        setPassword('');
        
        // No need to set account state, useDoc will handle it

    } catch (error: any) {
        console.error("Email update failed:", error);
        toast({
            title: 'Error updating email',
            description: error.code === 'auth/wrong-password' 
                ? 'Incorrect password.'
                : 'An error occurred. Please try again.',
            variant: 'destructive',
        });
    } finally {
        setIsLoading(false);
    }
  };
  
    const pageIsLoading = isUserLoading || isAccountLoading;

    if (pageIsLoading) {
        return <ChangeEmailSkeleton />;
    }
    
    if (!account) {
        return <div className="max-w-2xl mx-auto">Account data could not be loaded.</div>;
    }


  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader title="Change Email" />
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Update Your Email Address</CardTitle>
            <CardDescription>
              We will send a confirmation to your new email address. This requires you to re-enter your password.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="old-email">Current Email</Label>
              <Input
                id="old-email"
                type="email"
                value={account.email}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-email">New Email</Label>
              <Input
                id="new-email"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
                disabled={isLoading}
                placeholder="Enter your new email"
              />
            </div>
             <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                placeholder="Enter password to confirm"
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
