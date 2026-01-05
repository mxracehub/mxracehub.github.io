import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { supercrossRaces } from '@/lib/races-supercross-data';

export default function SupercrossPage() {
  const heroImage = PlaceHolderImages.find(
    (img) => img.id === 'supercross-banner'
  );

  return (
    <div>
      <PageHeader
        title="Supercross"
        description="The schedule for the Supercross series."
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {supercrossRaces.map((race) => (
          <div
            key={race.round}
            className="flex flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground"
          >
            <div className="w-full bg-primary p-4 text-primary-foreground">
              <p className="text-sm font-bold">Round {race.round}</p>
              <h3 className="text-lg font-bold">{race.location}</h3>
              <p className="text-sm">{race.date}</p>
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
                    <Link href="/betting">Bet on this race now</Link>
                </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
