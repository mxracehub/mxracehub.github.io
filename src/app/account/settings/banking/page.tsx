
'use client';

import { useState } from 'react';
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
import { Loader2 } from 'lucide-react';

export default function BankingPage() {
  const [routingNumber, setRoutingNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!routingNumber.trim() || !accountNumber.trim()) {
      toast({
        title: 'Error',
        description: 'Please fill out both routing and account numbers.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call to save banking details
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);

    toast({
      title: 'Success!',
      description: 'Your banking information has been saved securely.',
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader title="Banking Details" />
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Manage Your Payout Method</CardTitle>
            <CardDescription>
              This information is stored securely and is used for processing Gold Coin exchanges.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="routing-number">Routing Number</Label>
              <Input
                id="routing-number"
                type="text"
                value={routingNumber}
                onChange={(e) => setRoutingNumber(e.target.value)}
                required
                disabled={isLoading}
                placeholder="Enter your bank's routing number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account-number">Account Number</Label>
              <Input
                id="account-number"
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
                disabled={isLoading}
                placeholder="Enter your bank account number"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Saving...' : 'Save Banking Information'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
