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
import { Repeat } from 'lucide-react';

export default function ExchangePage() {
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
                Enter the amount of Sweeps Coins you wish to send to your linked
                Mx Exchange account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount to Transfer</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="e.g., 100"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Minimum transfer amount: 50.00 Sweeps Coins.
              </p>
            </CardContent>
            <CardFooter>
              <Button size="lg">
                <Repeat className="mr-2 h-4 w-4" />
                Transfer to Mx Exchange
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle>Your Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">250.75</div>
              <div className="text-muted-foreground">Sweeps Coins</div>
            </CardContent>
          </Card>
          <div className="mt-4 space-y-2 rounded-lg border bg-card p-4 text-sm text-card-foreground">
            <h4 className="font-semibold">How it works:</h4>
            <ol className="list-inside list-decimal space-y-1 text-muted-foreground">
              <li>Enter the transfer amount.</li>
              <li>Confirm the transaction.</li>
              <li>Your coins will appear in the Mx Exchange app instantly.</li>
              <li>
                Visit Mx Exchange for prize redemption and withdrawals.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
