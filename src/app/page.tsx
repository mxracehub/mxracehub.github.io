
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star, Calendar } from 'lucide-react';
import Link from 'next/link';
import { motocrossRaces } from '@/lib/races-motocross-data';
import { supercrossRaces } from '@/lib/races-supercross-data';
import { worldSupercrossRaces } from '@/lib/races-world-supercross-data';

// Helper function to parse dates. All races are assumed to be in 2026 for this app.
const parseDate = (dateString: string, timeString: string): Date => {
  let fullDateString = dateString;
  if (!/\d{4}/.test(dateString)) {
    fullDateString = `${dateString}, 2026`;
  }
  return new Date(`${fullDateString} ${timeString}`);
};

const playoffsData = [
  {
    id: 'playoff-1',
    name: 'Playoff 1',
    location: 'Columbus, OH',
    date: 'Sep 12, 2026',
    time: '19:00',
    track: 'Mapfre Stadium',
  },
  {
    id: 'playoff-2',
    name: 'Playoff 2',
    location: 'Carson, CA',
    date: 'Sep 19, 2026',
    time: '19:00',
    track: 'Dignity Health Sports Park',
  },
  {
    id: 'smx-final',
    name: 'SMX World Championship Final',
    location: 'Ridgedale, MO',
    date: 'Sep 26, 2026',
    time: '19:00',
    track: 'Big Cedar Lodge',
  },
];


const allRaces = [
  ...motocrossRaces.map(r => ({ ...r, date: parseDate(r.date, r.time) })),
  ...supercrossRaces.map(r => ({
    id: `supercross-${r.round}`,
    name: `${r.location} Supercross`,
    track: r.track,
    date: parseDate(r.date, r.time),
    location: r.location,
  })),
  ...playoffsData.map(r => ({ ...r, date: parseDate(r.date, r.time) })),
  ...worldSupercrossRaces.map(r => ({
    id: `world-supercross-${r.round}`,
    name: `${r.location} World Supercross`,
    track: r.track,
    date: parseDate(r.date, r.time),
    location: r.location,
  }))
];

