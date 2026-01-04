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
import { Coins, Trophy, Clock } from 'lucide-react';

const upcomingRaces = [
  {
    name: 'Thunder Valley National',
    track: 'Thunder Valley Motocross Park',
    date: 'June 15, 2024',
    status: 'Upcoming',
  },
  {
    name: 'High Point National',
    track: 'High Point Raceway',
    date: 'June 22, 2024',
    status: 'Upcoming',
  },
  {
    name: 'Southwick National',
    track: 'The Wick 338',
    date: 'June 29, 2024',
    status: 'Upcoming',
  },
  {
    name: 'RedBud National',
    track: 'RedBud MX',
    date: 'July 6, 2024',
    status: 'Upcoming',
  },
];

const recentActivities = [
    {
        icon: <Coins className="h-4 w-4 text-green-500" />,
        description: 'Purchased 5,000 Gold Coins',
        time: '2 hours ago',
    },
    {
        icon: <Trophy className="h-4 w-4 text-blue-500" />,
        description: 'Placed a bet on Thunder Valley National',
        time: '1 day ago',
    },
    {
        icon: <Coins className="h-4 w-4 text-red-500" />,
        description: 'Transferred 100 Sweeps Coins to Mx Exchange',
        time: '3 days ago',
    },
];

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's a snapshot of your MxHub activity."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gold Coins</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,500</div>
            <p className="text-xs text-muted-foreground">
              Your non-redeemable virtual currency.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sweeps Coins</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">250.75</div>
            <p className="text-xs text-muted-foreground">
              Redeemable for prizes.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                {recentActivities.slice(0, 2).map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                        {activity.icon}
                        <div className="text-sm">
                            <p className="font-medium">{activity.description}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                    </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Races</CardTitle>
            <CardDescription>
              Get ready for the next round of action.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Race Name</TableHead>
                  <TableHead>Track</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingRaces.map((race) => (
                  <TableRow key={race.name}>
                    <TableCell className="font-medium">{race.name}</TableCell>
                    <TableCell>{race.track}</TableCell>
                    <TableCell>{race.date}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">{race.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
