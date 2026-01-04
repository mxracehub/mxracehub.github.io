import type { Metadata } from 'next';
import './globals.css';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Header } from '@/components/layout/header';
import Link from 'next/link';
import { Trophy } from 'lucide-react';

export const metadata: Metadata = {
  title: 'MxHub Exchange Duo',
  description: 'Manage your racing world with MxHub Exchange Duo',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&family=Belleza&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <Link href="/" className="flex items-center gap-2.5 p-2 pr-4 text-sidebar-foreground transition-colors hover:text-sidebar-primary-foreground">
                        <Trophy className="size-7 shrink-0 text-primary" />
                        <div className="flex flex-col overflow-hidden">
                           <h1 className="font-headline text-xl font-bold truncate">MxHub Exchange Duo</h1>
                        </div>
                    </Link>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarNav />
                </SidebarContent>
                <SidebarFooter>
                  {/* Optional footer content */}
                </SidebarFooter>
            </Sidebar>
            <SidebarInset>
                <Header />
                <main className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
