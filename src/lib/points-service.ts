
import { supercrossRaces } from './races-supercross-data';
import { motorcrossRaces } from './races-motorcross-data';
import { mainEventResults } from './results-data';
import { riders450 } from './riders-data';
import { riders250 } from './riders-250-data';

const allRiders = [...riders450, ...riders250];

const parseRaceDate = (dateStr: string): Date => {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
        return d;
    }
    const currentYear = new Date().getFullYear();
    const withYear = new Date(`${dateStr} ${currentYear}`);
    if (withYear < new Date() && new Date().getMonth() > 6) {
        // Handle dates like "JAN 10" when the current date is "DEC 01"
        withYear.setFullYear(withYear.getFullYear() + 1);
    }
    return withYear;
}

const getCompletedRaces = (raceSeries: any[]) => {
    const now = new Date();
    return raceSeries.filter(race => parseRaceDate(race.date) < now);
};

// Helper to determine the division for a 250SX rider
const getRiderDivision = (riderName: string, allSxRaces: any[]): 'East' | 'West' | undefined => {
    for (const race of allSxRaces) {
        if (race.division === 'East' || race.division === 'West') {
            const raceId = `supercross-${race.round}`;
            const results = mainEventResults[raceId as keyof typeof mainEventResults];
            if (results && results['250']?.some(r => r.rider === riderName)) {
                return race.division;
            }
        }
    }
    return undefined;
};


const calculatePoints = (completedRaces: any[], series: 'supercross' | 'motocross', riderClass: '450' | '250', division?: 'East' | 'West') => {
    const pointsMap: { [riderName: string]: number } = {};

    const riderIsInDivision = (riderName: string): boolean => {
        if (series !== 'supercross' || riderClass !== '250' || !division) return true;
        const riderDivision = getRiderDivision(riderName, supercrossRaces);
        return riderDivision === division;
    };
    
    completedRaces.forEach(race => {
        const raceId = series === 'supercross' ? `supercross-${race.round}` : race.id;
        const results = mainEventResults[raceId as keyof typeof mainEventResults];
        if (!results) return;

        const classResults = results[riderClass as '450' | '250'] || [];

        classResults.forEach(result => {
            const riderName = result.rider;
            
            if (series === 'supercross' && riderClass === '250') {
                 // Award points if it's the rider's designated series or a showdown
                const riderDivision = getRiderDivision(riderName, supercrossRaces);
                if (race.division === 'East/West Showdown' || race.division === riderDivision) {
                    // Check if the current calculation is for the rider's division
                    if (division === riderDivision) {
                        pointsMap[riderName] = (pointsMap[riderName] || 0) + result.points;
                    }
                }
            } else {
                 // For 450 class or Motocross, just add points
                pointsMap[riderName] = (pointsMap[riderName] || 0) + result.points;
            }
        });
    });

    const relevantRiders = riderClass === '450' 
        ? riders450 
        : (series === 'motocross' || !division) 
            ? riders250 
            : riders250.filter(rider => riderIsInDivision(rider.name));

    relevantRiders.forEach(rider => {
        if (!pointsMap[rider.name]) {
            pointsMap[rider.name] = 0;
        }
    });
    
    return Object.entries(pointsMap)
        .map(([riderName, points]) => {
            const riderInfo = allRiders.find(r => r.name === riderName);
            return {
                pos: 0,
                rider: riderName,
                number: riderInfo?.number || 'N/A',
                bike: riderInfo?.team.split(' ').pop() || 'N/A',
                points: points
            };
        })
        .sort((a, b) => b.points - a.points)
        .map((rider, index) => ({ ...rider, pos: index + 1 }));
};


export const getSeriesPoints = () => {
    const completedSX = getCompletedRaces(supercrossRaces);
    const completedMX = getCompletedRaces(motorcrossRaces);

    const sxPoints450 = calculatePoints(completedSX, 'supercross', '450');
    const sxPoints250West = calculatePoints(completedSX, 'supercross', '250', 'West');
    const sxPoints250East = calculatePoints(completedSX, 'supercross', '250', 'East');

    const mxPoints450 = calculatePoints(completedMX, 'motocross', '450');
    const mxPoints250 = calculatePoints(completedMX, 'motocross', '250');
    
    const populateRiderList = (pointsData: any[], riderList: any[]) => {
        const pointRiderNames = new Set(pointsData.map(r => r.rider));
        const missingRiders = riderList
            .filter(r => !pointRiderNames.has(r.name))
            .map(r => ({
                pos: 0,
                rider: r.name,
                number: r.number,
                bike: r.team.split(' ').pop() || 'N/A',
                points: 0
            }));
        
        const combined = [...pointsData, ...missingRiders];
        const sorted = combined.sort((a, b) => b.points - a.points || a.rider.localeCompare(b.rider)).map((r, i) => ({...r, pos: i+1}));
        
        return sorted.slice(0, 10);
    }
    
    // For 250 class, we need to determine which riders are in which series to create the initial lists
    const sxWestRiders = riders250.filter(r => getRiderDivision(r.name, supercrossRaces) === 'West');
    const sxEastRiders = riders250.filter(r => getRiderDivision(r.name, supercrossRaces) === 'East');

    return {
        supercross450: populateRiderList(sxPoints450, riders450),
        supercross250West: populateRiderList(sxPoints250West, sxWestRiders.length > 0 ? sxWestRiders : riders250),
        supercross250East: populateRiderList(sxPoints250East, sxEastRiders.length > 0 ? sxEastRiders: riders250),
        motocross450: populateRiderList(mxPoints450, riders450),
        motocross250: populateRiderList(mxPoints250, riders250),
    };
};
