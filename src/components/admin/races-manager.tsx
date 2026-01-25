
'use client';

import { useCollection } from '@/firebase';
import { addRace, deleteRace, updateRace } from '@/lib/firebase-config';
import type { Race } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MoreHorizontal, PlusCircle, Trash, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const raceSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters.'),
  track: z.string().min(3, 'Track must be at least 3 characters.'),
  location: z.string().min(2, 'Location must be at least 2 characters.'),
  date: z.string().min(1, 'Date is required.'),
  series: z.enum(['Supercross', 'Motocross', 'Playoffs', 'World Supercross']),
  division: z.enum(['East', 'West', 'East/West Showdown']).optional(),
  format: z.enum(['Triple Crown']).optional(),
  round: z.coerce.number().optional(),
  time: z.string().optional(),
  tv: z.string().optional(),
  raceDayLive: z.string().optional(),
});

type RaceFormData = z.infer<typeof raceSchema>;

export function RacesManager() {
  const { data: races, isLoading } = useCollection<Race>('races', undefined, { listen: true });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentRace, setCurrentRace] = useState<Race | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<RaceFormData>({
    resolver: zodResolver(raceSchema),
  });

  const handleDialogOpen = (race?: Race) => {
    if (race) {
      setCurrentRace(race);
      reset(race);
    } else {
      setCurrentRace(null);
      reset({ name: '', track: '', location: '', date: '' });
    }
    setOpen(true);
  };

  const onSubmit = async (data: RaceFormData) => {
    setIsSubmitting(true);
    try {
      if (currentRace) {
        await updateRace(currentRace.id, data);
        toast({ title: 'Success', description: 'Race updated successfully.' });
      } else {
        await addRace(data);
        toast({ title: 'Success', description: 'Race added successfully.' });
      }
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to save race.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteRace(id);
      toast({ title: 'Success', description: 'Race deleted successfully.' });
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete race.' });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Races</CardTitle>
        <CardDescription>Manage your race schedule.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-right mb-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleDialogOpen()}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Race
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{currentRace ? 'Edit' : 'Add'} Race</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input placeholder="Name" {...register('name')} />
                {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
                <Input placeholder="Track" {...register('track')} />
                {errors.track && <p className="text-destructive text-sm">{errors.track.message}</p>}
                <Input placeholder="Location" {...register('location')} />
                {errors.location && <p className="text-destructive text-sm">{errors.location.message}</p>}
                <Input placeholder="Date (e.g., JAN 01)" {...register('date')} />
                {errors.date && <p className="text-destructive text-sm">{errors.date.message}</p>}
                <Controller
                  control={control}
                  name="series"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger><SelectValue placeholder="Select Series" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Supercross">Supercross</SelectItem>
                        <SelectItem value="Motocross">Motocross</SelectItem>
                        <SelectItem value="Playoffs">Playoffs</SelectItem>
                        <SelectItem value="World Supercross">World Supercross</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.series && <p className="text-destructive text-sm">{errors.series.message}</p>}
                 <DialogFooter>
                    <DialogClose asChild><Button type="button" variant="ghost">Cancel</Button></DialogClose>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save
                    </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Series</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={5} className="text-center">Loading...</TableCell></TableRow>
            ) : (
              races?.map((race) => (
                <TableRow key={race.id}>
                  <TableCell>{race.name}</TableCell>
                  <TableCell>{race.series}</TableCell>
                  <TableCell>{race.date}</TableCell>
                  <TableCell>{race.location}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleDialogOpen(race)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(race.id)} className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

