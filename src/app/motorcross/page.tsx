
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motorcrossRaces } from '@/lib/races-motorcross-data';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Tv, BarChart3 } from 'lucide-react';

export default function MotorcrossPage() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'race-banner-1');

  return (
    <div>
      <PageHeader title="Motorcross" />
      {heroImage && (
        <div className="mb-8 overflow-hidden rounded-lg">
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {motorcrossRaces.map((race) => (
          <div
            key={race.id}
            className="flex flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground"
          >
            <div className="bg-primary p-4 text-center text-primary-foreground">
              {race.logo}
              <h3 className="mt-2 font-bold uppercase">
                {race.name.replace(' National', '').replace(' Classic', '')}
              </h3>
              <p className="text-sm">NATIONAL</p>
            </div>
            <div className="flex-grow p-4 text-center">
              <p className="text-xl font-bold">{race.date}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {race.track}
              </p>
              <p className="text-xs text-muted-foreground">{race.location}</p>
            </div>
            <div className="border-t border-border p-2">
              <Button asChild className="w-full">
                <Link href="/betting">Bet on this race now</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
