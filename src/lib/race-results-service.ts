import { mainEventResults } from "./results-data";

// This function simulates fetching results for various race types.
export const getRaceResults = async (
  raceId: string,
  raceType: 'Main Event' | 'Heat 1' | 'Heat 2' | 'Heat 3'
): Promise<{ rider: string; pos: number; holeshot?: boolean }[] | null> => {
    // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  const raceKey = raceId.includes('supercross') ? raceId : raceId;
  const allRaceResults = mainEventResults[raceKey as keyof typeof mainEventResults] as any;
  
  if (!allRaceResults) {
    return null; // Race results not posted
  }

  let eventKey: string;
  switch (raceType) {
    case 'Main Event':
      eventKey = '450'; // Default to 450, class is not in Bet type
      break;
    case 'Heat 1':
      eventKey = '450_heat1';
      break;
    case 'Heat 2':
      eventKey = '450_heat2';
      break;
    case 'Heat 3':
       eventKey = '450_heat3'; // For triple crown
      break;
    default:
      return null;
  }
  // This is a simplified lookup. A real implementation would handle 250/450 classes.
  const results = allRaceResults[eventKey as keyof typeof allRaceResults] || allRaceResults['250_heat1' as keyof typeof allRaceResults] || allRaceResults['250_heat2' as keyof typeof allRaceResults] || allRaceResults['250' as keyof typeof allRaceResults];

  return results || null;
};
