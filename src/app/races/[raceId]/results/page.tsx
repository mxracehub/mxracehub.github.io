
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
    { pos: 1, rider: 'Jett Lawrence', number: '18', bike: 'Honda', points: 25 },
    { pos: 2, rider: 'Jason Anderson', number: '21', bike: 'Kawasaki', points: 22 },
    { pos: 3, rider: 'Chase Sexton', number: '1', bike: 'KTM', points: 20 },
    { pos: 4, rider: 'Aaron Plessinger', number: '7', bike: 'KTM', points: 18 },
    { pos: 5, rider: 'Dylan Ferrandis', number: '14', bike: 'Honda', points: 17 },
    { pos: 6, rider: 'Cooper Webb', number: '2', bike: 'Yamaha', points: 16 },
    { pos: 7, rider: 'Justin Barcia', number: '51', bike: 'GasGas', points: 15 },
    { pos: 8, rider: 'Ken Roczen', number: '94', bike: 'Suzuki', points: 14 },
    { pos: 9, rider: 'Eli Tomac', number: '3', bike: 'Yamaha', points: 13 },
    { pos: 10, rider: 'Hunter Lawrence', number: '96', bike: 'Honda', points: 12 },
];

const results250 = [
    { pos: 1, rider: 'RJ Hampshire', number: '24', bike: 'Husqvarna', points: 25 },
    { pos: 2, rider: 'Jordon Smith', number: '31', bike: 'Yamaha', points: 22 },
    { pos: 3, rider: 'Levi Kitchen', number: '47', bike: 'Kawasaki', points: 20 },
    { pos: 4, rider: 'Jo Shimoda', number: '30', bike: 'Honda', points: 18 },
    { pos: 5, rider: 'Max Vohland', number: '20', bike: 'Kawasaki', points: 17 },
    { pos: 6, rider: 'Julien Beaumer', number: '99', bike: 'KTM', points: 16 },
    { pos: 7, rider: 'Garrett Marchbanks', number: '26', bike: 'Yamaha', points: 15 },
    { pos: 8, rider: 'Mitchell Oldenburg', number: '55', bike: 'Honda', points: 14 },
    { pos: 9, rider: 'Ryder DiFrancesco', number: '34', bike: 'GasGas', points: 13 },
    { pos: 10, rider: 'Carson Mumford', number: '41', bike: 'Honda', points: 12 },
];

// Updated to reflect points from a single 2026 race
const seriesPoints450 = [
    { pos: 1, rider: 'Jett Lawrence', number: '18', bike: 'Honda', points: 25 },
    { pos: 2, rider: 'Jason Anderson', number: '21', bike: 'Kawasaki', points: 22 },
    { pos: 3, rider: 'Chase Sexton', number: '1', bike: 'KTM', points: 20 },
    { pos: 4, rider: 'Aaron Plessinger', number: '7', bike: 'KTM', points: 18 },
    { pos: 5, rider: 'Dylan Ferrandis', number: '14', bike: 'Honda', points: 17 },
    { pos: 6, rider: 'Cooper Webb', number: '2', bike: 'Yamaha', points: 16 },
    { pos: 7, rider: 'Justin Barcia', number: '51', bike: 'GasGas', points: 15 },
    { pos: 8, rider: 'Ken Roczen', number: '94', bike: 'Suzuki', points: 14 },
    { pos: 9, rider: 'Eli Tomac', number: '3', bike: 'Yamaha', points: 13 },
    { pos: 10, rider: 'Hunter Lawrence', number: '96', bike: 'Honda', points: 12 },
];


const ResultsTable = ({ results }: { results: typeof results450 | typeof seriesPoints450 }) => {
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
              <TableHead>Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((r) => (
              <TableRow key={r.pos}>
                <TableCell>{r.pos}</TableCell>
                <TableCell>{r.rider}</TableCell>
                <TableCell>{r.number}</TableCell>
                <TableCell>{r.bike}</TableCell>
                <TableCell>{r.points}</TableCell>
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
        // If date is invalid (e.g., 'MAY 30'), try appending a year
        if (isNaN(date.getTime())) {
            return new Date(`${race.date} ${new Date().getFullYear()}`);
        }
        return date;
    }, [race]);
    
    const hasRaceHappened = useMemo(() => new Date() > raceDate, [raceDate]);

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
        return race.type === 'Supercross' ? `${race.location} Results` : `${race.name} Results`;
    }

  return (
    <div>
      <PageHeader
        title={getPageTitle()}
        description={getPageDescription()}
      />

      <Tabs defaultValue="main-event" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="main-event">Main Event Results</TabsTrigger>
          <TabsTrigger value="heat-races">Heat Race Results</TabsTrigger>
          <TabsTrigger value="series-points">Series Points</TabsTrigger>
        </TabsList>

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

        <TabsContent value="series-points">
             <div className="space-y-6 mt-4">
                <div>
                    <h3 className="text-xl font-bold mb-2">450SX Series Points</h3>
                    <ResultsTable results={seriesPoints450} />
                </div>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export async function generateStaticParams() {
    const supercrossPaths = supercrossRaces.map((race) => ({
      raceId: race.round.toString(),
    }));
  
    const motocrossPaths = motorcrossRaces.map((race) => ({
      raceId: race.id,
    }));
  
    return [...supercrossPaths, ...motocrossPaths];
}
