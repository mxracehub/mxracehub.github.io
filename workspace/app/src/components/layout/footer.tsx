
import Link from 'next/link';
import { Instagram, Youtube } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const footerNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/races', label: 'Races' },
  { href: '/riders', label: 'Riders' },
  { href: '/betting', label: 'Betting' },
  { href: '/account', label: 'Account' },
  { href: '/policies', label: 'Policies' },
  { href: '/contact', label: 'Contact' },
];

export function Footer() {
  const proRacingLogo = PlaceHolderImages.find(p => p.id === 'pro-racing-logo');
  const amaLogo = PlaceHolderImages.find(p => p.id === 'ama-logo');
  const monsterLogo = PlaceHolderImages.find(p => p.id === 'monster-logo');

  return (
    <footer className="border-t border-white/10 bg-background text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Left: Navigation */}
          <div className="grid grid-cols-2 gap-4">
            {footerNavLinks.map((link) => (
              <Link key={link.label} href={link.href} className="text-sm text-red-500 hover:underline">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Middle: Logos */}
          <div className="flex flex-col items-center justify-start gap-4">
             {proRacingLogo && <Image src={proRacingLogo.imageUrl} alt={proRacingLogo.description} width={120} height={40} data-ai-hint={proRacingLogo.imageHint} />}
             {amaLogo && <Image src={amaLogo.imageUrl} alt={amaLogo.description} width={100} height={50} data-ai-hint={amaLogo.imageHint}/>}
             {monsterLogo && <Image src={monsterLogo.imageUrl} alt={monsterLogo.description} width={150} height={40} data-ai-hint={monsterLogo.imageHint} />}
          </div>

          {/* Right: Social Icons */}
          <div className="flex items-start justify-center md:justify-end gap-6">
            <Link href="#" aria-label="YouTube">
              <Youtube className="h-8 w-8 text-red-600" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram className="h-8 w-8 text-red-600" />
            </Link>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="mt-8 border-t border-white/10 pt-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Mxracehub</p>
        </div>
      </div>
    </footer>
  );
}
