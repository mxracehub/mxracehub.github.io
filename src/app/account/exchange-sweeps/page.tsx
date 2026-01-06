
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
import { Loader2, Repeat } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { updateAccount, addExchangeRequest } from '@/lib/firebase-config';
import type { Account } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useUser, useDoc } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';

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

    const [amount, setAmount] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!isUserLoading && !user) {
          router.push('/sign-in');
        }
    }, [isUserLoading, user, router]);


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
  
    const isLoading = isUserLoading || isAccountLoading;

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
                <p className="text-sm text-muted-foreground">
                  Minimum transfer amount: 50.00 Sweeps Coins.
                </p>
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
          <div className="mt-4 space-y-2 rounded-lg border bg-card p-4 text-sm text-card-foreground">
            <h4 className="font-semibold">How it works:</h4>
            <ol className="list-inside list-decimal space-y-1 text-muted-foreground">
              <li>Enter the transfer amount.</li>
              <li>Confirm the transaction.</li>
              <li>
                Your coins will appear in the Mx Exchange app instantly.
              </li>
              <li>Visit Mx Exchange for prize redemption and withdrawals.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
