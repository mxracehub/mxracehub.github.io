/**
 * MXRaceHub Race Updater
 * 
 * This script automatically updates upcoming races based on the current date,
 * cycling through the 2025 race schedule.
 */

document.addEventListener('DOMContentLoaded', function() {
  updateUpcomingRaces();
});

function updateUpcomingRaces() {
  // Get current date
  const today = new Date();
  
  // 2025 Race Schedule - structured by week
  const races = [
    {
      date: new Date(2025, 0, 4), // Jan 4, 2025
      title: 'Anaheim 1 Supercross',
      venue: 'Angel Stadium - Anaheim, CA',
      series: 'Round 1 - Monster Energy Supercross',
      url: '/races/anaheim1-2025/',
      odds: {
        "Jett Lawrence": 1.5,
        "Cooper Webb": 3.2,
        "Chase Sexton": 4.5,
        "Eli Tomac": 5.0,
        "Jason Anderson": 8.0
      }
    },
    {
      date: new Date(2025, 0, 11), // Jan 11, 2025
      title: 'San Diego Supercross',
      venue: 'Snapdragon Stadium - San Diego, CA',
      series: 'Round 2 - Monster Energy Supercross',
      url: '/races/san-diego-2025/',
      odds: {
        "Jett Lawrence": 1.8,
        "Cooper Webb": 2.5,
        "Chase Sexton": 3.2,
        "Eli Tomac": 4.0,
        "Justin Barcia": 7.5
      }
    },
    {
      date: new Date(2025, 0, 18), // Jan 18, 2025
      title: 'Anaheim 2 Supercross',
      venue: 'Angel Stadium - Anaheim, CA',
      series: 'Round 3 - Monster Energy Supercross',
      url: '/races/anaheim2-2025/',
      odds: {
        "Cooper Webb": 2.0,
        "Jett Lawrence": 2.2,
        "Chase Sexton": 3.8,
        "Eli Tomac": 4.5,
        "Justin Cooper": 6.5
      }
    },
    {
      date: new Date(2025, 0, 25), // Jan 25, 2025
      title: 'Houston Supercross',
      venue: 'NRG Stadium - Houston, TX',
      series: 'Round 4 - Monster Energy Supercross',
      url: '/races/houston-2025/',
      odds: {
        "Jett Lawrence": 1.7,
        "Cooper Webb": 3.0,
        "Eli Tomac": 4.2,
        "Chase Sexton": 4.5,
        "Ken Roczen": 7.0
      }
    },
    {
      date: new Date(2025, 1, 1), // Feb 1, 2025
      title: 'Tampa Supercross',
      venue: 'Raymond James Stadium - Tampa, FL',
      series: 'Round 5 - Monster Energy Supercross',
      url: '/races/tampa-2025/',
      odds: {
        "Cooper Webb": 2.1,
        "Jett Lawrence": 2.3,
        "Eli Tomac": 3.5,
        "Justin Barcia": 6.0,
        "Aaron Plessinger": 8.5
      }
    },
    {
      date: new Date(2025, 1, 8), // Feb 8, 2025
      title: 'Detroit Supercross',
      venue: 'Ford Field - Detroit, MI',
      series: 'Round 6 - Monster Energy Supercross',
      url: '/races/detroit-2025/',
      odds: {
        "Jett Lawrence": 1.6,
        "Cooper Webb": 2.8,
        "Chase Sexton": 4.0,
        "Eli Tomac": 4.2,
        "Dylan Ferrandis": 9.0
      }
    },
    {
      date: new Date(2025, 1, 15), // Feb 15, 2025
      title: 'Glendale Supercross',
      venue: 'State Farm Stadium - Glendale, AZ',
      series: 'Round 7 - Monster Energy Supercross',
      url: '/races/glendale-2025/',
      odds: {
        "Cooper Webb": 2.0,
        "Jett Lawrence": 2.1,
        "Chase Sexton": 3.5,
        "Eli Tomac": 4.0,
        "Malcolm Stewart": 7.5
      }
    },
    {
      date: new Date(2025, 1, 22), // Feb 22, 2025
      title: 'Arlington Supercross',
      venue: 'AT&T Stadium - Arlington, TX',
      series: 'Round 8 - Monster Energy Supercross',
      url: '/races/arlington-2025/',
      odds: {
        "Jett Lawrence": 1.9,
        "Cooper Webb": 2.5,
        "Eli Tomac": 3.5,
        "Chase Sexton": 3.8,
        "Justin Cooper": 8.0
      }
    },
    {
      date: new Date(2025, 2, 1), // Mar 1, 2025
      title: 'Daytona Supercross',
      venue: 'Daytona International Speedway - Daytona Beach, FL',
      series: 'Round 9 - Monster Energy Supercross',
      url: '/races/daytona-2025/',
      odds: {
        "Eli Tomac": 1.8,
        "Cooper Webb": 2.2,
        "Jett Lawrence": 3.0,
        "Chase Sexton": 4.5,
        "Justin Barcia": 6.0
      }
    },
    {
      date: new Date(2025, 2, 8), // Mar 8, 2025
      title: 'Indianapolis Supercross',
      venue: 'Lucas Oil Stadium - Indianapolis, IN',
      series: 'Round 10 - Monster Energy Supercross',
      url: '/races/indianapolis-2025/',
      odds: {
        "Jett Lawrence": 1.8,
        "Cooper Webb": 2.4,
        "Chase Sexton": 3.0,
        "Eli Tomac": 4.0,
        "Jason Anderson": 8.5
      }
    },
    {
      date: new Date(2025, 2, 15), // Mar 15, 2025
      title: 'Seattle Supercross',
      venue: 'Lumen Field - Seattle, WA',
      series: 'Round 11 - Monster Energy Supercross',
      url: '/races/seattle-2025/',
      odds: {
        "Cooper Webb": 2.0,
        "Jett Lawrence": 2.1,
        "Eli Tomac": 3.8,
        "Chase Sexton": 4.0,
        "Dylan Ferrandis": 7.0
      }
    },
    {
      date: new Date(2025, 2, 22), // Mar 22, 2025
      title: 'St. Louis Supercross',
      venue: 'The Dome at America\'s Center - St. Louis, MO',
      series: 'Round 12 - Monster Energy Supercross',
      url: '/races/st-louis-2025/',
      odds: {
        "Jett Lawrence": 1.7,
        "Cooper Webb": 2.5,
        "Chase Sexton": 3.8,
        "Eli Tomac": 4.5,
        "Ken Roczen": 7.5
      }
    },
    {
      date: new Date(2025, 2, 29), // Mar 29, 2025
      title: 'Atlanta Supercross',
      venue: 'Mercedes-Benz Stadium - Atlanta, GA',
      series: 'Round 13 - Monster Energy Supercross',
      url: '/races/atlanta-2025/',
      odds: {
        "Cooper Webb": 1.8,
        "Jett Lawrence": 2.0,
        "Eli Tomac": 3.5,
        "Chase Sexton": 4.0,
        "Justin Barcia": 7.0
      }
    },
    {
      date: new Date(2025, 3, 5), // Apr 5, 2025
      title: 'Nashville Supercross',
      venue: 'Nissan Stadium - Nashville, TN',
      series: 'Round 14 - Monster Energy Supercross',
      url: '/races/nashville-2025/',
      odds: {
        "Jett Lawrence": 1.6,
        "Cooper Webb": 2.5,
        "Eli Tomac": 3.2,
        "Chase Sexton": 4.8,
        "Jason Anderson": 7.5
      }
    },
    {
      date: new Date(2025, 3, 19), // Apr 19, 2025
      title: 'Philadelphia Supercross',
      venue: 'Lincoln Financial Field - Philadelphia, PA',
      series: 'Round 15 - Monster Energy Supercross',
      url: '/races/philadelphia-2025/',
      odds: {
        "Cooper Webb": 2.2,
        "Jett Lawrence": 2.3,
        "Eli Tomac": 3.0,
        "Chase Sexton": 3.8,
        "Justin Cooper": 8.0
      }
    },
    {
      date: new Date(2025, 3, 26), // Apr 26, 2025
      title: 'Denver Supercross',
      venue: 'Empower Field at Mile High - Denver, CO',
      series: 'Round 16 - Monster Energy Supercross',
      url: '/races/denver-2025/',
      odds: {
        "Eli Tomac": 1.5,
        "Cooper Webb": 2.8,
        "Jett Lawrence": 3.0,
        "Chase Sexton": 4.5,
        "Aaron Plessinger": 7.5
      }
    },
    {
      date: new Date(2025, 4, 3), // May 3, 2025
      title: 'Salt Lake City Supercross',
      venue: 'Rice-Eccles Stadium - Salt Lake City, UT',
      series: 'Round 17 - Monster Energy Supercross',
      url: '/races/salt-lake-city-2025/',
      odds: {
        "Cooper Webb": 2.0,
        "Jett Lawrence": 2.2,
        "Eli Tomac": 3.0,
        "Chase Sexton": 4.5,
        "Malcolm Stewart": 8.0
      }
    },
    {
      date: new Date(2025, 4, 24), // May 24, 2025
      title: 'Fox Raceway National',
      venue: 'Fox Raceway - Pala, CA',
      series: 'Round 1 - Pro Motocross Championship',
      url: '/races/fox-raceway-2025/',
      odds: {
        "Jett Lawrence": 1.5,
        "Chase Sexton": 3.0,
        "Cooper Webb": 4.0,
        "Eli Tomac": 4.2,
        "Justin Barcia": 7.5
      }
    }
  ];
  
  // Filter for upcoming races
  let upcomingRaces = races.filter(race => race.date >= today);
  
  // If we have no upcoming races (past the last race in our dataset),
  // we'll cycle back to the beginning of the next season
  if (upcomingRaces.length === 0) {
    const nextYearRaces = races.map(race => {
      const newRace = {...race};
      newRace.date = new Date(race.date);
      newRace.date.setFullYear(race.date.getFullYear() + 1);
      return newRace;
    });
    upcomingRaces = nextYearRaces;
  }
  
  // Sort by date
  upcomingRaces.sort((a, b) => a.date - b.date);
  
  // Take the next 3 races
  const nextRaces = upcomingRaces.slice(0, 3);
  
  // Update the DOM
  const raceCards = document.querySelectorAll('.race-card');
  if (raceCards.length === 0) return;
  
  nextRaces.forEach((race, index) => {
    if (index < raceCards.length) {
      const card = raceCards[index];
      
      // Format date
      const options = { month: 'short', day: 'numeric', year: 'numeric' };
      const formattedDate = race.date.toLocaleDateString('en-US', options).toUpperCase();
      
      // Update card content
      const dateElem = card.querySelector('.race-date');
      const titleElem = card.querySelector('.race-title');
      const venueElem = card.querySelector('.race-venue');
      const seriesElem = card.querySelector('.race-series');
      const linkElem = card.querySelector('.race-link');
      const bettingElem = card.querySelector('.race-betting-button');
      const oddsList = card.querySelector('.race-odds-list');
      
      if (dateElem) dateElem.textContent = formattedDate;
      if (titleElem) titleElem.textContent = race.title;
      if (venueElem) venueElem.textContent = race.venue;
      if (seriesElem) seriesElem.textContent = race.series;
      if (linkElem) linkElem.href = race.url;
      
      // Update betting odds if available
      if (oddsList && race.odds) {
        oddsList.innerHTML = '';
        Object.entries(race.odds).forEach(([rider, odds]) => {
          const li = document.createElement('li');
          li.className = 'race-odds-item';
          li.innerHTML = `<span class="rider-name">${rider}</span> <span class="rider-odds">${odds.toFixed(1)}</span>`;
          oddsList.appendChild(li);
        });
      }
      
      if (bettingElem) {
        // Direct link to the betting page for this race
        const raceSlug = race.url.split('/').filter(part => part).pop();
        bettingElem.href = `/betting/friend-bets/${raceSlug}/`;
      }
    }
  });
}