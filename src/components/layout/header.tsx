
"use client";

import Link from 'next/link';
import { NavLink } from '@/components/layout/nav-link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '@/firebase';
import { auth } from '@/lib/firebase-config';
import { signOut } from 'firebase/auth';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/races', label: 'Races' },
  { href: '/riders', label: 'Riders' },
  { href: '/betting', label: 'Betting'},
  { href: '/friends', label: 'Friends'},
  { href: '/account', label: 'Account' },
];

export function Header() {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const isLoggedIn = !isLoading && !!user;
  
  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/sign-in');
  };

  return (
    <header className="sticky top-0 z-10 flex flex-col border-b border-white/10 bg-background">
      <div className="flex h-16 items-center justify-between bg-primary px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <h1 className="font-bold text-2xl truncate font-headline text-primary-foreground">Mxracehub</h1>
        </Link>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
             <Button onClick={handleSignOut} variant="secondary" className="bg-white text-black hover:bg-gray-200">
                Sign Out
             </Button>
          ) : (
            <>
              {!isLoading && (
                <>
                    <Button asChild variant="secondary" className="bg-white text-black hover:bg-gray-200">
                        <Link href="/sign-in">Sign In</Link>
                    </Button>
                    <Button asChild variant="secondary" className="bg-black text-white hover:bg-gray-800">
                        <Link href="/register">Register</Link>
                    </Button>
                </>
              )}
            </>
          )}
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
