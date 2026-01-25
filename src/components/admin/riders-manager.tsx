
'use client';

import { useCollection } from '@/firebase';
import { addRider, deleteRider, updateRider } from '@/lib/firebase-config';
import type { Rider } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MoreHorizontal, PlusCircle, Loader2 } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '../ui/textarea';

const riderSchema = z.object({
  name: z.string().min(2, 'Name is required.'),
  number: z.string().min(1, 'Number is required.'),
  team: z.string().min(2, 'Team is required.'),
  class: z.enum(['450cc', '250cc']),
  location: z.string().optional(),
  dob: z.string().optional(),
  turnedPro: z.string().optional(),
  accomplishments: z.string().optional(),
  videos: z.string().optional(),
});

type RiderFormData = z.infer<typeof riderSchema>;

export function RidersManager() {
  const { data: riders, isLoading } = useCollection<Rider>('riders', undefined, { listen: true });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentRider, setCurrentRider] = useState<Rider | null>(null);

  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<RiderFormData>({
    resolver: zodResolver(riderSchema),
  });

  const handleDialogOpen = (rider?: Rider) => {
    if (rider) {
      setCurrentRider(rider);
      reset({ ...rider, accomplishments: rider.accomplishments?.join('\n'), videos: rider.videos?.join('\n') });
    } else {
      setCurrentRider(null);
      reset({ name: '', number: '', team: '', class: '450cc' });
    }
    setOpen(true);
  };

  const onSubmit = async (data: RiderFormData) => {
    setIsSubmitting(true);
    const payload = {
        ...data,
        accomplishments: data.accomplishments?.split('\n').filter(Boolean),
        videos: data.videos?.split('\n').filter(Boolean),
    };

    try {
      if (currentRider) {
        await updateRider(currentRider.id, payload);
        toast({ title: 'Success', description: 'Rider updated successfully.' });
      } else {
        await addRider(payload);
        toast({ title: 'Success', description: 'Rider added successfully.' });
      }
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to save rider.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteRider(id);
      toast({ title: 'Success', description: 'Rider deleted successfully.' });
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete rider.' });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Riders</CardTitle>
        <CardDescription>Manage rider profiles.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-right mb-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button onClick={() => handleDialogOpen()}><PlusCircle className="mr-2 h-4 w-4" /> Add Rider</Button></DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
              <DialogHeader><DialogTitle>{currentRider ? 'Edit' : 'Add'} Rider</DialogTitle></DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input placeholder="Name" {...register('name')} />
                {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
                <Input placeholder="Number" {...register('number')} />
                 {errors.number && <p className="text-destructive text-sm">{errors.number.message}</p>}
                <Input placeholder="Team" {...register('team')} />
                 {errors.team && <p className="text-destructive text-sm">{errors.team.message}</p>}
                <Controller control={control} name="class" render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger><SelectValue placeholder="Select Class" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="450cc">450cc</SelectItem>
                        <SelectItem value="250cc">250cc</SelectItem>
                      </SelectContent>
                    </Select>
                )} />
                <Input placeholder="Location" {...register('location')} />
                <Input placeholder="Date of Birth" {...register('dob')} />
                <Input placeholder="Turned Pro Year" {...register('turnedPro')} />
                <Textarea placeholder="Accomplishments (one per line)" {...register('accomplishments')} />
                <Textarea placeholder="Video URLs (one per line)" {...register('videos')} />
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
              <TableHead>#</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Team</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={5} className="text-center">Loading...</TableCell></TableRow>
            ) : (
              riders?.sort((a,b) => a.name.localeCompare(b.name)).map((rider) => (
                <TableRow key={rider.id}>
                  <TableCell>{rider.name}</TableCell>
                  <TableCell>{rider.number}</TableCell>
                  <TableCell>{rider.class}</TableCell>
                  <TableCell>{rider.team}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleDialogOpen(rider)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(rider.id)} className="text-destructive">Delete</DropdownMenuItem>
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
