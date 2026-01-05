
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const motorcrossRaces = [
  {
    id: 'pala',
    name: 'Fox Raceway National',
    track: 'Fox Raceway at Pala',
    location: 'Pala, CA',
    date: 'MAY 30',
    logo: (
      <div className="w-full h-20 flex justify-center items-center">
        <svg viewBox="0 0 100 60" className="h-16 w-auto">
          <path d="M10 5 L90 5 L95 15 L5 15 Z" fill="#1e3a8a" />
          <text x="50" y="12" textAnchor="middle" fontSize="5" fill="#fff" fontWeight="bold">PALA</text>
          <text x="50" y="20" textAnchor="middle" fontSize="5" fill="#1e3a8a" fontWeight="bold">FOX RACEWAY</text>
          <path d="M15 23 H 85 L 82 28 H 18 Z" fill="#fff" />
          <text x="50" y="27" textAnchor="middle" fontSize="4" fill="#000" fontWeight="bold">NATIONAL</text>
          <path d="M20 30 L80 30 L75 45 L25 45 Z" fill="#dc2626" />
        </svg>
      </div>
    ),
  },
  {
    id: 'hangtown',
    name: 'Hangtown Classic',
    track: 'Prairie City SVRA',
    location: 'Rancho Cordova, CA',
    date: 'JUNE 6',
    logo: (
      <div className="w-full h-20 flex justify-center items-center">
        <svg viewBox="0 0 100 60" className="h-16 w-auto">
          <path d="M10 5 L90 5 L95 15 L5 15 Z" fill="#1e3a8a" />
          <text x="50" y="12" textAnchor="middle" fontSize="5" fill="#fff" fontWeight="bold">HANGTOWN</text>
          <text x="50" y="20" textAnchor="middle" fontSize="5" fill="#1e3a8a" fontWeight="bold">MOTOCROSS CLASSIC</text>
          <path d="M15 23 H 85 L 82 28 H 18 Z" fill="#fff" />
          <text x="50" y="27" textAnchor="middle" fontSize="4" fill="#000" fontWeight="bold">NATIONAL</text>
          <path d="M20 30 L80 30 L75 45 L25 45 Z" fill="#dc2626" />
        </svg>
      </div>
    ),
  },
  {
    id: 'thunder-valley',
    name: 'Thunder Valley National',
    track: 'Thunder Valley Motocross Park',
    location: 'Lakewood, CO',
    date: 'JUNE 13',
    logo: (
      <div className="w-full h-20 flex justify-center items-center">
        <svg viewBox="0 0 100 60" className="h-16 w-auto">
          <path d="M10 5 L90 5 L95 15 L5 15 Z" fill="#1e3a8a" />
          <text x="50" y="12" textAnchor="middle" fontSize="5" fill="#fff" fontWeight="bold">THUNDER VALLEY</text>
          <text x="50" y="20" textAnchor="middle" fontSize="5" fill="#1e3a8a" fontWeight="bold">LUCAS OIL</text>
          <path d="M15 23 H 85 L 82 28 H 18 Z" fill="#fff" />
          <text x="50" y="27" textAnchor="middle" fontSize="4" fill="#000" fontWeight="bold">PRO MOTOCROSS</text>
          <path d="M20 30 L80 30 L75 45 L25 45 Z" fill="#dc2626" />
        </svg>
      </div>
    ),
  },
  {
    id: 'high-point',
    name: 'High Point National',
    track: 'High Point Raceway',
    location: 'Mt. Morris, PA',
    date: 'JUNE 20',
    logo: (
       <div className="w-full h-20 flex justify-center items-center">
        <svg viewBox="0 0 100 60" className="h-16 w-auto">
          <path d="M10 5 L 90 5 L 95 15 L5 15 Z" fill="#1e3a8a" />
           <text x="50" y="12" textAnchor="middle" fontSize="5" fill="#fff" fontWeight="bold">HIGH POINT</text>
           <text x="50" y="20" textAnchor="middle" fontSize="4" fill="#1e3a8a" fontWeight="bold" letterSpacing="-0.5">LUCAS OIL PRO</text>
           <path d="M15 23 H 85 L 82 28 H 18 Z" fill="#fff" />
           <text x="50" y="27" textAnchor="middle" fontSize="4" fill="#000" fontWeight="bold">NATIONAL</text>
           <path d="M20 30 L80 30 L75 45 L25 45 Z" fill="#dc2626" />
        </svg>
      </div>
    ),
  },
  {
    id: 'unadilla',
    name: 'Unadilla National',
    track: 'Unadilla MX',
    location: 'New Berlin, NY',
    date: 'AUGUST 15',
    logo: (
      <div className="w-full h-20 flex justify-center items-center">
        <svg viewBox="0 0 100 60" className="h-16 w-auto">
          <path d="M10 5 L 90 5 L 95 15 L5 15 Z" fill="#1e3a8a" />
          <text x="50" y="12" textAnchor="middle" fontSize="5" fill="#fff" fontWeight="bold">UNADILLA</text>
          <text x="50" y="20" textAnchor="middle" fontSize="5" fill="#1e3a8a" fontWeight="bold">MX</text>
          <path d="M15 23 H 85 L 82 28 H 18 Z" fill="#fff" />
          <text x="50" y="27" textAnchor="middle" fontSize="4" fill="#000" fontWeight="bold">NATIONAL</text>
          <path d="M20 30 L80 30 L75 45 L25 45 Z" fill="#dc2626" />
        </svg>
      </div>
    ),
  },
  {
    id: 'budds-creek',
    name: 'Budds Creek National',
    track: 'Budds Creek Motocross Park',
    location: 'Mechanicsville, MD',
    date: 'AUGUST 22',
    logo: (
      <div className="w-full h-20 flex justify-center items-center">
        <svg viewBox="0 0 100 60" className="h-16 w-auto">
          <path d="M10 5 L90 5 L95 15 L5 15 Z" fill="#1e3a8a" />
          <text x="50" y="12" textAnchor="middle" fontSize="5" fill="#fff" fontWeight="bold">BUDDS CREEK</text>
           <text x="50" y="20" textAnchor="middle" fontSize="5" fill="#1e3a8a" fontWeight="bold">MOTOCROSS PARK</text>
          <path d="M15 23 H 85 L 82 28 H 18 Z" fill="#fff" />
          <text x="50" y="27" textAnchor="middle" fontSize="4" fill="#000" fontWeight="bold">NATIONAL</text>
          <path d="M20 30 L80 30 L75 45 L25 45 Z" fill="#dc2626" />
        </svg>
      </div>
    ),
  },
  {
    id: 'ironman',
    name: 'Ironman National',
    track: 'Ironman Raceway',
    location: 'Crawfordsville, IN',
    date: 'AUGUST 29',
    logo: (
      <div className="w-full h-20 flex justify-center items-center">
        <svg viewBox="0 0 100 60" className="h-16 w-auto">
          <path d="M10 5 L90 5 L95 15 L5 15 Z" fill="#1e3a8a" />
          <text x="50" y="12" textAnchor="middle" fontSize="5" fill="#fff" fontWeight="bold">IRONMAN</text>
          <text x="50" y="20" textAnchor="middle" fontSize="5" fill="#1e3a8a" fontWeight="bold">RACEWAY</text>
          <path d="M15 23 H 85 L 82 28 H 18 Z" fill="#fff" />
          <text x="50" y="27" textAnchor="middle" fontSize="4" fill="#000" fontWeight="bold">NATIONAL</text>
          <path d="M20 30 L80 30 L75 45 L25 45 Z" fill="#dc2626" />
        </svg>
      </div>
    ),
  },
  {
    id: 'redbud',
    name: 'RedBud National',
    track: 'RedBud MX',
    location: 'Buchanan, MI',
    date: 'JULY 4',
    logo: (
      <div className="w-full h-20 flex justify-center items-center">
        <svg viewBox="0 0 100 60" className="h-16 w-auto">
          <path d="M10 5 L90 5 L95 15 L5 15 Z" fill="#1e3a8a" />
          <text x="50" y="12" textAnchor="middle" fontSize="5" fill="#fff" fontWeight="bold">REDBUD</text>
          <text x="50" y="20" textAnchor="middle" fontSize="5" fill="#1e3a8a" fontWeight="bold">MX</text>
          <path d="M15 23 H 85 L 82 28 H 18 Z" fill="#fff" />
          <text x="50" y="27" textAnchor="middle" fontSize="4" fill="#000" fontWeight="bold">NATIONAL</text>
          <path d="M20 30 L80 30 L75 45 L25 45 Z" fill="#dc2626" />
        </svg>
      </div>
    ),
  },
  {
    id: 'southwick',
    name: 'Southwick National',
    track: 'The Wick 338',
    location: 'Southwick, MA',
    date: 'JULY 11',
    logo: (
      <div className="w-full h-20 flex justify-center items-center">
        <svg viewBox="0 0 100 60" className="h-16 w-auto">
          <path d="M10 5 L90 5 L95 15 L5 15 Z" fill="#1e3a8a" />
          <text x="50" y="12" textAnchor="middle" fontSize="5" fill="#fff" fontWeight="bold">SOUTHWICK</text>
          <text x="50" y="20" textAnchor="middle" fontSize="5" fill="#1e3a8a" fontWeight="bold">THE WICK 338</text>
          <path d="M15 23 H 85 L 82 28 H 18 Z" fill="#fff" />
          <text x="50" y="27" textAnchor="middle" fontSize="4" fill="#000" fontWeight="bold">NATIONAL</text>
          <path d="M20 30 L80 30 L75 45 L25 45 Z" fill="#dc2626" />
        </svg>
      </div>
    ),
  },
  {
    id: 'spring-creek',
    name: 'Spring Creek National',
    track: 'Spring Creek MX Park',
    location: 'Millville, MN',
    date: 'JULY 18',
    logo: (
      <div className="w-full h-20 flex justify-center items-center">
        <svg viewBox="0 0 100 60" className="h-16 w-auto">
          <path d="M10 5 L90 5 L95 15 L5 15 Z" fill="#1e3a8a" />
          <text x="50" y="12" textAnchor="middle" fontSize="5" fill="#fff" fontWeight="bold">SPRING CREEK</text>
           <text x="50" y="20" textAnchor="middle" fontSize="5" fill="#1e3a8a" fontWeight="bold">MX PARK</text>
          <path d="M15 23 H 85 L 82 28 H 18 Z" fill="#fff" />
          <text x="50" y="27" textAnchor="middle" fontSize="4" fill="#000" fontWeight="bold">NATIONAL</text>
          <path d="M20 30 L80 30 L75 45 L25 45 Z" fill="#dc2626" />
        </svg>
      </div>
    ),
  },
  {
    id: 'washougal',
    name: 'Washougal National',
    track: 'Washougal MX Park',
    location: 'Washougal, WA',
    date: 'JULY 25',
    logo: (
      <div className="w-full h-20 flex justify-center items-center">
        <svg viewBox="0 0 100 60" className="h-16 w-auto">
          <path d="M10 5 L90 5 L95 15 L5 15 Z" fill="#1e3a8a" />
          <text x="50" y="12" textAnchor="middle" fontSize="5" fill="#fff" fontWeight="bold">WASHOUGAL</text>
          <text x="50" y="20" textAnchor="middle" fontSize="5" fill="#1e3a8a" fontWeight="bold">MX PARK</text>
          <path d="M15 23 H 85 L 82 28 H 18 Z" fill="#fff" />
          <text x="50" y="27" textAnchor="middle" fontSize="4" fill="#000" fontWeight="bold">NATIONAL</text>
          <path d="M20 30 L80 30 L75 45 L25 45 Z" fill="#dc2626" />
        </svg>
      </div>
    ),
  },
];

export default function MotorcrossPage() {
  const heroImage = {
      imageUrl: "https://images.unsplash.com/photo-1524055988636-436c6852de66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtb3RvY3Jvc3N8ZW58MHx8fHwxNzY3OTAwNjYwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Motocross race banner",
      imageHint: "motocross race"
  };

  return (
    <div>
      <PageHeader title="Motorcross" />
      {heroImage && (
        <div className="mb-8 overflow-hidden rounded-lg">
           <img
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
          <div key={race.id} className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground flex flex-col">
            <div className="bg-primary p-4 text-center text-primary-foreground">
              {race.logo}
              <h3 className="mt-2 font-bold uppercase">{race.name.replace(' National', '').replace(' Classic', '')}</h3>
              <p className="text-sm">NATIONAL</p>
            </div>
            <div className="p-4 text-center flex-grow">
              <p className="text-xl font-bold">{race.date}</p>
              <p className="mt-1 text-sm text-muted-foreground">{race.track}</p>
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
