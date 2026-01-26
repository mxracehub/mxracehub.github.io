
'use client';

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Banknote } from 'lucide-react';

export default function BankingPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader title="Banking Details" />
      <Card>
        <CardHeader>
          <CardTitle>Manage Your Payout Method</CardTitle>
          <CardDescription>
            Securely connect your bank account using Plaid. This allows us to process Gold Coin exchanges directly to your bank.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              We use Plaid to securely link your bank account. Your credentials are never stored on our servers.
            </p>
            <p className="text-sm font-semibold text-destructive pt-4">
                The banking connection feature is temporarily unavailable due to a technical issue with a third-party package. We are working to resolve this.
            </p>
             <Button disabled>
                <Banknote className="mr-2 h-4 w-4" />
                Connect a Bank Account (Unavailable)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
