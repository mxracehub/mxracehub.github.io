
'use client';

import { useState, useEffect, useMemo } from 'react';
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
import { Loader2, Repeat } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { updateAccount, addExchangeRequest } from '@/lib/firebase-config';
import type { Account, ExchangeRequest } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useUser, useDoc, useCollection } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';

function ExchangeSweepsSkeleton() {
    return (
      <div>
        <PageHeader
          title="Sweeps Coin Exchange"
          description="Transfer your Sweeps Coins to the Mx Exchange app for redemption."
        />
        <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Initiate Transfer</CardTitle>
                <CardDescription>
                  Enter the amount of Sweeps Coins you wish to send to your
                  linked Mx Exchange account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount to Transfer</Label>
                  <Skeleton className="h-10 w-full" />
                </div>
                 <div className="rounded-lg border bg-muted/50 p-4">
                    <h3 className="font-semibold">Redemption Value</h3>
                    <Skeleton className="h-8 w-24 mt-1" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Minimum transfer amount: 50.00 Sweeps Coins.
                </p>
              </CardContent>
              <CardFooter>
                 <Skeleton className="h-11 w-52" />
              </CardFooter>
            </Card>
          </div>
          <div className="lg:col-span-2">
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle>Your Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-32" />
                <div className="text-muted-foreground mt-1">Sweeps Coins</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
}

export default function ExchangeSweepsPage() {
    const router = useRouter();
    const { toast } = useToast();
    const { user, isLoading: isUserLoading } = useUser();
    const { data: account, isLoading: isAccountLoading } = useDoc<Account>('accounts', user?.uid || '---');
    const { data: monthlyRequests, isLoading: isRequestsLoading } = useCollection<ExchangeRequest>(
        'exchangeRequests',
        user ? ['accountId', '==', user.uid] : undefined,
        { listen: true }
    );

    const [amount, setAmount] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!isUserLoading && !user) {
          router.push('/sign-in');
        }
    }, [isUserLoading, user, router]);

    const exchangeValueUSD = useMemo(() => {
        const numericAmount = Number(amount);
        if (numericAmount > 0) {
            return (numericAmount / 100).toFixed(2);
        }
        return '0.00';
    }, [amount]);
    
    const monthlyRedeemedUSD = useMemo(() => {
        if (!monthlyRequests) return 0;

        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        return monthlyRequests
            .filter(req => {
                const reqDate = new Date(req.date);
                return req.type === 'Sweeps Coin' &&
                       req.status === 'Approved' &&
                       reqDate.getMonth() === currentMonth &&
                       reqDate.getFullYear() === currentYear;
            })
            .reduce((sum, req) => sum + (req.amount / 100), 0);
    }, [monthlyRequests]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const transferAmount = Number(amount);

    if (!account || !user) {
      toast({
        title: 'Error',
        description: 'Could not find user account. Please sign in again.',
        variant: 'destructive',
      });
      router.push('/sign-in');
      return;
    }
    
    if (account.state === 'FL') {
        const floridaLimitUSD = 5000;
        const transferAmountUSD = transferAmount / 100;
        if (monthlyRedeemedUSD + transferAmountUSD > floridaLimitUSD) {
            toast({
                title: 'Florida Redemption Limit',
                description: `You have reached your monthly redemption limit of $${floridaLimitUSD.toLocaleString()}. You have already redeemed $${monthlyRedeemedUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} this month.`,
                variant: 'destructive',
            });
            return;
        }
    }


    if (!transferAmount || transferAmount <= 0) {
      toast({
        title: 'Invalid Amount',
        description: 'Please enter a valid amount to transfer.',
        variant: 'destructive',
      });
      return;
    }
    
    if (transferAmount < 50) {
        toast({
            title: 'Minimum Amount',
            description: 'The minimum transfer amount is 50 Sweeps Coins.',
            variant: 'destructive',
        });
        return;
    }

    if (transferAmount > account.balances.sweeps) {
      toast({
        title: 'Insufficient Balance',
        description:
          'You do not have enough Sweeps Coins to complete this transfer.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
        const newBalance = account.balances.sweeps - transferAmount;
        await updateAccount(user.uid, { balances: { ...account.balances, sweeps: newBalance } });

        await addExchangeRequest({
            accountId: user.uid,
            accountName: account.name,
            amount: transferAmount,
            date: new Date().toISOString().split('T')[0],
            status: 'Pending',
            type: 'Sweeps Coin',
        });

        toast({
          title: 'Transfer Submitted!',
          description: `Your request to transfer ${transferAmount.toLocaleString()} Sweeps Coins has been submitted.`,
        });

        router.push('/account/transactions');

    } catch(error) {
        console.error(error);
        toast({
            title: 'Error',
            description: 'Failed to submit transfer request. Please try again.',
            variant: 'destructive',
        });
    } finally {
        setIsSubmitting(false);
    }
  };
  
    const isLoading = isUserLoading || isAccountLoading || isRequestsLoading;

    if (isLoading) {
        return <ExchangeSweepsSkeleton />
    }

    if (!account) {
        return <div>Account not found. Please try again later.</div>
    }


  return (
    <div>
      <PageHeader
        title="Sweeps Coin Exchange"
        description="Transfer your Sweeps Coins to the Mx Exchange app for redemption."
      />
      <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Initiate Transfer</CardTitle>
                <CardDescription>
                  Enter the amount of Sweeps Coins you wish to send to your
                  linked Mx Exchange account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount to Transfer</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="e.g., 100"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={isSubmitting}
                    required
                  />
                </div>
                 <div className="rounded-lg border bg-muted/50 p-4">
                    <h3 className="font-semibold">Redemption Value</h3>
                    <p className="mt-1 text-2xl font-bold">${exchangeValueUSD}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                        100 Sweeps Coins = $1.00 USD.
                    </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Minimum transfer amount: 50.00 Sweeps Coins.
                </p>
                 {account?.state === 'FL' && (
                    <div className="rounded-lg border bg-yellow-900/50 p-4 text-sm mt-4">
                        <h4 className="font-semibold text-yellow-300">Florida Redemption Limit</h4>
                        <p className="text-muted-foreground mt-1">
                            You have redeemed ${monthlyRedeemedUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} of your $5,000.00 monthly limit.
                        </p>
                        <Progress value={(monthlyRedeemedUSD / 5000) * 100} className="mt-2 h-2" />
                    </div>
                )}
              </CardContent>
              <CardFooter>
                <Button size="lg" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Repeat className="mr-2 h-4 w-4" />
                  )}
                  {isSubmitting
                    ? 'Transferring...'
                    : 'Transfer to Mx Exchange'}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>

        <div className="lg:col-span-2">
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle>Your Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{account.balances.sweeps.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <div className="text-muted-foreground">Sweeps Coins</div>
            </CardContent>
          </Card>
          <Card className="mt-4">
            <CardHeader>
                <CardTitle className="text-base font-semibold">How it works:</CardTitle>
            </CardHeader>
            <CardContent>
                <ol className="list-inside list-decimal space-y-1 text-sm text-muted-foreground">
                  <li>Enter the transfer amount on this page.</li>
                  <li>Confirm the internal transaction.</li>
                  <li>
                    Your coins will be sent to the exchange system.
                  </li>
                  <li>Use the link below to visit Mx Exchange to complete your redemption.</li>
                </ol>
            </CardContent>
            <CardFooter>
                 <Button asChild className="w-full" variant="secondary">
                    <Link href="https://mx-exchange.example.com" target="_blank">Go to Mx Exchange</Link>
                </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
