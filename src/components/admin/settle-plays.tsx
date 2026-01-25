
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { settleAllPlays } from '@/ai/flows/settle-plays-flow';
import { Loader2, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function SettlePlays() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSettlePlays = async () => {
    setIsLoading(true);
    try {
      const result = await settleAllPlays();
      toast({
        title: 'Settlement Complete',
        description: `${result.settledPlays} plays were settled across ${result.updatedAccounts} accounts.`,
      });
    } catch (error) {
      console.error('Settlement failed:', error);
      toast({
        title: 'Error',
        description: 'Failed to settle plays. Please check the console for details.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settle Pending Plays</CardTitle>
        <CardDescription>
          This tool will scan all user accounts for pending plays on past races and automatically settle them based on the results data. This process can take a few moments.
        </CardDescription>
      </CardHeader>
      <CardContent>
          <p className="text-sm text-muted-foreground">
              Click the button below to start the settlement process. This should be run periodically to ensure all plays are up-to-date.
          </p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSettlePlays} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Zap className="mr-2 h-4 w-4" />
          )}
          {isLoading ? 'Settling Plays...' : 'Run Play Settlement'}
        </Button>
      </CardFooter>
    </Card>
  );
}
