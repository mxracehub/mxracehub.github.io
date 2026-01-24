
import { PageHeader } from '@/components/page-header';
import Link from 'next/link';
import { riders450 } from '@/lib/riders-data';

const teamColors: Record<string, string> = {
    'Yamaha': 'bg-blue-600',
    'Honda': 'bg-red-600',
    'Kawasaki': 'bg-green-600',
    'KTM': 'bg-orange-500',
    'Suzuki': 'bg-yellow-400',
    'Husqvarna': 'bg-white',
    'GasGas': 'bg-red-600',
    'Beta': 'bg-red-600',
    'Triumph': 'bg-gray-800',
    'Stark': 'bg-white'
};

const textColors: Record<string, string> = {
    'bg-white': 'text-black',
    'bg-yellow-400': 'text-black',
}

const getTeamColor = (teamName: string): string => {
    for (const team in teamColors) {
        if (teamName.includes(team)) {
            return teamColors[team];
        }
    }
    return 'bg-black';
};

const getTextColor = (bgColor: string): string => {
    return textColors[bgColor] || 'text-white';
}

export default function Riders450Page() {
  return (
    <div className="text-center">
      <PageHeader title="450cc Riders" />
      <div className="grid grid-cols-2 gap-4 text-left sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {riders450.map((rider) => {
          const plateColor = getTeamColor(rider.team);
          const textColor = getTextColor(plateColor);
          return (
            <Link href={`/riders/450cc/${rider.id}`} key={rider.id}>
              <div className={`group flex h-32 flex-col items-center justify-center rounded-lg border p-4 text-center transition-opacity hover:opacity-80 ${plateColor}`}>
                <span className={`text-4xl font-black italic ${textColor}`}>{rider.number}</span>
                <p className={`mt-1 text-sm font-semibold ${textColor}`}>{rider.name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

