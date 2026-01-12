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
import { notFound } from 'next/navigation';

const results450 = [
    { pos: 1, rider: 'Jett Lawrence', number: '18', bike: 'Honda', points: 26 },
    { pos: 2, rider: 'Chase Sexton', number: '1', bike: 'KTM', points: 23 },
    { pos: 3, rider: 'Eli Tomac', number: '3', bike: 'Yamaha', points: 21 },
    { pos: 4, rider: 'Ken Roczen', number: '94', bike: 'Suzuki', points: 19 },
    { pos: 5, rider: 'Cooper Webb', number: '2', bike: 'Yamaha', points: 18 },
];

const results250 = [
    { pos: 1, rider: 'RJ Hampshire', number: '24', bike: 'Husqvarna', points: 26 },
    { pos: 2, rider: 'Levi Kitchen', number: '47', bike: 'Kawasaki', points: 23 },
    { pos: 3, rider: 'Jo Shimoda', number: '30', bike: 'Honda', points: 21 },
    { pos: 4, rider: 'Haiden Deegan', number: '38', bike: 'Yamaha', points: 19 },
    { pos: 5, rider: 'Jordon Smith', number: '45', bike: 'Yamaha', points: 18 },
];


const ResultsTable = ({ results }: { results: typeof results450 }) => (
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


export default function RaceResultsPage({ params }: { params: { raceId: string } }) {
  const race = supercrossRaces.find(r => r.round.toString() === params.raceId);

  if (!race) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title={`${race.location} Results`}
        description={`Round ${race.round} of the 2026 Supercross season`}
      />

      <Tabs defaultValue="main-event" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="main-event">Main Event Results</TabsTrigger>
          <TabsTrigger value="heat-races">Heat Race Results</TabsTrigger>
        </TabsList>

        <TabsContent value="main-event">
            <div className="space-y-6 mt-4">
                <div>
                    <h3 className="text-xl font-bold mb-2">450SX Main Event</h3>
                    <ResultsTable results={results450} />
                </div>
                 <div>
                    <h3 className="text-xl font-bold mb-2">250SX Main Event</h3>
                    <ResultsTable results={results250} />
                </div>
            </div>
        </TabsContent>

        <TabsContent value="heat-races">
             <div className="space-y-6 mt-4">
                <div>
                    <h3 className="text-xl font-bold mb-2">450SX Heat 1</h3>
                    <ResultsTable results={results450.slice().reverse()} />
                </div>
                 <div>
                    <h3 className="text-xl font-bold mb-2">250SX Heat 1</h3>
                    <ResultsTable results={results250.slice().reverse()} />
                </div>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
