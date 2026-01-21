
"use client";

import Link from 'next/link';
import { NavLink } from '@/components/layout/nav-link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase/auth/use-user';
import { auth } from '@/firebase';
import { signOut } from 'firebase/auth';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/races', label: 'Races' },
  { href: '/riders', label: 'Riders' },
  { href: '/standings', label: 'Standings' },
  { href: '/betting', label: 'Play'},
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
        <div className="hidden items-center gap-4 md:flex">
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
         <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6 text-primary-foreground" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background">
                     <nav className="flex flex-col gap-4 p-6">
                        {navItems.map((item) => (
                           <SheetClose asChild key={item.href}>
                             <Link
                                href={item.href}
                                className="text-lg font-medium text-foreground hover:text-primary"
                             >
                                 {item.label}
                             </Link>
                           </SheetClose>
                        ))}
                         <div className="mt-auto flex flex-col gap-2 pt-8">
                          {isLoggedIn ? (
                              <Button onClick={handleSignOut} variant="secondary">
                                  Sign Out
                              </Button>
                          ) : (
                              <>
                                  {!isLoading && (
                                      <>
                                          <SheetClose asChild>
                                              <Button asChild variant="secondary">
                                                  <Link href="/sign-in">Sign In</Link>
                                              </Button>
                                          </SheetClose>
                                          <SheetClose asChild>
                                              <Button asChild>
                                                  <Link href="/register">Register</Link>
                                              </Button>
                                          </SheetClose>
                                      </>
                                  )}
                              </>
                          )}
                        </div>
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
      </div>
      <div className="hidden h-16 items-center justify-start gap-6 bg-black px-4 sm:px-6 lg:px-8 md:flex">
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
