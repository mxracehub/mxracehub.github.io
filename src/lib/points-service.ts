
import { supercrossRaces } from './races-supercross-data';
import { motocrossRaces } from './races-motocross-data';
import { mainEventResults } from './results-data';

const playoffsData = [
    { id: 'playoff-1', name: 'Playoff 1', location: 'Columbus, OH', date: 'Sep 12, 2026' },
    { id: 'playoff-2', name: 'Playoff 2', location: 'Carson, CA', date: 'Sep 19, 2026' },
    { id: 'smx-final', name: 'SMX World Championship Final', location: 'Ridgedale, MO', date: 'Sep 26, 2026' },
];

const getCompletedRaces = (raceSeries: any[]) => {
    return raceSeries.filter(race => {
        const raceId = 'round' in race ? `supercross-${race.round}` : race.id;
        const results = mainEventResults[raceId as keyof typeof mainEventResults];
        return results && Object.keys(results).length > 0;
    });
};

const calculatePoints = (
    raceSeries: any[], 
    riderClass: '450' | '250'
) => {
    const pointsMap: { [riderName: string]: { points: number, number?: string, bike?: string, lastPos?: number } } = {};

    const completedRaces = getCompletedRaces(raceSeries);
    
    // Sort completed races by date to ensure lastPos is from the latest race
    completedRaces.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    completedRaces.forEach(race => {
        let raceId;
        if ('round' in race) {
            raceId = `supercross-${race.round}`;
        } else {
            raceId = race.id;
        }
        
        const results = mainEventResults[raceId as keyof typeof mainEventResults];
        if (!results) return;
        
        const classResults = results[riderClass as keyof typeof results] || [];

        (classResults as any[]).forEach((result, index) => {
            const riderName = result.rider;
            if (riderName) {
                if (!pointsMap[riderName]) {
                    pointsMap[riderName] = { 
                        points: 0,
                    };
                }
                pointsMap[riderName].points += (result.points || 0);
                pointsMap[riderName].number = result.number;
                pointsMap[riderName].bike = result.bike;
                // Tie-breaker: position in the most recent race processed
                pointsMap[riderName].lastPos = index + 1;
            }
        });
    });
    
    return Object.entries(pointsMap)
        .map(([riderName, data]) => {
            return {
                pos: 0,
                rider: riderName,
                number: data.number || 'N/A',
                bike: data.bike || 'N/A',
                points: data.points,
                lastPos: data.lastPos,
            };
        })
        .filter(r => r.points > 0)
        .sort((a, b) => {
            if (b.points !== a.points) {
                return b.points - a.points;
            }
            return (a.lastPos ?? Infinity) - (b.lastPos ?? Infinity);
        })
        .map((rider, index) => ({ ...rider, pos: index + 1, lastPos: undefined }));
};

const allMxRacesSorted = [...motocrossRaces].sort((a, b) => new Date(a.date + " 2026").getTime() - new Date(b.date + " 2026").getTime());

export const getSeriesPoints = (upToRaceId?: string) => {
    
    let relevantSupercrossRaces = supercrossRaces;
    let relevantMotocrossRaces = allMxRacesSorted;
    let relevantPlayoffsData = playoffsData;

    if (upToRaceId) {
        if (upToRaceId.startsWith('supercross-')) {
            const round = parseInt(upToRaceId.split('-')[1], 10);
            relevantSupercrossRaces = supercrossRaces.filter(r => r.round <= round);
        } else if (allMxRacesSorted.some(r => r.id === upToRaceId)) {
            const raceIndex = allMxRacesSorted.findIndex(r => r.id === upToRaceId);
            relevantMotocrossRaces = allMxRacesSorted.slice(0, raceIndex + 1);
        } else if (playoffsData.some(r => r.id === upToRaceId)) {
            const raceIndex = playoffsData.findIndex(r => r.id === upToRaceId);
            relevantPlayoffsData = playoffsData.slice(0, raceIndex + 1);
        }
    }
    
    const sxPoints450 = calculatePoints(relevantSupercrossRaces, '450');
    
    const sxRacesWest = relevantSupercrossRaces.filter(r => r.division === 'West' || r.division === 'East/West Showdown');
    const sxPoints250West = calculatePoints(sxRacesWest, '250');
    
    const sxRacesEast = relevantSupercrossRaces.filter(r => r.division === 'East' || r.division === 'East/West Showdown');
    const sxPoints250East = calculatePoints(sxRacesEast, '250');

    const mxPoints450 = calculatePoints(relevantMotocrossRaces, '450');
    const mxPoints250 = calculatePoints(relevantMotocrossRaces, '250');
    
    const playoffPoints450 = calculatePoints(relevantPlayoffsData, '450');
    const playoffPoints250 = calculatePoints(relevantPlayoffsData, '250');
    
    return {
        supercross450: sxPoints450,
        supercross250West: sxPoints250West,
        supercross250East: sxPoints250East,
        motocross450: mxPoints450,
        motocross250: mxPoints250,
        playoff450: playoffPoints450,
        playoff250: playoffPoints250,
    };
};
