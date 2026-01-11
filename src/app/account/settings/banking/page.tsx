
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
import { Banknote, Loader2 } from 'lucide-react';

export default function BankingPage() {

  // In a real application, you would fetch a link_token from your secure server.
  // The server would use your Plaid client_id and secret to create this token.
  // This is a placeholder for demonstration purposes as we cannot handle secrets.
  const linkToken = null; 

  const handleConnectBank = () => {
    // In a real app, you would use the Plaid Link library here, which would
    // be initialized with the link_token fetched from your server.
    // Since this is a demo, we will just show an alert.
    alert("This would open the Plaid Link interface to securely connect a bank account.");
  };

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
            <Button onClick={handleConnectBank} disabled={!linkToken}>
                <Banknote className="mr-2" />
                {linkToken ? 'Connect a Bank Account' : 'Loading...'}
            </Button>
            <p className="text-xs text-muted-foreground pt-4">
                Note: This is a demonstration. A real implementation would require a secure server to generate a `link_token` for Plaid Link. Since I cannot handle backend secrets, the button is disabled.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
