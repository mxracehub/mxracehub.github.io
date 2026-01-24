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
import { Menu, X, Instagram, Youtube } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/races', label: 'Races' },
  { href: '/riders', label: 'Riders' },
  { href: '/standings', label: 'Standings' },
  { href: '/play', label: 'Play'},
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

  const AppIcon = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        d="M7 2C5.34315 2 4 3.34315 4 5V19C4 20.6569 5.34315 22 7 22H17C18.6569 22 20 20.6569 20 19V5C20 3.34315 18.6569 2 17 2H7Z M8 5H16V17H8V5Z"
        fillRule="evenodd"
        fill="currentColor"
      />
      <rect x="9" y="19" width="6" height="1" fill="black" />
    </svg>
  );

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
                     <nav className="flex h-full flex-col p-6">
                        <div className="flex-1 space-y-4">
                            {navItems.map((item) => (
                            <SheetClose asChild key={item.href}>
                                <Link
                                href={item.href}
                                className="block text-lg font-medium text-foreground hover:text-primary"
                                >
                                    {item.label}
                                </Link>
                            </SheetClose>
                            ))}
                        </div>
                        
                        <div className="flex items-center justify-center gap-6 py-6">
                            <Link href="#" aria-label="YouTube">
                                <Youtube className="h-8 w-8 text-red-600" />
                            </Link>
                            <Link href="#" aria-label="Instagram">
                                <Instagram className="h-8 w-8 text-red-600" />
                            </Link>
                            <Link href="#" aria-label="Download App">
                                <AppIcon className="h-8 w-8 text-red-600" />
                            </Link>
                        </div>
                        
                        <div className="flex flex-col gap-2">
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
      <div className="hidden h-16 items-center justify-between gap-6 bg-black px-4 sm:px-6 lg:px-8 md:flex">
        <div className="flex items-center gap-6">
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
        <div className="flex items-center gap-6">
            <Link href="#" aria-label="YouTube">
                <Youtube className="h-8 w-8 text-red-600" />
            </Link>
            <Link href="#" aria-label="Instagram">
                <Instagram className="h-8 w-8 text-red-600" />
            </Link>
            <Link href="#" aria-label="Download App">
                <AppIcon className="h-8 w-8 text-red-600" />
            </Link>
        </div>
      </div>
    </header>
  );
}
