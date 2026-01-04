import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

const raceData = [
  {
    name: 'Hangtown Motocross Classic',
    track: 'Prairie City SVRA',
    date: 'June 1, 2024',
    status: 'Finished',
    bet: 'Jett Lawrence',
    result: '+25.50 SC',
  },
  {
    name: 'Thunder Valley National',
    track: 'Thunder Valley Motocross Park',
    date: 'June 15, 2024',
    status: 'Live',
    bet: 'Chase Sexton',
    result: 'Pending',
  },
  {
    name: 'High Point National',
    track: 'High Point Raceway',
    date: 'June 22, 2024',
    status: 'Upcoming',
    bet: 'Not Placed',
    result: '-',
  },
  {
    name: 'Southwick National',
    track: 'The Wick 338',
    date: 'June 29, 2024',
    status: 'Upcoming',
    bet: 'Not Placed',
    result: '-',
  },
  {
    name: 'RedBud National',
    track: 'RedBud MX',
    date: 'July 6, 2024',
    status: 'Upcoming',
    bet: 'Not Placed',
    result: '-',
  },
];

export default function RacesPage() {
  return (
    <div>
      <PageHeader
        title="Races"
        description="Track live races, review past results, and manage your bets."
      >
        <Button>
          Place New Bet
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>Race Schedule & Results</CardTitle>
          <CardDescription>
            Automatically updated race data and betting outcomes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Race</TableHead>
                <TableHead className="hidden sm:table-cell">Track</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Your Bet</TableHead>
                <TableHead className="text-right">Win/Loss</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {raceData.map((race) => (
                <TableRow key={race.name}>
                  <TableCell className="font-medium">{race.name}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {race.track}
                  </TableCell>
                  <TableCell>{race.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        race.status === 'Finished'
                          ? 'outline'
                          : race.status === 'Live'
                          ? 'default'
                          : 'secondary'
                      }
                    >
                      {race.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {race.bet}
                  </TableCell>
                  <TableCell
                    className={`text-right font-semibold ${
                      race.result.startsWith('+')
                        ? 'text-green-600'
                        : race.result.startsWith('-')
                        ? 'text-red-600'
                        : ''
                    }`}
                  >
                    {race.result}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
