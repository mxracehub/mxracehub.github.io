
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star, X } from 'lucide-react';

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
  const raceBanner = PlaceHolderImages.find(
    (img) => img.id === 'race-banner-1'
  );

  const nextRaceDate = new Date('2025-05-31T23:59:59');

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="relative mb-8 overflow-hidden rounded-lg">
        {raceBanner && (
          <Image
            src={raceBanner.imageUrl}
            alt={raceBanner.description}
            width={1200}
            height={600}
            className="w-full object-cover"
            data-ai-hint={raceBanner.imageHint}
          />
        )}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform gap-2">
          <Button variant="secondary" size="lg">
            Races <X className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="secondary" size="lg">
            <Star className="mr-2 h-4 w-4" /> Betting
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
        >
          Bet Next Race
        </Button>
      </div>

    </div>
  );
}
