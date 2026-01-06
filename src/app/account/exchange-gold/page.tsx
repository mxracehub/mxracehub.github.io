
'use client';

import { useMemo, useState, useEffect } from 'react';
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
import { getAccountById, updateAccount, addExchangeRequest } from '@/lib/firebase-config';
import type { Account } from '@/lib/types';
import { Banknote, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function ExchangeGoldPage() {
    const [account, setAccount] = useState<Account | null>(null);
    const router = useRouter();

    useEffect(() => {
        const loggedInUserId = localStorage.getItem('loggedInUserId');
        if (loggedInUserId) {
          getAccountById(loggedInUserId).then(userAccount => {
              if (userAccount) {
                  setAccount(userAccount);
              } else {
                  router.push('/sign-in');
              }
          });
        } else {
          router.push('/sign-in');
        }
      }, [router]);

    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    
    const exchangeValueUSD = useMemo(() => {
        const numericAmount = Number(amount);
        if (numericAmount > 0) {
            return (numericAmount / 100).toFixed(2);
        }
        return '0.00';
    }, [amount]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const exchangeAmount = Number(amount);

        if (!account) {
             toast({
                title: 'Error',
                description: 'Could not find user account.',
                variant: 'destructive',
            });
            return;
        }

        if (!exchangeAmount || exchangeAmount <= 0) {
            toast({
                title: 'Invalid Amount',
                description: 'Please enter a valid amount to exchange.',
                variant: 'destructive',
            });
            return;
        }

        if (exchangeAmount > account.balances.gold) {
            toast({
                title: 'Insufficient Balance',
                description: 'You do not have enough Gold Coins to complete this exchange.',
                variant: 'destructive',
            });
            return;
        }

        setIsLoading(true);
        
        try {
            const newBalance = account.balances.gold - exchangeAmount;
            
            await updateAccount(account.id, { balances: { ...account.balances, gold: newBalance } });

            await addExchangeRequest({
                accountId: account.id,
                accountName: account.name,
                amount: exchangeAmount,
                date: new Date().toISOString().split('T')[0],
                status: 'Pending',
            });
            
            // Optimistically update the UI
            setAccount(prev => prev ? { ...prev, balances: { ...prev.balances, gold: newBalance }} : null);

            toast({
                title: 'Request Submitted!',
                description: `Your request to exchange ${exchangeAmount.toLocaleString()} Gold Coins has been submitted.`,
            });
            setAmount('');
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'Failed to submit exchange request. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

  if (!account) {
      return <div>Loading...</div>
  }


  return (
    <div>
      <PageHeader
        title="Gold Coin Exchange"
        description="Exchange your Gold Coins back to your original payment method."
      />
      <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle>Redeem Gold Coins</CardTitle>
                  <CardDescription>
                    Enter the amount of Gold Coins you wish to exchange. Funds will be returned to your original payment method within 3-5 business days. 100 Gold Coins = $1.00 USD
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount to Exchange (GC)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="e.g., 5000"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                  </div>
                   <div className="rounded-lg border bg-muted/50 p-4">
                        <h3 className="font-semibold">Exchange Value</h3>
                        <p className="mt-1 text-2xl font-bold">${exchangeValueUSD}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                            There are no fees for exchanging Gold Coins.
                        </p>
                    </div>
                </CardContent>
                <CardFooter>
                  <Button size="lg" type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Banknote className="mr-2 h-4 w-4" />
                    )}
                    {isLoading ? 'Submitting...' : 'Submit Exchange Request'}
                  </Button>
                </CardFooter>
              </Card>
          </form>
        </div>

        <div className="lg:col-span-2">
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle>Your Gold Coin Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{account.balances.gold.toLocaleString() || '0'}</div>
              <div className="text-muted-foreground">Gold Coins</div>
            </CardContent>
          </Card>
          <div className="mt-4 space-y-2 rounded-lg border bg-card p-4 text-sm text-card-foreground">
            <h4 className="font-semibold">How it works:</h4>
            <ol className="list-inside list-decimal space-y-1 text-muted-foreground">
              <li>Enter the exchange amount.</li>
              <li>Confirm your request.</li>
              <li>Your Gold Coin balance will be updated immediately.</li>
              <li>
                Funds will be processed and returned to your original payment source.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
