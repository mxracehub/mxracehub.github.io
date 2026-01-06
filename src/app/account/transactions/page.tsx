
'use client';

import { useEffect } from 'react';
import { PageHeader } from '@/components/page-header';
import { getExchangeRequestsByAccountId } from '@/lib/firebase-config';
import type { ExchangeRequest } from '@/lib/types';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useUser, useCollection } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';

function TransactionsPageSkeleton() {
    return (
        <div>
            <PageHeader title="Transaction History" description="View your past exchange requests." />
            <Card>
                <CardContent className="p-0">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...Array(5)].map((_, i) => (
                             <TableRow key={i}>
                                <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                                <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
        </div>
    )
}


export default function TransactionsPage() {
  const router = useRouter();
  const { user, isLoading: isUserLoading } = useUser();
  const { data: requests, isLoading: isRequestsLoading } = useCollection<ExchangeRequest>(
      'exchangeRequests', 
      user ? ['accountId', '==', user.uid] : undefined,
      { listen: true }
  );
  
  useEffect(() => {
    if (!isUserLoading && !user) {
        router.push('/sign-in');
    }
  }, [isUserLoading, user, router]);

  const isLoading = isUserLoading || isRequestsLoading;

  if (isLoading) {
    return <TransactionsPageSkeleton />;
  }

  const sortedRequests = requests ? [...requests].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()) : [];

  return (
    <div>
      <PageHeader title="Transaction History" description="View your past exchange requests." />
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedRequests.length > 0 ? (
                sortedRequests.map(request => (
                  <TableRow key={request.id}>
                    <TableCell>{new Date(request.date).toLocaleDateString()}</TableCell>
                    <TableCell>{request.type}</TableCell>
                    <TableCell>{request.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          request.status === 'Approved'
                            ? 'default'
                            : request.status === 'Rejected'
                            ? 'destructive'
                            : 'secondary'
                        }
                        className={request.status === 'Approved' ? 'bg-green-600' : ''}
                      >
                        {request.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center h-24">
                    You have no transaction history.
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
