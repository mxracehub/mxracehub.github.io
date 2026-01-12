
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
