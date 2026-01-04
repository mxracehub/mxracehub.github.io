import { PageHeader } from '@/components/page-header';
import Image from 'next/image';
import Link from 'next/link';
import { riders250 } from '@/lib/riders-250-data';

export default function Riders250Page() {
  return (
    <div>
      <PageHeader title="250cc Riders" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {riders250.map((rider) => (
          <Link href={`/riders/250cc/${rider.id}`} key={rider.id}>
            <div className="group rounded-lg overflow-hidden border bg-card text-card-foreground">
              <Image
                src={rider.imageUrl}
                alt={rider.name}
                width={300}
                height={200}
                className="w-full object-cover group-hover:opacity-80 transition-opacity"
                data-ai-hint={rider.imageHint}
              />
              <div className="p-2 text-center">
                <p className="font-semibold text-sm">{rider.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
