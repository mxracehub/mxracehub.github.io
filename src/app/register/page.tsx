'use client';

import { useState } from 'react';
import Link from 'next/link';
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
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { auth, createAccount, getAccountByEmail, isUsernameTaken, isRiderNumberTaken } from '@/lib/firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import type { Account } from '@/lib/types';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [riderNumber, setRiderNumber] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
        toast({ title: 'Error', description: 'Please enter a username.', variant: 'destructive' });
        return;
    }
    if (await isUsernameTaken(username.trim())) {
        toast({ title: 'Error', description: 'This username is already taken.', variant: 'destructive' });
        return;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
        toast({ title: 'Error', description: 'Please enter a valid email.', variant: 'destructive' });
        return;
    }
     if (await getAccountByEmail(email.trim())) {
        toast({ title: 'Error', description: 'An account with this email already exists.', variant: 'destructive' });
        return;
    }
    if (password.length < 8) {
        toast({ title: 'Error', description: 'Password must be at least 8 characters long.', variant: 'destructive' });
        return;
    }
    if (password !== confirmPassword) {
        toast({ title: 'Error', description: 'Passwords do not match.', variant: 'destructive' });
        return;
    }
    if (riderNumber.trim() && await isRiderNumberTaken(riderNumber.trim())) {
        toast({ title: 'Error', description: 'This rider number is already taken.', variant: 'destructive' });
        return;
    }
    if (!agreed) {
        toast({ title: 'Error', description: 'You must agree to the Terms of Service and Privacy Policy.', variant: 'destructive' });
        return;
    }
    
    setIsLoading(true);

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const newAccountData: Omit<Account, 'id'> = {
            name: username,
            username: username.trim(),
            email: email.trim(),
            bio: '',
            balances: { gold: 0, sweeps: 0 },
            betHistory: [],
            friendIds: [],
            riderNumber: riderNumber.trim() || '',
            mxhubStanding: 0,
        };

        await createAccount(user.uid, newAccountData);

        toast({
            title: 'Account Created!',
            description: "Welcome! We're redirecting you to the sign-in page.",
        });

        router.push('/sign-in');

    } catch (error: any) {
        console.error("Registration failed:", error);
        toast({
            title: 'Registration Failed',
            description: error.message || 'An unexpected error occurred. Please try again.',
            variant: 'destructive',
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <PageHeader
        title="Registration"
        description="Create your MxHub account."
      />
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rider-number">Rider Number</Label>
              <Input
                id="rider-number"
                placeholder="e.g., 7"
                value={riderNumber}
                onChange={(e) => setRiderNumber(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
              <p className="text-xs text-muted-foreground">Password must be at least 8 characters.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} disabled={isLoading} />
                <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                   I agree to the <Link href="/policies" className="text-primary underline">Terms of Service</Link> and <Link href="/policies" className="text-primary underline">Privacy Policy</Link>
                </label>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
                {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <>
                        Create Account <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                )}
            </Button>
          </CardFooter>
        </Card>
      </form>
       <p className="mt-4 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link
          href="/sign-in"
          className="font-semibold text-primary hover:underline"
        >
          Sign in here
        </Link>
      </p>
    </div>
  );
}
