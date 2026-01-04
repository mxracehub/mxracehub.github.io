"use client";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Trophy,
  Wallet,
  Repeat,
  Cog,
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/races', label: 'Races', icon: Trophy },
  { href: '/bank', label: 'Bank', icon: Wallet },
  { href: '/exchange', label: 'Exchange', icon: Repeat },
  { href: '/admin', label: 'Admin', icon: Cog },
];

export function SidebarNav() {
  const pathname = usePathname();
  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href}
            tooltip={{ children: item.label, className: 'bg-sidebar text-sidebar-foreground border-sidebar-border' }}
          >
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
