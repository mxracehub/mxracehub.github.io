
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
import { useToast } from '@/hooks/use-toast';
import { Loader2, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { accounts } from '@/lib/accounts-data';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
        toast({ title: 'Error', description: 'Please enter a valid email.', variant: 'destructive' });
        return;
    }
    if (!password) {
        toast({ title: 'Error', description: 'Please enter your password.', variant: 'destructive' });
        return;
    }

    setIsLoading(true);
    // Simulate API call for sign-in
    await new Promise(resolve => setTimeout(resolve, 1500));

    // NOTE: This is a mock authentication. In a real app, do not store passwords in plaintext.
    const userAccount = accounts.find(account => account.email === email && account.password === password);

    setIsLoading(false);

    if (userAccount) {
        localStorage.setItem('loggedInUserId', userAccount.id);
        toast({
            title: 'Signed In!',
            description: "Welcome back! We're redirecting you to your account.",
        });
        router.push('/account');
    } else {
        toast({
            title: 'Sign-in Failed',
            description: 'Invalid email or password. Please try again or register for a new account.',
            variant: 'destructive'
        });
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <PageHeader
        title="Sign In"
      />
      <Tabs defaultValue="sign-in" className="w-full">
        <Card>
            <CardHeader>
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="sign-in">Sign In</TabsTrigger>
                    <TabsTrigger value="register" onClick={() => router.push('/register')}>Register</TabsTrigger>
                </TabsList>
            </CardHeader>
            <TabsContent value="sign-in">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle>Welcome Back</CardTitle>
                        <CardDescription>Sign in to access your account, place bets, and more.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
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
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            required
                        />
                    </div>
                     <div className="flex items-center justify-end">
                        <Link href="#" className="text-sm text-primary hover:underline">
                            Forgot Password?
                        </Link>
                    </div>
                    </CardContent>
                    <CardFooter>
                    <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <>
                                Sign In <LogIn className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                    </CardFooter>
                </form>
            </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
}
