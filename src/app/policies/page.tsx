
'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type PolicySection = 'terms' | 'responsible' | 'privacy' | 'cookies';

const SectionButton = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={cn(
      'w-full text-left p-3 rounded-md font-medium transition-colors relative',
      isActive
        ? 'bg-muted text-primary-foreground'
        : 'hover:bg-muted/50 text-muted-foreground',
    )}
  >
    {isActive && <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-l-md"></div>}
    <span className="ml-4">{label}</span>
  </button>
);


const TermsContent = () => (
    <div className="space-y-6 text-muted-foreground">
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">Account Creation &amp; Fees</h3>
            <p>
            Creating a user account on MxRaceHub is completely free. We believe in providing a straightforward and enjoyable experience without hidden costs.
            </p>
        </div>
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">Playing Rules</h3>
            <p>
            When playing with a friend, all plays are final. Winning plays will take all Gold Coins (GC) or Sweeps Coins (SC) for the win. Sweeps Coins (SC) must be played at least once before being eligible for exchange.
            </p>
        </div>
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">(GC) Gold Coins</h3>
            <p>
            Gold Coins (GC) are our platform's virtual currency, used for social gameplay. They can be purchased at a rate of 100 GC for $1.00 USD. You can exchange your Gold Coins back to your original payment method anytime, and all exchanges and returns are completely free, if coins are not used. No purchase is required to obtain or redeem Sweeps Coins. A purchase will not increase your chances of winning.
            </p>
        </div>
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">(SC) Sweeps Coins</h3>
            <p>
            Sweeps Coins (SC) are our promotional coins, which you can win through gameplay. They can only be won. 100 Sweeps Coins are redeemable for $1.00 USD. Winnings in SC must be played through at least once before they can be redeemed for cash prizes via our partner site, MX Exchange. 
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
            By using MxHub Exchange Duo, you agree to our terms of service. All plays placed are final. Users must be of legal age in their jurisdiction to participate. We reserve the right to suspend accounts for any fraudulent activity.
            </p>
        </div>
    </div>
);

const ResponsiblePlayContent = () => (
     <div className="space-y-6 text-muted-foreground">
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">Our Commitment to Responsible Play</h3>
            <p>
                MxRaceHub is committed to providing a safe and responsible social gaming environment. We want all of our users to play responsibly and within their means. If you believe your play is having a negative impact on your life, we are here to help.
            </p>
        </div>
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">Tips for Playing Responsibly</h3>
            <ul className="list-disc list-inside space-y-2">
                <li>Play for fun, not as a way to make money.</li>
                <li>Only play with money that you can afford to lose.</li>
                <li>Set limits for both the time and money you spend.</li>
                <li>Never chase losses.</li>
                <li>Take regular breaks from playing.</li>
                <li>Do not play when you are upset, tired, or depressed.</li>
            </ul>
        </div>
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">Self-Exclusion & Limits</h3>
            <p>
                If you feel you need a break from playing, you can request to self-exclude from our platform. We offer options to temporarily suspend your account or to close it permanently. To set play limits or to request self-exclusion, please contact our support team at <Link href="mailto:mxracehub@proton.me" className="text-primary hover:underline">mxracehub@proton.me</Link>.
            </p>
        </div>
         <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">Need Help?</h3>
            <p>
                If you or someone you know has a gambling problem, we encourage you to seek help. There are many resources available to provide support and information.
            </p>
            <p className="mt-2">
                National Council on Problem Gambling: <Link href="https://www.ncpgambling.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.ncpgambling.org</Link> or call 1-800-522-4700.
            </p>
        </div>
    </div>
);

const PrivacyPolicyContent = () => (
    <div className="space-y-6 text-muted-foreground">
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
    </div>
);

const CookiesContent = () => (
    <div className="space-y-6 text-muted-foreground">
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">Cookies Policy</h3>
            <p>
            We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
            </p>
        </div>
    </div>
);


export default function PoliciesPage() {
    const [activeSection, setActiveSection] = useState<PolicySection>('terms');

    const renderContent = () => {
        switch (activeSection) {
            case 'terms':
                return <TermsContent />;
            case 'responsible':
                return <ResponsiblePlayContent />;
            case 'privacy':
                return <PrivacyPolicyContent />;
            case 'cookies':
                return <CookiesContent />;
            default:
                return <TermsContent />;
        }
    }

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="Policies"
        description="Review our terms, conditions, and privacy information."
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
            <nav className="flex flex-col space-y-1 bg-card p-2 rounded-lg">
                <SectionButton label="Terms & Conditions" isActive={activeSection === 'terms'} onClick={() => setActiveSection('terms')} />
                <SectionButton label="Responsible Play" isActive={activeSection === 'responsible'} onClick={() => setActiveSection('responsible')} />
                <SectionButton label="Privacy Policy" isActive={activeSection === 'privacy'} onClick={() => setActiveSection('privacy')} />
                <SectionButton label="Cookies Policy" isActive={activeSection === 'cookies'} onClick={() => setActiveSection('cookies')} />
            </nav>
        </aside>
        <main className="md:col-span-3">
            <Card>
                <CardContent className="p-6">
                    {renderContent()}
                </CardContent>
            </Card>
        </main>
      </div>
    </div>
  );
}
