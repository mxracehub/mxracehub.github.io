
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
    const now = new Date();
    return raceSeries.filter(race => parseRaceDate(race.date) < now);
};

const getRiderDivision = (riderName: string): 'East' | 'West' | undefined => {
    const sortedRaces = [...supercrossRaces].sort((a,b) => parseRaceDate(a.date).getTime() - parseRaceDate(b.date).getTime());
    for (const race of sortedRaces) {
        if (race.division === 'East' || race.division === 'West') {
            const raceId = `supercross-${race.round}`;
            const results = mainEventResults[raceId as keyof typeof mainEventResults];
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
    const pointsMap: { [riderName: string]: number } = {};
    const riderDetails: { [riderName: string]: { number: string; bike: string } } = {};

    allRidersForClass.forEach(rider => {
        pointsMap[rider.name] = 0;
    });
    
    const sortedRaces = [...raceSeries].sort((a, b) => parseRaceDate(a.date).getTime() - parseRaceDate(b.date).getTime());
    const completedRaces = getCompletedRaces(sortedRaces);
    
    completedRaces.forEach(race => {
        let raceId;
        if ('round' in race) {
            raceId = `supercross-${race.round}`;
        } else {
            raceId = race.id;
        }
        
        const results = mainEventResults[raceId as keyof typeof mainEventResults];
        if (!results) return;

        const classResults = results[riderClass] || [];

        classResults.forEach(result => {
            const riderName = result.rider;
            
            if (riderName && !riderDetails[riderName] && result.number && result.bike) {
                riderDetails[riderName] = { number: result.number, bike: result.bike };
            }
            
            if (pointsMap.hasOwnProperty(riderName)) {
                pointsMap[riderName] = (pointsMap[riderName] || 0) + result.points;
            }
        });
    });
    
    return Object.entries(pointsMap)
        .map(([riderName, points]) => {
            const details = riderDetails[riderName];
            const riderInfo = allRiders.find(r => r.name === riderName);
            return {
                pos: 0,
                rider: riderName,
                number: details?.number || riderInfo?.number || 'N/A',
                bike: details?.bike || (riderInfo ? riderInfo.team.split(' ').pop() : 'N/A') || 'N/A',
                points: points
            };
        })
        .sort((a, b) => b.points - a.points || a.rider.localeCompare(b.rider))
        .map((rider, index) => ({ ...rider, pos: index + 1 }));
};


export const getSeriesPoints = () => {
    
    const sxPoints450 = calculatePoints(supercrossRaces, '450', riders450);
    
    const sxRiders250West = riders250.filter(r => getRiderDivision(r.name) === 'West');
    const sxPoints250West = calculatePoints(supercrossRaces.filter(r => r.division === 'West' || r.division === 'East/West Showdown'), '250', sxRiders250West);
    
    const sxRiders250East = riders250.filter(r => getRiderDivision(r.name) === 'East');
    const sxPoints250East = calculatePoints(supercrossRaces.filter(r => r.division === 'East' || r.division === 'East/West Showdown'), '250', sxRiders250East);

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
