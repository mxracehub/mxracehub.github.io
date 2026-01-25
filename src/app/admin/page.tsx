'use client';

import { useEffect } from 'react';
import { useUser, useDoc } from '@/firebase';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SummarizerForm } from '@/components/admin/summarizer-form';
import { ExchangeRequestsTable } from '@/components/admin/exchange-requests-table';
import { RefundRequestsTable } from '@/components/admin/refund-requests-table';
import type { Account } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { settleAllPlays } from '@/ai/flows/settle-plays-flow';
import { SettlementHistoryTable } from '@/components/admin/settlement-history-table';
import { RacesManager } from '@/components/admin/races-manager';
import { RidersManager } from '@/components/admin/riders-manager';
import { ResultsManager } from '@/components/admin/results-manager';


function AdminPageSkeleton() {
  return (
    <div>
      <PageHeader
        title="Admin Panel"
        description="Manage application data and utilize AI tools."
      />
      <div className="flex items-center justify-center pt-16">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="ml-4">Verifying admin access...</p>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, isLoading: isUserLoading } = useUser();
  const { data: account, isLoading: isAccountLoading } = useDoc<Account>('accounts', user?.uid || '---');

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/sign-in');
    }
    
    if (!isAccountLoading && account && !account.isAdmin) {
        // If the user is logged in but is not an admin, redirect them
        router.push('/'); 
    }
  }, [isUserLoading, user, isAccountLoading, account, router]);
  
  useEffect(() => {
    if (account?.isAdmin && user) {
      settleAllPlays({ triggeredBy: `admin-login: ${user.email}` }).then(result => {
        if (result.settledPlays > 0) {
          toast({
            title: 'Automatic Play Settlement',
            description: `${result.settledPlays} plays were settled across ${result.updatedAccounts} accounts.`,
          });
        }
        console.log('Automatic settlement check complete.', result);
      }).catch(error => {
        console.error('Automatic settlement failed:', error);
        toast({
          variant: 'destructive',
          title: 'Auto-Settlement Error',
          description: 'An error occurred during the automatic play settlement process.',
        });
      });
    }
  }, [account, toast, user]);


  const isLoading = isUserLoading || isAccountLoading;

  if (isLoading) {
    return <AdminPageSkeleton />;
  }

  if (!account?.isAdmin) {
     // Render a message while redirecting or if redirect fails
     return (
        <div className="flex flex-col items-center justify-center pt-16">
            <h2 className="text-2xl font-bold">Access Denied</h2>
            <p className="mt-2 text-muted-foreground">You do not have permission to view this page.</p>
            <Button onClick={() => router.push('/')} className="mt-4">Go to Homepage</Button>
        </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Admin Panel"
        description="Manage application data and utilize AI tools."
      />
      <Tabs defaultValue="races" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="races">Races</TabsTrigger>
          <TabsTrigger value="riders">Riders</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="exchange-requests">Exchange Requests</TabsTrigger>
          <TabsTrigger value="refund-requests">Refund Requests</TabsTrigger>
          <TabsTrigger value="settlement-history">Settlement History</TabsTrigger>
          <TabsTrigger value="ai-summarizer">AI Summarizer</TabsTrigger>
        </TabsList>

        <TabsContent value="races">
          <RacesManager />
        </TabsContent>
        <TabsContent value="riders">
          <RidersManager />
        </TabsContent>
        <TabsContent value="results">
            <ResultsManager />
        </TabsContent>
        
        <TabsContent value="exchange-requests">
          <Card>
            <CardHeader>
              <CardTitle>Coin Exchange Requests</CardTitle>
              <CardDescription>
                Review and process user requests to exchange Gold & Sweeps Coins.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ExchangeRequestsTable />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="refund-requests">
          <Card>
            <CardHeader>
              <CardTitle>Gold Coin Refund Requests</CardTitle>
              <CardDescription>
                Review and process user requests to refund Gold Coin purchases.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RefundRequestsTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settlement-history">
          <Card>
            <CardHeader>
              <CardTitle>Play Settlement History</CardTitle>
              <CardDescription>
                A log of all automatic play settlement executions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SettlementHistoryTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-summarizer">
          <SummarizerForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
