
'use client';

import { useMemo, useState } from 'react';
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
import { accounts, exchangeRequests } from '@/lib/accounts-data';
import { Banknote, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ExchangeGoldPage() {
    // In a real app, you'd get the logged-in user's account
    const account = accounts.find(a => a.id === 'user-123');

    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const [balance, setBalance] = useState(account?.balances.gold || 0);
    
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

        if (exchangeAmount > balance) {
            toast({
                title: 'Insufficient Balance',
                description: 'You do not have enough Gold Coins to complete this exchange.',
                variant: 'destructive',
            });
            return;
        }

        setIsLoading(true);
        // Simulate API call to submit the request
        await new Promise(resolve => setTimeout(resolve, 1500));

        // In a real app, this would be handled on the backend.
        // For demonstration, we'll update the mock data directly.
        const newBalance = balance - exchangeAmount;
        setBalance(newBalance);
        account.balances.gold = newBalance;

        exchangeRequests.unshift({
            id: `ex-${Date.now()}`,
            accountId: account.id,
            accountName: account.name,
            amount: exchangeAmount,
            date: new Date().toISOString().split('T')[0],
            status: 'Pending',
        });

        setIsLoading(false);

        toast({
            title: 'Request Submitted!',
            description: `Your request to exchange ${exchangeAmount.toLocaleString()} Gold Coins has been submitted.`,
        });

        setAmount('');
    };


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
              <div className="text-4xl font-bold">{balance.toLocaleString() || '0'}</div>
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
