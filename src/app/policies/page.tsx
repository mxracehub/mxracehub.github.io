
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
            <h3 className="text-xl font-bold mb-2 text-card-foreground">Account Creation &amp; Fees</h3>
            <p>
              Creating a user account on MxRaceHub is completely free. We believe in providing a straightforward and enjoyable experience without hidden costs.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">Betting Rules</h3>
            <p>
              When betting with a friend, all bets are final. Winning bets will take all Gold Coins (GC) or Sweeps Coins (SC) for the win. Sweeps Coins (SC) must be bet at least once before being eligible for exchange.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">(GC) Gold Coins</h3>
            <p>
              Gold Coins (GC) are our platform's virtual currency, used for social gameplay. They can be purchased at a rate of 100 GC for $1.00 USD. You can exchange your Gold Coins back to your original payment method anytime, and all exchanges and returns are completely free.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">(SC) Sweeps Coins</h3>
            <p>
             Sweeps Coins (SC) are our promotional coins, which you can win through gameplay. Each Sweeps Coin is redeemable for $1.00 USD. Winnings in SC must be played through at least once before they can be redeemed for cash prizes via our partner site, MX Exchange. A 2% processing fee applies at the time of redemption, resulting in a 98% return rate.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">KYC Agreement</h3>
            <p>
              When accepting a friend request, you acknowledge a mutual agreement for social gaming. For financial transactions and prize redemptions, further Know Your Customer (KYC) verification may be required to comply with financial regulations.
            </p>
          </div>
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
              We are committed to protecting your data. We implement industry-standard security measures including data encryption in transit (using TLS 1.2 or better) and at rest, regular security audits, and access control policies to safeguard your information. For sensitive operations like connecting a bank account, we integrate with trusted third-party services like Plaid, which handle your financial credentials directly. Your banking information is never stored on our servers. You are responsible for maintaining the security of your account by using a strong, unique password and not sharing your login details.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">Vulnerability Management Policy</h3>
            <p>
              We are dedicated to ensuring the security of our platform by proactively identifying and addressing vulnerabilities. Our process includes regular automated security scanning, code reviews, and staying informed about the latest security threats. We encourage responsible disclosure of security vulnerabilities by security researchers. All reported issues are triaged, prioritized based on severity, and remediated in a timely manner to protect our users and their data.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">Data Deletion and Retention Policy</h3>
            <p>
              We retain user data only for as long as necessary to provide our services and comply with legal obligations. You may request the deletion of your account and associated personal data by contacting us. Upon receiving a valid deletion request, we will erase or anonymize your data within 30 days, unless we are legally required to retain it for a longer period (e.g., for financial records or legal disputes). This policy is reviewed periodically to ensure compliance with applicable data privacy laws.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">Data and Asset Disposal Policy</h3>
            <p>
              Our systems are designed to automatically and securely dispose of data when it is no longer needed according to our retention policies. Digital data is cryptographically erased or overwritten to ensure it is unrecoverable. Physical media, such as servers or hard drives, are degaussed or physically destroyed before being decommissioned. These automated disposal methods comply with industry standards and applicable regulations to ensure your data is permanently and securely removed.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
