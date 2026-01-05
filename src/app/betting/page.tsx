
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
import { Coins, Mic, Search, Users, Calendar, Layers, X, Trophy, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { motorcrossRaces } from '@/lib/races-motorcross-data';
import { supercrossRaces } from '@/lib/races-supercross-data';

const allRaces = [
    ...motorcrossRaces.map(r => ({ ...r, series: 'Motorcross' })),
    ...supercrossRaces.map(r => ({ id: `supercross-${r.round}`, name: `${r.location}`, track: r.track, date: r.date, series: 'Supercross' }))
].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());


export default function BettingPage() {
  const [betAmount, setBetAmount] = React.useState('');
  const [coinType, setCoinType] = React.useState('gold');

  const [raceSearch, setRaceSearch] = React.useState('');
  const [selectedRace, setSelectedRace] = React.useState<typeof allRaces[0] | null>(null);

  const filteredRaces = useMemo(() => {
    if (!raceSearch) return [];
    return allRaces.filter(race => 
        race.name.toLowerCase().includes(raceSearch.toLowerCase()) ||
        race.track.toLowerCase().includes(raceSearch.toLowerCase())
    ).slice(0, 5);
  }, [raceSearch]);
  
  const handleSelectRace = (race: typeof allRaces[0]) => {
      setSelectedRace(race);
      setRaceSearch('');
  }

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
                    value={raceSearch}
                    onChange={(e) => setRaceSearch(e.target.value)}
                    disabled={!!selectedRace}
                />
                <Mic className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer text-muted-foreground" />
            </div>
            {raceSearch && filteredRaces.length > 0 && (
                <div className="relative">
                    <ul className="absolute z-10 w-full bg-card border rounded-md mt-1 max-h-60 overflow-y-auto">
                        {filteredRaces.map(race => (
                            <li key={race.id} onClick={() => handleSelectRace(race)} className="px-4 py-2 hover:bg-muted cursor-pointer">
                                <p className="font-semibold">{race.name}</p>
                                <p className="text-sm text-muted-foreground">{race.track} - {race.date}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
             {selectedRace && (
                <div className="rounded-lg border bg-muted/50 p-4 flex items-center justify-between">
                    <div>
                        <p className="font-semibold flex items-center gap-2"><Trophy /> {selectedRace.name}</p>
                        <p className="text-sm text-muted-foreground">{selectedRace.track} - {selectedRace.date}</p>
                    </div>
                     <Button variant="ghost" size="icon" onClick={() => setSelectedRace(null)}>
                        <X className="h-5 w-5" />
                    </Button>
                </div>
            )}
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
                        <Label htmlFor="gold" className="flex cursor-pointer items-center gap-2 rounded-md border p-3 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground">
                            Gold Coins
                        </Label>
                    </div>
                    <div>
                        <RadioGroupItem value="sweeps" id="sweeps" className="sr-only" />
                        <Label htmlFor="sweeps" className="flex cursor-pointer items-center gap-2 rounded-md border p-3 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground">
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
        <CardFooter className="flex flex-col gap-4">
            <Button size="lg" className="w-full" asChild>
                <Link href="/betting/confirmation">Place Bet</Link>
            </Button>
             <Button size="lg" className="w-full" variant="outline" asChild>
                <Link href="/betting/parlay">
                    <Layers className="mr-2 h-4 w-4" />
                    Create Parlay Bet
                </Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
