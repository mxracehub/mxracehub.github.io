
"use client";

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { summarizeRaceData } from '@/ai/flows/summarize-race-data';
import { Label } from '@/components/ui/label';
import { Bot, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function SummarizerForm() {
  const [raceData, setRaceData] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!raceData.trim()) {
      toast({
        title: 'Input Required',
        description: 'Please enter some race data to summarize.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setSummary('');
    try {
      const result = await summarizeRaceData({ raceData });
      setSummary(result.summary);
    } catch (error) {
      console.error('Summarization failed:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate summary. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Summarization</CardTitle>
        <CardDescription>
          Use AI to automatically generate a brief summary from raw race data.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="raw-data">Raw Race Data</Label>
          <Textarea
            id="raw-data"
            placeholder="Paste your raw race data here..."
            className="min-h-[150px]"
            value={raceData}
            onChange={(e) => setRaceData(e.target.value)}
            disabled={isLoading}
          />
        </div>
        {summary && (
          <div className="space-y-2">
            <Label>AI Generated Summary</Label>
            <div className="rounded-md border bg-muted/50 p-4 text-sm">
                {summary}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSummarize} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Bot className="mr-2 h-4 w-4" />
          )}
          {isLoading ? 'Generating...' : 'Generate Summary'}
        </Button>
      </CardFooter>
    </Card>
  );
}
