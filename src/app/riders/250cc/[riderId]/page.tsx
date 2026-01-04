import { PageHeader } from '@/components/page-header';
import { riders250 } from '@/lib/riders-250-data';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function RiderDetailPage({ params }: { params: { riderId: string } }) {
  const rider = riders250.find((r) => r.id === params.riderId);

  if (!rider) {
    notFound();
  }

  return (
    <div>
      <PageHeader title={rider.name} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
            <Card>
                <Image
                src={rider.imageUrl}
                alt={rider.name}
                width={400}
                height={400}
                className="rounded-t-lg w-full object-cover"
                data-ai-hint={rider.imageHint}
                />
                <CardHeader>
                    <CardTitle>{rider.name}</CardTitle>
                </CardHeader>
            </Card>
        </div>
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Rider Details</CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-muted-foreground">Detailed stats and bio will be available here soon.</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

// This function is needed for Next.js to know which rider pages to generate at build time.
export async function generateStaticParams() {
  return riders250.map((rider) => ({
    riderId: rider.id,
  }));
}
