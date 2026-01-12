
'use client';

import { PageHeader } from '@/components/page-header';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { supercrossRaces } from '@/lib/races-supercross-data';
import { motocrossRaces } from '@/lib/races-motocross-data';
import { mainEventResults } from '@/lib/results-data';
import { notFound } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { getSeriesPoints } from '@/lib/points-service';

const playoffsData = [
  {
    id: 'playoff-1',
    name: 'Playoff 1',
    location: 'Columbus, OH',
    date: 'Sep 12, 2026',
    series: 'Playoffs',
    track: 'Unknown Track',
    type: 'Playoffs'
  },
  {
    id: 'playoff-2',
    name: 'Playoff 2',
    location: 'Carson, CA',
    date: 'Sep 19, 2026',
    series: 'Playoffs',
    track: 'Unknown Track',
    type: 'Playoffs'
  },
  {
    id: 'smx-final',
    name: 'SMX World Championship Final',
    location: 'Ridgedale, MO',
    date: 'Sep 26, 2026',
    series: 'Playoffs',
    track: 'Unknown Track',
    type: 'Playoffs'
  },
];

const allRaces = [
  ...supercrossRaces.map(r => ({ ...r, id: r.round.toString(), type: 'Supercross' })),
  ...motocrossRaces.map(r => ({ ...r, type: 'Motocross' })),
  ...playoffsData.map(r => ({...r, type: 'Playoffs' })),
];

// Placeholder data for Triple Crown
const tripleCrownOverall450 = [
    { pos: 1, rider: 'Jett Lawrence', number: '18', bike: 'Honda', finishes: '1-1-2' },
    { pos: 2, rider: 'Cooper Webb', number: '2', bike: 'Yamaha', finishes: '3-2-1' },
    { pos: 3, rider: 'Eli Tomac', number: '3', bike: 'Yamaha', finishes: '2-3-3' },
]
const tripleCrownRace1_450 = [
    { pos: 1, rider: 'Jett Lawrence', number: '18', bike: 'Honda'},
    { pos: 2, rider: 'Eli Tomac', number: '3', bike: 'Yamaha'},
    { pos: 3, rider: 'Cooper Webb', number: '2', bike: 'Yamaha'},
]
const tripleCrownRace2_450 = [
    { pos: 1, rider: 'Jett Lawrence', number: '18', bike: 'Honda'},
    { pos: 2, rider: 'Cooper Webb', number: '2', bike: 'Yamaha'},
    { pos: 3, rider: 'Eli Tomac', number: '3', bike: 'Yamaha'},
]
const tripleCrownRace3_450 = [
    { pos: 1, rider: 'Cooper Webb', number: '2', bike: 'Yamaha'},
    { pos: 2, rider: 'Jett Lawrence', number: '18', bike: 'Honda'},
    { pos: 3, rider: 'Eli Tomac', number: '3', bike: 'Yamaha'},
]
const tripleCrownOverall250 = [
    { pos: 1, rider: 'Levi Kitchen', number: '47', bike: 'Kawasaki', finishes: '1-1-2' },
    { pos: 2, rider: 'Jo Shimoda', number: '30', bike: 'Honda', finishes: '3-2-1' },
    { pos: 3, rider: 'RJ Hampshire', number: '24', bike: 'Husqvarna', finishes: '2-3-3' },
]


