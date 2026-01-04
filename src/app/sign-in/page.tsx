
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
import { Checkbox } from '@/components/ui/checkbox';

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
    setIsLoading(false);

    toast({
        title: 'Signed In!',
        description: "Welcome back! We're redirecting you to your account.",
    });

    router.push('/account');
  };

  return (
    <div className="max-w-md mx-auto">
      <PageHeader
        title="Sign In"
        description="Access your MxHub account."
      />
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Enter your credentials to sign in.</CardDescription>
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Checkbox id="remember-me" />
                    <label
                        htmlFor="remember-me"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Remember me
                    </label>
                </div>
                <Link href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
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
        </Card>
      </form>
       <p className="mt-4 text-center text-sm text-muted-foreground">
        Don't have an account?{' '}
        <Link
          href="/register"
          className="font-semibold text-primary hover:underline"
        >
          Register here
        </Link>
      </p>
    </div>
  );
}
