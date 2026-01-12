
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
import { motorcrossRaces } from '@/lib/races-motorcross-data';
import { notFound } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { getSeriesPoints } from '@/lib/points-service';

const allRaces = [
  ...supercrossRaces.map(r => ({ ...r, id: r.round.toString(), type: 'Supercross' })),
  ...motorcrossRaces.map(r => ({ ...r, type: 'Motocross' }))
];

// Main Event Results - Now defaults to 0 points
const results450 = [
    { pos: 1, rider: 'Eli Tomac', number: '3', bike: 'Yamaha', points: 0 },
    { pos: 2, rider: 'Ken Roczen', number: '94', bike: 'Suzuki', points: 0 },
    { pos: 3, rider: 'Jorge Prado', number: '26', bike: 'KTM', points: 0 },
    { pos: 4, rider: 'Hunter Lawrence', number: '96', bike: 'Honda', points: 0 },
    { pos: 5, rider: 'Jason Anderson', number: '21', bike: 'Suzuki', points: 0 },
    { pos: 6, rider: 'Justin Cooper', number: '32', bike: 'Yamaha', points: 0 },
    { pos: 7, rider: 'Cooper Webb', number: '1', bike: 'Yamaha', points: 0 },
    { pos: 8, rider: 'Chase Sexton', number: '4', bike: 'Kawasaki', points: 0 },
    { pos: 9, rider: 'Dylan Ferrandis', number: '14', bike: 'Ducati', points: 0 },
    { pos: 10, rider: 'Aaron Plessinger', number: '7', bike: 'KTM', points: 0 },
];

const supercrossSeriesPoints450 = [
    { pos: 1, rider: 'Eli Tomac', number: '3', bike: 'Yamaha', points: 25 },
    { pos: 2, rider: 'Ken Roczen', number: '94', bike: 'Suzuki', points: 22 },
    { pos: 3, rider: 'Jorge Prado', number: '26', bike: 'KTM', points: 20 },
    { pos: 4, rider: 'Hunter Lawrence', number: '96', bike: 'Honda', points: 18 },
    { pos: 5, rider: 'Jason Anderson', number: '21', bike: 'Suzuki', points: 17 },
    { pos: 6, rider: 'Justin Cooper', number: '32', bike: 'Yamaha', points: 16 },
    { pos: 7, rider: 'Cooper Webb', number: '1', bike: 'Yamaha', points: 15 },
    { pos: 8, rider: 'Chase Sexton', number: '4', bike: 'Kawasaki', points: 14 },
    { pos: 9, rider: 'Dylan Ferrandis', number: '14', bike: 'Ducati', points: 13 },
    { pos: 10, rider: 'Aaron Plessinger', number: '7', bike: 'KTM', points: 12 },
];


const sxSeriesPoints250East = [
    { pos: 1, rider: 'Austin Forkner', number: '64', bike: 'Kawasaki', points: 0 },
    { pos: 2, rider: 'Cameron McAdoo', number: '63', bike: 'Kawasaki', points: 0 },
    { pos: 3, rider: 'Tom Vialle', number: '16', bike: 'KTM', points: 0 },
    { pos: 4, rider: 'Pierce Brown', number: '39', bike: 'GasGas', points: 0 },
    { pos: 5, rider: 'Haiden Deegan', number: '38', bike: 'Yamaha', points: 0 },
    { pos: 6, rider: 'Max Anstie', number: '37', bike: 'Honda', points: 0 },
    { pos: 7, rider: 'Coty Schock', number: '69', bike: 'Yamaha', points: 0 },
    { pos: 8, rider: 'Jalek Swoll', number: '33', bike: 'Triumph', points: 0 },
    { pos: 9, rider: 'Daxton Bennick', number: '59', bike: 'Yamaha', points: 0 },
    { pos: 10, rider: 'Seth Hammaker', number: '43', bike: 'Kawasaki', points: 0 },
];

const motocrossSeriesPoints450 = [
    { pos: 1, rider: 'Eli Tomac', number: '3', bike: 'KTM', points: 0 },
    { pos: 2, rider: 'Ken Roczen', number: '94', bike: 'Suzuki', points: 0 },
    { pos: 3, rider: 'Jorge Prado', number: '26', bike: 'KTM', points: 0 },
    { pos: 4, rider: 'Hunter Lawrence', number: '96', bike: 'Honda', points: 0 },
    { pos: 5, rider: 'Jason Anderson', number: '21', bike: 'Suzuki', points: 0 },
    { pos: 6, rider: 'Justin Cooper', number: '32', bike: 'Yamaha', points: 0 },
    { pos: 7, rider: 'Cooper Webb', number: '1', bike: 'Yamaha', points: 0 },
    { pos: 8, rider: 'Chase Sexton', number: '4', bike: 'Kawasaki', points: 0 },
    { pos: 9, rider: 'Dylan Ferrandis', number: '14', bike: 'Ducati', points: 0 },
    { pos: 10, rider: 'Aaron Plessinger', number: '7', bike: 'KTM', points: 0 },
];

