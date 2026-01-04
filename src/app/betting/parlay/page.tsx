
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Layers } from 'lucide-react';
import Image from 'next/image';

export default function ParlayBetPage() {
  const parlayImage = PlaceHolderImages.find((p) => p.id === 'race-banner-1');

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Parlay Bet" />
      
      {parlayImage && (
        <div className="mb-8 overflow-hidden rounded-lg">
          <Image
            src={parlayImage.imageUrl}
            alt={parlayImage.description}
            width={800}
            height={300}
            className="w-full object-cover"
            data-ai-hint={parlayImage.imageHint}
          />
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Create Your Parlay</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="first-race-date">First Race Date</Label>
              <Input id="first-race-date" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parlay-race-date">Parlay Race Date</Label>
              <Input id="parlay-race-date" type="date" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="account-name">Your Account Name</Label>
            <Input id="account-name" placeholder="e.g., @johndoe" />
          </div>
           <div className="space-y-2">
            <Label htmlFor="friend-account-name">Friend's Account Name</Label>
            <Input id="friend-account-name" placeholder="e.g., @janesmith" />
          </div>
           <div className="space-y-2">
            <Label htmlFor="second-bet-value">Second Bet Value</Label>
            <Input id="second-bet-value" type="number" placeholder="Enter amount" />
          </div>

          <div className="rounded-lg border bg-muted/50 p-4">
            <h3 className="font-semibold">Total Win Value</h3>
            <p className="mt-1 text-2xl font-bold">--</p>
            <p className="text-xs text-muted-foreground mt-2">
                Parlay bets are doubled by the second bet value and winnings from first race bet value.
            </p>
          </div>

        </CardContent>
        <CardFooter>
          <Button size="lg" className="w-full">
            <Layers className="mr-2 h-4 w-4" />
            Bet this Parlay Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
