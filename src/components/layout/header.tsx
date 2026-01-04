"use client";

import Link from 'next/link';
import { NavLink } from '@/components/layout/nav-link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/races', label: 'Races' },
  { href: '#', label: 'Riders' },
  { href: '#', label: 'Betting'},
  { href: '#', label: 'Account' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex flex-col border-b border-white/10 bg-background">
      <div className="flex h-16 items-center justify-between bg-primary px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <h1 className="font-bold text-2xl truncate font-headline text-primary-foreground">MXracehub</h1>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="secondary" className="bg-white text-black hover:bg-gray-200">Sign In</Button>
          <Button variant="secondary" className="bg-black text-white hover:bg-gray-800">Register</Button>
        </div>
      </div>
      <div className="flex h-16 items-center justify-start gap-6 bg-black px-4 sm:px-6 lg:px-8">
         <Link href="/">
            <Avatar className="h-10 w-10 border-2 border-primary">
                <AvatarFallback className="bg-white text-black font-bold">MX</AvatarFallback>
            </Avatar>
        </Link>
        <nav className="flex items-center gap-4">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
