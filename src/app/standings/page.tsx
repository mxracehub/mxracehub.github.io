
'use client';

import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { supercrossRaces } from '@/lib/races-supercross-data';
import { motocrossRaces } from '@/lib/races-motocross-data';
import { useMemo } from 'react';


const playoffsData = [
  {
    id: 'playoff-1',
    name: 'Playoff 1',
    location: 'Columbus, OH',
    date: 'Sep 12, 2026',
    series: 'Playoffs',
    track: 'Unknown Track',
  },
  {
    id: 'playoff-2',
    name: 'Playoff 2',
    location: 'Carson, CA',
    date: 'Sep 19, 2026',
    series: 'Playoffs',
    track: 'Unknown Track',
  },
  {
    id: 'smx-final',
    name: 'SMX World Championship Final',
    location: 'Ridgedale, MO',
    date: 'Sep 26, 2026',
    series: 'Playoffs',
    track: 'Unknown Track',
  },
];


export default function StandingsPage() {
  const { sxRaces, mxRaces } = useMemo(() => {
    const sxRaces = supercrossRaces.map((race) => ({
      id: race.round.toString(),
      name: `${race.location}`,
      track: race.track,
      date: race.date,
      series: 'Supercross',
    }));

    const mxRaces = motocrossRaces.map((race) => ({
      id: race.id,
      name: race.name,
      track: race.track,
      date: `${race.date}, 2026`,
      series: 'Motorcross',
    }));

    return { sxRaces, mxRaces };
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <PageHeader
        title="Race Schedule & Standings"
        description="View the schedule for all series and link to race results."
      />

        <Card>
            <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-bold">Manufacturers Championship</h3>
                <p className="text-sm text-muted-foreground">
                    View the 2026 SX Manufacturers Championship Series Points.
                </p>
              </div>
              <Button asChild>
                <Link href={`/standings/manufacturers`}>View Standings</Link>
              </Button>
            </CardContent>
        </Card>

      <div className="space-y-4">
        {sxRaces.map((race) => (
          <Card key={`${race.series}-${race.id}`}>
            <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex-1 text-center sm:text-left">
                <p
                  className={`text-sm font-bold ${
                    race.series === 'Supercross'
                      ? 'text-blue-400'
                      : 'text-red-400'
                  }`}
                >
                  {race.series.toUpperCase()}
                </p>
                <h3 className="text-lg font-bold">{race.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {race.track} - {race.date}
                </p>
              </div>
              <Button asChild>
                <Link href={`/races/${race.id}/results`}>View Results</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
        {mxRaces.map((race) => (
          <Card key={`${race.series}-${race.id}`}>
            <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex-1 text-center sm:text-left">
                <p
                  className={`text-sm font-bold ${
                    race.series === 'Supercross'
                      ? 'text-blue-400'
                      : 'text-red-400'
                  }`}
                >
                  {race.series.toUpperCase()}
                </p>
                <h3 className="text-lg font-bold">{race.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {race.track} - {race.date}
                </p>
              </div>
              <Button asChild>
                <Link href={`/races/${race.id}/results`}>View Results</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
         {playoffsData.map((race) => (
          <Card key={`${race.series}-${race.id}`}>
            <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex-1 text-center sm:text-left">
                <p
                  className="text-sm font-bold text-yellow-400"
                >
                  {race.series.toUpperCase()}
                </p>
                <h3 className="text-lg font-bold">{race.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {race.location} - {race.date}
                </p>
              </div>
              <Button asChild>
                <Link href={`/races/${race.id}/results`}>View Results</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
