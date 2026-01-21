
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
import { processRefundRequest } from '@/lib/firebase-config';
import type { GoldCoinPurchase } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useCollection } from '@/firebase';

export function RefundRequestsTable() {
  const { data: requests, isLoading } = useCollection<GoldCoinPurchase>(
      'goldCoinPurchases',
      ['status', '==', 'Refund Requested'],
      { listen: true }
  );
  const { toast } = useToast();

  const handleStatusChange = async (purchase: GoldCoinPurchase, newStatus: 'Refunded' | 'Completed') => {
    try {
        await processRefundRequest(purchase, newStatus);
        toast({
            title: 'Status Updated',
            description: `Request has been ${newStatus === 'Refunded' ? 'approved and refunded' : 'rejected'}.`
        });
    } catch (error: any) {
        console.error(error);
        toast({
            title: 'Error',
            description: error.message || 'Failed to update request status.',
            variant: 'destructive',
        });
    }
  };

  if (isLoading) {
      return <div>Loading refund requests...</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Purchase ID</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests && requests.length > 0 ? requests.map(purchase => (
            <TableRow key={purchase.id}>
              <TableCell className="font-medium">{purchase.id.substring(0, 8)}...</TableCell>
              <TableCell>{purchase.userId.substring(0,8)}...</TableCell>
              <TableCell>{purchase.amount.toLocaleString()} GC</TableCell>
              <TableCell>${purchase.price.toFixed(2)}</TableCell>
              <TableCell>{new Date(purchase.date).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge variant="secondary">{purchase.status}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        onClick={() => handleStatusChange(purchase, 'Refunded')}
                    >
                      Approve Refund
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleStatusChange(purchase, 'Completed')}
                    >
                      Reject Request
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">No pending refund requests.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
