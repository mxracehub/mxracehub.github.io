
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motorcrossRaces } from '@/lib/races-motorcross-data';
import Image from 'next/image';

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
