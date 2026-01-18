
import { supercrossRaces } from './races-supercross-data';
import { motocrossRaces } from './races-motocross-data';
import { mainEventResults } from './results-data';
import { riders450 } from './riders-data';
import { riders250 } from './riders-250-data';

const playoffsData = [
    { id: 'playoff-1', name: 'Playoff 1', location: 'Columbus, OH', date: 'Sep 12, 2026' },
    { id: 'playoff-2', name: 'Playoff 2', location: 'Carson, CA', date: 'Sep 19, 2026' },
    { id: 'smx-final', name: 'SMX World Championship Final', location: 'Ridgedale, MO', date: 'Sep 26, 2026' },
];

const allRiders = [...riders450, ...riders250];

const parseRaceDate = (dateStr: string): Date => {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
        return d;
    }
    const currentYear = new Date().getFullYear();
    const withYear = new Date(`${dateStr} ${currentYear}`);
    if (withYear < new Date() && new Date().getMonth() > 6) {
        withYear.setFullYear(withYear.getFullYear() + 1);
    }
    return withYear;
}

const getCompletedRaces = (raceSeries: any[]) => {
    return raceSeries.filter(race => {
        const raceId = 'round' in race ? `supercross-${race.round}` : race.id;
        const results = mainEventResults[raceId as keyof typeof mainEventResults];
        return results && Object.keys(results).length > 0;
    });
};

const getRiderDivision = (riderName: string): 'East' | 'West' | undefined => {
    const sortedRaces = [...supercrossRaces].sort((a,b) => parseRaceDate(a.date).getTime() - parseRaceDate(b.date).getTime());
    for (const race of sortedRaces) {
        if (race.division === 'East' || race.division === 'West') {
            const raceId = `supercross-${race.round}`;
            const results = mainEventResults[raceId as keyof typeof mainEventResults];
            if (!results) continue;
            const mainEventResultsForRace = results?.['250'];
            const heat1Results = results?.['250_heat1'];
            const heat2Results = results?.['250_heat2'];

            const inMain = mainEventResultsForRace?.some(r => r.rider === riderName);
            const inHeat1 = heat1Results?.some(r => r.rider === riderName);
            const inHeat2 = heat2Results?.some(r => r.rider === riderName);

            if (inMain || inHeat1 || inHeat2) {
                return race.division;
            }
        }
    }
    return undefined;
};


const calculatePoints = (
    raceSeries: any[], 
    riderClass: '450' | '250', 
    allRidersForClass: any[]
) => {
    const pointsMap: { [riderName: string]: { points: number, number?: string, bike?: string } } = {};

    allRidersForClass.forEach(rider => {
        pointsMap[rider.name] = { points: 0 };
    });

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

        (classResults as any[]).forEach(result => {
            const riderName = result.rider;
            if (riderName) {
                if (!pointsMap[riderName]) {
                    pointsMap[riderName] = { points: 0 }; // Initialize if not present
                }
                pointsMap[riderName].points += (result.points || 0);
                
                // Update bike and number from the latest race result
                if (result.number && result.bike) {
                    pointsMap[riderName].number = result.number;
                    pointsMap[riderName].bike = result.bike;
                }
            }
        });
    });
    
    return Object.entries(pointsMap)
        .map(([riderName, data]) => {
            const riderInfo = allRiders.find(r => r.name === riderName);
            return {
                pos: 0,
                rider: riderName,
                number: data.number || riderInfo?.number || 'N/A',
                bike: data.bike || (riderInfo ? riderInfo.team.split(' ').pop() : 'N/A') || 'N/A',
                points: data.points
            };
        })
        .filter(r => r.points > 0) // Only include riders with points
        .sort((a, b) => b.points - a.points || a.rider.localeCompare(b.rider))
        .map((rider, index) => ({ ...rider, pos: index + 1 }));
};


export const getSeriesPoints = () => {
    
    const sxPoints450 = calculatePoints(supercrossRaces, '450', riders450);
    
    const sxRacesWest = supercrossRaces.filter(r => r.division === 'West' || r.division === 'East/West Showdown');
    const sxPoints250West = calculatePoints(sxRacesWest, '250', riders250);
    
    const sxRacesEast = supercrossRaces.filter(r => r.division === 'East' || r.division === 'East/West Showdown');
    const sxPoints250East = calculatePoints(sxRacesEast, '250', riders250);

    const mxPoints450 = calculatePoints(motocrossRaces, '450', riders450);
    const mxPoints250 = calculatePoints(motocrossRaces, '250', riders250);
    
    const playoffPoints450 = calculatePoints(playoffsData, '450', riders450);
    const playoffPoints250 = calculatePoints(playoffsData, '250', riders250);
    
    return {
        supercross450: sxPoints450.slice(0, 22),
        supercross250West: sxPoints250West.slice(0, 22),
        supercross250East: sxPoints250East.slice(0, 22),
        motocross450: mxPoints450.slice(0, 22),
        motocross250: mxPoints250.slice(0, 22),
        playoff450: playoffPoints450.slice(0, 22),
        playoff250: playoffPoints250.slice(0, 22),
    };
};
