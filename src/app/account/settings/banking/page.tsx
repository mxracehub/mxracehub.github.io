
'use client';

import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export default function BankingPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader title="Banking Details" />
      <Card>
        <CardHeader>
          <CardTitle>Manage Your Payout Method</CardTitle>
          <CardDescription>
            Securely connect your bank account to process exchanges.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Feature Temporarily Unavailable</AlertTitle>
              <AlertDescription>
                We are currently experiencing issues with our banking integration and have temporarily disabled this feature. We apologize for the inconvenience and are working to resolve it as soon as possible.
              </AlertDescription>
            </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
