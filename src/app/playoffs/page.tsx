
'use client';

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
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
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { Tv, BarChart3, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getSeriesPoints } from '@/lib/points-service';

const playoffsData = [
  {
    id: 'playoff-1',
    name: 'Playoff 1',
    location: 'Columbus, OH',
    date: 'Sep 12, 2026',
  },
  {
    id: 'playoff-2',
    name: 'Playoff 2',
    location: 'Carson, CA',
    date: 'Sep 19, 2026',
  },
  {
    id: 'smx-final',
    name: 'SMX World Championship Final',
    location: 'Ridgedale, MO',
    date: 'Sep 26, 2026',
  },
];

const PointsTable = ({ title, data }: { title: string; data: any[] }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data && data.length > 0 ? (
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
              {data.map((r) => (
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
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            Points will be updated as the season progresses.
          </div>
        )}
      </CardContent>
    </Card>
  );

export default function PlayoffsPage() {
  const heroImage = PlaceHolderImages.find(
    (img) => img.id === 'supercross-banner'
  );
  
  const [playoffPoints, setPlayoffPoints] = useState<ReturnType<typeof getSeriesPoints> | null>(null);

  useEffect(() => {
    setPlayoffPoints(getSeriesPoints());
  }, []);

  return (
    <div>
      <PageHeader title="SMX Playoff" className="text-center" />
      {heroImage && (
        <div className="relative mb-8 overflow-hidden rounded-lg">
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            width={1200}
            height={400}
            className="w-full object-cover"
            data-ai-hint={heroImage.imageHint}
          />
        </div>
      )}

      <div className="mb-8 flex justify-center gap-4 text-center">
        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
          <Link
            href="https://www.peacocktv.com/sports/supercross"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Tv className="mr-2 h-5 w-5" />
            Live Stream on Peacock
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/standings">
            <BarChart3 className="mr-2 h-5 w-5" />
            View Standings
          </Link>
        </Button>
      </div>

      <div className="space-y-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {playoffsData.map((race) => (
              <Card key={race.name}>
                <CardHeader>
                  <CardTitle>{race.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-bold">{race.location}</p>
                  <p className="text-sm text-muted-foreground">{race.date}</p>
                  <Button asChild className="mt-4 w-full">
                    <Link href="/play">Play on this race</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {playoffPoints && <PointsTable title="450SMX Playoff Standings" data={playoffPoints.playoff450} />}
            {playoffPoints && <PointsTable title="250SMX Playoff Standings" data={playoffPoints.playoff250} />}
          </div>
      </div>
    </div>
  );
}
