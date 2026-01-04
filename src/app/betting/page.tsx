
'use client';

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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Coins, Mic, Search, Users, Calendar } from 'lucide-react';
import React from 'react';

export default function BettingPage() {
  const [betAmount, setBetAmount] = React.useState('');
  const [coinType, setCoinType] = React.useState('gold');

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader
        title="Bet"
        description="Find friends, select a race, and place your bet."
      />
      <Card>
        <CardContent className="pt-6 space-y-8">
          <div className="space-y-2">
            <Label className="text-lg font-semibold flex items-center gap-2"><Users className="w-5 h-5"/>Find a Friend</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="find-friend"
                placeholder="Search by username..."
                className="pl-10 pr-10"
              />
              <Mic className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground cursor-pointer" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-lg font-semibold flex items-center gap-2"><Calendar className="w-5 h-5" />Find an Upcoming Race</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="find-race"
                placeholder="Search by race name or track..."
                className="pl-10 pr-10"
              />
              <Mic className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground cursor-pointer" />
            </div>
          </div>

          <div className="space-y-4 rounded-lg border bg-background p-4">
             <Label className="text-lg font-semibold flex items-center gap-2"><Coins className="w-5 h-5" />Make a Bet</Label>
            
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
                        <Label htmlFor="gold" className="flex items-center gap-2 cursor-pointer rounded-md border p-3 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary">
                            Gold Coins
                        </Label>
                    </div>
                    <div>
                        <RadioGroupItem value="sweeps" id="sweeps" className="sr-only" />
                        <Label htmlFor="sweeps" className="flex items-center gap-2 cursor-pointer rounded-md border p-3 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary">
                            Sweeps Coins
                        </Label>
                    </div>
                </RadioGroup>
                 <p className="text-xs text-muted-foreground pt-2">
                Use Gold Coins for fun or Sweeps Coins for a chance to win real prizes.
              </p>
            </div>
          </div>

        </CardContent>
        <CardFooter>
            <Button size="lg" className="w-full">
                Place Bet
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