// CountdownTimer component
const CountdownTimer = ({ targetDate }: { targetDate: Date | null }) => {
  const calculateTimeLeft = useCallback(() => {
    if (!targetDate) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    }
    const difference = +targetDate - +new Date();
    
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      total: difference,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        total: difference,
      };
    }

    return timeLeft;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (!targetDate) return;

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, calculateTimeLeft]);

  const formatTime = (time: number) => {
    return time.toString().padStart(2, '0');
  };

  if (!targetDate) {
    return null;
  }
  
  // A race is considered "live" for 3 hours after its start time.
  const raceDuration = 3 * 60 * 60 * 1000;
  if (timeLeft.total <= 0 && timeLeft.total > -raceDuration) {
    return (
        <div className="flex justify-center items-center gap-4">
            <div className="relative flex items-center justify-center">
                <div className="absolute h-4 w-4 bg-red-500 rounded-full animate-ping"></div>
                <div className="relative h-3 w-3 bg-red-500 rounded-full"></div>
            </div>
            <div className="text-4xl font-bold uppercase text-red-500 tracking-widest">
                LIVE
            </div>
        </div>
    );
  }

  // If the race is over, the timer will show 00s. The parent component will eventually find the next race.
  if (timeLeft.total <= -raceDuration) {
      return (
        <div className="text-lg text-muted-foreground">
            Race has concluded. Waiting for next race...
        </div>
      )
  }

  return (
    <div className="flex justify-center gap-4">
      <div className="text-center">
        <div className="text-4xl font-bold">{formatTime(timeLeft.days)}</div>
        <div className="text-xs uppercase text-muted-foreground">Days</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold">{formatTime(timeLeft.hours)}</div>
        <div className="text-xs uppercase text-muted-foreground">Hours</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold">{formatTime(timeLeft.minutes)}</div>
        <div className="text-xs uppercase text-muted-foreground">Minutes</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold">{formatTime(timeLeft.seconds)}</div>
        <div className="text-xs uppercase text-muted-foreground">Seconds</div>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const raceDayBanner = PlaceHolderImages.find(
    (img) => img.id === 'race-day-banner'
  );

  const [nextRace, setNextRace] = useState<typeof allRaces[0] | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const findNextRace = () => {
        const now = new Date();
        const raceDuration = 3 * 60 * 60 * 1000; // 3 hours

        // Find races that are not over yet (race end time > now)
        const upcomingRaces = allRaces
          .filter(race => race.date.getTime() + raceDuration > now.getTime())
          .sort((a, b) => a.date.getTime() - b.date.getTime());
        
        setNextRace(upcomingRaces[0] || null);
    };

    findNextRace();
    // Set an interval to check for the next race periodically, e.g., every minute
    const interval = setInterval(findNextRace, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="relative mb-8 overflow-hidden rounded-lg aspect-video">
        <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/6RDZJ57BoUU?autoplay=1&mute=0&loop=1&playlist=6RDZJ57BoUU&controls=1&showinfo=0&autohide=1&modestbranding=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform gap-2">
          <Button variant="secondary" size="lg" asChild>
            <Link href="/races">
              Races <Calendar className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/play">
                <Star className="mr-2 h-4 w-4" /> Play
            </Link>
          </Button>
        </div>
      </div>

      {isClient && nextRace ? (
        <div className="mb-8 rounded-lg border border-border bg-card p-6 text-center text-card-foreground">
          <p className="mb-2 font-bold uppercase tracking-widest text-primary">
            Next Race
          </p>
          <h2 className="mb-1 text-3xl font-bold uppercase">
            {nextRace.name}
          </h2>
          <p className="mb-2 text-muted-foreground">{nextRace.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          <p className="mb-6 text-muted-foreground">{nextRace.location}</p>
          <CountdownTimer targetDate={nextRace.date} />
        </div>
      ) : (
         <div className="mb-8 rounded-lg border border-border bg-card p-6 text-center text-card-foreground">
            <h2 className="mb-1 text-3xl font-bold">
                {isClient ? 'No upcoming races scheduled.' : 'Loading next race...'}
            </h2>
            <p className="mt-2 text-muted-foreground">
                {isClient ? 'Please check back soon for the next season\'s schedule!' : ''}
            </p>
        </div>
      )}

      <div className="mb-12 text-center">
        <Button
          size="lg"
          className="rounded-full bg-red-600 px-12 py-6 text-lg font-bold text-white hover:bg-red-700"
          asChild
        >
          <Link href="/play">Play Next Race</Link>
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground">
        <div className="relative">
          {raceDayBanner && (
            <Image
              src={raceDayBanner.imageUrl}
              alt={raceDayBanner.description}
              width={1200}
              height={400}
              className="w-full object-cover object-right-bottom md:object-center"
              data-ai-hint={raceDayBanner.imageHint}
            />
          )}
          <div className="absolute inset-x-0 bottom-0 bg-blue-700/90 p-4">
            <h3 className="text-2xl font-bold md:text-3xl">Make Race Day More Exciting</h3>
            <p className="mb-4 mt-2 max-w-md text-white/90">
              Join playing with friends and predict your favorite riders win.
              No Fee for playing or redeeming
            </p>
            <div className="flex gap-4">
              <Button className="bg-red-600 text-white hover:bg-red-700" asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
              <Button className="bg-red-600 text-white hover:bg-red-700" asChild>
                <Link href="/play">Play</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="p-4 text-center md:p-8">
          <h3 className="text-xl font-bold uppercase tracking-wider">
            The Ultimate Motorcross & Supercross Playing Platform
          </h3>
          <p className="mt-2 text-muted-foreground">
            Professional riders - Automated payouts - Real time standings
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button className="w-full bg-red-600 text-white hover:bg-red-700 sm:w-auto" asChild>
              <Link href="/races">Race Schedule</Link>
            </Button>
            <Button variant="outline" className="w-full border-2 font-bold sm:w-auto" asChild>
                <Link href="/play">Play Games</Link>
            </Button>
            <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 sm:w-auto" asChild>
              <Link href="/riders">View Riders</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
