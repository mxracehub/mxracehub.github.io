import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function RidersPage() {
    const rider450ccImage = PlaceHolderImages.find(p => p.id === '450-rider-banner');
    const rider250ccImage = PlaceHolderImages.find(p => p.id === '250-rider-banner');

  return (
    <div>
      <PageHeader
        title="Riders"
        description="Select a class to view the riders."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
            {rider450ccImage && (
                <Image 
                    src={rider450ccImage.imageUrl}
                    alt="450cc Riders"
                    width={600}
                    height={300}
                    className="rounded-t-lg object-cover w-full h-48"
                    data-ai-hint={rider450ccImage.imageHint}
                />
            )}
            <CardContent className="p-6">
                <h2 className="text-2xl font-bold">450cc</h2>
                <p className="text-muted-foreground mb-4">View the premier class riders.</p>
                <Button asChild>
                    <Link href="/riders/450cc">View Riders</Link>
                </Button>
            </CardContent>
        </Card>
        <Card>
            {rider250ccImage && (
                <Image 
                    src={rider250ccImage.imageUrl}
                    alt="250cc Riders"
                    width={600}
                    height={300}
                    className="rounded-t-lg object-cover w-full h-48"
                    data-ai-hint={rider250ccImage.imageHint}
                />
            )}
            <CardContent className="p-6">
                <h2 className="text-2xl font-bold">250cc</h2>
                <p className="text-muted-foreground mb-4">View the upcoming stars.</p>
                <Button asChild>
                    <Link href="/riders/250cc">View Riders</Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