const motocrossSeriesPoints250 = [
    { pos: 1, rider: 'RJ Hampshire', number: '24', bike: 'Husqvarna', points: 0 },
    { pos: 2, rider: 'Levi Kitchen', number: '47', bike: 'Kawasaki', points: 0 },
    { pos: 3, rider: 'Jordon Smith', number: '31', bike: 'Yamaha', points: 0 },
    { pos: 4, rider: 'Jo Shimoda', number: '30', bike: 'Honda', points: 0 },
    { pos: 5, rider: 'Garrett Marchbanks', number: '26', bike: 'Yamaha', points: 0 },
    { pos: 6, rider: 'Max Vohland', number: '20', bike: 'Kawasaki', points: 0 },
    { pos: 7, rider: 'Nate Thrasher', number: '57', bike: 'Yamaha', points: 0 },
    { pos: 8, rider: 'Julien Beaumer', number: '99', bike: 'KTM', points: 0 },
    { pos: 9, rider: 'Anthony Bourdon', number: '100', bike: 'Suzuki', points: 0 },
    { pos: 10, rider: 'Carson Mumford', number: '41', bike: 'Honda', points: 0 },
];

// Placeholder data for Triple Crown
const tripleCrownOverall450 = [
    { pos: 1, rider: 'Jett Lawrence', number: '18', bike: 'Honda', finishes: '1-1-2', points: 0 },
    { pos: 2, rider: 'Cooper Webb', number: '2', bike: 'Yamaha', finishes: '3-2-1', points: 0 },
    { pos: 3, rider: 'Eli Tomac', number: '3', bike: 'Yamaha', finishes: '2-3-3', points: 0 },
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
    { pos: 1, rider: 'Levi Kitchen', number: '47', bike: 'Kawasaki', finishes: '1-1-2', points: 0 },
    { pos: 2, rider: 'Jo Shimoda', number: '30', bike: 'Honda', finishes: '3-2-1', points: 0 },
    { pos: 3, rider: 'RJ Hampshire', number: '24', bike: 'Husqvarna', finishes: '2-3-3', points: 0 },
]


