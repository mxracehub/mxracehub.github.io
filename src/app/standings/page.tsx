
import { PageHeader } from '@/components/page-header';
import { supercrossRaces } from '@/lib/races-supercross-data';
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
];

const allRaces = [...supercrossRaces, ...additionalRaces].sort((a, b) => a.round - b.round);

const formatRaceName = (round: number, location: string) => {
    const anaheimRaces = allRaces.filter(r => r.location.startsWith('Anaheim'));
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
  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader title="SUPERCROSS (2026)" />
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-card-foreground text-background p-4">
          <h2 className="text-xl font-bold">2026</h2>
        </div>
        <ul className="divide-y divide-border">
          {allRaces.slice(0, 10).map((race, index) => (
            <li key={race.round}>
              <Link href={`/races/${race.round}/results`}>
                <div className="p-4 hover:bg-muted/50 cursor-pointer">
                  <span className={`${index === 0 ? 'text-primary' : 'text-foreground'}`}>
                    {String(race.round).padStart(2, '0')} - {formatRaceName(race.round, race.location)}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
