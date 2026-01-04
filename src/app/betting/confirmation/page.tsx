
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Home, Repeat } from 'lucide-react';
import Link from 'next/link';

export default function BetConfirmationPage() {
  return (
    <div className="mx-auto max-w-lg text-center">
      <PageHeader title="Bet Confirmed!" />
      <Card>
        <CardHeader>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
          <CardTitle className="mt-4">Your Bet has been Placed</CardTitle>
          <CardDescription>
            You will be notified of the outcome after the race is complete. Good luck!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border bg-muted/50 p-4 text-left">
            <h3 className="font-semibold">Bet Summary</h3>
            <div className="mt-2 space-y-1 text-sm text-muted-foreground">
              <p><strong>Race:</strong> Thunder Valley National</p>
              <p><strong>Bet Amount:</strong> 100 Gold Coins</p>
              <p><strong>Friend:</strong> @motofan99</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button asChild className="flex-1" variant="outline">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go to Dashboard
              </Link>
            </Button>
            <Button asChild className="flex-1">
              <Link href="/betting">
                <Repeat className="mr-2 h-4 w-4" />
                Place Another Bet
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
