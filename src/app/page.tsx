
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star, Calendar } from 'lucide-react';
import Link from 'next/link';
import { motocrossRaces } from '@/lib/races-motocross-data';
import { supercrossRaces } from '@/lib/races-supercross-data';

// Helper function to parse dates. Assumes current or next year for month-day formats.
const parseDate = (dateString: string): Date => {
  const now = new Date();
  let raceDate = new Date(dateString);

  if (isNaN(raceDate.getTime())) {
    // Handle formats like "MAY 30"
    const withYear = `${dateString} ${now.getFullYear()}`;
    raceDate = new Date(withYear);
    if (raceDate < now) {
      // If the date is in the past, assume it's for next year
      raceDate.setFullYear(now.getFullYear() + 1);
    }
  }
  
  // Set time to end of day for countdown consistency
  raceDate.setHours(23, 59, 59, 999);
  return raceDate;
};


const allRaces = [
  ...motocrossRaces.map(r => ({ ...r, date: parseDate(r.date) })),
  ...supercrossRaces.map(r => ({
    id: `supercross-${r.round}`,
    name: `${r.location} Supercross`,
    track: r.track,
    date: parseDate(r.date),
    location: r.location,
  })),
];

// CountdownTimer component
const CountdownTimer = ({ targetDate }: { targetDate: Date | null }) => {
  const calculateTimeLeft = () => {
    if (!targetDate) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const difference = +targetDate - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (!targetDate) return;

    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const formatTime = (time: number) => {
    return time.toString().padStart(2, '0');
  };

  if (!targetDate) {
    return null;
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
    const now = new Date();
    const upcomingRaces = allRaces
      .filter(race => race.date > now)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
    
    setNextRace(upcomingRaces[0] || null);
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="relative mb-8 overflow-hidden rounded-lg aspect-video">
        <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/UOq_s-f2p2c?autoplay=1&mute=1&loop=1&playlist=UOq_s-f2p2c&controls=0&showinfo=0&autohide=1&modestbranding=1"
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
            <Link href="/betting">
                <Star className="mr-2 h-4 w-4" /> Betting
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
          <Link href="/betting">Bet Next Race</Link>
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
              className="w-full object-cover"
              data-ai-hint={raceDayBanner.imageHint}
            />
          )}
          <div className="absolute inset-x-0 bottom-0 bg-blue-700/90 p-6 text-white">
            <h3 className="text-3xl font-bold">Make Race Day More Exciting</h3>
            <p className="mb-4 mt-2 max-w-md text-white/90">
              Join betting with friends and place bets on your favorite riders.
              No Fee for bets or gold coins
            </p>
            <div className="flex gap-4">
              <Button className="bg-red-600 text-white hover:bg-red-700" asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
              <Button className="bg-red-600 text-white hover:bg-red-700" asChild>
                <Link href="/betting">Place Bet</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="p-8 text-center">
          <h3 className="text-xl font-bold uppercase tracking-wider">
            The Ultimate Motorcross & Supercross Betting Platform
          </h3>
          <p className="mt-2 text-muted-foreground">
            Professional riders - Automated payouts - Real time standings
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button className="bg-red-600 text-white hover:bg-red-700" asChild>
              <Link href="/races">Race Schedule</Link>
            </Button>
            <Button variant="outline" className="border-2 font-bold" asChild>
                <Link href="/betting">Place Bets</Link>
            </Button>
            <Button className="bg-blue-600 text-white hover:bg-blue-700" asChild>
              <Link href="/riders">View Riders</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

    