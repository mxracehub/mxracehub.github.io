
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
import { accounts } from '@/lib/accounts-data';
import { Banknote } from 'lucide-react';

export default function ExchangeGoldPage() {
    const account = accounts.find(a => a.id === 'user-123');

  return (
    <div>
      <PageHeader
        title="Gold Coin Exchange"
        description="Exchange your Gold Coins back to your original payment method."
      />
      <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Redeem Gold Coins</CardTitle>
              <CardDescription>
                Enter the amount of Gold Coins you wish to exchange. Funds will be returned to your original payment method within 3-5 business days.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount to Exchange</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="e.g., 5000"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                There are no fees for exchanging Gold Coins.
              </p>
            </CardContent>
            <CardFooter>
              <Button size="lg">
                <Banknote className="mr-2 h-4 w-4" />
                Submit Exchange Request
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle>Your Gold Coin Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{account?.balances.gold.toLocaleString() || '0'}</div>
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
