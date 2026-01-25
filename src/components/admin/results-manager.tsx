
'use client';

import { useCollection } from '@/firebase';
import { getRaceResult, setRaceResult } from '@/lib/firebase-config';
import type { Race, RaceResult } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '../ui/textarea';

const resultTypes = ['450', '250', '450_heat1', '450_heat2', '250_heat1', '250_heat2'];

export function ResultsManager() {
  const { data: races, isLoading: racesLoading } = useCollection<Race>('races', undefined, { listen: true });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRaceId, setSelectedRaceId] = useState<string | null>(null);
  const [isLoadingResult, setIsLoadingResult] = useState(false);
  const { control, handleSubmit, setValue, reset } = useForm();
  
  useEffect(() => {
    if (selectedRaceId) {
      setIsLoadingResult(true);
      reset(); // Clear previous data
      getRaceResult(selectedRaceId).then(result => {
        if (result) {
            Object.entries(result).forEach(([key, value]) => {
                if (key !== 'id' && Array.isArray(value)) {
                    setValue(key, JSON.stringify(value, null, 2));
                }
            });
        }
      }).finally(() => setIsLoadingResult(false));
    } else {
        reset();
    }
  }, [selectedRaceId, reset, setValue]);

  const onSubmit = async (data: any) => {
    if (!selectedRaceId) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please select a race.' });
      return;
    }
    setIsSubmitting(true);
    
    const resultsPayload: Omit<RaceResult, 'id'> = {};
    for (const key in data) {
        if (data[key]) {
            try {
                resultsPayload[key] = JSON.parse(data[key]);
            } catch (e) {
                toast({ variant: 'destructive', title: 'Invalid JSON', description: `Error parsing JSON for ${key}.` });
                setIsSubmitting(false);
                return;
            }
        }
    }

    try {
      await setRaceResult(selectedRaceId, resultsPayload);
      toast({ title: 'Success', description: 'Race results saved successfully.' });
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to save results.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Race Results</CardTitle>
        <CardDescription>Manage results for each race event.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <Label>Select Race</Label>
                <Select onValueChange={setSelectedRaceId} disabled={racesLoading}>
                    <SelectTrigger>
                        <SelectValue placeholder={racesLoading ? "Loading races..." : "Select a race"}/>
                    </SelectTrigger>
                    <SelectContent>
                        {races?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(race => (
                            <SelectItem key={race.id} value={race.id}>{race.name} - {race.date}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
          
            {isLoadingResult ? <div className="text-center p-8"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div> : selectedRaceId && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resultTypes.map(type => (
                        <Controller
                            key={type}
                            name={type}
                            control={control}
                            render={({ field }) => (
                                <div className="space-y-2">
                                    <Label htmlFor={type}>{type.replace('_', ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())} Results (JSON)</Label>
                                    <Textarea
                                        id={type}
                                        placeholder={`Paste JSON array for ${type} results here...`}
                                        className="min-h-[200px] font-mono text-xs"
                                        {...field}
                                    />
                                </div>
                            )}
                        />
                    ))}
                </div>
            )}

            <Button type="submit" disabled={isSubmitting || !selectedRaceId}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Results
            </Button>
        </form>
      </CardContent>
    </Card>
  );
}
