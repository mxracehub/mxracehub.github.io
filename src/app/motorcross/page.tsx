
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
        <svg viewBox="0 0 100 50" className="h-16 w-auto">
          <path d="M10 5 H 90 L 100 15 V 45 H 0 V 15 Z" fill="#1e3a8a" />
          <path d="M5 8 H 95 L 98 13 H 2 Z" fill="#dc2626" />
          <rect x="5" y="15" width="90" height="25" fill="#fff" />
          <text x="50" y="13" textAnchor="middle" fontSize="6" fill="#fff" fontWeight="bold">PALA</text>
          <text x="50" y="24" textAnchor="middle" fontSize="6" fill="#000" fontWeight="bold">FOX RACEWAY</text>
          <path d="M20 30 h60" stroke="#dc2626" strokeWidth="1" />
          <text x="50" y="37" textAnchor="middle" fontSize="5" fill="#000" fontWeight="bold">NATIONAL</text>
          <path d="M48 40 l-2 -2 l5 0 l-3 4" fill="#dc2626" />
          <path d="M52 40 l2 -2 l-5 0 l3 4" fill="#dc2626" />
          <path d="M45,42 C40,42 40,38 45,38 C47,38 48,39 50,40 C52,39 53,38 55,38 C60,38 60,42 55,42" fill="none" stroke="#000" strokeWidth="0.5"/>
          <circle cx="47" cy="39" r="0.5" fill="#000" />
          <circle cx="53" cy="39" r="0.5" fill="#000" />
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
        <svg viewBox="0 0 100 50" className="h-16 w-auto">
          <path d="M10 5 H 90 L 100 15 V 45 H 0 V 15 Z" fill="#1e3a8a" />
          <path d="M5 8 H 95 L 98 13 H 2 Z" fill="#dc2626" />
          <rect x="5" y="15" width="90" height="25" fill="#fff" />
          <text x="50" y="13" textAnchor="middle" fontSize="6" fill="#fff" fontWeight="bold">2026</text>
          <text x="50" y="24" textAnchor="middle" fontSize="6" fill="#000" fontWeight="bold">HANGTOWN</text>
          <path d="M20 30 h60" stroke="#dc2626" strokeWidth="1" />
          <text x="50" y="37" textAnchor="middle" fontSize="5" fill="#000" fontWeight="bold">MOTOCROSS CLASSIC</text>
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
        <svg viewBox="0 0 100 50" className="h-16 w-auto">
          <path d="M10 5 H 90 L 100 15 V 45 H 0 V 15 Z" fill="#1e3a8a" />
          <path d="M5 8 H 95 L 98 13 H 2 Z" fill="#dc2626" />
          <rect x="5" y="15" width="90" height="25" fill="#fff" />
          <text x="50" y="13" textAnchor="middle" fontSize="6" fill="#fff" fontWeight="bold">2026</text>
          <text x="50" y="24" textAnchor="middle" fontSize="6" fill="#000" fontWeight="bold">THUNDER VALLEY</text>
          <path d="M20 30 h60" stroke="#dc2626" strokeWidth="1" />
          <text x="50" y="37" textAnchor="middle" fontSize="5" fill="#000" fontWeight="bold">NATIONAL</text>
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
        <svg viewBox="0 0 100 50" className="h-16 w-auto">
          <path d="M10 5 H 90 L 100 15 V 45 H 0 V 15 Z" fill="#1e3a8a" />
           <path d="M5 8 H 95 L 98 13 H 2 Z" fill="#dc2626" />
           <rect x="5" y="15" width="90" height="25" fill="#fff" />
           <text x="50" y="13" textAnchor="middle" fontSize="6" fill="#fff" fontWeight="bold">HIGH POINT</text>
           <text x="50" y="24" textAnchor="middle" fontSize="6" fill="#000" fontWeight="bold" letterSpacing="-0.5">LUCAS OIL PRO</text>
           <path d="M20 30 h60" stroke="#dc2626" strokeWidth="1" />
           <text x="50" y="37" textAnchor="middle" fontSize="5" fill="#000" fontWeight="bold">MOTOCROSS</text>
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
        <svg viewBox="0 0 100 50" className="h-16 w-auto">
          <path d="M10 5 H 90 L 100 15 V 45 H 0 V 15 Z" fill="#1e3a8a" />
          <rect x="5" y="8" width="90" height="8" fill="#fff" />
          <text x="25" y="14" fill="#0033A0" fontSize="7" fontWeight="bold" fontStyle="italic">elf</text>
          <circle cx="36" cy="11.5" r="3" fill="#dc2626" />
          <rect x="5" y="16" width="90" height="25" fill="#fff" />
          <text x="50" y="26" textAnchor="middle" fontSize="6" fill="#000" fontWeight="bold">UNADILLA</text>
          <path d="M20 32 h60" stroke="#dc2626" strokeWidth="1" />
          <text x="50" y="39" textAnchor="middle" fontSize="5" fill="#000" fontWeight="bold">NATIONAL</text>
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
        <svg viewBox="0 0 100 50" className="h-16 w-auto">
          <path d="M10 5 H 90 L 100 15 V 45 H 0 V 15 Z" fill="#1e3a8a" />
          <path d="M5 8 H 95 L 98 13 H 2 Z" fill="#fff" />
          <text x="50" y="13" textAnchor="middle" fontSize="5" fill="#000" fontWeight="bold">YAMAHA</text>
          <rect x="5" y="15" width="90" height="25" fill="#fff" />
          <text x="50" y="24" textAnchor="middle" fontSize="6" fill="#000" fontWeight="bold">BUDDS CREEK</text>
          <path d="M20 30 h60" stroke="#dc2626" strokeWidth="1" />
          <text x="50" y="37" textAnchor="middle" fontSize="5" fill="#000" fontWeight="bold">NATIONAL</text>
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
        <svg viewBox="0 0 100 50" className="h-16 w-auto">
          <path d="M10 5 H 90 L 100 15 V 45 H 0 V 15 Z" fill="#1e3a8a" />
          <path d="M5 8 H 95 L 98 13 H 2 Z" fill="#dc2626" />
          <rect x="5" y="15" width="90" height="25" fill="#fff" />
          <text x="50" y="13" textAnchor="middle" fontSize="6" fill="#fff" fontWeight="bold">2026</text>
          <text x="50" y="24" textAnchor="middle" fontSize="6" fill="#000" fontWeight="bold">IRONMAN</text>
          <path d="M20 30 h60" stroke="#dc2626" strokeWidth="1" />
          <text x="50" y="37" textAnchor="middle" fontSize="5" fill="#000" fontWeight="bold">NATIONAL FINALS</text>
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
        <svg viewBox="0 0 100 50" className="h-16 w-auto">
          <path d="M10 5 H 90 L 100 15 V 45 H 0 V 15 Z" fill="#1e3a8a" />
          <path d="M5 8 H 95 L 98 13 H 2 Z" fill="#dc2626" />
          <rect x="5" y="15" width="90" height="25" fill="#fff" />
          <text x="50" y="13" textAnchor="middle" fontSize="6" fill="#fff" fontWeight="bold">2026</text>
          <text x="50" y="24" textAnchor="middle" fontSize="6" fill="#000" fontWeight="bold">REDBUD</text>
          <path d="M20 30 h60" stroke="#dc2626" strokeWidth="1" />
          <text x="50" y="37" textAnchor="middle" fontSize="5" fill="#000" fontWeight="bold">NATIONAL</text>
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
        <svg viewBox="0 0 100 50" className="h-16 w-auto">
          <path d="M10 5 H 90 L 100 15 V 45 H 0 V 15 Z" fill="#1e3a8a" />
          <path d="M5 8 H 95 L 98 13 H 2 Z" fill="#fff" />
          <text x="50" y="13" textAnchor="middle" fontSize="5" fill="#000" fontWeight="bold">CRESTVIEW</text>
          <rect x="5" y="15" width="90" height="25" fill="#fff" />
          <text x="50" y="24" textAnchor="middle" fontSize="6" fill="#000" fontWeight="bold">SOUTHWICK</text>
          <path d="M20 30 h60" stroke="#dc2626" strokeWidth="1" />
          <text x="50" y="37" textAnchor="middle" fontSize="5" fill="#000" fontWeight="bold">NATIONAL</text>
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
        <svg viewBox="0 0 100 50" className="h-16 w-auto">
          <path d="M10 5 H 90 L 100 15 V 45 H 0 V 15 Z" fill="#1e3a8a" />
          <path d="M5 8 H 95 L 98 13 H 2 Z" fill="#fff" />
          <text x="50" y="13" textAnchor="middle" fontSize="6" fill="#000" fontWeight="bold" fontFamily="monospace">FXR</text>
          <rect x="5" y="15" width="90" height="25" fill="#fff" />
          <text x="50" y="24" textAnchor="middle" fontSize="6" fill="#000" fontWeight="bold">SPRING CREEK</text>
          <path d="M20 30 h60" stroke="#dc2626" strokeWidth="1" />
          <text x="50" y="37" textAnchor="middle" fontSize="5" fill="#000" fontWeight="bold">NATIONAL</text>
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
        <svg viewBox="0 0 100 50" className="h-16 w-auto">
          <path d="M10 5 H 90 L 100 15 V 45 H 0 V 15 Z" fill="#1e3a8a" />
          <path d="M5 8 H 95 L 98 13 H 2 Z" fill="#dc2626" />
          <path d="M30 8 L 40 13 L 70 13 L 80 8 Z" fill="#fff" />
          <text x="55" y="12" textAnchor="middle" fontSize="4" fill="#000" fontWeight="bold" >FLY RACING</text>
          <rect x="5" y="15" width="90" height="25" fill="#fff" />
          <text x="50" y="24" textAnchor="middle" fontSize="6" fill="#000" fontWeight="bold">WASHOUGAL</text>
          <path d="M20 30 h60" stroke="#dc2626" strokeWidth="1" />
          <text x="50" y="37" textAnchor="middle" fontSize="5" fill="#000" fontWeight="bold">NATIONAL</text>
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
