
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star, X, Calendar, Users } from 'lucide-react';
import Link from 'next/link';

// CountdownTimer component
const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
  const calculateTimeLeft = () => {
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
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const formatTime = (time: number) => {
    return time.toString().padStart(2, '0');
  };

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

  const nextRaceDate = new Date('2025-05-31T23:59:59');

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

      <div className="mb-8 rounded-lg border border-border bg-card p-6 text-center text-card-foreground">
        <p className="mb-2 font-bold uppercase tracking-widest text-primary">
          Next Race
        </p>
        <h2 className="mb-1 text-3xl font-bold">
          THUNDER VALLEY MOTOCROSS
        </h2>
        <p className="mb-2 text-muted-foreground">MAY 31, 2025</p>
        <p className="mb-6 text-muted-foreground">Lakewood, Colorado</p>

        <CountdownTimer targetDate={nextRaceDate} />
      </div>

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
                <Link href="#">Sign Up</Link>
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
