
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
import { useMemo } from 'react';

const allRaces = [
  ...supercrossRaces.map(r => ({ ...r, id: r.round.toString(), type: 'Supercross' })),
  ...motorcrossRaces.map(r => ({ ...r, type: 'Motocross' }))
];

const results450 = [
    { pos: 1, rider: 'Eli Tomac', number: '3', bike: 'KTM', points: 25 },
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

const results250 = [
    { pos: 1, rider: 'Max Anstie', number: '61', bike: 'Yamaha', points: 25 },
    { pos: 2, rider: 'Chance Hymas', number: '29', bike: 'Honda', points: 22 },
    { pos: 3, rider: 'Ryder DiFrancesco', number: '34', bike: 'Husqvarna', points: 20 },
    { pos: 4, rider: 'Haiden Deegan', number: '1W', bike: 'Yamaha', points: 18 },
    { pos: 5, rider: 'Michael Mosiman', number: '23', bike: 'Yamaha', points: 17 },
    { pos: 6, rider: 'Levi Kitchen', number: '47', bike: 'Kawasaki', points: 16 },
    { pos: 7, rider: 'Maximus Vohland', number: '19', bike: 'Yamaha', points: 15 },
    { pos: 8, rider: 'Hunter Yoder', number: '60', bike: 'Yamaha', points: 14 },
    { pos: 9, rider: 'Avery Long', number: '57', bike: 'KTM', points: 13 },
    { pos: 10, rider: 'Dilan Schwartz', number: '42', bike: 'Yamaha', points: 12 },
];

// Placeholder data for Triple Crown
const tripleCrownOverall450 = [
    { pos: 1, rider: 'Jett Lawrence', number: '18', bike: 'Honda', finishes: '1-1-2', points: 25 },
    { pos: 2, rider: 'Cooper Webb', number: '2', bike: 'Yamaha', finishes: '3-2-1', points: 22 },
    { pos: 3, rider: 'Eli Tomac', number: '3', bike: 'Yamaha', finishes: '2-3-3', points: 20 },
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
    { pos: 1, rider: 'Levi Kitchen', number: '47', bike: 'Kawasaki', finishes: '1-1-2', points: 25 },
    { pos: 2, rider: 'Jo Shimoda', number: '30', bike: 'Honda', finishes: '3-2-1', points: 22 },
    { pos: 3, rider: 'RJ Hampshire', number: '24', bike: 'Husqvarna', finishes: '2-3-3', points: 20 },
]

const seriesPoints450 = [
    { pos: 1, rider: 'Eli Tomac', number: '3', bike: 'KTM', points: 25 },
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

const seriesPoints250 = [
    { pos: 1, rider: 'Max Anstie', number: '61', bike: 'Yamaha', points: 25 },
    { pos: 2, rider: 'Chance Hymas', number: '29', bike: 'Honda', points: 22 },
    { pos: 3, rider: 'Ryder DiFrancesco', number: '34', bike: 'Husqvarna', points: 20 },
    { pos: 4, rider: 'Haiden Deegan', number: '1W', bike: 'Yamaha', points: 18 },
    { pos: 5, rider: 'Michael Mosiman', number: '23', bike: 'Yamaha', points: 17 },
    { pos: 6, rider: 'Levi Kitchen', number: '47', bike: 'Kawasaki', points: 16 },
    { pos: 7, rider: 'Maximus Vohland', number: '19', bike: 'Yamaha', points: 15 },
    { pos: 8, rider: 'Hunter Yoder', number: '60', bike: 'Yamaha', points: 14 },
    { pos: 9, rider: 'Avery Long', number: '57', bike: 'KTM', points: 13 },
    { pos: 10, rider: 'Dilan Schwartz', number: '42', bike: 'Yamaha', points: 12 },
];

const ResultsTable = ({ results, isTripleCrownOverall = false, isTripleCrownRace = false }: { results: any[], isTripleCrownOverall?: boolean, isTripleCrownRace?: boolean }) => {
    if (results.length === 0) {
      return (
        <div className="border rounded-lg p-8 text-center text-muted-foreground">
          Results will be posted after the race.
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
              {isTripleCrownOverall || !isTripleCrownRace ? <TableHead>Points</TableHead> : null}
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
                {isTripleCrownOverall && <TableCell>{r.points}</TableCell>}
                {!isTripleCrownOverall && !isTripleCrownRace && <TableCell>{r.points}</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };


export default function RaceResultsPage({ params }: { params: { raceId: string } }) {
    const race = allRaces.find(r => r.id === params.raceId);

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

    if (!race) {
        notFound();
    }
    
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

  return (
    <div>
      <PageHeader
        title={getPageTitle()}
        description={getPageDescription()}
      />

      <Tabs defaultValue={isTripleCrown ? 'overall' : "main-event"} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          {isTripleCrown ? (
            <>
                <TabsTrigger value="overall">Overall</TabsTrigger>
                <TabsTrigger value="race1">Race 1</TabsTrigger>
                <TabsTrigger value="race2">Race 2</TabsTrigger>
                <TabsTrigger value="race3">Race 3</TabsTrigger>
            </>
          ) : (
            <>
                <TabsTrigger value="main-event">Main Event</TabsTrigger>
                <TabsTrigger value="heat-races">Heat Races</TabsTrigger>
            </>
          )}
          <TabsTrigger value="series-points">Series Points</TabsTrigger>
        </TabsList>
        
        {isTripleCrown ? (
            <>
                <TabsContent value="overall">
                    <div className="space-y-6 mt-4">
                        <div>
                            <h3 className="text-xl font-bold mb-2">450SX Overall Results</h3>
                            <ResultsTable results={hasRaceHappened ? tripleCrownOverall450 : []} isTripleCrownOverall={true} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">250SX Overall Results</h3>
                            <ResultsTable results={hasRaceHappened ? tripleCrownOverall250 : []} isTripleCrownOverall={true} />
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="race1">
                    <div className="space-y-6 mt-4">
                        <div>
                            <h3 className="text-xl font-bold mb-2">450SX Race 1 Results</h3>
                            <ResultsTable results={hasRaceHappened ? tripleCrownRace1_450 : []} isTripleCrownRace={true} />
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="race2">
                    <div className="space-y-6 mt-4">
                        <div>
                            <h3 className="text-xl font-bold mb-2">450SX Race 2 Results</h3>
                             <ResultsTable results={hasRaceHappened ? tripleCrownRace2_450 : []} isTripleCrownRace={true} />
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="race3">
                    <div className="space-y-6 mt-4">
                        <div>
                            <h3 className="text-xl font-bold mb-2">450SX Race 3 Results</h3>
                            <ResultsTable results={hasRaceHappened ? tripleCrownRace3_450 : []} isTripleCrownRace={true} />
                        </div>
                    </div>
                </TabsContent>
            </>
        ) : (
            <>
                <TabsContent value="main-event">
                    <div className="space-y-6 mt-4">
                        <div>
                            <h3 className="text-xl font-bold mb-2">450SX Main Event</h3>
                            <ResultsTable results={hasRaceHappened ? results450 : []} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">250SX Main Event</h3>
                            <ResultsTable results={hasRaceHappened ? results250 : []} />
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="heat-races">
                    <div className="space-y-6 mt-4">
                        <div>
                            <h3 className="text-xl font-bold mb-2">450SX Heat 1</h3>
                            <ResultsTable results={hasRaceHappened ? results450.slice().reverse() : []} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">250SX Heat 1</h3>
                            <ResultsTable results={hasRaceHappened ? results250.slice().reverse() : []} />
                        </div>
                    </div>
                </TabsContent>
            </>
        )}
        <TabsContent value="series-points">
             <div className="space-y-6 mt-4">
                <div>
                    <h3 className="text-xl font-bold mb-2">450SX Series Points</h3>
                    <ResultsTable results={seriesPoints450} />
                </div>
                 <div>
                    <h3 className="text-xl font-bold mb-2">250SX Series Points</h3>
                    <ResultsTable results={seriesPoints250} />
                </div>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