const ResultsTable = ({ results, hasRaceHappened, isTripleCrownOverall = false, isTripleCrownRace = false, isSeriesPoints = false }: { results: any[], hasRaceHappened: boolean, isTripleCrownOverall?: boolean, isTripleCrownRace?: boolean, isSeriesPoints?: boolean }) => {
    if (!results || results.length === 0) {
      return (
        <div className="border rounded-lg p-8 text-center text-muted-foreground">
          {isSeriesPoints ? 'Points will be updated as the season progresses.' : 'Results will be posted after the race.'}
        </div>
      );
    }
  
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
              {hasRaceHappened || isSeriesPoints ? <TableHead className="text-right">Points</TableHead> : null}
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((r) => (
              <TableRow key={r.pos}>
                <TableCell>{r.pos}</TableCell>
                <TableCell>{r.rider}</TableCell>
                <TableCell>{r.number}</TableCell>
                <TableCell>{r.bike}</TableCell>
                {isTripleCrownOverall && <TableCell>{r.finishes}</TableCell>}
                {hasRaceHappened || isSeriesPoints ? <TableCell className="text-right">{r.points}</TableCell> : null}
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

    // Conditionally set points for the first Supercross race
    const finalResults450 = useMemo(() => {
        if (race?.type === 'Supercross' && race.id === '1') {
            return [
                { pos: 1, rider: 'Eli Tomac', number: '3', bike: 'Yamaha', points: 25 },
                { pos: 2, rider: 'Ken Roczen', number: '94', bike: 'Suzuki', points: 22 },
                { pos: 3, rider: 'Jorge Prado', number: '26', bike: 'KTM', points: 20 },
                { pos: 4, rider: 'Hunter Lawrence', number: '96', bike: 'Honda', points: 18 },
                { pos: 5, rider: 'Jason Anderson', number: '21', bike: 'Suzuki', points: 17 },
                { pos: 6, rider: 'Justin Cooper', number: '32', bike: 'Yamaha', points: 16 },
                { pos: 7, rider: 'Cooper Webb', number: '1', bike: 'Yamaha', points: 15 },
                { pos: 8, rider: 'Chase Sexton', number: '4', bike: 'Kawasaki', points: 14 },
                { pos: 9, rider: 'Dylan Ferrandis', number: '14', bike: 'Ducati', points: 13 },
                { pos: 10, rider: 'Aaron Plessinger', number: '7', bike: 'KTM', points: 12 },
            ];
        }
        return results450;
    }, [race]);
    
    const getPageDescription = () => {
        if (race.type === 'Supercross') {
            const supercrossRace = race as typeof supercrossRaces[0];
            return `Round ${supercrossRace.round} of the 2026 Supercross season`;
        }
        return `The ${race.name} at ${race.track}`;
    }

    const getPageTitle = () => {
        if (race.type === 'Supercross') {
            const supercrossRace = race as typeof supercrossRaces[0];
            if (isTripleCrown) return `${supercrossRace.location} (Triple Crown)`;
            return `${supercrossRace.location} Results`;
        }
        return `${race.name} Results`;
    }

    const render250ClassTitle = () => {
        if (race.type === 'Motocross') return '250 Class';
        if (!division) return '250 Class';
        if (division === 'East/West Showdown') return '250SX East/West Showdown';
        return `250SX ${division} Main Event`;
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
                            {hasRaceHappened ? <ResultsTable results={tripleCrownRace1_450} hasRaceHappened={hasRaceHappened} isTripleCrownRace={true} /> : <StandingsNotAvailable />}
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="race2">
                     <div className="space-y-6 mt-4">
                        <div>
                            <h3 className="text-xl font-bold mb-2">450SX Race 2 Results</h3>
                             {hasRaceHappened ? <ResultsTable results={tripleCrownRace2_450} hasRaceHappened={hasRaceHappened} isTripleCrownRace={true} /> : <StandingsNotAvailable />}
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="race3">
                     <div className="space-y-6 mt-4">
                        <div>
                            <h3 className="text-xl font-bold mb-2">450SX Race 3 Results</h3>
                            {hasRaceHappened ? <ResultsTable results={tripleCrownRace3_450} hasRaceHappened={hasRaceHappened} isTripleCrownRace={true} /> : <StandingsNotAvailable />}
                        </div>
                    </div>
                </TabsContent>
            </>
        ) : (
            <>
                <TabsContent value="main-event">
                    <div className="space-y-6 mt-4">
                        <div>
                            <h3 className="text-xl font-bold mb-2">450 Class Main Event</h3>
                            {hasRaceHappened ? <ResultsTable results={finalResults450} hasRaceHappened={hasRaceHappened} /> : <StandingsNotAvailable />}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">{render250ClassTitle()}</h3>
                             {hasRaceHappened ? <ResultsTable results={division === 'East' ? sxSeriesPoints250East : (seriesPoints?.supercross250West || [])} hasRaceHappened={hasRaceHappened} /> : <StandingsNotAvailable />}
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="heat-races">
                     <div className="space-y-6 mt-4">
                         <div>
                            <h3 className="text-xl font-bold mb-2">450 Class Heat 1</h3>
                            {hasRaceHappened ? <ResultsTable results={finalResults450.slice(0, 5)} hasRaceHappened={hasRaceHappened} /> : <StandingsNotAvailable />}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">{render250ClassTitle()} Heat 1</h3>
                             {hasRaceHappened ? <ResultsTable results={(division === 'East' ? sxSeriesPoints250East : (seriesPoints?.supercross250West || [])).slice(0, 5)} hasRaceHappened={hasRaceHappened} /> : <StandingsNotAvailable />}
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
                        <ResultsTable results={supercrossSeriesPoints450} hasRaceHappened={true} isSeriesPoints={true} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">250SX West Series Points</h3>
                        <ResultsTable results={seriesPoints?.supercross250West || []} hasRaceHappened={true} isSeriesPoints={true} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">250SX East Series Points</h3>
                        <ResultsTable results={sxSeriesPoints250East} hasRaceHappened={true} isSeriesPoints={true} />
                    </div>
                </>
                ) : (
                <>
                    <div>
                        <h3 className="text-xl font-bold mb-2">450MX Series Points</h3>
                        <ResultsTable results={motocrossSeriesPoints450} hasRaceHappened={true} isSeriesPoints={true} />
                    </div>
                     <div>
                        <h3 className="text-xl font-bold mb-2">250MX Series Points</h3>
                        <ResultsTable results={motocrossSeriesPoints250} hasRaceHappened={true} isSeriesPoints={true} />
                    </div>
                </>
                )}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
