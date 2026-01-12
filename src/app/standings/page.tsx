
import { PageHeader } from '@/components/page-header';
import { supercrossRaces } from '@/lib/races-supercross-data';
import { motorcrossRaces } from '@/lib/races-motorcross-data';
import Link from 'next/link';

// Add the missing races from the image
const additionalRaces = [
  {
    round: 9,
    location: 'Indianapolis, IN',
    date: 'Mar 08, 2026',
    track: 'Lucas Oil Stadium',
    tv: 'Peacock',
  },
  {
    round: 10,
    location: 'Birmingham, AL',
    date: 'Mar 15, 2026',
    track: 'Protective Stadium',
    tv: 'Peacock',
  },
  {
    round: 11,
    location: 'Seattle, WA',
    date: 'Mar 22, 2026',
    track: 'Lumen Field',
    tv: 'Peacock',
  },
  {
    round: 12,
    location: 'St. Louis, MO',
    date: 'Mar 29, 2026',
    track: "The Dome at America's Center",
    tv: 'Peacock',
  },
  {
    round: 13,
    location: 'Foxborough, MA',
    date: 'Apr 05, 2026',
    track: 'Gillette Stadium',
    tv: 'Peacock',
  },
  {
    round: 14,
    location: 'Nashville, TN',
    date: 'Apr 19, 2026',
    track: 'Nissan Stadium',
    tv: 'Peacock',
  },
  {
    round: 15,
    location: 'Philadelphia, PA',
    date: 'Apr 26, 2026',
    track: 'Lincoln Financial Field',
    tv: 'Peacock',
  },
  {
    round: 16,
    location: 'Denver, CO',
    date: 'May 03, 2026',
    track: 'Empower Field at Mile High',
    tv: 'Peacock',
  },
  {
    round: 17,
    location: 'Salt Lake City, UT',
    date: 'May 10, 2026',
    track: 'Rice-Eccles Stadium',
    tv: 'Peacock',
  },
];

const allSupercrossRaces = [...supercrossRaces, ...additionalRaces].sort((a, b) => a.round - b.round);

const formatSupercrossRaceName = (round: number, location: string) => {
    const anaheimRaces = allSupercrossRaces.filter(r => r.location.startsWith('Anaheim'));
    if (location.startsWith('Anaheim')) {
        if (anaheimRaces.length > 1) {
            const raceIndex = anaheimRaces.findIndex(r => r.round === round);
            return `Anaheim ${raceIndex === 0 ? 'I' : 'II'}`;
        }
        return 'Anaheim';
    }
    return location.split(',')[0];
}


export default function StandingsPage() {
  // Simple date parsing for sorting motocross races
  const sortedMotorcrossRaces = [...motorcrossRaces].sort((a, b) => {
    const dateA = new Date(a.date + ' ' + new Date().getFullYear());
    const dateB = new Date(b.date + ' ' + new Date().getFullYear());
    return dateA.getTime() - dateB.getTime();
  });


  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <PageHeader title="SUPERCROSS (2026)" />
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-card-foreground text-background p-4">
            <h2 className="text-xl font-bold">2026 Schedule</h2>
          </div>
          <ul className="divide-y divide-border">
            {allSupercrossRaces.map((race, index) => (
              <li key={race.round}>
                <Link href={`/races/${race.round}/results`}>
                  <div className="p-4 hover:bg-muted/50 cursor-pointer">
                    <span className={`${index === 0 ? 'text-primary' : 'text-foreground'}`}>
                      {String(race.round).padStart(2, '0')} - {formatSupercrossRaceName(race.round, race.location)}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <PageHeader title="MOTOCROSS" />
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-card-foreground text-background p-4">
            <h2 className="text-xl font-bold">Schedule</h2>
          </div>
          <ul className="divide-y divide-border">
            {sortedMotorcrossRaces.map((race, index) => (
              <li key={race.id}>
                <Link href={`/races/${race.id}/results`}>
                  <div className="p-4 hover:bg-muted/50 cursor-pointer">
                    <span className="text-foreground">
                      {race.date} - {race.name}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
