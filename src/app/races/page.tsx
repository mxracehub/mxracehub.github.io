import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function RacesPage() {
    const motorcrossImage = PlaceHolderImages.find(p => p.id === 'race-banner-1');
    const supercrossImage = PlaceHolderImages.find(p => p.id === 'race-day-banner');

  return (
    <div>
      <PageHeader
        title="Races"
        description="Select a racing series to view the schedule and results."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
            {motorcrossImage && (
                <Image 
                    src={motorcrossImage.imageUrl}
                    alt="Motorcross"
                    width={600}
                    height={300}
                    className="rounded-t-lg object-cover w-full h-48"
                    data-ai-hint={motorcrossImage.imageHint}
                />
            )}
            <CardContent className="p-6">
                <h2 className="text-2xl font-bold">Motorcross</h2>
                <p className="text-muted-foreground mb-4">View the outdoor national series schedule.</p>
                <Button asChild>
                    <Link href="/motorcross">View Schedule</Link>
                </Button>
            </CardContent>
        </Card>
        <Card>
            {supercrossImage && (
                <Image 
                    src={supercrossImage.imageUrl}
                    alt="Supercross"
                    width={600}
                    height={300}
                    className="rounded-t-lg object-cover w-full h-48"
                    data-ai-hint={supercrossImage.imageHint}
                />
            )}
            <CardContent className="p-6">
                <h2 className="text-2xl font-bold">Supercross</h2>
                <p className="text-muted-foreground mb-4">View the stadium racing series schedule.</p>
                <Button asChild>
                    <Link href="/supercross">View Schedule</Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
