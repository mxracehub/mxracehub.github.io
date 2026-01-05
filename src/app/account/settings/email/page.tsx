
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
import { accounts, type Account } from '@/lib/accounts-data';
import { useRouter } from 'next/navigation';

export default function ChangeEmailPage() {
  const [account, setAccount] = useState<Account | null>(null);
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

   useEffect(() => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
      const userAccount = accounts.find((a) => a.id === loggedInUserId);
      if (userAccount) {
        setAccount(userAccount);
      } else {
        router.push('/sign-in');
      }
    } else {
      router.push('/sign-in');
    }
  }, [router]);


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
    
    if (account?.password !== password) {
         toast({
            title: 'Error',
            description: 'Incorrect password.',
            variant: 'destructive',
        });
        return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update mock data
    if(account) {
        account.email = newEmail;
    }

    setIsLoading(false);

    toast({
        title: 'Success!',
        description: 'Your email has been changed successfully.',
    });

    setNewEmail('');
    setPassword('');
  };
  
    if (!account) {
        return <div className="max-w-2xl mx-auto">Loading...</div>;
    }


  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader title="Change Email" />
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Update Your Email Address</CardTitle>
            <CardDescription>
              We will send a confirmation to your new email address.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="old-email">Current Email</Label>
              <Input
                id="old-email"
                type="email"
                value={account?.email}
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
