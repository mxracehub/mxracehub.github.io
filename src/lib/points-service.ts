
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
    const withYear = new Date(`${dateStr} ${new Date().getFullYear()}`);
    if (withYear < new Date() && new Date().getMonth() > 6) {
        withYear.setFullYear(withYear.getFullYear() + 1);
    }
    return withYear;
}

const getCompletedRaces = (raceSeries: any[]) => {
    const now = new Date();
    return raceSeries.filter(race => parseRaceDate(race.date) < now);
};

const calculatePoints = (completedRaces: any[], series: 'supercross' | 'motocross', riderClass: '450' | '250', division?: 'East' | 'West') => {
    const pointsMap: { [riderName: string]: number } = {};
    const riderDivisions: { [riderName: string]: 'East' | 'West' } = {};

    // First pass for Supercross 250 to determine rider divisions based on their first race
    if (series === 'supercross' && riderClass === '250') {
        completedRaces.forEach(race => {
            if (race.division === 'East' || race.division === 'West') {
                const raceId = `supercross-${race.round}`;
                const results = mainEventResults[raceId as keyof typeof mainEventResults];
                if (results && results['250']) {
                    results['250'].forEach(result => {
                        if (!riderDivisions[result.rider]) {
                            riderDivisions[result.rider] = race.division;
                        }
                    });
                }
            }
        });
    }

    completedRaces.forEach(race => {
        const raceId = series === 'supercross' ? `supercross-${race.round}` : race.id;
        const results = mainEventResults[raceId as keyof typeof mainEventResults];
        if (!results) return;

        const classResults = results[riderClass] || [];

        classResults.forEach(result => {
            const riderName = result.rider;
            let shouldAddPoints = false;

            if (riderClass === '450' || series === 'motocross') {
                shouldAddPoints = true;
            } else { // 250 Supercross logic
                const riderDivision = riderDivisions[riderName];
                // Points are awarded if it's the rider's designated series or a showdown
                if ((race.division === riderDivision) || (race.division === 'East/West Showdown')) {
                    // Only award points to riders of the specified division in this calculation pass
                    if (division === riderDivision) {
                         shouldAddPoints = true;
                    }
                }
            }
            
            if (shouldAddPoints) {
                pointsMap[riderName] = (pointsMap[riderName] || 0) + result.points;
            }
        });
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
        if (pointsData.length === 0) return []; // Don't show a list if no points have been scored

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
        return combined.sort((a, b) => b.points - a.points).map((r, i) => ({...r, pos: i+1})).slice(0, 10);
    }
    
    // For 250 class, we only want to populate the list with riders from that specific division.
    const sxWestRiders = riders250.filter(r => {
        const race1Result = mainEventResults['supercross-1']?.['250']?.find(res => res.rider === r.name);
        return !!race1Result; // A simple way to check if they raced in the first West round.
    });

    // Since East hasn't started, we won't have riders for them yet from results. 
    // An empty list is fine.
    const sxEastRiderList: any[] = [];
    
    return {
        supercross450: populateRiderList(sxPoints450, riders450),
        supercross250West: populateRiderList(sxPoints250West, sxWestRiders),
        supercross250East: populateRiderList(sxPoints250East, sxEastRiderList),
        motocross450: populateRiderList(mxPoints450, riders450),
        motocross250: populateRiderList(mxPoints250, riders250),
    };
};
