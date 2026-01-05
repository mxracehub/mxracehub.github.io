import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';

const supercrossRaces = [
  {
    round: 1,
    location: 'Anaheim, CA',
    date: 'Jan 10, 2026',
    track: 'Angel Stadium',
    tv: 'Peacock',
    ticketsUrl: '#',
    mapUrl: '#',
  },
  {
    round: 2,
    location: 'San Diego, CA',
    date: 'Jan 17, 2026',
    track: 'Snapdragon Stadium',
    tv: 'Peacock',
    ticketsUrl: '#',
    mapUrl: '#',
  },
  {
    round: 3,
    location: 'Anaheim, CA',
    date: 'Jan 24, 2026',
    track: 'Angel Stadium',
    tv: 'Peacock',
    ticketsUrl: '#',
    mapUrl: '#',
  },
  {
    round: 4,
    location: 'Houston, TX',
    date: 'Jan 31, 2026',
    track: 'NRG Stadium',
    tv: 'Peacock',
    ticketsUrl: '#',
    mapUrl: '#',
  },
  {
    round: 5,
    location: 'Glendale, AZ',
    date: 'Feb 07, 2026',
    track: 'State Farm Stadium',
    tv: 'Peacock',
    ticketsUrl: '#',
    mapUrl: '#',
  },
  {
    round: 6,
    location: 'Oakland, CA',
    date: 'Feb 14, 2026',
    track: 'RingCentral Coliseum',
    tv: 'Peacock',
    ticketsUrl: '#',
    mapUrl: '#',
  },
  {
    round: 7,
    location: 'Arlington, TX',
    date: 'Feb 21, 2026',
    track: 'AT&T Stadium',
    tv: 'Peacock',
    ticketsUrl: '#',
    mapUrl: '#',
  },
  {
    round: 8,
    location: 'Daytona Beach, FL',
    date: 'Mar 01, 2026',
    track: 'Daytona International Speedway',
    tv: 'Peacock',
    ticketsUrl: '#',
    mapUrl: '#',
  },
];

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
