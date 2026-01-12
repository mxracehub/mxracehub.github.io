
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { Tv, BarChart3 } from 'lucide-react';

const playoffsData = [
  {
    name: 'Playoff 1',
    location: 'Columbus, OH',
    date: 'Sep 12, 2026',
  },
  {
    name: 'Playoff 2',
    location: 'Carson, CA',
    date: 'Sep 19, 2026',
  },
  {
    name: 'SMX World Championship Final',
    location: 'Ridgedale, MO',
    date: 'Sep 26, 2026',
  },
];

export default function PlayoffsPage() {
  const heroImage = PlaceHolderImages.find(
    (img) => img.id === 'supercross-banner'
  );

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
                <Link href="/betting">Bet on this race</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
