
'use client';

import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { supercrossRaces } from '@/lib/races-supercross-data';
import { motorcrossRaces } from '@/lib/races-motorcross-data';
import { useMemo } from 'react';

export default function StandingsPage() {
  const allRaces = useMemo(() => {
    const sxRaces = supercrossRaces.map((race) => ({
      id: race.round.toString(),
      name: `${race.location}`,
      track: race.track,
      date: race.date,
      series: 'Supercross',
    }));

    const mxRaces = motorcrossRaces.map((race) => ({
      id: race.id,
      name: race.name,
      track: race.track,
      date: race.date,
      series: 'Motocross',
    }));

    // Helper to parse dates for sorting
    const parseDate = (dateString: string): Date => {
      const now = new Date();
      let raceDate = new Date(dateString);

      if (isNaN(raceDate.getTime())) {
        const withYear = `${dateString} ${now.getFullYear()}`;
        raceDate = new Date(withYear);
        if (raceDate < now && now.getMonth() > 5) {
          // If date is in past for second half of year, assume next year
          raceDate.setFullYear(now.getFullYear() + 1);
        }
      }
      return raceDate;
    };

    return [...sxRaces, ...mxRaces].sort(
      (a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime()
    );
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <PageHeader
        title="Race Schedule & Standings"
        description="View the schedule for all series and link to race results."
      />

      <div className="space-y-4">
        {allRaces.map((race) => (
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
      </div>
    </div>
  );
}
