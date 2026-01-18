
'use client';

import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getManufacturersPoints, type ManufacturerPoints } from '@/lib/manufacturers-points-service';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ManufacturersStandingsPage() {
    const [manufacturerPoints, setManufacturerPoints] = useState<ManufacturerPoints[]>([]);

    useEffect(() => {
        setManufacturerPoints(getManufacturersPoints());
    }, []);

    return (
        <div className="max-w-2xl mx-auto">
            <PageHeader
                title="Manufacturers Championship"
                description="2026 SX Manufacturers Championship Series Points"
            />
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Standings
                </CardTitle>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Pos</TableHead>
                        <TableHead>Manufacturer</TableHead>
                        <TableHead className="text-right">Points</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {manufacturerPoints.map((m) => (
                        <TableRow key={m.manufacturer}>
                        <TableCell>{m.pos}</TableCell>
                        <TableCell>{m.manufacturer}</TableCell>
                        <TableCell className="text-right">{m.points}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full">
                        <Link href="/betting/manufacturer-championship">Bet on Championship Winner</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
