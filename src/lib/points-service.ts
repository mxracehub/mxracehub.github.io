
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
    if (withYear < new Date()) {
        withYear.setFullYear(withYear.getFullYear() + 1);
    }
    return withYear;
}

const getCompletedRaces = (raceSeries: any[]) => {
    const now = new Date();
    return raceSeries.filter(race => parseRaceDate(race.date) < now);
};

const calculatePoints = (completedRaces: any[], series: 'supercross' | 'motocross', division?: 'East' | 'West' | 'East/West Showdown' | 'All') => {
    const pointsMap: { [riderName: string]: number } = {};

    completedRaces.forEach(race => {
        const raceId = series === 'supercross' ? `supercross-${race.round}` : race.id;
        const results = mainEventResults[raceId as keyof typeof mainEventResults];
        if (!results) return;

        // Determine which class results to use
        let classResults450 = results['450'] || [];
        let classResults250 = results['250'] || [];

        if (series === 'supercross') {
            if (race.division === 'East') {
                if (division === 'East' || division === 'All') {
                     classResults250.forEach(result => {
                        pointsMap[result.rider] = (pointsMap[result.rider] || 0) + result.points;
                    });
                }
            } else if (race.division === 'West') {
                 if (division === 'West' || division === 'All') {
                     classResults250.forEach(result => {
                        pointsMap[result.rider] = (pointsMap[result.rider] || 0) + result.points;
                    });
                }
            } else if (race.division === 'East/West Showdown') {
                if (division === 'East' || division === 'West' || division === 'All') {
                     classResults250.forEach(result => {
                        pointsMap[result.rider] = (pointsMap[result.rider] || 0) + result.points;
                    });
                }
            }
        } else { // motocross
            classResults250.forEach(result => {
                pointsMap[result.rider] = (pointsMap[result.rider] || 0) + result.points;
            });
        }
        
        if (division === 'All') {
            classResults450.forEach(result => {
                pointsMap[result.rider] = (pointsMap[result.rider] || 0) + result.points;
            });
        }
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

    const sxPoints450 = calculatePoints(completedSX, 'supercross', 'All');
    const sxPoints250West = calculatePoints(completedSX, 'supercross', 'West');
    const sxPoints250East = calculatePoints(completedSX, 'supercross', 'East');

    const mxPoints450 = calculatePoints(completedMX, 'motocross', 'All');
    const mxPoints250 = calculatePoints(completedMX, 'motocross', 'All');

    // For the purpose of the app, let's combine points as it doesn't distinguish classes in motocross for now
    const allRidersWithPoints = [...new Set([...riders450.map(r => r.name), ...riders250.map(r => r.name)])];
    
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
        // Re-sort and re-rank
        return combined.sort((a, b) => b.points - a.points).map((r, i) => ({...r, pos: i+1})).slice(0, 10);
    }
    
    const sxEastRiders = riders250.filter(r => ['Tom Vialle', 'Cameron McAdoo', 'Pierce Brown', 'Coty Schock', 'Haiden Deegan', 'Max Anstie', 'Daxton Bennick', 'Jalek Swoll', 'Henry Hilar', 'Seth Hammaker'].includes(r.name));
    const sxWestRiders = riders250.filter(r => ['Levi Kitchen', 'RJ Hampshire', 'Jordon Smith', 'Garrett Marchbanks', 'Jo Shimoda', 'Anthony Bourdon', 'Julien Beaumer', 'Ryder DiFrancesco', 'Carson Mumford', 'Nate Thrasher'].includes(r.name));


    return {
        supercross450: populateRiderList(sxPoints450, riders450),
        supercross250West: populateRiderList(sxPoints250West, sxWestRiders),
        supercross250East: populateRiderList(sxPoints250East, sxEastRiders),
        motocross450: populateRiderList(mxPoints450, riders450),
        motocross250: populateRiderList(mxPoints250, riders250),
    };
};
