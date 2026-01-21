
import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, Users, Coins, Trophy, Banknote } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    icon: <UserPlus className="h-8 w-8 text-primary" />,
    title: 'Sign Up for an Account',
    description: "Creating an account is quick and easy. Click the 'Register' button on the homepage, fill in your details, and you're ready to go. This gives you access to all of MxRaceHub's features.",
    link: '/register',
    linkText: 'Register Now',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Find and Add Friends',
    description: "MxRaceHub is better with friends! Use the 'Friends' page to search for other users by their username and add them to your friends list. Once they're added, you can start placing friendly wagers.",
    link: '/friends',
    linkText: 'Find Friends',
  },
  {
    icon: <Coins className="h-8 w-8 text-yellow-500" />,
    title: 'Play on Races with Gold Coins',
    description: "Use Gold Coins (GC) to place plays against your friends on upcoming Supercross and Motocross races. Select a race, choose a friend to play against, set the amount, and confirm. Gold Coins can be purchased from the bank.",
    link: '/betting',
    linkText: 'Place a Play',
  },
  {
    icon: <Trophy className="h-8 w-8 text-amber-400" />,
    title: 'Win Sweeps Coins',
    description: "Winning plays and participating in promotional games can earn you Sweeps Coins (SC). These are your key to winning real prizes. All Sweeps Coin winnings have a 1x playthrough requirement before they can be redeemed.",
    link: '/account',
    linkText: 'View Balances',
  },
  {
    icon: <Banknote className="h-8 w-8 text-green-500" />,
    title: 'Exchange for Real Money',
    description: "Once you've met the playthrough requirement, your Sweeps Coins can be exchanged for real USD through our secure partner, Mx Exchange. Navigate to the 'Exchange Sweeps Coins' page to begin the process.",
    link: '/account/exchange-sweeps',
    linkText: 'Exchange Sweeps Coins',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        title="How MxRaceHub Works"
        description="Your step-by-step guide to signing up, playing, and winning."
      />
      <div className="space-y-8">
        {steps.map((step, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-start gap-4">
              <div className="flex-shrink-0">{step.icon}</div>
              <div className="flex-grow">
                <CardTitle>
                  Step {index + 1}: {step.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{step.description}</p>
              <Button asChild variant="outline">
                <Link href={step.link}>{step.linkText}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
