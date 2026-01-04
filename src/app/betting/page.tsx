
'use client';

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Coins, Mic, Search, Users, Calendar } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function BettingPage() {
  const [betAmount, setBetAmount] = React.useState('');
  const [coinType, setCoinType] = React.useState('gold');

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader
        title="Bet"
        description="Find friends, select a race, and place your bet."
      />
      <Card>
        <CardContent className="space-y-8 pt-6">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-lg font-semibold"><Users className="h-5 w-5"/>Find a Friend</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="find-friend"
                placeholder="Search by username..."
                className="pl-10 pr-10"
              />
              <Mic className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer text-muted-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-lg font-semibold"><Calendar className="h-5 w-5" />Find an Upcoming Race</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="find-race"
                placeholder="Search by race name or track..."
                className="pl-10 pr-10"
              />
              <Mic className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-4 rounded-lg border bg-background p-4">
             <Label className="flex items-center gap-2 text-lg font-semibold"><Coins className="h-5 w-5" />Make a Bet</Label>
            
            <div className="space-y-2">
                <Label htmlFor="bet-amount">Bet Amount</Label>
                <Input
                id="bet-amount"
                type="number"
                placeholder="Enter amount"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                />
            </div>

            <div className="space-y-2">
                <Label>Coin Type</Label>
                <RadioGroup defaultValue="gold" value={coinType} onValueChange={setCoinType} className="flex gap-4">
                    <div>
                        <RadioGroupItem value="gold" id="gold" className="sr-only" />
                        <Label htmlFor="gold" className="data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground flex cursor-pointer items-center gap-2 rounded-md border p-3">
                            Gold Coins
                        </Label>
                    </div>
                    <div>
                        <RadioGroupItem value="sweeps" id="sweeps" className="sr-only" />
                        <Label htmlFor="sweeps" className="data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground flex cursor-pointer items-center gap-2 rounded-md border p-3">
                            Sweeps Coins
                        </Label>
                    </div>
                </RadioGroup>
                 <p className="pt-2 text-xs text-muted-foreground">
                Use Gold Coins for fun or Sweeps Coins for a chance to win real prizes.
              </p>
            </div>
          </div>

        </CardContent>
        <CardFooter>
            <Button size="lg" className="w-full" asChild>
                <Link href="/betting/confirmation">Place Bet</Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
