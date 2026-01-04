'use server';

/**
 * @fileOverview A flow that summarizes race data using AI.
 *
 * - summarizeRaceData - A function that summarizes the race data.
 * - SummarizeRaceDataInput - The input type for the summarizeRaceData function.
 * - SummarizeRaceDataOutput - The return type for the summarizeRaceData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeRaceDataInputSchema = z.object({
  raceData: z
    .string()
    .describe('The raw race data to be summarized.'),
});
export type SummarizeRaceDataInput = z.infer<typeof SummarizeRaceDataInputSchema>;

const SummarizeRaceDataOutputSchema = z.object({
  summary: z.string().describe('A brief summary of the race data.'),
});
export type SummarizeRaceDataOutput = z.infer<typeof SummarizeRaceDataOutputSchema>;

export async function summarizeRaceData(input: SummarizeRaceDataInput): Promise<SummarizeRaceDataOutput> {
  return summarizeRaceDataFlow(input);
}

const summarizeRaceDataPrompt = ai.definePrompt({
  name: 'summarizeRaceDataPrompt',
  input: {schema: SummarizeRaceDataInputSchema},
  output: {schema: SummarizeRaceDataOutputSchema},
  prompt: `You are an AI expert in summarizing race data. Generate a concise summary of the following race data:\n\nRace Data: {{{raceData}}}`,
});

const summarizeRaceDataFlow = ai.defineFlow(
  {
    name: 'summarizeRaceDataFlow',
    inputSchema: SummarizeRaceDataInputSchema,
    outputSchema: SummarizeRaceDataOutputSchema,
  },
  async input => {
    const {output} = await summarizeRaceDataPrompt(input);
    return output!;
  }
);
