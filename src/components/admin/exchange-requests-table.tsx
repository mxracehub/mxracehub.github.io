
'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { getExchangeRequests, processExchangeRequest } from '@/lib/firebase-config';
import type { ExchangeRequest } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export function ExchangeRequestsTable() {
  const [requests, setRequests] = useState<ExchangeRequest[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRequests = async () => {
        const initialRequests = await getExchangeRequests();
        setRequests(initialRequests);
    }
    fetchRequests();
  }, []);

  const handleStatusChange = async (request: ExchangeRequest, newStatus: 'Approved' | 'Rejected') => {
    try {
        await processExchangeRequest(request, newStatus);
        setRequests(prevRequests =>
          prevRequests.map(req =>
            req.id === request.id ? { ...req, status: newStatus } : req
          )
        );
        toast({
            title: 'Status Updated',
            description: `Request has been ${newStatus.toLowerCase()}.`
        });
    } catch (error) {
        console.error(error);
        toast({
            title: 'Error',
            description: 'Failed to update request status.',
            variant: 'destructive',
        });
    }
  };

  const sortedRequests = [...requests].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Request ID</TableHead>
            <TableHead>Account Name</TableHead>
             <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedRequests.map(request => (
            <TableRow key={request.id}>
              <TableCell className="font-medium">{request.id.substring(0, 8)}...</TableCell>
              <TableCell>{request.accountName}</TableCell>
              <TableCell>{request.type}</TableCell>
              <TableCell>{request.amount.toLocaleString()}</TableCell>
              <TableCell>{new Date(request.date).toLocaleDateString()}</TableCell>
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
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0" disabled={request.status !== 'Pending'}>
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        onClick={() => handleStatusChange(request, 'Approved')}
                    >
                      Approve
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleStatusChange(request, 'Rejected')}
                    >
                      Reject
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
