
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { worldSupercrossRaces } from '@/lib/races-world-supercross-data';
import { Tv, BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function WorldSupercrossPage() {
  const heroImage = PlaceHolderImages.find(
    (img) => img.id === 'world-supercross-banner'
  );

  return (
    <div>
      <PageHeader
        title="World Supercross Championship"
        description="The schedule for the FIM World Supercross series."
      />
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
        <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
          <Link
            href="https://worldsupercrosschampionship.com/watch/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Tv className="mr-2 h-5 w-5" />
            Live Stream on Recast
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/standings">
            <BarChart3 className="mr-2 h-5 w-5" />
            View Standings
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {worldSupercrossRaces.map((race) => (
          <div
            key={race.round}
            className="flex flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground"
          >
            <div className="w-full bg-primary p-4 text-primary-foreground">
              <div className="flex justify-between items-center">
                <p className="text-sm font-bold">Round {race.round}</p>
              </div>
              <h3 className="text-lg font-bold">{race.location}</h3>
              <p className="text-sm">{race.date} - {race.time} ET</p>
            </div>
            <div className="flex-grow p-4">
              <div>
                <h4 className="font-bold">{race.track}</h4>
                <p className="text-sm text-muted-foreground">
                  Live on {race.tv}
                </p>
              </div>
            </div>
            <div className="border-t border-border p-2">
              <Button asChild className="w-full">
                <Link href="/play">Play on this race now</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
