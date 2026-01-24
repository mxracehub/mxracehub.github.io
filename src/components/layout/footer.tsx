
import Link from 'next/link';
import { Instagram, Youtube } from 'lucide-react';

const footerNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/races', label: 'Races' },
  { href: '/riders', label: 'Riders' },
  { href: '/standings', label: 'Standings' },
  { href: '/play', label: 'Play' },
  { href: '/friends', label: 'Friends' },
  { href: '/account', label: 'Account' },
  { href: '/policies', label: 'Policies' },
  { href: '/contact', label: 'Contact' },
];

export function Footer() {
  // Adding Privacy to the nav links if it's not there.
  if (!footerNavLinks.find(link => link.href === '/policies')) {
      const contactIndex = footerNavLinks.findIndex(link => link.href === '/contact');
      if (contactIndex !== -1) {
          footerNavLinks.splice(contactIndex, 0, { href: '/policies', label: 'Privacy' });
      } else {
          footerNavLinks.push({ href: '/policies', label: 'Privacy' });
      }
  }
  // Renaming policies to rules to match screenshot better
   const policiesLink = footerNavLinks.find(link => link.href === '/policies');
   if (policiesLink && policiesLink.label === 'Policies') {
       policiesLink.label = "Rules/Policies";
   }


  return (
    <footer className="border-t border-white/10 bg-background text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {/* Left: Navigation */}
          <div className="flex flex-col gap-1 items-start text-left">
            {footerNavLinks.map((link) => (
              <Link key={link.label} href={link.href} className="text-sm text-red-500 hover:underline">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Middle: Logos */}
          <div className="flex flex-col items-end md:items-center justify-start gap-4">
            <Link href="/motorcross">
              <svg viewBox="0 0 100 100" className="h-16 w-auto">
                <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="4" />
                <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="white" fontSize="40" fontFamily="sans-serif" fontWeight="bold">MX</text>
              </svg>
            </Link>
            <Link href="/supercross">
              <svg viewBox="0 0 100 100" className="h-16 w-auto">
                <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="4" />
                <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="white" fontSize="40" fontFamily="sans-serif" fontWeight="bold">SX</text>
              </svg>
            </Link>
          </div>

          {/* Right: Social Icons & Instructions */}
          <div className="hidden md:flex flex-col items-center md:items-end gap-4">
              <div className="flex items-start justify-center md:justify-end gap-6">
                  <Link href="#" aria-label="YouTube">
                  <Youtube className="h-8 w-8 text-red-600" />
                  </Link>
                  <Link href="#" aria-label="Instagram">
                  <Instagram className="h-8 w-8 text-red-600" />
                  </Link>
              </div>
              <div className="text-center md:text-right mt-4">
                  <h4 className="font-bold text-lg mb-2">Basic Instructions</h4>
                  <ul className="space-y-1 text-sm text-foreground/90">
                      <li>1. Sign-up <span className="text-muted-foreground">(FREE)</span></li>
                      <li>2. Get Gold Coins <span className="text-muted-foreground">(WIN/OPTIONAL)</span></li>
                      <li>3. Make Friends <span className="text-muted-foreground">(FREE)</span></li>
                      <li>4. Play <span className="text-muted-foreground">(FREE)</span></li>
                      <li>5. Win Sweeps Coins <span className="text-muted-foreground">(FREE)</span></li>
                      <li>6. Play With Sweeps Coins <span className="text-muted-foreground">(FREE)</span></li>
                      <li>7. Redeem <span className="text-muted-foreground">(FREE)</span></li>
                  </ul>
              </div>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="mt-5 pt-1 text-center text-xs text-muted-foreground">
        <p>NO PURCHASE NECESSARY TO ENTER TRIVIA SWEEPSTAKES. TRIVIA SWEEPSTAKES ARE VOID WHERE PROHIBITED BY LAW. For detailed rules, see terms of service</p>
        </div>
        <div className="mt-1 pt-1 text-center text-xs text-muted-foreground">
        <p>MxRaceHub is committed to responsible social play, for more information visit 
        Gamingaddictsanonymous.org</p>
        </div>
        <div className="mt-4 pt-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Mxracehub | ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}
