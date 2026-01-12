
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

// Using the same placeholder data from the results page for consistency.
// In a real app, this would be fetched from a database.
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

const StandingsTable = ({ results }: { results: any[] }) => {
    if (results.length === 0) {
      return (
        <div className="border rounded-lg p-8 text-center text-muted-foreground">
          Standings will be posted after the first race.
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
              <TableHead className="text-right">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((r) => (
              <TableRow key={r.pos}>
                <TableCell>{r.pos}</TableCell>
                <TableCell>{r.rider}</TableCell>
                <TableCell>{r.number}</TableCell>
                <TableCell>{r.bike}</TableCell>
                <TableCell className="text-right">{r.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };


export default function StandingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <PageHeader
        title="Series Standings"
        description="View the official points standings for each series and class."
      />
      
      <Tabs defaultValue="supercross" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="supercross">Supercross</TabsTrigger>
            <TabsTrigger value="motocross">Motocross</TabsTrigger>
        </TabsList>
        
        <TabsContent value="supercross">
            <div className="space-y-6 mt-4">
                <div>
                    <h3 className="text-xl font-bold mb-2">450SX Standings</h3>
                    <StandingsTable results={seriesPoints450} />
                </div>
                 <div>
                    <h3 className="text-xl font-bold mb-2">250SX Standings</h3>
                    <StandingsTable results={seriesPoints250} />
                </div>
            </div>
        </TabsContent>
        
        <TabsContent value="motocross">
            <div className="space-y-6 mt-4">
                <div>
                    <h3 className="text-xl font-bold mb-2">450MX Standings</h3>
                    {/* Using same data for demonstration. This would be different in a real app. */}
                    <StandingsTable results={seriesPoints450.slice().reverse()} />
                </div>
                 <div>
                    <h3 className="text-xl font-bold mb-2">250MX Standings</h3>
                    <StandingsTable results={seriesPoints250.slice().reverse()} />
                </div>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
