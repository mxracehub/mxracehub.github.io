import { PageHeader } from '@/components/page-header';
import { riders250 } from '@/lib/riders-250-data';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const USFlag = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7410 3900" className="h-4 w-auto"><path d="M0 0h7410v3900H0z" fill="#b22234"/><path d="M0 0h2964v2100H0z" fill="#3c3b6e"/><path d="M250 210l83 256-218-158h269L117 466l83-256" fill="#fff"/><path d="M630 210l83 256-218-158h269L500 466l83-256" fill="#fff"/><path d="M1010 210l83 256-218-158h269L880 466l83-256" fill="#fff"/><path d="M1390 210l83 256-218-158h269L1260 466l83-256" fill="#fff"/><path d="M1770 210l83 256-218-158h269L1640 466l83-256" fill="#fff"/><path d="M2150 210l83 256-218-158h269L2020 466l83-256" fill="#fff"/><path d="M440 420l83 256-218-158h269L310 676l83-256" fill="#fff"/><path d="M820 420l83 256-218-158h269L690 676l83-256" fill="#fff"/><path d="M1200 420l83 256-218-158h269L1070 676l83-256" fill="#fff"/><path d="M1580 420l83 256-218-158h269L1450 676l83-256" fill="#fff"/><path d="M1960 420l83 256-218-158h269L1830 676l83-256" fill="#fff"/><g transform="translate(0 840)"><path d="M250 210l83 256-218-158h269L117 466l83-256" fill="#fff"/><path d="M630 210l83 256-218-158h269L500 466l83-256" fill="#fff"/><path d="M1010 210l83 256-218-158h269L880 466l83-256" fill="#fff"/><path d="M1390 210l83 256-218-158h269L1260 466l83-256" fill="#fff"/><path d="M1770 210l83 256-218-158h269L1640 466l83-256" fill="#fff"/><path d="M2150 210l83 256-218-158h269L2020 466l83-256" fill="#fff"/></g><path d="M440 1260l83 256-218-158h269L310 1516l83-256" fill="#fff"/><path d="M820 1260l83 256-218-158h269L690 1516l83-256" fill="#fff"/><path d="M1200 1260l83 256-218-158h269L1070 1516l83-256" fill="#fff"/><path d="M1580 1260l83 256-218-158h269L1450 1516l83-256" fill="#fff"/><path d="M1960 1260l83 256-218-158h269L1830 1516l83-256" fill="#fff"/><g transform="translate(0 1680)"><path d="M250 210l83 256-218-158h269L117 466l83-256" fill="#fff"/><path d="M630 210l83 256-218-158h269L500 466l83-256" fill="#fff"/><path d="M1010 210l83 256-218-158h269L880 466l83-256" fill="#fff"/><path d="M1390 210l83 256-218-158h269L1260 466l83-256" fill="#fff"/><path d="M1770 210l83 256-218-158h269L1640 466l83-256" fill="#fff"/><path d="M2150 210l83 256-218-158h269L2020 466l83-256" fill="#fff"/></g><path d="M0 300h7410v300H0zm0 600h7410v300H0zm0 600h7410v300H0zm0 600h7410v300H0z" fill="#fff"/><path d="M0 2100h7410v300H0zm0 600h7410v300H0zm0 600h7410v300H0z" fill="#fff"/></svg>
  );

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

export default function RiderDetailPage({ params }: { params: { riderId: string } }) {
  const rider = riders250.find((r) => r.id === params.riderId);

  if (!rider) {
    notFound();
  }
  
  const plateColor = getTeamColor(rider.team);
  const textColor = getTextColor(plateColor);

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader title={rider.name} />
      
      <div className="bg-blue-900/80 text-white rounded-lg p-4 flex items-center gap-6 mb-8">
        <div className={`flex-shrink-0 h-32 w-32 flex flex-col items-center justify-center rounded-lg border-2 border-white ${plateColor}`}>
            <span className={`text-6xl font-black italic ${textColor}`}>{rider.number}</span>
        </div>
        <div>
            <h2 className="text-3xl font-bold uppercase tracking-wider">{rider.name}</h2>
            <p className="text-lg opacity-90">{rider.team}</p>
            <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                    <USFlag />
                    <span>{rider.location}</span>
                </div>
            </div>
        </div>
      </div>
      
      <Card>
        <CardHeader>
            <h3 className="text-2xl font-bold font-headline uppercase tracking-wider">Accomplishments</h3>
        </CardHeader>
        <CardContent className="space-y-4">
            <ul className="space-y-2">
                {rider.accomplishments.map((item, index) => (
                    <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-2 mt-1">&#9679;</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
            <div className="grid grid-cols-2 gap-4 border-t pt-4">
                <div>
                    <p className="font-bold">Date of Birth:</p>
                    <p>{rider.dob}</p>
                </div>
                <div>
                    <p className="font-bold">Turned AMA Pro:</p>
                    <p>{rider.turnedPro}</p>
                </div>
            </div>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
            <h3 className="text-2xl font-bold font-headline uppercase tracking-wider">Recent Videos</h3>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="aspect-video">
                <iframe
                    className="w-full h-full rounded-lg"
                    src="https://www.youtube.com/embed/6RDZJ57BoUU"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            <div className="aspect-video">
                <iframe
                    className="w-full h-full rounded-lg"
                    src="https://www.youtube.com/embed/gC2-VkH0k24"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}

// This function is needed for Next.js to know which rider pages to generate at build time.
export async function generateStaticParams() {
  return riders250.map((rider) => ({
    riderId: rider.id,
  }));
}
