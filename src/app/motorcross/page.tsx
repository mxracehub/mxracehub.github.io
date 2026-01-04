import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

const motorcrossRaces = [
  {
    id: 'pala',
    name: 'Fox Raceway National',
    track: 'Fox Raceway at Pala',
    location: 'Pala, CA',
    date: 'MAY 30',
    logoUrl: 'https://picsum.photos/seed/pala-logo/100/50',
    logoHint: 'Pala logo',
  },
  {
    id: 'hangtown',
    name: 'Hangtown Classic',
    track: 'Prairie City SVRA',
    location: 'Rancho Cordova, CA',
    date: 'JUNE 6',
    logoUrl: 'https://picsum.photos/seed/hangtown-logo/100/50',
    logoHint: 'Hangtown logo',
  },
  {
    id: 'thunder-valley',
    name: 'Thunder Valley National',
    track: 'Thunder Valley Motocross Park',
    location: 'Lakewood, CO',
    date: 'JUNE 13',
    logoUrl: 'https://picsum.photos/seed/thunder-valley-logo/100/50',
    logoHint: 'Thunder Valley logo',
  },
  {
    id: 'high-point',
    name: 'High Point National',
    track: 'High Point Raceway',
    location: 'Mt. Morris, PA',
    date: 'JUNE 20',
    logoUrl: 'https://picsum.photos/seed/high-point-logo/100/50',
    logoHint: 'High Point logo',
  },
  {
    id: 'unadilla',
    name: 'Unadilla National',
    track: 'Unadilla MX',
    location: 'New Berlin, NY',
    date: 'AUGUST 15',
    logoUrl: 'https://picsum.photos/seed/unadilla-logo/100/50',
    logoHint: 'Unadilla logo',
  },
  {
    id: 'budds-creek',
    name: 'Budds Creek National',
    track: 'Budds Creek Motocross Park',
    location: 'Mechanicsville, MD',
    date: 'AUGUST 22',
    logoUrl: 'https://picsum.photos/seed/budds-creek-logo/100/50',
    logoHint: 'Budds Creek logo',
  },
  {
    id: 'ironman',
    name: 'Ironman National',
    track: 'Ironman Raceway',
    location: 'Crawfordsville, IN',
    date: 'AUGUST 29',
    logoUrl: 'https://picsum.photos/seed/ironman-logo/100/50',
    logoHint: 'Ironman logo',
  },
  {
    id: 'redbud',
    name: 'RedBud National',
    track: 'RedBud MX',
    location: 'Buchanan, MI',
    date: 'JULY 4',
    logoUrl: 'https://picsum.photos/seed/redbud-logo/100/50',
    logoHint: 'Redbud logo',
  },
  {
    id: 'southwick',
    name: 'Southwick National',
    track: 'The Wick 338',
    location: 'Southwick, MA',
    date: 'JULY 11',
    logoUrl: 'https://picsum.photos/seed/southwick-logo/100/50',
    logoHint: 'Southwick logo',
  },
  {
    id: 'spring-creek',
    name: 'Spring Creek National',
    track: 'Spring Creek MX Park',
    location: 'Millville, MN',
    date: 'JULY 18',
    logoUrl: 'https://picsum.photos/seed/spring-creek-logo/100/50',
    logoHint: 'Spring Creek logo',
  },
  {
    id: 'washougal',
    name: 'Washougal National',
    track: 'Washougal MX Park',
    location: 'Washougal, WA',
    date: 'JULY 25',
    logoUrl: 'https://picsum.photos/seed/washougal-logo/100/50',
    logoHint: 'Washougal logo',
  },
];

export default function MotorcrossPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'race-banner-1');

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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {motorcrossRaces.map((race) => (
          <div key={race.id} className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground">
            <div className="bg-primary p-4 text-center text-primary-foreground">
              <Image
                src={race.logoUrl}
                alt={`${race.name} logo`}
                width={100}
                height={50}
                className="mx-auto h-12 object-contain"
                data-ai-hint={race.logoHint}
              />
              <h3 className="mt-2 font-bold uppercase">{race.name.replace(' National', '').replace(' Classic', '')}</h3>
              <p className="text-sm">NATIONAL</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-xl font-bold">{race.date}</p>
              <p className="mt-1 text-sm text-muted-foreground">{race.track}</p>
              <p className="text-xs text-muted-foreground">{race.location}</p>
            </div>
            <div className="flex border-t border-border">
              <Button variant="ghost" className="flex-1 rounded-none rounded-bl-lg">
                Tickets
              </Button>
              <div className="w-px bg-border"></div>
              <Button variant="ghost" className="flex-1 rounded-none rounded-br-lg">
                Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
