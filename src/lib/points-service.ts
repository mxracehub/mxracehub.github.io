
import { supercrossRaces } from './races-supercross-data';
import { motorcrossRaces } from './races-motorcross-data';
import { mainEventResults } from './results-data';
import { riders450 } from './riders-data';
import { riders250 } from './riders-250-data';

const allRiders = [...riders450, ...riders250];

const sxEastRiders = new Set(riders250.filter(r => ['Tom Vialle', 'Cameron McAdoo', 'Pierce Brown', 'Coty Schock', 'Haiden Deegan', 'Max Anstie', 'Daxton Bennick', 'Jalek Swoll', 'Henry Hilar', 'Seth Hammaker'].includes(r.name)).map(r => r.name));
const sxWestRiders = new Set(riders250.filter(r => ['Levi Kitchen', 'RJ Hampshire', 'Jordon Smith', 'Garrett Marchbanks', 'Jo Shimoda', 'Anthony Bourdon', 'Julien Beaumer', 'Ryder DiFrancesco', 'Carson Mumford', 'Nate Thrasher'].includes(r.name)).map(r => r.name));


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

    completedRaces.forEach(race => {
        const raceId = series === 'supercross' ? `supercross-${race.round}` : race.id;
        const results = mainEventResults[raceId as keyof typeof mainEventResults];
        if (!results) return;

        const classResults = results[riderClass] || [];

        classResults.forEach(result => {
            const riderName = result.rider;
            let shouldAddPoints = false;
            
            if (series === 'motocross' || riderClass === '450') {
                 shouldAddPoints = true;
            } else { // 250 Supercross
                const isEastRider = sxEastRiders.has(riderName);
                const isWestRider = sxWestRiders.has(riderName);

                if (division === 'East') {
                    if (race.division === 'East' && isEastRider) shouldAddPoints = true;
                    if (race.division === 'East/West Showdown' && isEastRider) shouldAddPoints = true;
                } else if (division === 'West') {
                    if (race.division === 'West' && isWestRider) shouldAddPoints = true;
                    if (race.division === 'East/West Showdown' && isWestRider) shouldAddPoints = true;
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
                bike: riderInfo?.team.split(' ')[riderInfo?.team.split(' ').length -1] || 'N/A', // simple logic
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
                bike: r.team.split(' ')[r.team.split(' ').length -1] || 'N/A',
                points: 0
            }));
        
        const combined = [...pointsData, ...missingRiders];
        return combined.sort((a, b) => b.points - a.points).map((r, i) => ({...r, pos: i+1})).slice(0, 10);
    }
    
    const sxEastRiderList = riders250.filter(r => sxEastRiders.has(r.name));
    const sxWestRiderList = riders250.filter(r => sxWestRiders.has(r.name));

    return {
        supercross450: populateRiderList(sxPoints450, riders450),
        supercross250West: populateRiderList(sxPoints250West, sxWestRiderList),
        supercross250East: populateRiderList(sxPoints250East, sxEastRiderList),
        motocross450: populateRiderList(mxPoints450, riders450),
        motocross250: populateRiderList(mxPoints250, riders250),
    };
};
