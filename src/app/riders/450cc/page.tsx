import { PageHeader } from '@/components/page-header';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const riders450 = [
  { id: 'jett-lawrence', name: 'Jett Lawrence', imageUrl: 'https://picsum.photos/seed/jett/300/200', imageHint: 'Jett Lawrence action' },
  { id: 'chase-sexton', name: 'Chase Sexton', imageUrl: 'https://picsum.photos/seed/sexton/300/200', imageHint: 'Chase Sexton action' },
  { id: 'eli-tomac', name: 'Eli Tomac', imageUrl: 'https://picsum.photos/seed/tomac/300/200', imageHint: 'Eli Tomac action' },
  { id: 'ken-roczen', name: 'Ken Roczen', imageUrl: 'https://picsum.photos/seed/roczen/300/200', imageHint: 'Ken Roczen action' },
  { id: 'jason-anderson', name: 'Jason Anderson', imageUrl: 'https://picsum.photos/seed/anderson/300/200', imageHint: 'Jason Anderson action' },
  { id: 'justin-barcia', name: 'Justin Barcia', imageUrl: 'https://picsum.photos/seed/barcia/300/200', imageHint: 'Justin Barcia action' },
  { id: 'aaron-plessinger', name: 'Aaron Plessinger', imageUrl: 'https://picsum.photos/seed/plessinger/300/200', imageHint: 'Aaron Plessinger action' },
  { id: 'cooper-webb', name: 'Cooper Webb', imageUrl: 'https://picsum.photos/seed/webb/300/200', imageHint: 'Cooper Webb action' },
  { id: 'adam-cianciarulo', name: 'Adam Cianciarulo', imageUrl: 'https://picsum.photos/seed/cianciarulo/300/200', imageHint: 'Adam Cianciarulo action' },
  { id: 'dylan-ferrandis', name: 'Dylan Ferrandis', imageUrl: 'https://picsum.photos/seed/ferrandis/300/200', imageHint: 'Dylan Ferrandis action' },
  { id: 'malcolm-stewart', name: 'Malcolm Stewart', imageUrl: 'https://picsum.photos/seed/mstewart/300/200', imageHint: 'Malcolm Stewart action' },
  { id: 'justin-cooper', name: 'Justin Cooper', imageUrl: 'https://picsum.photos/seed/jcooper/300/200', imageHint: 'Justin Cooper action' },
  { id: 'hunter-lawrence', name: 'Hunter Lawrence', imageUrl: 'https://picsum.photos/seed/hunter/300/200', imageHint: 'Hunter Lawrence action' },
  { id: 'justin-hill', name: 'Justin Hill', imageUrl: 'https://picsum.photos/seed/jhill/300/200', imageHint: 'Justin Hill action' },
  { id: 'shane-mcelrath', name: 'Shane McElrath', imageUrl: 'https://picsum.photos/seed/mcelrath/300/200', imageHint: 'Shane McElrath action' },
  { id: 'dean-wilson', name: 'Dean Wilson', imageUrl: 'https://picsum.photos/seed/wilson/300/200', imageHint: 'Dean Wilson action' },
  { id: 'fredrik-noren', name: 'Fredrik Noren', imageUrl: 'https://picsum.photos/seed/noren/300/200', imageHint: 'Fredrik Noren action' },
  { id: 'grant-harlan', name: 'Grant Harlan', imageUrl: 'https://picsum.photos/seed/harlan/300/200', imageHint: 'Grant Harlan action' },
  { id: 'benny-bloss', name: 'Benny Bloss', imageUrl: 'https://picsum.photos/seed/bloss/300/200', imageHint: 'Benny Bloss action' },
  { id: 'ty-masterpool', name: 'Ty Masterpool', imageUrl: 'https://picsum.photos/seed/masterpool/300/200', imageHint: 'Ty Masterpool action' },
];

export default function Riders450Page() {
  return (
    <div>
      <PageHeader title="450cc Riders" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {riders450.map((rider) => (
          <Link href={`/riders/450cc/${rider.id}`} key={rider.id}>
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
