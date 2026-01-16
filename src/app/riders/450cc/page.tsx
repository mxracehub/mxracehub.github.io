
import { PageHeader } from '@/components/page-header';
import Image from 'next/image';
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
    'Triumph': 'bg-gray-800'
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
              <div className="group overflow-hidden rounded-lg border bg-card text-card-foreground">
                <div className="relative">
                  <Image
                    src={rider.imageUrl}
                    alt={rider.name}
                    width={300}
                    height={200}
                    className="w-full object-cover transition-opacity group-hover:opacity-80"
                    data-ai-hint={rider.imageHint}
                  />
                  <div className={`absolute bottom-2 right-2 w-10 h-8 flex items-center justify-center ${plateColor} border border-white shadow-lg transform -skew-x-12`}>
                    <div className="transform skew-x-12">
                        <span className={`text-lg font-black italic ${textColor}`}>{rider.number}</span>
                    </div>
                  </div>
                </div>
                <div className="p-2 text-center">
                  <p className="text-sm font-semibold">{rider.name}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
