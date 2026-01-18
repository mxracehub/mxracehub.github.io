
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
                    // Initialize rider if not in the map
                    pointsMap[riderName] = { 
                        points: 0,
                        number: result.number,
                        bike: result.bike,
                        lastPos: index + 1,
                    };
                }
                pointsMap[riderName].points += (result.points || 0);
                
                // Always update with the latest race info to keep it current
                pointsMap[riderName].number = result.number;
                pointsMap[riderName].bike = result.bike;
                // lastPos will be updated with the position from the latest race in the series
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
        .sort((a, b) => (b.points - a.points) || (a.lastPos! - b.lastPos!))
        .map((rider, index) => ({ ...rider, pos: index + 1, lastPos: undefined }));
};


export const getSeriesPoints = () => {
    
    const sxPoints450 = calculatePoints(supercrossRaces, '450');
    
    const sxRacesWest = supercrossRaces.filter(r => r.division === 'West' || r.division === 'East/West Showdown');
    const sxPoints250West = calculatePoints(sxRacesWest, '250');
    
    const sxRacesEast = supercrossRaces.filter(r => r.division === 'East' || r.division === 'East/West Showdown');
    const sxPoints250East = calculatePoints(sxRacesEast, '250');

    const mxPoints450 = calculatePoints(motocrossRaces, '450');
    const mxPoints250 = calculatePoints(motocrossRaces, '250');
    
    const playoffPoints450 = calculatePoints(playoffsData, '450');
    const playoffPoints250 = calculatePoints(playoffsData, '250');
    
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
