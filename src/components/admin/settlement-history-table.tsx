'use client';

import { useCollection } from '@/firebase';
import type { SettlementRecord } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

function SettlementHistorySkeleton() {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Plays Settled</TableHead>
                        <TableHead>Accounts Updated</TableHead>
                        <TableHead>Triggered By</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[...Array(5)].map((_, i) => (
                        <TableRow key={i}>
                            <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                            <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                            <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                            <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export function SettlementHistoryTable() {
    const { data: records, isLoading } = useCollection<SettlementRecord>('settlementRecords', undefined, { listen: true });

    if (isLoading) {
        return <SettlementHistorySkeleton />;
    }

    const sortedRecords = records ? [...records].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()) : [];

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Plays Settled</TableHead>
                        <TableHead>Accounts Updated</TableHead>
                        <TableHead>Triggered By</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedRecords.length > 0 ? (
                        sortedRecords.map(record => (
                            <TableRow key={record.id}>
                                <TableCell>{new Date(record.date).toLocaleString()}</TableCell>
                                <TableCell>{record.settledPlays}</TableCell>
                                <TableCell>{record.updatedAccounts}</TableCell>
                                <TableCell>{record.triggeredBy}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
                                No settlement records found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
