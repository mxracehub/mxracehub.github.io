
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
import { useToast } from '@/hooks/use-toast';
import { Banknote, Loader2 } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { usePlaidLink } from '@plaid/react-plaid-link';

export default function BankingPage() {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const getLinkToken = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/create-link-token', {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to create link token');
      }
      const data = await response.json();
      if (data.error) {
         toast({
          title: 'Error',
          description: data.error,
          variant: 'destructive',
        });
        return;
      }
      setLinkToken(data.link_token);
    } catch (error) {
      console.error('Failed to fetch link token:', error);
      toast({
        title: 'Could not connect to Plaid',
        description: 'Please ensure your backend server and Plaid secrets are configured correctly.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);
  
  useEffect(() => {
    // This effect runs once on mount to fetch the link_token from your backend.
    getLinkToken();
  }, [getLinkToken]);

  const onSuccess = useCallback(async (public_token: string) => {
    // Send the public_token to your server to exchange it for an access_token.
    try {
      await fetch('/api/set-access-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_token }),
      });
      toast({
        title: 'Success!',
        description: 'Your bank account has been successfully linked.',
      });
    } catch (error) {
        toast({
            title: 'Error linking account',
            description: 'Could not link bank account. Please try again.',
            variant: 'destructive',
        });
    }
    // Re-fetch a new link token for the next time the user might want to connect.
    getLinkToken();
  }, [toast, getLinkToken]);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess,
  });

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
            <Button onClick={() => open()} disabled={!ready || loading || !linkToken}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Banknote className="mr-2 h-4 w-4" />
              )}
              {loading ? 'Initializing...' : 'Connect a Bank Account'}
            </Button>
            {!linkToken && !loading && (
                <p className="text-xs text-destructive pt-4">
                    Could not initialize Plaid. This usually means the backend is not configured correctly. Please ensure your PLAID_CLIENT_ID and PLAID_SECRET are set in your environment variables.
                </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
