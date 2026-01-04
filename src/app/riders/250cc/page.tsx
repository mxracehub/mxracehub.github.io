import { PageHeader } from '@/components/page-header';
import Image from 'next/image';
import Link from 'next/link';
import { riders250 } from '@/lib/riders-250-data';

export default function Riders250Page() {
  return (
    <div className="text-center">
      <PageHeader title="250cc Riders" />
      <div className="grid grid-cols-2 gap-4 text-left sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {riders250.map((rider) => (
          <Link href={`/riders/250cc/${rider.id}`} key={rider.id}>
            <div className="group overflow-hidden rounded-lg border bg-card text-card-foreground">
              <Image
                src={rider.imageUrl}
                alt={rider.name}
                width={300}
                height={200}
                className="w-full object-cover transition-opacity group-hover:opacity-80"
                data-ai-hint={rider.imageHint}
              />
              <div className="p-2 text-center">
                <p className="text-sm font-semibold">{rider.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
