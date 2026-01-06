
'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/page-header';
import { getAccountById, getExchangeRequestsByAccountId } from '@/lib/firebase-config';
import type { Account, ExchangeRequest } from '@/lib/types';
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

export default function TransactionsPage() {
  const [account, setAccount] = useState<Account | null>(null);
  const [requests, setRequests] = useState<ExchangeRequest[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
      getAccountById(loggedInUserId).then(userAccount => {
        if (userAccount) {
          setAccount(userAccount);
          getExchangeRequestsByAccountId(loggedInUserId).then(setRequests);
        } else {
          router.push('/sign-in');
        }
      });
    } else {
      router.push('/sign-in');
    }
  }, [router]);

  if (!account) {
    return <div>Loading...</div>;
  }

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
              {requests.length > 0 ? (
                requests.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(request => (
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
