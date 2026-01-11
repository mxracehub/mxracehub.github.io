
import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Shield } from 'lucide-react';

export default function PoliciesPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader
        title="Our Policies"
        description="Review our terms, conditions, and privacy information."
      />
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Terms and Policies
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6 text-muted-foreground">
          <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">Terms of Service</h3>
            <p>
              By using MxHub Exchange Duo, you agree to our terms of service. All bets placed are final. Users must be of legal age in their jurisdiction to participate. We reserve the right to suspend accounts for any fraudulent activity.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">Privacy Policy</h3>
            <p>
              Your privacy is important to us. We collect minimal personal information necessary for account management and transactions. We do not sell your data to third parties. All financial information is encrypted and handled by secure payment processors.
            </p>
          </div>
           <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">Information Security Policy</h3>
            <p>
              We are committed to protecting your data. We implement industry-standard security measures including data encryption in transit and at rest, regular security audits, and access control policies to safeguard your information. For sensitive operations like connecting a bank account, we integrate with trusted third-party services like Plaid, which handle your financial credentials directly. Your banking information is never stored on our servers. You are responsible for maintaining the security of your account by using a strong, unique password and not sharing your login details.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">KYC Agreement</h3>
            <p>
              When accepting a friend request, you acknowledge a mutual agreement for social gaming. For financial transactions and prize redemptions, further Know Your Customer (KYC) verification may be required to comply with financial regulations.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">Betting Rules</h3>
            <p>
              When betting with a friend, all bets are final. Winning bets will take all GC or SC for the win. SC must be bet at least once before being eligible for exchange.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">(GC) Gold Coins</h3>
            <p>
              Gold Coins are a virtual currency for social gameplay. You can purchase them in the bank and exchange them back to your original payment method at any time, free of charge.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">(SC) Sweeps Coins</h3>
            <p>
              Sweeps Coins are promotional coins that can be won. Winnings in SC must be played through at least once before they can be redeemed for prizes via our partner site, mxexchange.site, which may include a processing fee.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