const ResultsTable = ({ results, hasRaceHappened, isTripleCrownOverall = false, isSeriesPoints = false, isMainEvent = false }: { results: any[], hasRaceHappened: boolean, isTripleCrownOverall?: boolean, isSeriesPoints?: boolean, isMainEvent?: boolean }) => {
    if (!results || results.length === 0) {
      return (
        <div className="border rounded-lg p-8 text-center text-muted-foreground">
          {isSeriesPoints ? 'Points will be updated as the season progresses.' : 'Results will be posted after the race.'}
        </div>
      );
    }
    
    const showPoints = isSeriesPoints || (isMainEvent && hasRaceHappened);
  
    return (
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pos</TableHead>
              <TableHead>Rider</TableHead>
              <TableHead>#</TableHead>
              <TableHead>Bike</TableHead>
              {isTripleCrownOverall && <TableHead>Finishes</TableHead>}
              {showPoints && <TableHead className="text-right">Points</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((r, index) => (
              <TableRow key={r.rider || index}>
                <TableCell>{r.pos || index + 1}</TableCell>
                <TableCell>{r.rider}</TableCell>
                <TableCell>{r.number}</TableCell>
                <TableCell>{r.bike}</TableCell>
                {isTripleCrownOverall && <TableCell>{r.finishes}</TableCell>}
                {showPoints && <TableCell className="text-right">{r.points}</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

const StandingsNotAvailable = () => (
    <div className="border rounded-lg p-8 text-center text-muted-foreground mt-4">
        Results will be posted after the race.
    </div>
);


export default function RaceResultsPage({ params }: { params: { raceId: string } }) {
    const race = allRaces.find(r => r.id === params.raceId);
    
    const [seriesPoints, setSeriesPoints] = useState<ReturnType<typeof getSeriesPoints> | null>(null);

    useEffect(() => {
        setSeriesPoints(getSeriesPoints());
    }, []);

    const raceDate = useMemo(() => {
        if (!race) return new Date();
        const date = new Date(race.date);
        if (isNaN(date.getTime())) {
            const currentYear = new Date().getFullYear();
            const parsedWithYear = new Date(`${race.date} ${currentYear}`);
            if (parsedWithYear < new Date() && new Date().getMonth() > 6) {
                parsedWithYear.setFullYear(currentYear + 1);
            }
            return parsedWithYear;
        }
        return date;
    }, [race]);
    
    const hasRaceHappened = useMemo(() => new Date() > raceDate, [raceDate]);
    const isTripleCrown = race && 'format' in race && race.format === 'Triple Crown';
    const division = race && 'division' in race ? race.division : null;

    if (!race) {
        notFound();
    }

    const raceIdKey = race.type === 'Supercross' ? `supercross-${race.id}` : race.id;
    const raceResults = mainEventResults[raceIdKey as keyof typeof mainEventResults];
    
    const getPageDescription = () => {
        if (race.type === 'Supercross') {
            const supercrossRace = race as typeof supercrossRaces[0];
            return `Round ${supercrossRace.round} of the 2026 Supercross season`;
        }
        if (race.type === 'Playoffs') {
            return `The ${race.name} at ${race.location}`;
        }
        return `The ${race.name} at ${race.track}`;
    }

    const getPageTitle = () => {
        if (race.type === 'Supercross') {
            const supercrossRace = race as typeof supercrossRaces[0];
            if (isTripleCrown) return `${supercrossRace.location} (Triple Crown)`;
            return `${supercrossRace.location} Results`;
        }
        if (race.type === 'Playoffs') {
            return `${race.name} Results`;
        }
        return `${race.name} Results`;
    }

    const render250ClassTitle = () => {
        if (race.type === 'Motocross') return '250 Class Main Event';
        if (!division) return '250 Class';
        if (division === 'East/West Showdown') return '250SX East/West Showdown';
        return `250SX ${division} Main Event`;
    }
    
    const render450ClassTitle = () => {
        if (race.type === 'Motocross') return '450 Class Main Event';
        return '450SX Main Event';
    }


  return (
    <div>
      <PageHeader
        title={getPageTitle()}
        description={getPageDescription()}
      />

      <Tabs defaultValue={isTripleCrown ? 'overall' : "main-event"} className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-5">
          {isTripleCrown ? (
            <>
                <TabsTrigger value="overall">Overall</TabsTrigger>
                <TabsTrigger value="series-points">Series Points</TabsTrigger>
                <TabsTrigger value="race1">Race 1</TabsTrigger>
                <TabsTrigger value="race2">Race 2</TabsTrigger>
                <TabsTrigger value="race3">Race 3</TabsTrigger>
            </>
          ) : (
            <>
                <TabsTrigger value="main-event">Main Event</TabsTrigger>
                <TabsTrigger value="series-points">Series Points</TabsTrigger>
                <TabsTrigger value="heat-races">Heat Races</TabsTrigger>
            </>
          )}
        </TabsList>
        
        {isTripleCrown ? (
            <>
                <TabsContent value="overall">
                    <div className="space-y-6 mt-4">
                        <div>
                            <h3 className="text-xl font-bold mb-2">450SX Overall Results</h3>
                            {hasRaceHappened ? <ResultsTable results={tripleCrownOverall450} hasRaceHappened={hasRaceHappened} isTripleCrownOverall={true} /> : <StandingsNotAvailable />}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">{render250ClassTitle()} Overall</h3>
                            {hasRaceHappened ? <ResultsTable results={tripleCrownOverall250} hasRaceHappened={hasRaceHappened} isTripleCrownOverall={true} /> : <StandingsNotAvailable />}
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="race1">
                     <div className="space-y-6 mt-4">
                        <div>
                            <h3 className="text-xl font-bold mb-2">450SX Race 1 Results</h3>
                            {hasRaceHappened ? <ResultsTable results={tripleCrownRace1_450} hasRaceHappened={hasRaceHappened} /> : <StandingsNotAvailable />}
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="race2">
                     <div className="space-y-6 mt-4">
                        <div>
                            <h3 className="text-xl font-bold mb-2">450SX Race 2 Results</h3>
                             {hasRaceHappened ? <ResultsTable results={tripleCrownRace2_450} hasRaceHappened={hasRaceHappened} /> : <StandingsNotAvailable />}
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="race3">
                     <div className="space-y-6 mt-4">
                        <div>
                            <h3 className="text-xl font-bold mb-2">450SX Race 3 Results</h3>
                            {hasRaceHappened ? <ResultsTable results={tripleCrownRace3_450} hasRaceHappened={hasRaceHappened} /> : <StandingsNotAvailable />}
                        </div>
                    </div>
                </TabsContent>
            </>
        ) : (
            <>
                <TabsContent value="main-event">
                    <div className="space-y-6 mt-4">
                        <div>
                            <h3 className="text-xl font-bold mb-2">{render450ClassTitle()}</h3>
                            {hasRaceHappened ? <ResultsTable results={raceResults?.['450'] || []} hasRaceHappened={hasRaceHappened} isMainEvent={true} /> : <StandingsNotAvailable />}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">{render250ClassTitle()}</h3>
                             {hasRaceHappened ? <ResultsTable results={raceResults?.['250'] || []} hasRaceHappened={hasRaceHappened} isMainEvent={true} /> : <StandingsNotAvailable />}
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="heat-races">
                     <div className="space-y-6 mt-4">
                         <div>
                            <h3 className="text-xl font-bold mb-2">450 Class Heat 1</h3>
                            {hasRaceHappened ? <ResultsTable results={raceResults?.['450']?.slice(0,5) || []} hasRaceHappened={hasRaceHappened} /> : <StandingsNotAvailable />}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">{render250ClassTitle()} Heat 1</h3>
                             {hasRaceHappened ? <ResultsTable results={raceResults?.['250']?.slice(0,5) || []} hasRaceHappened={hasRaceHappened} /> : <StandingsNotAvailable />}
                        </div>
                    </div>
                </TabsContent>
            </>
        )}
        <TabsContent value="series-points">
            <div className="space-y-6 mt-4">
                {race.type === 'Supercross' ? (
                <>
                    <div>
                        <h3 className="text-xl font-bold mb-2">450SX Series Points</h3>
                        <ResultsTable results={seriesPoints?.supercross450 || []} hasRaceHappened={true} isSeriesPoints={true} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">250SX West Series Points</h3>
                        <ResultsTable results={seriesPoints?.supercross250West || []} hasRaceHappened={true} isSeriesPoints={true} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">250SX East Series Points</h3>
                        <ResultsTable results={seriesPoints?.supercross250East || []} hasRaceHappened={true} isSeriesPoints={true} />
                    </div>
                </>
                ) : race.type === 'Motocross' ? (
                <>
                    <div>
                        <h3 className="text-xl font-bold mb-2">450MX Series Points</h3>
                        <ResultsTable results={seriesPoints?.motocross450 || []} hasRaceHappened={true} isSeriesPoints={true} />
                    </div>
                     <div>
                        <h3 className="text-xl font-bold mb-2">250MX Series Points</h3>
                        <ResultsTable results={seriesPoints?.motocross250 || []} hasRaceHappened={true} isSeriesPoints={true} />
                    </div>
                </>
                ) : race.type === 'Playoffs' ? (
                <>
                    <div>
                        <h3 className="text-xl font-bold mb-2">450SMX Playoff Series Points</h3>
                        <ResultsTable results={seriesPoints?.playoff450 || []} hasRaceHappened={true} isSeriesPoints={true} />
                    </div>
                     <div>
                        <h3 className="text-xl font-bold mb-2">250SMX Playoff Series Points</h3>
                        <ResultsTable results={seriesPoints?.playoff250 || []} hasRaceHappened={true} isSeriesPoints={true} />
                    </div>
                </>
                ) : null}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

    