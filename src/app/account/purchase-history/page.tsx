
'use client';

import { useMemo } from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useUser, useDoc, useCollection } from '@/firebase';
import type { Account, GoldCoinPurchase } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { updateGoldCoinPurchase } from '@/lib/firebase-config';

function PurchaseHistorySkeleton() {
    return (
        <div>
            <PageHeader title="Purchase History" description="Review your past Gold Coin purchases and request refunds." />
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Package ID</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[...Array(3)].map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                                    <TableCell className="text-right"><Skeleton className="h-9 w-28" /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default function PurchaseHistoryPage() {
    const router = useRouter();
    const { toast } = useToast();
    const { user, isLoading: isUserLoading } = useUser();
    const { data: account, isLoading: isAccountLoading } = useDoc<Account>('accounts', user?.uid, { listen: true });
    const { data: purchases, isLoading: isPurchasesLoading } = useCollection<GoldCoinPurchase>(
        'goldCoinPurchases',
        ['userId', '==', user?.uid],
        { listen: true }
    );

    const handleRequestRefund = async (purchase: GoldCoinPurchase) => {
        if (!account) return;
        if (account.balances.gold < purchase.amount) {
            toast({
                title: 'Cannot Request Refund',
                description: 'Your current balance is less than the purchase amount. Coins may have been spent.',
                variant: 'destructive',
            });
            return;
        }

        try {
            await updateGoldCoinPurchase(purchase.id, { status: 'Refund Requested' });
            toast({
                title: 'Refund Requested',
                description: 'Your refund request has been submitted for review.',
            });
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'Failed to submit refund request. Please try again.',
                variant: 'destructive',
            });
        }
    };
    
    const sortedPurchases = useMemo(() => {
        return purchases ? [...purchases].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()) : [];
    }, [purchases]);
    
    const isLoading = isUserLoading || isAccountLoading || isPurchasesLoading;

    if (isLoading) {
        return <PurchaseHistorySkeleton />;
    }
    
    if (!user && !isUserLoading) {
        router.push('/sign-in');
        return <PurchaseHistorySkeleton />;
    }

    return (
        <div>
            <PageHeader title="Purchase History" description="Review your past Gold Coin purchases and request refunds." />
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Package ID</TableHead>
                                <TableHead>Amount (GC)</TableHead>
                                <TableHead>Price (USD)</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedPurchases.length > 0 ? (
                                sortedPurchases.map(p => {
                                    const canRequestRefund = p.status === 'Completed' && (account?.balances.gold ?? 0) >= p.amount;
                                    return (
                                        <TableRow key={p.id}>
                                            <TableCell>{new Date(p.date).toLocaleDateString()}</TableCell>
                                            <TableCell>{p.packageId}</TableCell>
                                            <TableCell>{p.amount.toLocaleString()}</TableCell>
                                            <TableCell>${p.price.toFixed(2)}</TableCell>
                                            <TableCell>
                                                <Badge variant={p.status === 'Refunded' ? 'destructive' : p.status === 'Refund Requested' ? 'secondary' : 'default'}>
                                                    {p.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {p.status === 'Completed' && (
                                                    <Button 
                                                        size="sm"
                                                        onClick={() => handleRequestRefund(p)}
                                                        disabled={!canRequestRefund}
                                                        title={!canRequestRefund ? 'Your current balance is too low to refund this purchase.' : 'Request a refund for this purchase.'}
                                                    >
                                                        Request Refund
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center h-24">
                                        You have no Gold Coin purchase history.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
