
import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { accounts } from '@/lib/accounts-data';
import { notFound } from 'next/navigation';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Coins, Trophy, Users, Settings } from 'lucide-react';
import Link from 'next/link';

export default function AccountPage() {
  const account = accounts.find((a) => a.id === 'user-123'); // Example user
  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar');

  if (!account) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title="My Account"
        description="View your profile, balances, and betting history."
      >
        <div className="absolute top-0 right-0 mt-4 mr-4">
            <Button asChild variant="outline">
                <Link href="/account/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                </Link>
            </Button>
        </div>
      </PageHeader>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
            <Card>
                <CardHeader className="items-center text-center">
                    <Avatar className="h-24 w-24 border-4 border-primary">
                        {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={account.name} />}
                        <AvatarFallback>{account.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="mt-2">{account.name}</CardTitle>
                    <CardDescription>@{account.username}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground">{account.bio}</p>
                </CardContent>
            </Card>
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Coins className="text-yellow-500" /> Balances</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <p className="font-bold text-2xl">{account.balances.gold.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Gold Coins</p>
                    </div>
                    <div>
                        <p className="font-bold text-2xl">{account.balances.sweeps.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Sweeps Coins</p>
                    </div>
                    <Button className="w-full" asChild>
                        <Link href="/bank">Purchase Gold Coins</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Trophy /> Betting History</CardTitle>
            </CardHeader>
            <CardContent>
              {account.betHistory.length > 0 ? (
                <ul className="space-y-4">
                  {account.betHistory.map((bet) => (
                    <li key={bet.id} className="flex items-center justify-between rounded-md border p-4">
                      <div>
                        <p className="font-semibold">{bet.race}</p>
                        <p className="text-sm text-muted-foreground">
                          Bet against @{bet.opponent} - {bet.date}
                        </p>
                      </div>
                      <div className={`text-right ${bet.status === 'Won' ? 'text-green-500' : bet.status === 'Lost' ? 'text-red-500' : ''}`}>
                          <p className="font-bold">{bet.status}</p>
                          <p className="text-sm">{bet.amount} {bet.coinType}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-10 text-center text-muted-foreground">
                  <p>You haven't placed any bets yet.</p>
                  <Button variant="link" asChild><Link href="/betting">Place your first bet</Link></Button>
                </div>
              )}
            </CardContent>
          </Card>
           <Card className="mt-4">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Users /> Friends</CardTitle>
                </CardHeader>
                 <CardContent>
                     <p className="text-muted-foreground">Coming soon!</p>
                 </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
