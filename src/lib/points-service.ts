
'use client';

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
    for (const race of supercrossRaces) {
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


const calculatePoints = (
    raceSeries: any[], 
    series: 'supercross' | 'motocross' | 'playoffs', 
    riderClass: '450' | '250', 
    allRidersForClass: any[],
    division?: 'East' | 'West'
) => {
    const pointsMap: { [riderName: string]: number } = {};

    let relevantRiders = allRidersForClass;

    if (series === 'supercross' && riderClass === '250' && division) {
        relevantRiders = allRidersForClass.filter(r => getRiderDivision(r.name) === division);
    }

    relevantRiders.forEach(rider => {
        pointsMap[rider.name] = 0;
    });
    
    // Use ONLY the races from the specified series for calculation
    const completedRaces = getCompletedRaces(raceSeries);
    
    completedRaces.forEach(race => {
        let raceId;
        if (series === 'supercross') {
            raceId = `supercross-${race.round}`;
        } else {
            raceId = race.id;
        }
        
        const results = mainEventResults[raceId as keyof typeof mainEventResults];
        if (!results) return;

        const classResults = results[riderClass] || [];

        classResults.forEach(result => {
            const riderName = result.rider;
            
            if (pointsMap.hasOwnProperty(riderName)) {
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
        .sort((a, b) => b.points - a.points || a.rider.localeCompare(b.rider))
        .map((rider, index) => ({ ...rider, pos: index + 1 }));
};


export const getSeriesPoints = () => {
    
    const sxPoints450 = calculatePoints(supercrossRaces, 'supercross', '450', riders450);
    const sxPoints250West = calculatePoints(supercrossRaces, 'supercross', '250', riders250, 'West');
    const sxPoints250East = calculatePoints(supercrossRaces, 'supercross', '250', riders250, 'East');

    const mxPoints450 = calculatePoints(motocrossRaces, 'motocross', '450', riders450);
    const mxPoints250 = calculatePoints(motocrossRaces, 'motocross', '250', riders250);
    
    const playoffPoints450 = calculatePoints(playoffsData, 'playoffs', '450', riders450);
    const playoffPoints250 = calculatePoints(playoffsData, 'playoffs', '250', riders250);
    
    return {
        supercross450: sxPoints450.slice(0, 10),
        supercross250West: sxPoints250West.slice(0, 10),
        supercross250East: sxPoints250East.slice(0, 10),
        motocross450: mxPoints450.slice(0, 10),
        motocross250: mxPoints250.slice(0, 10),
        playoff450: playoffPoints450.slice(0, 10),
        playoff250: playoffPoints250.slice(0, 10),
    };
};
