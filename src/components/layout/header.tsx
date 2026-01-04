"use client";

import Image from 'next/image';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, LogOut, Settings, LayoutDashboard, Trophy, Wallet, Repeat, Cog } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { NavLink } from '@/components/layout/nav-link';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/races', label: 'Races', icon: Trophy },
  { href: '/bank', label: 'Bank', icon: Wallet },
  { href: '/exchange', label: 'Exchange', icon: Repeat },
  { href: '/admin', label: 'Admin', icon: Cog },
];

export function Header() {
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar');

  return (
    <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b border-white/10 bg-background px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2.5 text-white">
            <Trophy className="size-8 shrink-0 text-primary" />
            <div className="flex flex-col overflow-hidden">
               <h1 className="font-bold text-2xl truncate font-headline">MXHUB</h1>
            </div>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">
            <div className="text-right">
                <p className="font-bold text-lg text-white">2,500.00 GC</p>
                <p className="text-sm text-red-500">125.00 SC</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full font-bold">ADD FUNDS</Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 focus:outline-none">
              <Avatar className="h-10 w-10 border-2 border-primary">
                {userAvatar && (
                  <AvatarImage
                    src={userAvatar.imageUrl}
                    alt={userAvatar.description}
                    data-ai-hint={userAvatar.imageHint}
                  />
                )}
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-semibold">User Name</span>
                <span className="text-xs text-muted-foreground">user@example.com</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="#">
                <User />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin">
                <Settings />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
