
import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-race-data.ts';
import '@/ai/flows/settle-plays-flow.ts';
import '@/ai/flows/automated-settlement-triggers.ts';
