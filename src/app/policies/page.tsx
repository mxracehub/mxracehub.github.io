
'use client';

import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

type PolicySection = 'terms' | 'responsible' | 'privacy' | 'cookies' | 'basic-instructions';

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
        <p className="text-center font-bold text-destructive">IMPORTANT NOTICE: THIS AGREEMENT IS SUBJECT TO BINDING ARBITRATION AND A WAIVER OF CLASS ACTION RIGHTS AS DETAILED IN CLAUSE 26.</p>
        
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">1. INTRODUCTION</h3>
            <p className="mb-4">Welcome to Mxracehub.com! Before the fun starts, we need to make sure you know how we operate and what it means when you register an account.</p>
            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">Who are we</h4>
            <p className="mb-4">The Platform is provided by MxRaceHub, a company duly incorporated under Colorado law, with the register number ? and registered office at 807 East, Kelly Drive, Loveland, Colorado, 80537. Colorado (hereinafter “MxRaceHub”, “we” , “us” or “our”).</p>
            <div className="border rounded-lg p-4 my-4">
              <div className="grid grid-cols-3 font-semibold">
                <div>Version</div>
                <div>Publish Date</div>
                <div>Description</div>
              </div>
              <div className="grid grid-cols-3 mt-2">
                <div>Version 1.0</div>
                <div>1/21/2026</div>
                <div>Term & Conditions</div>
              </div>
            </div>
            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">Registering on the Platform</h4>
            <p className="mb-2">By registering on the Platform (through any electronic device, such as the web, mobile, tablet or any other device), you accept these Terms and Conditions (“Terms”) and enter into a binding agreement with us which applies to your access to, and use of, our Platform and our Games.</p>
            <p className="mb-2">PLEASE TAKE THE TIME TO READ THESE TERMS CAREFULLY AND IN THEIR ENTIRETY. BY ACCEPTING THESE TERMS, YOU REPRESENT – AND WE ARE RELYING ON YOUR REPRESENTATION – THAT YOU HAVE DONE SO. IF YOU LIVE IN ANY OF THE EXCLUDED TERRITORIES IDENTIFIED BELOW, DO NOT PROCEED ANY FURTHER AS YOU ARE NOT ELIGIBLE TO ACCESS OR USE THE PLATFORM, CREATE A CUSTOMER ACCOUNT, PLAY THE GAMES OR INTERACT WITH MXRACEHUB IN ANY OTHER WAY.</p>
            <p className="mb-2">By checking the box for acceptance during the registration process, accessing or using our Platform, creating a Customer Account, and/or accessing the Games, you confirm that you have read and agree to be bound by these Terms, which includes our Privacy Policy and other game-specific or promotion-specific terms relevant to your Participation.</p>
            <p className="mb-2">If you do not agree with any provision of these Terms or any other linked policy, rules or terms, you may not access or use the Platform, create a Customer Account or play any Game.</p>
            <p>We may update these Terms periodically at our discretion. By continuing to access our Platform, your Customer Account, and/or our Games you are deemed to have read and to be bound by any such updates. If you do not wish to be bound by these Terms, any updated Terms or any other linked policy, rules or terms, you may not continue to access the Platform or any of the Games (including the website and any associated apps). We will note the most recent date of these Terms at the top of this page.</p>
        </div>

        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">2. MXRACEHUB STATEMENT</h3>
            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">2.1. The following are "Excluded Territories”:</h4>
            <ul className="list-disc list-inside ml-4 mb-2">
                <li>Any country other than the continental United States of America and Hawaii (“US”);</li>
                <li>Within the US the following States are excluded:
                    <ol className="list-roman list-inside ml-6">
                        <li>WASHINGTON</li>
                        <li>NEW YORK</li>
                        <li>NEVADA</li>
                        <li>IDAHO</li>
                        <li>KENTUCKY</li>
                        <li>MICHIGAN</li>
                        <li>VERMONT</li>
                        <li>NEW JERSEY</li>
                        <li>DELAWARE</li>
                        <li>WEST VIRGINIA</li>
                        <li>PENNSYLVANIA</li>
                        <li>RHODE ISLAND</li>
                        <li>CONNECTICUT</li>
                        <li>MARYLAND</li>
                        <li>LOUISIANA</li>
                        <li>MONTANA</li>
                        <li>ARIZONA</li>
                        <li>TENNESSEE</li>
                        <li>CALIFORNIA</li>
                        <li>Any other states or jurisdictions which, under the laws applicable to you, are legally precluded from playing the Games offered on the Platform, and any other jurisdiction MxRaceHub excludes, in its sole discretion, from time to time.</li>
                    </ol>
                </li>
            </ul>
            <p className="mb-2">2.2. BY ACCEPTING THESE TERMS, ACCESSING OR USING THE PLATFORM, CREATING A CUSTOMER ACCOUNT, AND/OR PLAYING THE GAMES, YOU SPECIFICALLY REPRESENT TO US THAT YOU DO NOT RESIDE IN ANY OF THE EXCLUDED TERRITORIES. WE ARE SPECIFICALLY RELYING ON SUCH REPRESENTATIONS IN PROVIDING YOU ACCESS TO THE PLATFORM, CUSTOMER ACCOUNT, AND GAMES. IF YOU RESIDE IN ANY OF THE EXCLUDED TERRITORIES AND NONETHELESS CHECK THE BOX FOR ACCEPTANCE OF THESE TERMS, ACCESS OR USE THE PLATFORM, CREATE A CUSTOMER ACCOUNT, AND/OR PLAY THE GAMES DESPITE OUR EFFORTS TO PREVENT YOU FROM DOING SO, WE CONSIDER YOUR ACTIONS TO BE A MATERIAL MISREPRESENTATION TO US, A FRAUDULENT INDUCEMENT OF OUR SERVICES, AND A VIOLATION OF THESE TERMS, AND WE RESERVE ALL RIGHTS TO TAKE APPROPRIATE ACTION AGAINST YOU.</p>
            <p className="mb-2">2.3. NO PURCHASE OR PAYMENT IS NECESSARY TO PARTICIPATE OR PLAY THE GAMES. A PURCHASE OR PAYMENT OF ANY KIND WILL NOT INCREASE YOUR CHANCES OF WINNING.</p>
            <p className="mb-2">2.4. THE PLATFORM AND GAMES DO NOT OFFER REAL MONEY GAMBLING, AND NO ACTUAL MONEY IS REQUIRED TO PLAY.</p>
            <p className="mb-2">2.5. ONLY CUSTOMERS IN THE CONTINENTAL UNITED STATES AND HAWAII (EXCEPT FOR THE EXCLUDED TERRITORIES) ARE ELIGIBLE TO ACCESS AND USE THE PLATFORM, CREATE A CUSTOMER ACCOUNT, AND PLAY THE GAMES.</p>
            <p className="mb-2">2.6. PLEASE BE AWARE THAT THESE TERMS INCLUDE DISPUTE RESOLUTION PROVISIONS, INCLUDING A PROVISION WAIVING YOUR RIGHT TO PURSUE ANY CLASS, GROUP OR REPRESENTATIVE CLAIM AND REQUIRING YOU TO PURSUE PAST, PENDING, AND FUTURE DISPUTES BETWEEN YOU AND US THROUGH INDIVIDUAL ARBITRATION UNLESS YOU OPT OUT WITHIN THE SPECIFIED TIME FRAME PURSUANT TO CLAUSE 26.</p>
        </div>

        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">3. DEFINITIONS</h3>
            <ul className="list-alpha list-inside ml-4 space-y-2">
                <li><strong>“Collective Action”</strong> – means any claim, action, or proceeding asserted or pursued as a class action, group action, collective action, joint action, coordinated action, consolidated action, mass action, or in any other representative or private attorney general capacity, whether in arbitration, court or any other venue.</li>
                <li><strong>“Content”</strong> – means text, graphics, user interfaces, visual interfaces, photographs, trademarks, logos, sounds, music, artwork, computer code and other material used, displayed or available as part of the Games and Platform.</li>
                <li><strong>“Customer Account”</strong> – means an account held by a Registered Customer.</li>
                <li><strong>“Fraudulent Conduct"</strong> – means any of the conduct described in clause 16.</li>
                <li><strong>“Game”</strong> – means any one or more Game(s) available on the Platform in either Standard Play or Promotional Play. We reserve the right to add and remove Games from the Platform at our sole discretion.</li>
                <li><strong>“Gold Coin”</strong> – means the virtual social gameplay currency which enables you to play the Standard Play Games. Gold Coins have no monetary value and cannot under any circumstance be redeemed for Prizes.</li>
                <li><strong>“Participate”, “Participating” or “Participation”</strong> – means playing any Games or using our Platform in any manner whatsoever, including any of the conduct described in clause 6, 9, 10, 11 and 12.</li>
                <li><strong>“Payment Administration Agent”</strong> – means any payments facilitators and / or the service provided through any related body corporate, affiliate, or third party we appoint to act as our agent.</li>
                <li><strong>"Payment Medium"</strong> – means any card, online wallet, financial/bank account or other payment medium used to purchase Gold Coins.</li>
                <li><strong>"Platform"</strong> – means the services provided through any URL or mobile application belonging to, or licensed to, MxRaceHub, and branded as part of the MxRaceHub games, including the website located at mxracehub.site, and all subdomains, subpages and successor sites thereof, as well as all Games, features, tools and services available thereon.</li>
                <li><strong>“Customer” or “you”</strong> – means any person who Participates, whether or not a Registered Customer.</li>
                <li><strong>“Prizes”</strong> – means valuable prizes that can be redeemed using Sweeps Coins won through Promotional Play in accordance with these Terms.</li>
                <li><strong>“Promotional Play” or “Sweepstakes”</strong> – means Participation in our sweepstakes promotions by playing the Platform’s game with Sweeps Coins.</li>
                <li><strong>“Registered Customer"</strong> – means a Customer who has successfully registered a Customer Account, whether that account is considered active or not.</li>
                <li><strong>“Standard Play"</strong> – means Participating in any game played with Gold Coins.</li>
                <li><strong>"Sweeps Coins"</strong> – means sweepstakes entries.</li>
                <li><strong>"Third Party Website”</strong> – means a third-party website not controlled by us.</li>
            </ul>
        </div>
        
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">4. REGISTRATION & CUSTOMER WARRANTIES</h3>
            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">4.1. Registration</h4>
            <p className='mb-2'>a) When you try to register a Customer Account you will be requested to provide the following information:</p>
            <ul className="list-roman list-inside ml-6 mb-2">
                <li>Full legal name;</li>
                <li>Date of birth;</li>
                <li>Permanent Address;</li>
                <li>E-mail.</li>
            </ul>
            <p>b) MxRaceHub will also request you to provide a copy of your identification document and proof of address upon registration. For the purpose of this verification, we may accept a driver's license or other government issued identification document which is permitted to be used for identification purposes and contains your residential address. You will also be requested to set a username and password.</p>
            <p>Please note that how we collect, use, maintain and disclose your personal information is governed by our privacy policy accessible <span className="text-primary hover:underline cursor-pointer" onClick={() => (document.querySelector('button[data-section="privacy"]') as HTMLButtonElement)?.click()}>here</span>.</p>

            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">4.2. Warranties</h4>
            <p className='mb-2'>a) You declare and warrant that:</p>
            <ul className="list-roman list-inside ml-6 mb-2 space-y-1">
                <li>You are over 21 years of age or such higher minimum legal age of majority as stipulated in the jurisdiction of your residence and are, under the laws applicable to you, legally allowed to participate in the Games offered on the Platform;</li>
                <li>WHEN PARTICIPATING IN STANDARD OR PROMOTIONAL PLAY, YOU DO NOT RESIDE IN, OR ACCESS THE PLATFORM FROM, THE EXCLUDED TERRITORIES;</li>
                <li>You use our Platform strictly in your personal capacity for recreational and entertainment purposes only;</li>
                <li>You participate in the Games on your own behalf and not on behalf of any other person;</li>
                <li>All information that you provide to us during the term of validity of these Terms is true, complete and correct, and you will immediately notify us of any change to such information;</li>
                <li>Cryptocurrency or FIAT currency (“FIAT”) that you use to purchase Gold Coins is not tainted with any illegality and, in particular, does not originate from any illegal activity or source, or from ill-gotten means;</li>
                <li>You will not purchase Gold Coins from a business or corporate account, but only a wallet held in your name;</li>
                <li>You will not be involved in any fraudulent, collusive, fixing or other unlawful activity in relation to your or third parties’ participation in any of the Games and you will not use any software-assisted methods or techniques (including but not limited to bots designed to play automatically) or hardware devices for your participation in any of the Games. We reserve the right to invalidate any participation in the event of such behavior;</li>
                <li>When purchasing Gold Coins, you must only use a valid Payment Medium which lawfully belongs to you;</li>
            </ul>
            <p className='mb-2'>b) It is a Customer’s sole responsibility to ensure that their Participation is lawful in their jurisdiction.</p>
            <p className='mb-2'>c) Any person who is knowingly in breach of Clauses 2, 4 and 23, including but not limited to any attempt to circumvent any restrictions regarding Excluded Territories and jurisdictions, for example, by using a service that masks or manipulates the identification of your real location, or by otherwise providing false or misleading information regarding your location or place of residence, or by Participating from an Excluded Territory or through a third party or on behalf of a third party located in an Excluded Territory, is in breach of these Terms. You may be committing fraud and may be subject to criminal prosecution.</p>
            <p className='mb-2'>d) You shall not act in a manner that is defamatory, trade libelous, threatening, or harassing.</p>
            <p className='mb-2'>e) You shall not engage in potentially fraudulent or suspicious activity and/or transactions.</p>
            <p className='mb-2'>f) You must cooperate in any investigation or provide confirmation of your identity or the accuracy of any information you provide to us.</p>
            <p className='mb-2'>g) You shall not provide false, inaccurate or misleading information in connection with your use of the Platform, in communications with MxRaceHub, or otherwise connected with these Terms.</p>
            <p className='mb-2'>h) You shall not violate, or attempt to violate, (1) any law, statute, or ordinance; or (2) MxRaceHub’s or any third-party’s copyright, patent, trademark, trade secret, or other intellectual property rights, or rights of publicity or privacy.</p>
            <p>i) You declare that your access and use of the Platform and/or the Games, and your execution and delivery of, and the performance of your obligations under these Terms, will not result in a breach of any applicable laws, rules or regulations or of any order, decree or judgment of any court, any award of any arbitrator or those of any governmental or regulatory authority in any jurisdiction.</p>
            
            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">4.3 Eligible Customers</h4>
            <p>Employees and contractors of MxRaceHub, any of its respective affiliates, subsidiaries, holding companies, advertising agencies, or any other company or individual involved with the design, production, execution or distribution of the Games and their immediate family (spouse, parents, siblings and children, whether the relationship is by birth, marriage or adoption) and household members (people who share the same residence at least 3 months of the year) are not eligible to Participate.</p>
            
            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">4.4 Acceptance</h4>
            <p>By accepting these Terms you agree that your Participation is at your sole option, discretion and risk. You will have no claims whatsoever against us or any of our partners, or respective directors, officers, employees, or contractors in relation to your use of the Platform or the Games.</p>
        </div>

        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">5. LICENCE</h3>
            <p className='mb-2'>5.1. Subject to your agreement and continuing compliance with these Terms, MxRaceHub grants you a personal, non-exclusive, non-transferable, non-sublicensable, revocable, limited license to access and use the Platform, including Gold Coins and Sweeps Coins, through a supported web browser or mobile device, solely for your personal, private entertainment and no other reason.</p>
            <p className='mb-2'>5.2. These Terms do not grant you any right, title or interest in the Platform or Content.</p>
            <p className='mb-2'>5.3. You acknowledge and agree that your license to use the Platform is limited by these Terms and if you do not agree to, or act in contravention of, these Terms, your license to use the Platform (including the Games and Content) shall be immediately and automatically terminated by MxRaceHub (without any liability to you whatsoever).</p>
            <p>5.4. In the event that the Platform or any Game is deemed to be illegal under the laws of the jurisdiction in which you reside or are situated, you are not granted any license to, and must refrain from accessing, the Platform or relevant Game.</p>
        </div>

        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">6. YOUR CUSTOMER ACCOUNT</h3>
            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">6.1. Single Account</h4>
            <p className='mb-2'>a) You are allowed to have only one Customer Account, including any inactive Account, on the Platform. If you attempt to open more than one Customer Account, all accounts you have opened or try to open may be cancelled or suspended and the consequences described in clause 23 may be enforced.</p>
            <p className='mb-2'>b) You must notify us immediately if you notice that you have more than one registered Customer Account, whether active or not, on the Platform.</p>
            <p>c) DO NOT CREATE A NEW CUSTOMER ACCOUNT IF YOU WISH TO CHANGE YOUR EMAIL, ADDRESS OR OTHER PERSONAL INFORMATION.</p>

            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">6.2. Accuracy</h4>
            <p className='mb-2'>a) You are required to keep your registration details up to date at all times.</p>
            <p>b) All the personal information provided by you when creating your Customer Account or any further subsequent updates to your Customer Account, must be identical to that listed on your government issued identification.</p>

            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">6.3. Security and Responsibility of Your Customer Account</h4>
            <p className='mb-2'>a) As part of the registration process, you will have to choose a password to login into the Platform.</p>
            <p className='mb-2'>b) It is your sole and exclusive responsibility to ensure that your Customer Account login details and any Payment Methods are kept secure and are only accessible by you. You accept full responsibility for any unauthorized use of your Customer Account and any activity linked to your Customer Account, including by a minor (which, in all events, is prohibited).</p>
            <p className='mb-2'>c) WE STRONGLY RECOMMEND THAT YOU ENABLE MULTI-FACTOR AUTHENTICATION FOR YOUR CUSTOMER ACCOUNT.</p>
            <p className='mb-2'>d) You must not share your Customer Account or password with another person, let anyone else access or use your Customer Account or do any other thing that may jeopardize the security of your Customer Account.</p>
            <p className='mb-2'>e) If you become aware of, or reasonably suspect that security in your Customer Account has been compromised, including loss, theft or unauthorized disclosure of your password and Customer Account details, you must notify us immediately.</p>
            <p className='mb-2'>f) You are solely responsible for maintaining the confidentiality of your password and you will be held responsible for all uses of your Customer Account, including any purchases made under the Customer Account, whether those purchases were authorized by you or not.</p>
            <p className='mb-2'>g) You are solely responsible for anything that happens through your Customer Account, whether or not you undertook those actions.</p>
            <p className='mb-2'>h) You acknowledge that your Customer Account may be terminated if someone else uses it and/or engages in any activity that breaches these Terms or is otherwise illegal.</p>
            <p>i) MxRaceHub is not responsible for any abuse or misuse of your Customer Account by third parties due to your disclosure of your login details to any third party, whether such disclosure is intentional or accidental, active or passive.</p>

            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">6.4. Transfer of Accounts, Gold Coins and Sweeps Coins.</h4>
            <p className='mb-2'>a) You are not allowed to transfer Gold Coins or Sweeps Coins between Customer Accounts, or from your Customer Account to other Customers, or to receive Gold Coins or Sweeps Coins from other Customer Accounts into your Customer Account, or to transfer, sell and/or acquire Customer Accounts. You may not attempt to sell, trade, or transfer Gold Coins or Sweeps Coins, whether on the Platform or off the Platform.</p>
            <p className='mb-2'>b) You are not allowed to convert Gold Coins to Sweeps Coins or vice versa.</p>
            <p>c) You are prohibited from selling, transferring or acquiring Customer Accounts to or from other Customers. If you attempt to sell, transfer or acquire a Customer Account, all accounts you have opened or tried to sell, transfer or acquire will be cancelled (at our absolute discretion, and with no liability to you whatsoever) and the consequences described in clause 23 may be enforced.</p>
            
            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">6.5. Closing of Customer Accounts</h4>
            <p className='mb-2'>a) If you wish to close your Customer Account you may do so at any time by sending an e-mail to accountclosure@mxracehub.me. Closing your Customer Account will forfeit all continued access to and right to use, enjoy or benefit from any Gold Coins, Sweeps Coins and unredeemed Prizes associated with your Customer Account.</p>
            <p className='mb-2'>b) If you have concerns about possible responsible social gameplay issues, please consult our Gameplay Self Exclusion Policy, which is accessible <span className="text-primary hover:underline cursor-pointer" onClick={() => (document.querySelector('button[data-section="responsible"]') as HTMLButtonElement)?.click()}>here</span>.</p>
            <p>c) You will be able to open your Customer Account again (unless you have implemented a self-exclusion) by sending an e-mail to accountclosure@mxracehub.me. All requests for the re-opening of an account will be evaluated by our Customer Support and Compliance teams, who abide by strict customer protection guidelines and applicable laws.</p>

            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">6.6. Discretion to Refuse or Close Accounts</h4>
            <p>MxRaceHub reserves the right to place limits on, suspend, close or refuse to open a Customer Account in its sole discretion, and without any liability to you whatsoever.</p>
        </div>
        
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">7. GOLD COINS</h3>
            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">7.1. Gold Coins</h4>
            <p className='mb-2'>a) Gold coins do not have a monetary value and can only be used to play Standard Games. Gold Coins can be used for entertainment only and cannot be redeemed for any value whatsoever.</p>
            <p className='mb-2'>b) MxRaceHub will give Gold Coins free of charge on:</p>
            <ul className="list-roman list-inside ml-6 mb-2">
                <li>Trival Bonus – You can claim Gold Coins once per month if win in Trivia game, through logging into your Customer Account and claiming your monthly bonus.</li>
                <li>Promotional Giveaways – Promotional giveaways organized by MxRaceHub on its social media accounts (for example, Facebook, Twitter, Instagram).</li>
            </ul>
            <p className='mb-2'>c) You may also win more Gold Coins when you play in Standard Play and you may purchase more Gold Coins on the Platform.</p>
            <p>d) You cannot win Prizes when you Participate in Standard Play.</p>

            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">7.2. Gold Coin Purchases</h4>
            <p className='mb-2'>a) The purchase of Gold Coins is the purchase of a license that allows you to Participate in Standard Play Games and it is not a deposit of funds which can be withdrawn. Funds used to purchase Gold Coins will not, and cannot, be refunded to you. Gold Coins do not have any real money value.</p>
            <p className='mb-2'>b) You can purchase Gold Coins on the Platform through one of the Payment Methods available on the website.</p>
            <p className='mb-2'>c) The Payment Methods you use to purchase Gold Coins must be legally and beneficially owned by you and in your name. If it comes to our attention that the name you registered on your Customer Account and the name linked to your Payment Method differs, your Customer Account will be immediately suspended. Should your Customer Account be suspended, we recommend that you contact Customer Support through support@mxracehub.me.</p>
            <p className='mb-2'>d) MxRaceHub reserves the right to request documents and information to verify the legal and beneficial ownership of the Payment Methods you use to make Gold Coin purchases.</p>
            <p className='mb-2'>e) You agree that we and/or our Payment Administration Agents may store your payment information to process your future purchases. By accepting these Terms, you authorize MxRaceHub and/or our Payment Administration Agents to store your payment credentials in compliance with applicable payment processing regulations.</p>
            <p className='mb-2'>f) Once a Gold Coin purchase has been made, the funds will be withdrawn from your Payment Methods as soon as practicable.</p>
            <p className='mb-2'>g) The maximum Gold Coin purchase that can be made is USD $9,000 (nine thousand US dollars) per day.</p>
            <p>h) If you are found to have one or more of your purchases returned and/or reversed or charged back, your account will be suspended. If this occurs, the amount of such purchases will constitute a debt owed by you to us and you must immediately remit payment for such purchases through an alternative payment method. Until payment is received by us or our Payment Administration Agent, your account will be suspended and any purchases will be deemed void and requests to redeem any Sweeps Coins will not be allowed.</p>

            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">7.3. Currency</h4>
            <p className='mb-2'>a) All Gold Coin purchases must be made using FIAT or a cryptocurrency supported by the Platform.</p>
            <p className='mb-2'>b) Any exchange or transaction fees, charges or related costs that may be incurred as a result of, or in relation to, your purchase of Gold Coins are to be borne solely by you, including but not limited to any losses or additional costs arising from foreign exchange fluctuations.</p>
            <p>c) If you purchase Gold Coins using FIAT or Plaid, then you must redeem Gold Coins using FIAT or Plaid. If you purchase Gold Coins using cryptocurrency, then you must redeem Sweeps Coins in cryptocurrency program. Only once your Sweeps Coins Or Gold Coins reaches a zero balance in the program, you may then elect your preferred currency (FIAT, Plaid or cryptocurrency) for future purchases of Gold Coins or redemptions of Gold Coins. For the avoidance of any doubt, if you have any Gold Coins or Sweeps Coins in your wallet, then you cannot switch between FIAT, Plaid and cryptocurrency for the purchase of Gold Coins or redemption of Sweeps Coins.</p>
        </div>

        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">8. Sweeps Coins</h3>
            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">8.1. Sweeps Coins</h4>
            <p className='mb-2'>a) Customers who receive promotional Gold Coins can use that Gold Coins to Play Games within MxRaceHub. Gold Coins can only be used to Gold Coin Play Games.</p>
            <p>b) YOU CANNOT PURCHASE SWEEPS COINS.</p>

            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">8.2. How to receive GOLD COINS</h4>
            <p className='mb-2'>a) You can obtain Free Gold Coins through the following means:</p>
            <ul className="list-roman list-inside ml-6 mb-2">
                <li>Promotional Supercross and Motorcross Trivia Question Giveaways on site pop ups once a month.</li>
                <li>Promotional Giveaways – Promotional giveaways organized by MxRaceHub on its social media (for example, Facebook, Twitter, Instagram). The amount of Sweeps Coins given away will be stated on the applicable Promotional Giveaway contest.</li>
            </ul>
            
            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">8.4. Sweeps Coins Balance</h4>
            <p className='mb-2'>a) The amount of Sweeps Coins a Customer has will be displayed in their Customer Account on the website.</p>
            <p className='mb-2'>b) The amount of Sweeps Coins to be allocated to Customers can be changed at any time by MxRaceHub in its sole discretion, without any liability to you whatsoever.</p>
            <p>c) MxRaceHub is not responsible for lost, late, incomplete, invalid, unintelligible or misdirected Sweeps Coins requests or allocations.</p>
        </div>

        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">9. GAMES</h3>
            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">9.1. Rules</h4>
            <p className='mb-2'>a) To participate in any Standard or Promotional Play, you must have an active Customer Account and agree to be bound by these Terms.</p>
            <p className='mb-2'>b) You may participate in any Game only if you have sufficient Gold Coins or Sweeps Coins (as applicable) in your Customer Account for such Participation.</p>
            <p className='mb-2'>c) Games offered on the Platform may have their own rules which are available on the Platform. It is your responsibility to read the rules of a Game before playing and they are binding upon you as if they form part of these Terms. You must familiarize yourself with the applicable terms of play and read the relevant rules before playing any Game.</p>
            <p>d) Gold Coins or Sweeps Coins that have been submitted for play and accepted cannot be changed or cancelled, and the Gold Coins or Sweeps Coins (whichever applicable) will be drawn from your Gold Coin or Sweeps Coins balance instantly.</p>

            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">9.2. Void Games</h4>
            <p>MxRaceHub reserves the right to declare Participation in a Game void, partially or in full, if, in our sole discretion, we deem it obvious that there was an error, mistake, misprint or technical error on the pay-table, win-table, minimum or maximum stakes, odds or software.</p>

            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">9.3. Final Decision</h4>
            <p>In the event of a discrepancy between the result showing on a user’s device and MxRaceHub server software, the result showing on the MxRaceHub server software will be the official and governing result.</p>
        </div>

        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">10. STANDARD PLAY</h3>
            <p className='mb-2'>10.1. Standard Play can only be played with Gold Coins.</p>
            <p className='mb-2'>10.2. On Standard Play you can only win Gold Coins.</p>
            <p>10.3. You cannot win money or Prizes of any kind when playing on Standard Play.</p>
        </div>

        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">11. PLAY / SWEEPSTAKES</h3>
            <p className='mb-2'>11.1. Play / Sweepstakes can only be played with Gold Coins or Sweeps Coins.</p>
            <p className='mb-2'>11.2. It is the sole responsibility of a Customer to determine whether the Sweepstakes is legal and compliant with all regulations in the jurisdiction in which the Customer resides.</p>
            <p className='mb-2'>11.3. Within MxRaceHub there are different Games. The amount of Gold Coins or Sweeps Coins required to play each Game, and the applicable rules will be detailed in the informational pages associated with a particular Game.</p>
            <p className='mb-2'>11.4. Only Games played with Sweeps Coins provide the opportunity to redeem for Prizes. The Prize that can be won while playing a Game will be shown in the Platform by clicking the “Redeem” button.</p>
            <p>11.5. MxRaceHub decisions as to the administration and operation of the Sweepstakes, the Game and the amount and nature of any Prizes are final and binding.</p>
        </div>

        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">13. REDEMPTION OF PRIZES</h3>
            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">13.1. Prizes</h4>
            <p className='mb-2'>a) Only Sweeps Coins can be redeemed for Prizes.</p>
            <p className='mb-2'>b) With the exception of Sweeps Coins won through Promotional Play, all Customers are required to play their Sweeps Coins three (3) times before it is eligible to be redeemed for Prizes.</p>
            <p className='mb-2'>c) Play reserves the right to change the Prize, win rates and odds of any of the Sweepstakes at any time at our absolute discretion. It is a Customer's responsibility to check the Prize win rate on each occasion before they participate.</p>
            <p>d) No Prize can be redeemed without completing the identification process as required by MxRaceHub, at our absolute discretion.</p>

            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">13.2. Redemption Methods</h4>
            <p className='mb-2'>a) The Prizes for which you can redeem your Sweeps Coins will be identified on the Platform and can change from time to time at MxRaceHub’s absolute discretion.</p>
            <p className='mb-2'>b) Prizes may include, but are not necessarily limited to:</p>
            <ul className="list-roman list-inside ml-6 mb-2">
                <li>Cryptocurrency (subject to conditions being met as outlined in these Terms); and</li>
                <li>FIAT (subject to conditions being met as outlined in these Terms).</li>
            </ul>

            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">13.3. Limits and Fees</h4>
            <p className='mb-2'>a) MxRaceHub reserves the right to charge fees for processing the redemption of Prizes to you and to set a minimum redemption threshold for Prize redemptions.</p>
            <p>b) In Florida, the maximum redemption value of Sweeps Coins won on any Game or play, via a Customer’s participation in the Sweepstakes, is USD $5,000 (five thousand US dollars) per day. Any redemption of a Prize valued in excess of USD $5,000 (five thousand US dollars) per day will not be allocated or paid.</p>

            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">13.4. Redeeming for Cryptocurrency</h4>
            <p className='mb-2'>a) When you elect to redeem Sweeps Coins for cryptocurrency, you must select your “Wallet” account, press “Redeem,” and choose the cryptocurrency to which you wish to redeem for.</p>
            <p className='mb-2'>b) When you choose to redeem Sweeps Coins for cryptocurrency, it is your sole responsibility to ensure that the crypto wallet to which you are transferring the funds can receive those funds. MxRaceHub has no obligation to check or verify whether your wallet will accept the cryptocurrency you select or nominate.</p>
            <p className='mb-2'>c) Sweeps Coins will be redeemable at an implied rate of 100 Sweeps Coins per 1 USD. As such, the amount of cryptocurrency that can be redeemed per 1 Sweeps Coin will be determined by the market price of that cryptocurrency in USD at the time of such redemption (as determined in our discretion).</p>
            <p>d) You can only redeem your Sweeps Coins using the same cryptocurrency you used when purchasing Gold Coins on the Platform. You will only be permitted to redeem Sweeps Coins in cryptocurrency if you have satisfied the conditions in clause 7.3(c) of these Terms.</p>

            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">13.5 Redeeming for FIAT</h4>
            <p className='mb-2'>a) You will only be permitted to redeem mxracehub in FIAT or if you have satisfied the conditions in clause 7.3(c) of these Terms.</p>
            <p className='mb-2'>b) When you elect to redeem Sweeps Coins for FIAT, you must select your “Wallet” account, press “Redeem,” and choose the FIAT or currency you wish to redeem.</p>
            <p className='mb-2'>c) When you choose to redeem sweeps coins for FIAT, it is your sole responsibility to ensure that the bank account to which you are transferring the FIAT is capable of receiving those funds.</p>
            <p>d) Sweeps Coins will be redeemable at an implied rate of 100 Sweeps Coins per 1 USD. As such, the amount of FIAT or currency that can be redeemed per 100 Sweeps Coins will be determined by the exchange rate of the FIAT or currency against 1USD.</p>
            
            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">13.6. Timing and Frequency for Prize Redemptions</h4>
            <p className='mb-2'>a) We process requests to redeem Prizes in the order in which they are received. Our goal is to process your request as soon as practicable.</p>
            <p className='mb-2'>b) We will only process one Prize redemption request per Customer Account in any 24-hour period.</p>
            <p className='mb-2'>c) There may be delays in payments due to our identity verification process. Certain Payment Mediums will require additional verification at the time of redemption and we do not accept any liability to you in respect of any delays arising from these verification processes.</p>
            <p>d) Without limiting clause 13, Customers can request to redeem Prizes of any value. However, we reserve the right to allocate or pay Prizes in smaller increments over a number of days until all of the Prize has been allocated or paid.</p>

            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">13.7. Refused Prizes & Mistaken Credits</h4>
            <p>If we mistakenly credit your Customer Account from time to time with Prizes that do not belong to you, whether due to a technical error, human error or otherwise, the amount credited will remain MxRaceHub property and will be deducted from your Customer Account. If you have been transferred cryptocurrency or FIAT that does not belong to you prior to us becoming aware of the error, the mistakenly paid amount will (without prejudice to other remedies and actions that may be available at law) constitute a debt owed by you to us. In the event of an incorrect crediting, you are obliged to notify Customer Support through support@mxracehub.me.</p>
        </div>

        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">14. VERIFICATION</h3>
            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">14.1. Verification Checks</h4>
            <p className="mb-2">a) You agree that we are entitled to conduct any identification, credit and other verification checks that we may reasonably require and/or that are required of us under applicable laws and regulations or by relevant regulatory authorities or to otherwise prevent financial crime.</p>
            <p className="mb-2">b) Until all required verification checks are completed to our satisfaction:</p>
            <ul className="list-disc list-inside ml-4 mb-2">
                <li>any request you have made for redemption of Prizes will remain pending; and</li>
                <li>we are entitled to restrict your Customer Account in any manner that we may reasonably deem appropriate, including by suspending or deactivating your Customer Account.</li>
            </ul>
            <p className="mb-2">c) Where any identification, credit or other verification check we require cannot be completed to our satisfaction, because you have not provided any document we request from you in the form that we require within 30 days’ of the date the document was first requested, then we are under no obligation to continue with the verification check and we may, in our sole discretion, deactivate or otherwise restrict your Customer Account in any manner that we may reasonably deem appropriate.</p>
            <p className="mb-2">d) Customers who request the redemption of Prizes held in a deactivated or suspended account should contact support@mxracehub.me.</p>

            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">14.2. External Verification Checks</h4>
            <p>You agree that MxRaceHub may use third party service providers to run external identification and other verification checks on all Customers on the basis of the information provided by you from time to time.</p>
        </div>
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">15. RESPONSIBLE SOCIAL GAMEPLAY</h3>
            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">15.1. Policy</h4>
            <p className="mb-2">a) MxRaceHub actively supports responsible social gameplay and encourages its Customers to make use of a variety of responsible social gameplay features so as to better manage their Customer Account.</p>
            <p className="mb-2">b) MxRaceHub is committed to providing excellent customer service. Although MxRaceHub will use all reasonable endeavors to enforce its responsible social gameplay measures, MxRaceHub does not accept any responsibility or liability if you nevertheless continue gameplay and/or seek to use the Platform with the intention of deliberately avoiding the relevant measures in place and/or MxRaceHub is unable to enforce its measures/policies for reasons outside of MxRaceHub’s reasonable control.</p>
            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">15.2. Self-Exclusion</h4>
            <p>You may, at any time, request a time-out or self-exclusion from our Games. Please check our self-exclusion procedure here.</p>
        </div>

        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">16. FRAUDULENT CONDUCT</h3>
            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">16.1.</h4>
            <p>As a condition to access the Games or Platform, you may not, directly or indirectly:</p>
            <ul className="list-disc list-inside ml-4">
                <li>a) hack into any part of the Games or Platform through password mining, phishing, or any other means;</li>
                <li>b) attempt to modify, reverse engineer, or reverse-assemble any part of the Games or Platform;</li>
                <li>c) knowingly introduce viruses, Trojans, worms, logic bombs, spyware, malware, or other similar material;</li>
                <li>d) circumvent the structure, presentation or navigational function of any Game so as to obtain information that MxRaceHub has chosen not to make publicly available on the Platform;</li>
                <li>e) engage in any form of cheating or collusion;</li>
                <li>f) use the Platform and the systems of MxRaceHub to facilitate any type of illegal money transfer (including money laundering proceeds of crime); or</li>
                <li>g) participate in or take advantage of, or encourage others to participate in or take advantage of schemes, organizations, agreements, or groups designed to share:
                    <ul className="list-disc list-inside ml-6">
                        <li>i. special offers or packages emailed to a specific set of Customers and redeemable by URL; or</li>
                        <li>ii. identification documents (including, but not limited to, photographs, bills and lease documents) for the purpose of misleading MxRaceHub as to a Customer’s identity.</li>
                    </ul>
                </li>
            </ul>
            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">16.2.</h4>
            <p>You must not use the Platform for any unlawful or fraudulent activity or prohibited transaction (including Fraudulent Conduct) under the laws of any jurisdiction that applies to you. We monitor all transactions in order to prevent money laundering.</p>
            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">16.3.</h4>
            <p>If MxRaceHub suspects that you may be engaging in, or have engaged in fraudulent, unlawful or improper activity, including money laundering activities or any conduct which violates these Terms, your access to the Platform will be suspended immediately and your Customer Account may be deactivated or suspended, at MxRaceHub’s absolute discretion. If your Customer Account is deactivated or suspended under such circumstances, MxRaceHub is under no obligation to reverse any Gold Coin purchases you have made or to redeem any Sweeps Coins that may be in your Customer Account. In addition, MxRaceHub may pass any necessary information on to the relevant authorities, other online service providers, banks, credit card companies, electronic payment providers or other financial institutions. You will cooperate fully with any MxRaceHub investigation into such activity.</p>
            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">16.4.</h4>
            <p>If you suspect any unlawful or fraudulent activity or prohibited transaction by another Customer, please notify us immediately via the means of communication listed in the Customer Complaints procedure.</p>
        </div>

        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">17. INTELLECTUAL PROPERTY</h3>
            <p>17.1. The computer software, the computer graphics, the Platform and the user interface that we make available to you is owned by, or licensed to, MxRaceHub or its associates and protected by copyright laws. You may only use the software for your own personal, recreational uses in accordance with all rules, terms and conditions we have established (including these Terms) and in accordance with all applicable laws, rules and regulations.</p>
            <p>17.2. You acknowledge that MxRaceHub is the proprietor or authorized licensee of all intellectual property in relation to any Content.</p>
            <p>17.3. Your use of the Games and Platform does not provide you with any intellectual property rights in the Content, Games or Platform.</p>
            <p>17.4. You grant us, and represent and warrant, that you have the right to grant us an irrevocable, perpetual, worldwide, non-exclusive, royalty-free license to use in whatever way we see fit, any information, images, videos, comments, messages, music or profiles you publish or upload to any website or social media page controlled and operated by MxRaceHub.</p>
            <p>17.5. You must not reproduce or modify the Content in any way, including by removing any copyright or trademark notice.</p>
            <p>17.6. All trademarks and logos displayed in the Games and Platform are the property of their respective owners and are protected by applicable trademark and copyright laws.</p>
        </div>

        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">18. THIRD PARTY WEBSITES, LINKS OR GAMES</h3>
            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">18.1. Third Party Websites.</h4>
            <p className="mb-2">a) You acknowledge and agree that MxRaceHub is not responsible for any Third Party Websites and makes no guarantee as to the content, functionality, security or accuracy of any Third Party Website.</p>
            <p className="mb-2">b) You further acknowledge that any Third Party Websites purporting to offer Gold Coins or Sweeps Coins are not authorized to do so. Any purported Third Party Websites purporting to do so may be an effort to induce you to reveal personal information (including passwords, account information and credit card details). You agree that MxRaceHub is not responsible for any actions you take at the request or direction of these or any other Third Party Websites.</p>
            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">18.2. Links</h4>
            <p className="mb-2">a) Any links to Third Party Websites do not:</p>
            <ul className="list-disc list-inside ml-4">
                <li>i. indicate a relationship between MxRaceHub and the third party; or</li>
                <li>ii. indicate any endorsement or sponsorship by MxRaceHub of the Third Party Website, or the goods or services it provides, unless specifically indicated by MxRaceHub.</li>
            </ul>
            <p className="mb-2">b) Where a website controlled and operated by MxRaceHub contains links to certain social networking sites, such as Facebook and Twitter, you acknowledge and agree that:</p>
             <ul className="list-disc list-inside ml-4">
                <li>i. any comments or content that you post on such social networking sites are subject to the terms and conditions of that particular social networking site;</li>
                <li>ii. you will not post any comments that are false, misleading or deceptive or defamatory to us, our employees, agents, officers or other Customers; and</li>
                <li>iii. we are not responsible or liable for any comments or content that you or others post on social networking sites.</li>
            </ul>
        </div>
        
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">19. DISRUPTIONS AND CHANGE</h3>
            <p>19.1. No warranties</p>
            <p>The Platform is provided on an “as is” basis and to the fullest extent permitted by law, we make no warranty or representation, whether express or implied, in relation to the satisfactory quality, fitness for purpose, completeness or accuracy of the Platform (including the Games and Content).</p>
            <p>19.2. Malfunctions</p>
            <p>a) WE DO NOT MAKE ANY REPRESENTATIONS OR WARRANTIES THAT ACCESS TO THE PLATFORM, ANY OF YOUR ACCOUNT(S) OR THE GAMES WILL BE CONTINUOUS, UNINTERRUPTED, TIMELY OR ERROR-FREE.</p>
            <p>b) MxRaceHub is not liable for any downtime, server disruptions, lagging or any technical or political disturbance to Game play, nor attempts by you to Participate by methods, means or ways not intended by us.</p>
            <p>c) MxRaceHub accepts no liability for any damages or losses which are deemed or alleged to have arisen out of or in connection with any Platform or its Content including, without limitation, delays or interruptions in operation or transmission, loss or corruption of data, communication or lines failure, any person’s misuse of a Platform or its Content or any errors or omissions in Content.</p>
            <p>d) In the event of a Platform system malfunction all Game play on that Platform is void.</p>
            <p>e) In the event a Game is started but fails to conclude because of a failure of the system, MxRaceHub will use commercially reasonable efforts to reinstate the amount of Gold Coins or Sweeps Coins played (whichever applicable) in the Game to you by crediting it to your Customer Account.</p>
            <p>f) MxRaceHub reserves the right to alter Customer balances and account details to correct such mistakes.</p>
            <p>g) MxRaceHub reserves the right to remove any part of the Games from the Platform at any time. Any part of the Games that indicate incorrect behavior affecting Prize redemption, game data, Gold Coin balances, Sweeps Coins balances or other balances, that may be due to misconfiguration or a bug, will be cancelled and removed from the Platform. Customer balances and account details may be altered by MxRaceHub in such cases in order to correct any mistake.</p>
            <p>19.3. Change</p>
            <p>MxRaceHub reserves the right to suspend, modify, remove or add Content to the Platform at its sole discretion with immediate effect and without any notice to you. We will not be liable to you for any loss suffered as a result of any changes made or for any modification or suspension of or discontinuance of the Platform (including any Game) and you will have no claims against MxRaceHub on this basis.</p>
            <p>19.4. Service Suspension</p>
            <p>We may temporarily suspend the whole or any part of the Platform for any reason at our sole discretion. We may, but will not be obliged to, give you as much notice as is reasonably practicable of such suspension. We will restore the Platform as soon as is reasonably practicable after such temporary suspension.</p>
            <p>19.5 Viruses</p>
            <p>Although we take reasonable measures to ensure that the Platform is free from viruses we cannot and do not guarantee that the Platform is free of such problems. It is your responsibility to protect your systems and have in place the ability to reinstall any data or programs lost due to a virus.</p>
        </div>

        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">20. PRIVACY POLICY</h3>
            <p>20.1. MxRaceHub is committed to protecting and respecting your privacy and complying with all applicable data protection and privacy laws.</p>
            <p>20.2. Our Privacy Policy is incorporated into these Terms and its acceptance is a prerequisite to creating a Customer Account.</p>
            <p>20.3. You consent to receive marketing communications from MxRaceHub in respect of its offerings by way of email, notifications, any of which you may unsubscribe from at any time by contacting Customer Support via support@mxracehub.me.</p>
        </div>

        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">22. COMPLAINTS AND CUSTOMER SUPPORT</h3>
            <p>22.1. You may send correspondence, including inquiries or complaints, to our support team at support@mxracehub.me.</p>
            <p>22.2. TO PROTECT YOUR PRIVACY AND SO THAT OUR SUPPORT TEAM CAN VERIFY YOUR ACCOUNT, ALL EMAIL COMMUNICATIONS BETWEEN YOU AND MXRACEHUB SHOULD BE CARRIED OUT USING THE EMAIL ADDRESS THAT YOU HAVE REGISTERED ON YOUR CUSTOMER ACCOUNT. FAILURE TO DO SO WILL RESULT IN OUR SUPPORT TEAM REQUESTING YOU COMMUNICATE FROM THE EMAIL ADDRESS REGISTERED ON YOUR ACCOUNT.</p>
            <p>22.3. The following information must be included in any written communication with MxRaceHub (including a complaint):</p>
            <ul className="list-disc list-inside ml-4">
                <li>a) your username;</li>
                <li>b) your first and last name, as registered on your Customer Account;</li>
                <li>c) a detailed explanation of the complaint/claim; and</li>
                <li>d) any specific dates and times associated with the complaint/claim (if applicable).</li>
            </ul>
            <p>22.4. Failure to submit a written communication with the information outlined above may result in a delay in our ability to identify and respond to your correspondence in a timely manner.</p>
            <p>22.5. MxRaceHub will endeavour to respond to correspondence as soon as possible from the receipt of the email.</p>
            <p>22.6. You are prohibited from spamming the MxRaceHub support team. You are prohibited from using threatening, abusive, offensive or harassing language in any email to MxRaceHub support employees. This includes but is not limited to, threatening, derogatory, abusive or defamatory statements, or racist, sexually explicit, pornographic, obscene, or offensive language. If you breach any of the provisions relating to email etiquette or communication with MxRaceHub employees, we reserve the right not to reply to your correspondence, suspend or deactivate your Customer Account. Further, if we deactivate your Customer Account, we reserve the right to cancel or refuse to redeem any Prizes.</p>
        </div>

        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">23. DEACTIVATION/SUSPENSION OF ACCOUNT</h3>
            <p>23.1. Without limiting clause 4, we reserve the right, at our sole discretion, to deactivate or suspend your Customer Account (notwithstanding any other provision contained in these Terms) where we have reason to believe that you have engaged or are likely to engage in any of the following activities:</p>
            <ul className="list-disc list-inside ml-4">
                <li>a) you breached, or assisted another party to breach, any provision of these Terms, or we have a reasonable grounds to suspect such breach;</li>
                <li>b) you have more than one Customer Account, including any inactive Account, on the Platform;</li>
                <li>c) the name registered on your Customer Account does not match the name on (i) your Payment Medium used to make purchases of Gold Coins or (ii) the account into which you elect to redeem Prizes or you do not legally and beneficially own such Payment Medium or redemption account;</li>
                <li>d) your communication with us or other Customers consists of harassment or offensive behaviour, including but not limited to threatening, derogatory, abusive or defamatory statements, or racist, sexually explicit, pornographic, obscene or offensive language;</li>
                <li>e) your Customer Account is deemed to be an inactive account (in the absolute discretion of MxRaceHub);</li>
                <li>f) you become bankrupt;</li>
                <li>g) you provide incorrect or misleading information;</li>
                <li>h) your identity or source of wealth or source of funds (if requested) cannot be verified;</li>
                <li>i) you attempt to use your Customer Account through a VPN, proxy or similar service that masks or manipulates the identification of your real location, or by otherwise providing false or misleading information regarding your citizenship, location or place of residence, or by playing Games using the Platform through a third party or on behalf of a third party;</li>
                <li>j) you are not over 21 years of age or such higher minimum legal age of majority as stipulated in the jurisdiction of your residence;</li>
                <li>k) you are located in a jurisdiction where Participation is illegal;</li>
                <li>l) you have allowed or permitted (whether intentionally or unintentionally) someone else to Participate using your Customer Account;</li>
                <li>m) you have played in tandem with other Customer(s) as part of a club, group or played the Games in a coordinated manner with other Customer(s) involving the same (or materially the same) selections;</li>
                <li>n) without limiting clause 7, where MxRaceHub has received a “charge back”, claim or dispute and/or a “return” notification via your Payment Medium;</li>
                <li>o) you have failed our due diligence procedures or are found by MxRaceHub (in its discretion) to be colluding, cheating, money laundering or undertaking any kind of fraudulent activity; or</li>
                <li>p) it is determined by MxRaceHub that you have employed or made use of a system (including machines, computers, software or other automated systems such as bots) which give you an unfair advantage.</li>
            </ul>
            <p>23.2. MxRaceHub reserves the right to suspend your customer Account at its absolute discretion whenever such suspension is necessary in order to protect the Platform, the public in general or other Customers.</p>
            <p>23.3. If MxRaceHub deactivates or suspends your Customer Account for any of the reasons referred to in clause 23.1 above, you will be liable for any and all claims, losses, liabilities, damages, costs and expenses incurred or suffered by MxRaceHub (together “Claims”) arising therefrom and you will unconditionally indemnify and hold MxRaceHub harmless on demand for such Claims.</p>
            <p>23.4. If we have reasonable grounds to believe that you have participated in any of the activities set out in clause 23.1 above, then we reserve the right to withhold all or part of the balance and/or recover from your Customer Account any Prizes, Gold Coins or Sweeps Coins that are attributable to any of the activities contemplated in clause 23.1. In such circumstances, your details may be passed on to any applicable regulatory authority, regulatory body or any other relevant external third parties at our absolute discretion.</p>
            <p>23.5. If your Customer Account is deactivated as a result of closure of the Platform or similar event, we will make commercially reasonable efforts to enable redemption of any existing Prizes associated with your Customer Account, but all of your rights to use, enjoy or benefit from the Gold Coins and Sweeps Coins will be terminated.</p>
            <p>23.6. The rights set out in clause 23 are without prejudice to any other rights that we may have against you under these Terms or otherwise.</p>
        </div>

        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">24. INDEMNITY AND LIMITATION OF LIABILITY</h3>
            <p>24.1. Indemnity</p>
            <p>YOU AGREE TO INDEMNIFY AND HOLD HARMLESS MXRACEHUB AND ITS AFFILIATES, SUBSIDIARIES, ULTIMATE PARENT AND PARENT COMPANIES, PARTNERS, OFFICERS, DIRECTORS, EMPLOYEES, CONTRACTORS SHAREHOLDERS, AGENTS, LICENSORS, SUBCONTRACTORS OR SUPPLIERS, AND EACH OF THEIR RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES, AFFILIATES, AGENTS, LICENSORS, AND CONTRACTORS (“INDEMNIFIED PERSONS”) FROM AND AGAINST ANY CLAIMS, SUITS, ACTIONS, DEMANDS, DISPUTES, ALLEGATIONS, OR INVESTIGATIONS BROUGHT BY ANY THIRD-PARTY, GOVERNMENTAL AUTHORITY, OR INDUSTRY BODY, AND ALL LIABILITIES, DAMAGES (ACTUAL AND CONSEQUENTIAL), LOSSES, COSTS, AND EXPENSES, INCLUDING WITHOUT LIMITATION REASONABLE ATTORNEYS’ FEES, ARISING OUT OF OR IN ANY WAY CONNECTED WITH:</p>
            <ul className="list-disc list-inside ml-4">
                <li>a) YOUR ACCESS TO OR USE OF THE PLATFORM, AND/OR YOUR INABILITY TO ACCESS OR USE THE PLATFORM;</li>
                <li>b) YOUR BREACH OR ALLEGED BREACH OF THESE TERMS OR YOUR VIOLATION OF ANY OTHER PROVISION OF THESE TERMS, INCLUDING ANY TERMS INCORPORATED BY REFERENCE HEREIN;</li>
                <li>c) YOUR VIOLATION OF ANY LAW, RULE OR REGULATION;</li>
                <li>d) YOUR VIOLATION OF THE RIGHTS OF ANY THIRD-PARTY.</li>
                <li>e) RE-USE OF ANY CONTENT AT, OR OBTAINED FROM, THE PLATFORM OR ANY OTHER SOURCE WHATSOEVER;</li>
                <li>f) FACILITATING OR MAKING A PAYMENT INTO YOUR CUSTOMER ACCOUNT;</li>
                <li>g) PLAYING THE GAMES THROUGH ANY DELIVERY MECHANISM OFFERED; AND</li>
                <li>h) ACCEPTANCE AND USE OF ANY PRIZE OR THE INABILITY TO ACCEPT OR USE ANY PRIZE.</li>
            </ul>
            <p>24.2. Limitation of Liability</p>
            <p>a) TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, UNDER NO CIRCUMSTANCES WHATSOEVER WILL WE OR OUR AFFILIATES, SUBSIDIARIES, ULTIMATE PARENT AND PARENT COMPANIES, PARTNERS, OFFICERS, DIRECTORS, EMPLOYEES, CONTRACTORS, SHAREHOLDERS, AGENTS, LICENSORS, SUBCONTRACTORS AND SUPPLIERS, BE RESPONSIBLE OR LIABLE TO YOU OR TO ANY OTHER ENTITY, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, UNDER ANY LEGAL THEORY, WHETHER CONTRACT, TORT OR OTHERWISE:</p>
            <ul className="list-disc list-inside ml-4">
                <li>i) FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, EXEMPLARY, OR PUNITIVE DAMAGES, INCLUDING ANY LOST PROFITS AND LOST BUSINESS OPPORTUNITIES, BUSINESS INTERRUPTION, LOST REVENUE, INCOME, GOODWILL, USE OF DATA OR OTHER INTANGIBLE LOSSES, WHETHER ARISING OUT OF OR IN CONNECTION WITH OUR SITES, THE PLATFORM, YOUR CUSTOMER ACCOUNT(S), YOUR USE OF THE GAMES, THESE TERMS AND/OR ANY OTHER ACT OR OMISSION BY US.</li>
                <li>ii) FOR MORE THAN THE AMOUNT YOU HAVE PAID US IN THE THIRTY (30) DAYS IMMEDIATELY PRECEDING THE DATE ON WHICH YOU FIRST ASSERT ANY SUCH CLAIM PURSUANT TO CLAUSE 26 BELOW. YOU ACKNOWLEDGE AND AGREE THAT IF YOU HAVE NOT PAID US ANY AMOUNTS IN THE THIRTY (30) DAYS IMMEDIATELY PRECEDING THE DATE ON WHICH YOU FIRST ASSERT ANY SUCH CLAIM, YOUR SOLE AND EXCLUSIVE REMEDY FOR ANY DISPUTE WITH US IS TO STOP USING THE PLATFORM AND TO CLOSE YOUR CUSTOMER ACCOUNT.</li>
            </ul>
            <p>b) YOU RECOGNIZE AND AGREE THAT THE WARRANTY DISCLAIMERS IN CLAUSES 19 AND 23, AND THE INDEMNITIES AND LIMITATIONS OF LIABILITY IN CLAUSE 24, ARE MATERIAL AND BARGAINED-FOR BASES OF THESE TERMS AND THAT THEY HAVE BEEN TAKEN INTO ACCOUNT AND REFLECTED IN THE DECISION BY YOU TO ENTER INTO THESE TERMS.</p>
            <p>c) We are not liable for any breach of these Terms where the breach is due to abnormal and unforeseeable circumstances beyond our control, the consequences of which would have been unavoidable despite all effects to the contrary, nor are we liable where the breach is due to any action or inaction which is necessary or desirable in order to comply with any laws, rules, or regulations.</p>
            <p>d) Depending on where you reside and use the Platform, some of the limitations contained in clause 24 may not be permissible. In such case, they will not apply to you, solely to the extent so prohibited.</p>
            <p>e) If you are a Customer who resides in the state of California, you waive your rights under California Civil Code § 1542, which provides: “A general release does not extend to claims that the creditor or releasing party does not know or suspect to exist in his or her favor at the time of executing the release and that, if known by him or her, would have materially affected his or her settlement with the debtor or released party.”</p>
            <p>24.3. Negligence and Willful Misconduct</p>
            <p>NOTHING IN THESE TERMS WILL OPERATE SO AS TO EXCLUDE ANY LIABILITY OF MXRACEHUB FOR DEATH OR PERSONAL PHYSICAL INJURY THAT IS DIRECTLY AND PROXIMATELY CAUSED BY MXRACEHUB’S GROSS NEGLIGENCE OR WILFUL MISCONDUCT.</p>
            <p>24.4. Survival of Obligations</p>
            <p>THIS CLAUSE 24 (INDEMNITY AND LIMITATION OF LIABILITY) SURVIVES THE TERMINATION OF THESE TERMS FOR ANY REASON.</p>
        </div>

        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">25. MXRACEHUB NOT A FINANCIAL INSTITUTION</h3>
            <p>25.1. You will not receive any interest on outstanding Prizes and you will not treat MxRaceHub as a financial institution.</p>
            <p>25.2. MxRaceHub does not provide advice regarding tax and/or legal matters. Customers who wish to obtain advice regarding tax and legal matters are advised to contact appropriate advisors.</p>
        </div>
        
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">26. DISPUTE RESOLUTION AND AGREEMENT TO ARBITRATE</h3>
            <p>26.1. PLEASE READ THIS CLAUSE 26 CAREFULLY AS IT REQUIRES YOU TO ARBITRATE DISPUTES AGAINST MXRACEHUB ON AN INDIVIDUAL BASIS AND LIMITS THE MANNER IN WHICH YOU CAN SEEK RELIEF FROM MXRACEHUB.</p>
            <p>26.2. This clause 26 (Dispute Resolution and Agreement to Arbitrate) shall be construed under and be subject to the Federal Arbitration Act.</p>
            <p>26.3. By agreeing to these Terms, you agree that any and all past, present and future disputes, claims or causes of action between you and MxRaceHub or any of its affiliates, subsidiaries, ultimate parent and parent companies, partners, officers, directors, employees, contractors, shareholders, agents, licensors, subcontractors or suppliers, which arise out of or are related in any way to these Terms, the formation of these Terms, the validity or scope of this clause 26 (Dispute Resolution and Agreement to Arbitrate), your Participation in or other access to or use of the Games or the Platform, or any other dispute between you and MxRaceHub or any of its affiliates, subsidiaries, ultimate parent and parent companies, partners, officers, directors, employees, contractors, shareholders, agents, licensors, subcontractors or suppliers, including as to the arbitrability of any of the foregoing, and whether arising prior to or after your agreement to this clause 26 (Dispute Resolution and Agreement to Arbitrate) (all of the foregoing, collectively “Disputes”), will be governed by the procedure set out below.</p>
            <p>26.4. Whether to agree to arbitration is an important decision. It is your decision to make and you ARE NOT REQUIRED to rely solely on the information provided in these Terms. You should take reasonable steps to conduct further research and, if you wish, to consult with counsel of your choice.</p>
            <p>26.5. Informal Complaint Resolution</p>
            <p>We want to address any concerns or Disputes you may have without the need for formal dispute resolution. Therefore, before filing any arbitration demand or other claim of any kind against MxRaceHub or any of its affiliates, subsidiaries, ultimate parent and parent companies, partners, officers, directors, employees, contractors, shareholders, agents, licensors, subcontractors or suppliers, you agree to notify us in writing of the nature of your concern and/or Dispute and to try in good faith using best efforts to resolve it in accordance with clause 22. If your concern or Dispute is not resolved after exhausting the internal complaints process outlined in clause 22, only then may you initiate an arbitration as set out in this clause 26. During the arbitration, the amount of any settlement offer made by you or MxRaceHub shall not be disclosed to the arbitrator until after the arbitrator makes a final decision and award, if any.</p>
            <p>26.6 Arbitration</p>
            <p>a) We both agree to arbitrate. By agreeing to these Terms, both you and MxRaceHub agree that any and all Disputes, including without limitation any question regarding the existence, validity, enforceability, or termination of these Terms and/or this clause 26 (Dispute Resolution and Agreement to Arbitrate) as well as the decision of whether the Dispute should be arbitrated in the first place, shall be referred to and finally resolved by arbitration administered by the American Arbitration Association (AAA), the rules of which are deemed to be incorporated by reference into this clause. In agreeing to this binding commitment to arbitrate your Disputes, you agree that you waive any right to proceed in a court of law or to have your claims heard by a jury. The arbitration shall: (1) be conducted by a single, neutral arbitrator in the English language; (2) be held virtually and not in person for all proceedings related to the arbitration, except by mutual agreement of all parties; and (3) be limited to one deposition per party, except by mutual agreement of all parties. Furthermore, in cases where neither party’s claim(s) or counterclaim(s) exceed $25,000, both parties agree to waive an arbitration hearing and resolve the dispute solely through submissions of documents to the arbitrator. No award or procedural order made in the arbitration shall be published. The AAA rules, as well as instructions on how to file an arbitration proceeding with the AAA, appear at adr.org, or you may call the AAA at 1-800-778-7879.</p>
            <p>b) Except as may be required by law, neither a party nor an arbitrator may disclose the existence, content, or results of any arbitration hereunder without the prior written consent of both parties. All documents and information disclosed in the course of the arbitration shall be kept strictly confidential by the recipient and shall not be used by the recipient for any purpose other than for purposes of the arbitration or the enforcement of the arbitrator’s decision and award and shall not be disclosed except in confidence to persons who have a need to know for such purposes or as required by applicable law.</p>
            <p>c) Both you and MxRaceHub agree not to make any argument that the AAA is an inconvenient forum or otherwise incompetent or without authority or jurisdiction to hear any Dispute, and expressly waive any and all such arguments.</p>
            <p>26.7. Arbitration to Proceed Individually</p>
            <p>a) You and MxRaceHub agree that an arbitration or any other proceeding to resolve a Dispute shall proceed in an individual capacity only, and neither you nor MxRaceHub may bring a Dispute as a Collective Action. Unless both you and MxRaceHub agree, no arbitrator or judge may consolidate more than one person’s claims or engage in any collective action.</p>
            <p>b) Without limiting the generality of clause 26.7(a) or the term Collective Action, and as an example only, a claim to resolve a Dispute against MxRaceHub will be deemed a Collective Action if:</p>
            <ul className="list-disc list-inside ml-4">
                <li>i. claims are filed or pursued concurrently by or on behalf of two or more persons; and</li>
                <li>ii. counsel for the two or more persons is the same, or share fees, or coordinate in any way.</li>
            </ul>
            <p>c) For the purposes of this clause, the term ‘concurrently’ means that the claims are pending (filed but not resolved) at the same time.</p>
            <p>26.8. Waiver of Collective Action</p>
            <p>a) TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, NEITHER YOU NOR MXRACEHUB WILL BE ENTITLED TO PARTICIPATE IN ANY COLLECTIVE ACTION (AS DEFINED ABOVE), OR OTHERWISE CONSOLIDATE, JOIN, PARTICIPATE, REPRESENT OR COORDINATE DISPUTES (AS DEFINED ABOVE) WITH OR INVOLVING OTHER INDIVIDUALS OR ENTITIES, INCLUDING AS A REPRESENTATIVE OR MEMBER OF A CLASS OR IN A PRIVATE ATTORNEY GENERAL CAPACITY.IN CONNECTION WITH ANY DISPUTE (AS DEFINED ABOVE), ALL SUCH RIGHTS ARE EXPRESSLY AND UNCONDITIONALLY WAIVED. THE PARTIES FURTHER AGREE THAT THE AAA RULES REFERENCED ABOVE SHALL EXCLUDE ANY RULES OR PROCEDURES GOVERNING OR PERMITTING COLLECTIVE ACTIONS (AS DEFINED ABOVE) OF ANY KIND.</p>
            <p>b) BY AGREEING TO THESE TERMS, YOU ACKNOWLEDGE THAT YOU AND MXRACEHUB EACH WAIVE THE RIGHT TO: (1) A JURY TRIAL; AND (2) PARTICIPATE IN A CLASS ACTION. IF A COURT DECIDES THAT APPLICABLE LAW PRECLUDES ENFORCEMENT OF ANY OF THIS PARAGRAPH’S LIMITATIONS AS TO A PARTICULAR CLAIM FOR RELIEF, THEN THAT CLAIM (AND ONLY THAT CLAIM) MUST BE SEVERED FROM THE ARBITRATION AND MAY BE BROUGHT IN COURT.</p>
            <p>c) NOTWITHSTANDING ANYTHING TO THE CONTRARY IN THESE TERMS, IN THE EVENT ALL OR ANY PORTION OF THIS CLAUSE 26 (DISPUTE RESOLUTION AND AGREEMENT TO ARBITRATE) IS FOUND TO BE INVALID OR LESS THAN FULLY ENFORCEABLE, THEN THE ENTIRETY OF CLAUSE 26 (EXCEPT THIS SENTENCE) MAY, UPON MXRACEHUB’S SOLE AND EXCLUSIVE ELECTION, BE DEEMED VOID AND AS HAVING NO EFFECT, SUBJECT TO MXRACEHUB’S RIGHT TO APPEAL THE LIMITATION OR INVALIDATION OF SUCH CLAUSE.</p>
            <p>26.9. You have the right to opt-out and not be bound by the arbitration and class action waiver provisions in this clause 26 (Dispute Resolution and Agreement to Arbitrate) by sending written notice, signed by you, of your decision to opt-out to the following address: MxRaceHub LLC, 123 Racing Ln, Motocross City, USA 12345. The notice must be sent within 30 days of creation of your Customer Account or 23 August 2024, whichever is later, otherwise you shall be bound to arbitrate disputes in accordance with these Terms. If you opt-out of these arbitration provisions, MxRaceHub will also not be bound by them. If you do not opt out of this clause 26 (Dispute Resolution and Agreement to Arbitrate) within the specified time period, you will be deemed to have accepted the arbitration and class action waiver provisions.</p>
            <p>26.10 Survival of Obligations.</p>
            <p>THIS CLAUSE 26 (DISPUTE RESOLUTION AND AGREEMENT TO ARBITRATE) SURVIVES THE TERMINATION OF THESE TERMS FOR ANY REASON.</p>
        </div>

        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">27. DEATH OF A CUSTOMER</h3>
            <p>27.1 Notification Requirement</p>
            <p>In the event of the death of a Customer, the Customer’s successor, executor, administrator, or legal representative (each a “Successor”) must notify MxRaceHub in writing within sixty (60) days of the date of death. The notice must include:</p>
            <ul className="list-disc list-inside ml-4">
                <li>a) A certified copy of the death certificate;</li>
                <li>b) Legal documentation evidencing the authority of the Successor (such as letters testamentary, letters of administration, a probated will, or a beneficiary designation form, if applicable); and</li>
                <li>c) Valid government-issued identification of the Successor which shows their residential address.</li>
            </ul>
            <p>27.2 Account Status</p>
            <p>Upon receipt of written notice and a certified death certificate, MxRaceHub will restrict access to the relevant Customer Account to prevent unauthorised use.</p>
            <p>27.3 Transfer of Funds or Assets</p>
            <p>a) Any Sweeps Coins in the wallet of the Customer Account will be redeemed by MxRaceHub on behalf of the Customer and any Prizes transferred into the estate of the deceased Customer, subject to MxRaceHub receiving legally sufficient documentation (e.g., letters testamentary or administration).</p>
            <p>b) MxRaceHub may require the Successor to provide a written indemnity agreement, in a form reasonably acceptable to MxRaceHub, holding MxRaceHub harmless from any claims, losses, or liabilities arising from the transfer under this clause.</p>
            <p>27.4 Account Closure or Transfer</p>
            <p>Upon verification of the Successor’s legal authority and transfer of any Prizes, MxRaceHub will close the Customer Account.</p>
            <p>27.5 Liability</p>
            <p>The estate of the deceased Customer shall remain liable for any outstanding debts, tax liabilities, or losses incurred prior to MxRaceHub’s receipt of written notice of death or arising from the transfer referred to above in clause 27.3. MxRaceHub reserves the right to delay the transfer or undertake any other act as reasonably required to mitigate or address any liabilities or potential claims arising from this clause 27 under applicable law.</p>
            <p>27.6 Disputes</p>
            <p>In the event of any dispute among potential heirs, beneficiaries, or other claimants to the Customer Account, MxRaceHub shall not be required to take any action (including any transfer) until it receives either:</p>
             <ul className="list-disc list-inside ml-4">
                <li>a) a valid court order directing the transfer to occur; or</li>
                <li>b) a written agreement executed by all disputing parties resolving the matter.</li>
            </ul>
            <p>27.7 Contact and Communications</p>
            <p>All notices regarding the death of a Customer must be sent in writing to MxRaceHub at support@mxracehub.me or through MxRaceHub’s designated customer support chat. All communications must comply with these Terms.</p>
            <p>27.8 General</p>
            <p>MxRaceHub reserves the right to request additional documentation or take any reasonable action it deems necessary to comply with applicable laws, protect its legal or commercial interests, and ensure the lawful administration of the Customer Account. All actions taken by MxRaceHub under this clause shall be in accordance with MxRaceHub’s Privacy Policy and applicable data protection laws.</p>
        </div>

        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">28. OTHER</h3>
            <p>28.1. Entire Agreement</p>
            <p>These Terms constitute the entire agreement between you and us with respect to your Participation and supersede all prior or contemporaneous communications, representations and proposals, whether electronic, oral or written, between you and us with respect to your Participation.</p>
            <p>28.2. Amendments</p>
            <p>MxRaceHub reserves the right to amend these Terms, or to implement or amend any procedures, at any time. Any amendments will be published on the Platform and such changes will be binding and effective immediately. If you do not agree to the amended Terms, you must stop using the Platform.</p>
            <p>28.3. Tax</p>
            <p>You are solely responsible for any taxes which apply to any Prizes that you collect or redeem from your Participation.</p>
            <p>28.4. Force Majeure</p>
            <p>MxRaceHub will not be liable or responsible for any failure to perform, or delay in performance of, any of our obligations under these Terms that is caused by events outside of our reasonable control.</p>
            <p>28.5. No agency</p>
            <p>Nothing in these Terms will be construed as creating any agency, partnership, trust arrangement, fiduciary relationship or any other form of joint enterprise between you and us.</p>
            <p>28.6. Severability</p>
            <p>If any of the Terms are determined by any competent authority to be invalid, unlawful or unenforceable to any extent, such term, condition or provision will, to that extent, be severed from these Terms. All remaining terms, conditions and provisions will continue to be valid to the fullest extent permitted by law. In such cases, the part deemed invalid or unenforceable will be amended in a manner consistent with the applicable law to reflect, as closely as possible, MxRaceHub’s original intent.</p>
            <p>28.7. Explanation of Terms</p>
            <p>We consider these Terms to be open and fair. If you need any explanation regarding these Terms or any other part of our Platform, please contact Customer Support via the live chat function accessible when you sign into your Customer Account or by emailing support@mxracehub.me.</p>
            <p>28.8. Assignment</p>
            <p>These Terms are personal to you, and are not assignable, transferable or sub-licensable by you except with our prior written consent. We reserve the right to assign, transfer or delegate any of our rights and obligations hereunder to any third party without notice to you.</p>
            <p>28.9. Business Transfers</p>
            <p>In the event of a change of control, merger, acquisition, or sale of assets of MxRaceHub, your Customer Account and associated data may be part of the assets transferred to the purchaser or acquiring party. In such an event, we will provide you with notice via email or via our Platform explaining your options with regard to the transfer of your Customer Account.</p>
            <p>28.10. Language</p>
            <p>These Terms may be published in several languages for information purposes and ease of access by Customers, however, will all reflect the same principles. It is only the English version that is the legal basis of the relationship between you and us and in case of any discrepancy between a non-English version and the English version of these Terms the English version will prevail.</p>
            <p>28.11 Notices</p>
            <p>The address listed in clause 8.3(a) is for Sweeps Coins Post Cards only. For any other purpose, including legal notices, you must address your correspondence to our registered office located at MxRaceHub LLC, 123 Racing Ln, Motocross City, USA 12345 in addition to emailing support@mxracehub.me.</p>
        </div>

        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">29. GOVERNING LAW</h3>
            <p>29.1. These Terms, your use of the Platform and our entire relationship will be governed, and interpreted in accordance with, the laws of the State of Colorado in the United States, without regard for its choice of conflict of law principles. The application of the United Nations Convention on Contracts for the International Sale of Goods is specifically excluded.</p>
            <p>29.2. Subject to clause 26, the parties agree that any dispute, controversy or claim arising out of or in connection with these Terms, or the breach, termination or invalidity of these Terms, will be submitted exclusively to the courts in the State of Colorado, and you and we consent to the venue and personal jurisdiction of those courts. Notwithstanding the foregoing, any motion to compel arbitration or to enforce an arbitral award issued hereunder may be brought before any court of competent jurisdiction.</p>
        </div>

    </div>
);

const BudgetInput = ({ label, value, onChange }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <div className="space-y-1">
        <Label htmlFor={label.toLowerCase().replace(/[^a-z0-9]/g, '-')}>{label}</Label>
        <div className="relative">
            <Input
                id={label.toLowerCase().replace(/[^a-z0-9]/g, '-')}
                type="number"
                value={value}
                onChange={onChange}
                placeholder="0.00"
                className="pr-8"
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">$</span>
        </div>
    </div>
);

const BudgetCalculator = () => {
    const [income, setIncome] = useState({
        wages: '',
        pensions: '',
        benefits: '',
        other: ''
    });

    const [expenses, setExpenses] = useState({
        rent: '',
        utilities: '',
        loans: '',
        other: ''
    });

    const handleIncomeChange = (field: keyof typeof income) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setIncome(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleExpenseChange = (field: keyof typeof expenses) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setExpenses(prev => ({ ...prev, [field]: e.target.value }));
    };

    const totalIncome = useMemo(() => {
        return Object.values(income).reduce((sum, value) => sum + (Number(value) || 0), 0);
    }, [income]);

    const totalExpenses = useMemo(() => {
        return Object.values(expenses).reduce((sum, value) => sum + (Number(value) || 0), 0);
    }, [expenses]);

    const disposableIncome = useMemo(() => totalIncome - totalExpenses, [totalIncome, totalExpenses]);

    return (
        <Card className="bg-muted/30">
            <CardHeader>
                <CardTitle>Monthly Budget Calculator</CardTitle>
                <CardDescription>Your information is confidential and is not visible to MxRaceHub.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-lg text-card-foreground">Income</h4>
                        <BudgetInput label="Wages after deductions" value={income.wages} onChange={handleIncomeChange('wages')} />
                        <BudgetInput label="Pensions" value={income.pensions} onChange={handleIncomeChange('pensions')} />
                        <BudgetInput label="Benefits" value={income.benefits} onChange={handleIncomeChange('benefits')} />
                        <BudgetInput label="Other income" value={income.other} onChange={handleIncomeChange('other')} />
                        <div className="border-t pt-4 space-y-1">
                            <Label>Total income</Label>
                            <div className="relative">
                                <Input value={totalIncome.toFixed(2)} readOnly className="font-bold pr-8" />
                                <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">$</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                         <h4 className="font-semibold text-lg text-card-foreground">Expenses</h4>
                        <BudgetInput label="Rent/mortgage" value={expenses.rent} onChange={handleExpenseChange('rent')} />
                        <BudgetInput label="Utility bills" value={expenses.utilities} onChange={handleExpenseChange('utilities')} />
                        <BudgetInput label="Loans/credit" value={expenses.loans} onChange={handleExpenseChange('loans')} />
                        <BudgetInput label="Other expenses" value={expenses.other} onChange={handleExpenseChange('other')} />
                        <div className="border-t pt-4 space-y-1">
                            <Label>Total expenses</Label>
                            <div className="relative">
                                <Input value={totalExpenses.toFixed(2)} readOnly className="font-bold pr-8" />
                                <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">$</span>
                            </div>
                        </div>
                    </div>
                </div>
                 <div className="rounded-lg border bg-background p-4">
                    <h3 className="font-semibold text-card-foreground">Disposable income</h3>
                    <p className={`mt-1 text-2xl font-bold ${disposableIncome < 0 ? 'text-destructive' : 'text-green-500'}`}>
                        ${disposableIncome.toFixed(2)}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

const RecognizeSignsContent = () => (
    <div>
        <h3 className="text-xl font-bold mb-2 text-card-foreground">Recognize the Signs</h3>
        <p className="mb-4">Problematic social gameplay can sometimes be hard to spot. Here are some signs that your play may be becoming a problem:</p>
        <ul className="list-disc list-inside space-y-2">
            <li>Spending more money or time than you intend to.</li>
            <li>Feeling guilty or ashamed about your playing habits.</li>
            <li>Chasing losses to try and win back money.</li>
            <li>Borrowing money or selling possessions to play.</li>
            <li>Lying to friends or family about how much you play or lose.</li>
            <li>Playing has started to negatively affect your work, school, or relationships.</li>
            <li>Thinking about playing constantly.</li>
            <li>Playing to escape from problems or negative feelings.</li>
        </ul>
        <p className="mt-4">If you recognize any of these signs in yourself, we strongly encourage you to take a break and seek support. Your well-being is the top priority.</p>
    </div>
);

const ResponsiblePlayContent = () => (
     <div className="space-y-8 text-muted-foreground">
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">Our Commitment to Responsible Play</h3>
            <p>
                MxRaceHub is committed to providing a safe and responsible social gaming environment. We want all of our users to play responsibly and within their means. If you believe your play is having a negative impact on your life, we are here to help.
            </p>
        </div>
        <Separator />
        <BudgetCalculator />
        <Separator />
        <RecognizeSignsContent />
        <Separator />
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
        <Separator />
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">Self-Exclusion & Limits</h3>
            <p>
                If you feel you need a break from playing, you can request to self-exclude from our platform. We offer options to temporarily suspend your account or to close it permanently. To set play limits or to request self-exclusion, please contact our support team at <Link href="mailto:mxracehub@proton.me" className="text-primary hover:underline">mxracehub@proton.me</Link>.
            </p>
        </div>
        <Separator />
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
            <p>This Privacy Policy governs the manner in which MxRaceHub (hereinafter “MxRaceHub”, “We”, “us”, or “our”), collects, use, maintain and disclose information collected from customers of its website www.mxracehub.com. This Privacy Policy applies to www.mxracehub.com and all products and services offered through www.mxracehub.com.</p>
        </div>
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">1. MxRaceHub statement</h3>
            <p>MxRaceHub is committed to protecting and respecting your privacy and maintaining the confidence and trust its customers. This Privacy Policy explains how your personal information is collected, why it is collected and how it is kept secure.</p>
        </div>
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">2. Data controller</h3>
            <p>Sweepsteaks Limited is a company incorporated under the laws of Cyprus, with the register number ? and head office at 7-9 807 East Kelly Drive, Loveland, Colorado. Cyprus. MxRaceHub is responsible for processing the data collected from you using the website www.mxracehub.com</p>
        </div>
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">3. Type of information we collect</h3>
            <p>We collect the following information from you:</p>
            <ul className="list-disc list-inside ml-4">
                <li>Full name</li>
                <li>Date of Birth</li>
                <li>Permanent address</li>
                <li>E-mail</li>
                <li>Phone number</li>
                <li>Device information about your use of our website, such as the content you view, the time and duration of your visit on our website, how often you use our services, how you first heard about our website, your preferences and information about your interaction with the content offered through our website, your hardware model, device type, other unique device identifiers, operating system version, browser type and IP address</li>
                <li>Identification documents (may include ID, utility bills, bank statements, etc.)</li>
                <li>Transaction information (linked to the purchases and redeems you make)</li>
                <li>Communications exchange with our teams (support, live chat, complaints, etc.)</li>
                <li>Information we obtain from a third-party, such as a site or platform provider (including Facebook), about your use of or interest in our services.</li>
            </ul>
        </div>
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">4. How we collect your information</h3>
            <p>We collect your information in a variety of ways, including when you visit, register, make purchases or redemptions on www.mxracehub.com, or communicate with us through filling out a form, using our chats or other means of communications.</p>
            <p>We also collect information about your use of our products and services through a variety of technologies that are present when you visit www.mxracehub.com or use our applications on third-party sites or platforms (whether or not you are logged in or registered) including cookies, flash cookies, pixels, tags and application program interfaces ("API").</p>
            <p>Analytics tools are also used by us to collect information, including when you visit www.mxracehub.com or use our applications or services on third-party sites or platforms.</p>
        </div>
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">5. How we use collect information</h3>
            <p>MxRaceHub is responsible for and may use your information for the purposes described in this Privacy Policy. Third-Parties may access your information where they act on behalf of MxRaceHub as a data processor for the purposes described in this Privacy Policy.</p>
            <p>In accordance with applicable law and any elections made available to you, MxRaceHub may collect and use your information for the following purposes:</p>
            <ul className="list-disc list-inside ml-4">
                <li>Provide and manage the services you request</li>
                <li>Improve customer service and our services</li>
                <li>Process payments</li>
                <li>Contact you about our services</li>
                <li>Comply legal and regulatory obligations.</li>
            </ul>
        </div>
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">6. Personal data collected via technology</h3>
            <p>When you interact with our website, we try to make that experience simple and useful. We and our partners use industry standard identifiers, such as cookies or other similar technologies.</p>
            <p>Our website may use technologies to enhance your experience. These technologies are small files that are placed on your computer, tablet, mobile phone or other devices when you visit a website. They allow us to record certain pieces of information whenever you visit or interact with the website.</p>
            <p>You can have access to the list of all the cookies used by MxRaceHub <span className="text-primary hover:underline cursor-pointer" onClick={() => (document.querySelector('button[data-section="cookies"]') as HTMLButtonElement)?.click()}>here</span>.</p>
        </div>
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">7. Your rights over your information</h3>
            <p>You have the following general rights:</p>
            <ul className="list-disc list-inside ml-4">
                <li>Right of to access the personal information we hold about you</li>
                <li>Right to object to the processing of your data</li>
                <li>The right to withdraw any consent provided</li>
                <li>The right to request we delete the personal information we hold about you</li>
            </ul>
            <p>To exercise the rights described above, please contact support@mxracehub.me.</p>
        </div>
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">8. How we protect your information</h3>
            <p>MxRaceHub has in place, physical, electronic and operational procedures to protect the information that we collect from you. MxRaceHub adopts appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information, username, password, transaction information and data stored on our database. Our security measures are reviewed regularly and updated in keeping with technological advances.</p>
        </div>
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">9. How long we will retain your information</h3>
            <p>We will retain your information for the period of time required to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.</p>
        </div>
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">10. Sharing your information</h3>
            <p>MxRaceHub does not sell, trade, or rent the personal identification information of its customers. However, there are circumstances when MxRaceHub will share your personal data with other companies in MxRaceHub Group or with third-parties that provide services to you on our behalf.</p>
            <p>MxRaceHub will only share your personal information with companies of its Group and Third-Parties on the following circumstances:</p>
            <ul className="list-disc list-inside ml-4">
                <li>You allow us to share your information with third-parties</li>
                <li>When providing you with products and services and notifying you about either important changes or developments to the features and operation of those products and services</li>
                <li>When such information is required by our service providers to enable us to provide our services, such as companies that help us with technology services, storing and combining data, processing payments and redemptions or providing relevant marketing and advertising for our products and services. The partner companies will have access to your personal information only to perform services on our behalf and are prohibited from using your personal information for purposes other than those requested by us or required by law</li>
                <li>In response to lawful requests by public authorities, including to meet national security or law enforcement requirements, when ordered to do so by any regulatory body and/or under any legal provision contained in the governing law of a particular jurisdiction</li>
                <li>When instructing and authorizing the financial institution with which your account is held to disclose any information as may be requested by a regulator in respect to your account</li>
                <li>To enforce our terms and conditions set out on www.mxracehub.com, to protect our rights and property and the rights and property of our customers and third-parties, to detect fraud or other illegal activities, and to comply with law or legal processes; and</li>
                <li>To perform customer due diligence including ID verification.</li>
            </ul>
            <p>We may ask you to provide your image to assist us in verifying your identity. We do this by using facial recognition technology provided by third-parties that determines whether the photo you take matches the photo in your identification document. The facial recognition technology provided by these third-parties collects information from your image capture, including biometric data, and may share this information with us. Biometric data is stored by the third-party service provider in accordance with its Privacy Policy and is stored by us, until such time as the initial purpose for collecting or obtaining such information has been satisfied or within 3 years of your last interaction with us, whichever occurs first, provided we have no other legal obligation to retain such information for any longer period.</p>
            <p>We may also share generic aggregated demographic information not linked to any personal identification information regarding visitors to and customers of our with our business partners, trusted affiliates and advertisers for the purposes outlined above.</p>
        </div>
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">11. Data transfers</h3>
            <p>MxRaceHub Group operates in several international jurisdictions and personal information we collect may be transferred to, and stored and processed by, individual companies in the MxRaceHub Group or third-parties in the European Union, the United States, Canada, Australia, or any other country in which we or our third-party processors maintain facilities.</p>
            <p>We will ensure that transfers of personal information to any country or organization are subject to appropriate safeguards. Additionally, without limitation and where applicable, when transferring personal information from the European Union, we may use standard contractual clauses approved by the European Commission or otherwise adopt other means in accordance with European data protection laws for ensuring adequate safeguards.</p>
        </div>
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">12. Changes to this Privacy Policy</h3>
            <p>This Privacy Policy may be updated from time to time to reflect changes in the way we work or the way our work is regulated. We will notify you of material changes and, where required by law, will obtain your consent. Notice may be by the posting of such changes on our website or by other means in accordance with applicable law.</p>
            <p>Any changes to the Privacy Policy will become effective when the updated policy is posted on www.mxracehub.com.</p>
            <p>We encourage you to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect.</p>
        </div>
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">13. Contacting us</h3>
            <p>If you have specific questions regarding your personal information or how we use it, please contact support@mxracehub.me.</p>
        </div>
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">14. Notice about collection</h3>
            <p>We collect information that identifies, relates to, describes, references, is capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular consumer or device (“personal information”).</p>
            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">Information Collected</h4>
            <p>The information we collect may include the following categories of information:</p>
            <div className="my-4 border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-muted">
                        <tr>
                            <th className="px-4 py-2 text-left font-semibold">Personal Information Category</th>
                            <th className="px-4 py-2 text-left font-semibold">Examples</th>
                            <th className="px-4 py-2 text-left font-semibold">Collected</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="px-4 py-2 align-top">Identifiers</td>
                            <td className="px-4 py-2 align-top">A real name, alias, postal address, unique personal identifier, online identifier, Internet Protocol address, email address, account name, driver's license number, or other similar identifiers.</td>
                            <td className="px-4 py-2 align-top">YES</td>
                        </tr>
                        <tr className="border-b">
                            <td className="px-4 py-2 align-top">Personal information</td>
                            <td className="px-4 py-2 align-top">Including but not limited to name, signature, social security number, physical characteristics or description, communications such e-mails or chat messages, address, telephone number, driver’s license or state or any other financial information. Some personal information included in this category may overlap with other categories.</td>
                            <td className="px-4 py-2 align-top">YES</td>
                        </tr>
                        <tr className="border-b">
                            <td className="px-4 py-2 align-top">Protected classification characteristics under California or federal law</td>
                            <td className="px-4 py-2 align-top">Age (40 years or older), race, color, ancestry, national origin, citizenship, religion or creed, marital status, medical condition, physical or mental disability, sex, sexual orientation, veteran or military status, genetic information (including familial genetic information).</td>
                            <td className="px-4 py-2 align-top">YES</td>
                        </tr>
                        <tr className="border-b">
                            <td className="px-4 py-2 align-top">Biometric information</td>
                            <td className="px-4 py-2 align-top">An individual’s physiological, biological or behavioral characteristics that can be used singly or in combination with each other or with other identifying data, to establish individual identity. Facial recognition technology collects information from your image capture, including biometric data, and shares this information with us, which assists us to verify your ID.</td>
                            <td className="px-4 py-2 align-top">YES</td>
                        </tr>
                        <tr className="border-b">
                            <td className="px-4 py-2 align-top">Internet or other similar network activity</td>
                            <td className="px-4 py-2 align-top">Browsing history, search history, information on a consumer's interaction with a website, application, or advertisement.</td>
                            <td className="px-4 py-2 align-top">YES</td>
                        </tr>
                        <tr className="border-b">
                            <td className="px-4 py-2 align-top">Geolocation data</td>
                            <td className="px-4 py-2 align-top">Physical or IP address location or movements.</td>
                            <td className="px-4 py-2 align-top">YES</td>
                        </tr>
                        <tr className="border-b">
                            <td className="px-4 py-2 align-top">Sensory data</td>
                            <td className="px-4 py-2 align-top">Audio, electronic, visual, or similar information.</td>
                            <td className="px-4 py-2 align-top">YES</td>
                        </tr>
                         <tr className="border-b">
                            <td className="px-4 py-2 align-top">Professional or employment-related information</td>
                            <td className="px-4 py-2 align-top">Current or past job history.</td>
                            <td className="px-4 py-2 align-top">YES</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 align-top">Inferences drawn from other personal information</td>
                            <td className="px-4 py-2 align-top">Profile reflecting a person's preferences, characteristics, predispositions, behaviour.</td>
                            <td className="px-4 py-2 align-top">YES</td>
                        </tr>
                    </tbody>
                </table>
            </div>

             <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">Sensitive Personal Information Category</h4>
            <div className="my-4 border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-muted">
                        <tr>
                            <th className="px-4 py-2 text-left font-semibold">Category</th>
                            <th className="px-4 py-2 text-left font-semibold">Examples</th>
                            <th className="px-4 py-2 text-left font-semibold">Collected</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="px-4 py-2 align-top">Government identifiers</td>
                            <td className="px-4 py-2 align-top">driver’s license or state identification card.</td>
                            <td className="px-4 py-2 align-top">YES</td>
                        </tr>
                        <tr className="border-b">
                            <td className="px-4 py-2 align-top">Complete account access credentials</td>
                            <td className="px-4 py-2 align-top">Customer names, account numbers, digital currency addresses</td>
                            <td className="px-4 py-2 align-top">YES</td>
                        </tr>
                        <tr className="border-b">
                            <td className="px-4 py-2 align-top">Precise geolocation</td>
                            <td className="px-4 py-2 align-top">Precise physical or IP address location or movements.</td>
                            <td className="px-4 py-2 align-top">YES</td>
                        </tr>
                        <tr className="border-b">
                            <td className="px-4 py-2 align-top">Racial or ethnic origin</td>
                            <td className="px-4 py-2 align-top">Racial or ethnic origin information that may be revealed through Government or other identifiers or other personal information.</td>
                            <td className="px-4 py-2 align-top">YES</td>
                        </tr>
                         <tr className="border-b">
                            <td className="px-4 py-2 align-top">Religious or philosophical beliefs</td>
                            <td className="px-4 py-2 align-top"></td>
                            <td className="px-4 py-2 align-top">NO</td>
                        </tr>
                         <tr className="border-b">
                            <td className="px-4 py-2 align-top">Union membership</td>
                            <td className="px-4 py-2 align-top"></td>
                            <td className="px-4 py-2 align-top">NO</td>
                        </tr>
                        <tr className="border-b">
                            <td className="px-4 py-2 align-top">Genetic data</td>
                            <td className="px-4 py-2 align-top"></td>
                            <td className="px-4 py-2 align-top">NO</td>
                        </tr>
                         <tr className="border-b">
                            <td className="px-4 py-2 align-top">Mail, email, or text messages contents not directed to us</td>
                            <td className="px-4 py-2 align-top">Chat conversations conducted on our platform; communications with our affiliates or service providers.</td>
                            <td className="px-4 py-2 align-top">YES</td>
                        </tr>
                         <tr className="border-b">
                            <td className="px-4 py-2 align-top">Unique identifying biometric information</td>
                            <td className="px-4 py-2 align-top">Biometric information that may be revealed through Government or other identifiers or other personal information.</td>
                            <td className="px-4 py-2 align-top">YES</td>
                        </tr>
                         <tr>
                            <td className="px-4 py-2 align-top">Health, sex life, or sexual orientation information</td>
                            <td className="px-4 py-2 align-top"></td>
                            <td className="px-4 py-2 align-top">NO</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">Sources of Information</h4>
            <p>We obtain the categories of personal information listed above from the following sources:</p>
            <ol className="list-decimal list-inside ml-4">
                <li>Directly from our customers. For example, from when customers register for our services or respond to requests for information verification.</li>
                <li>Directly and indirectly from activity on our websites and applications. This includes:
                    <ul className="list-disc list-inside ml-6">
                        <li>Usage and log information. For example, service-related, diagnostic and performance information. This includes information about your activity on our websites and applications, log files and reports.</li>
                        <li>Device and connection information. We collect device-specific information such as hardware model, operating system information, browser information, IP address etc.</li>
                    </ul>
                </li>
                <li>From third-parties that interact with us in connection with the services we perform. We may work with third-parties, for example, in order to understand, customise, provide, support and market the services we provide and/or to comply with laws.</li>
            </ol>

            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">Use of Personal Information</h4>
            <p>We may use or disclose the personal information we collect for one or more of the following business purposes:</p>
            <ul className="list-disc list-inside ml-4">
                <li>To provide and manage the services you request</li>
                <li>To maintain, develop, and improve customer service and our services</li>
                <li>To create, maintain, customize, and secure your customer account</li>
                <li>To fulfill purchases or redemptions and prevent transactional fraud</li>
                <li>To personalize user experience</li>
                <li>To contact you about our services</li>
                <li>To send important notices to you</li>
                <li>To comply with our legal and regulatory obligations</li>
                <li>To offer alternative dispute resolution services.</li>
            </ul>
            <p>We will not retain the categories of personal information and sensitive personal information longer than reasonably necessary to achieve these business purposes. Ordinarily, we will retain your personal information and sensitive personal information for up to [12] months beyond any closure of your account.</p>

            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">Sharing Personal Information</h4>
            <p>We may disclose your personal information to third-parties for the business purposes described above. We may disclose your personal information for a business purpose to the following categories of third-parties:</p>
            <ul className="list-disc list-inside ml-4">
                <li>Our affiliates</li>
                <li>Service providers</li>
                <li>Third-parties that interact with us in connection with the services we perform</li>
            </ul>
            <p>We do not sell your personal information or share it with third-parties for cross-context behavioral advertising.</p>
        </div>
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">15. Your Rights</h3>
            <p>California residents may have specific rights regarding their personal information, including accessing the personal information we’ve collected about you during the past 12 months and information about our data practice. You may also have the right to request, subject to certain exceptions, that we delete the personal information we have collected from you.</p>
            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">Exercising Access and Deletion Rights</h4>
            <p>To request access to or deletion of your personal information, please submit a verifiable consumer request to us at support@mxracehub.me.</p>
            <p>Only you or a person registered with the California Secretary of State that you authorize to act on your behalf may make a verifiable consumer request related to your personal information. If you decide to use an authorized agent, please also include written permission that you have designated that agent to make this request, or proof of the agent’s power of attorney. We may follow up with you to verify your identity before processing your authorized agent’s request.</p>
            <p>For your consumer request to be verifiable, you must:</p>
            <ul className="list-disc list-inside ml-4">
                <li>Provide sufficient information that allows us to reasonably verify you are the person about whom we collected personal information or an authorized representative. You will need to provide:
                    <ul className="list-disc list-inside ml-6">
                        <li>Full name</li>
                        <li>Date of birth</li>
                        <li>Address</li>
                        <li>E-mail address</li>
                        <li>Whether you are a California consumer pursuant to CCPA</li>
                        <li>If you would like to know the specific pieces of personal information that we have collected about you, or to delete your personal information, identification that clearly shows your name, date of birth and address (for example, driver's license or other photo identification)</li>
                    </ul>
                </li>
                <li>Describe your request with sufficient detail that allows us to properly understand, evaluate and respond to it.</li>
            </ul>
            <p>We cannot respond to your request or provide you with personal information if we cannot verify your identity or authority to make the request and confirm the personal information relates to you. Making a verifiable consumer request does not require you to create an account with us. We will only use personal information provided in a verifiable consumer request to verify the requestor's identity or authority to make the request.</p>
            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">Response Timing and Format</h4>
            <p>We endeavor to provide timely responses to verifiable consumer request. If you have an account with us, we will deliver our written response to that account. If you do not have an account with us, we will deliver our written response by mail or electronically, at your option. Any disclosures we provide will only cover the 12-month period preceding the verifiable consumer request's receipt.</p>
            <p>The response we provide will also explain the reasons we cannot comply with a request, if applicable. For data portability requests, we will select a format to provide your personal information that is readily useable and should allow you to transmit the information from one entity to another entity without hindrance.</p>
            <p>We do not charge a fee to process or respond to your verifiable consumer request unless it is excessive, repetitive, or manifestly unfounded. If we determine that the request warrants a fee, we will tell you why we made that decision and provide you with a cost estimate before completing your request.</p>
            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">Non-Discrimination</h4>
            <p>We will not discriminate against you for exercising any of your rights described above.</p>
            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">Changes to this Notice</h4>
            <p>This Notice may be updated from time to time to reflect changes in the way we work or the way our work is regulated. We will notify you of changes by posting changes here, or by other appropriate means.</p>
            <h4 className="text-lg font-bold mt-4 mb-2 text-card-foreground">Contact Information</h4>
            <p>If you have any questions or comments about this Notice, our Privacy Policy, the ways in which we collect and use your personal information, your choices and rights regarding such use, or wish to exercise your rights, please do not hesitate to contact us at support@mxracehub.me.</p>
        </div>
    </div>
);

const CookiesContent = () => (
    <div className="space-y-6 text-muted-foreground">
        <div>
            <p>This website and app uses cookies to better the users experience while visiting the website. Where applicable this website uses a cookie control system allowing the user on their first visit to the website to allow or disallow the use of cookies on their computer/device. This complies with recent legislation requirements for websites to obtain explicit consent from users before leaving behind or reading files such as cookies on a user’s computer/device. The cookies in use are described in the table below.</p>
        </div>
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">Cookies Owner</h3>
            <p>Opt-out In order to provide website visitors with more choice on how data is collected by Google Analytics, Google has developed the Google Analytics Opt-out Browser Add-on. The add-on communicates with the Google Analytics JavaScript (ga.js) to stop data being sent to Google Analytics. The Google Analytics Opt-out Browser Add-on does not affect usage of the website in any other way. A link to further information on the Google Analytics Opt-out Browser Add-on is provided below for your convenience. <a href="http://tools.google.com/dlpage/gaoptout?hl=None" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">http://tools.google.com/dlpage/gaoptout?hl=None</a></p>
            <p className="mt-2">For more information on the usage of cookies by Google Analytics please see the Google website. A link to the privacy advice for this product is provided below for your convenience. <a href="http://www.google.com/analytics/learn/privacy.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">http://www.google.com/analytics/learn/privacy.html</a></p>
        </div>
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">Disabling Cookies</h3>
            <p>If you would like to restrict the use of cookies you can control this in your Internet browser. Links to advice on how to do this for the most popular Internet browsers are provided below for convenience and will be available for the Internet browser of your choice either online or via the software help (normally available via key F1).</p>
        </div>
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">Contact & Communication</h3>
            <p>Users contacting this website and/or its owners do so at their own discretion and provide any such personal details requested at their own risk. Your personal information is kept private and stored securely until a time it is no longer required or has no use, as detailed in the Data Protection Regulation. Every effort has been made to ensure a safe and secure form to email submission process but advise users using such form to email processes that they do so at their own risk. This website and its owners use any information submitted to provide you with further information about the products / services they offer or to assist you in answering any questions or queries you may have submitted. This includes using your details to subscribe you to any email newsletter program the website operates but only if this was made clear to you and your express permission was granted when submitting any form to email process. Or whereby you the consumer have previously purchased from or enquired about purchasing from the company a product or service that the email newsletter relates to. This is by no means an entire list of your user rights in regard to receiving email marketing material. Your details are not passed on to any third parties.</p>
        </div>
        <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">External Links</h3>
            <p>Although this website only looks to include quality, safe and relevant external links, users are advised adopt a policy of caution before clicking any external web links mentioned throughout this website.</p>
            <p className="mt-2">The owners of this website cannot guarantee or verify the contents of any externally linked website despite their best efforts. Users should therefore note they click on external links at their own risk and this website and its owners cannot be held liable for any damages or implications caused by visiting any external links mentioned.</p>
        </div>
         <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">Social Media Platforms</h3>
            <p>Communication, engagement and actions taken through external social media platforms that this website and its owners participate on are custom to the terms and conditions as well as the privacy policies held with each social media platform respectively.</p>
            <p className="mt-2">Users are advised to use social media platforms wisely and communicate / engage upon them with due care and caution in regard to their own privacy and personal details. This website nor its owners will ever ask for personal or sensitive information through social media platforms and encourage users wishing to discuss sensitive details to contact them through primary communication channels such as by telephone or email.</p>
            <p className="mt-2">This website may use social sharing buttons which help share web content directly from web pages to the social media platform in question. Users are advised before using such social sharing buttons that they do so at their own discretion and note that the social media platform may track and save your request to share a web page respectively through your social media platform account.</p>
        </div>
         <div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">Shortened Links in Social Media</h3>
            <p>This website and its owners through their social media platform accounts may share web links to relevant web pages.</p>
            <p className="mt-2">Users are advised to take caution and good judgement before clicking any shortened URLs published on social media platforms by this website and its owners. Despite the best efforts to ensure only genuine URLs are published many social media platforms are prone to spam and hacking and therefore this website and its owners cannot be held liable for any damages or implications caused by visiting any shortened links.</p>
        </div>
    </div>
);

const BasicInstructionsContent = () => (
    <div className="space-y-6 text-muted-foreground">
        <div>
            <h3 className="text-xl font-bold mb-4 text-card-foreground">Basic Instructions</h3>
            <ol className="list-decimal list-inside space-y-2 text-lg">
                <li>Sign-up <span className="text-muted-foreground/80">(FREE)</span></li>
                <li>Get Gold Coins <span className="text-muted-foreground/80">(WIN/OPTIONAL)</span></li>
                <li>Make Friends <span className="text-muted-foreground/80">(FREE)</span></li>
                <li>Play <span className="text-muted-foreground/80">(FREE)</span></li>
                <li>Win Sweeps Coins <span className="text-muted-foreground/80">(FREE)</span></li>
                <li>Play With Sweeps Coins<span className="text-muted-foreground/80">(FREE)</span></li>
                <li>Redeem <span className="text-muted-foreground/80">(FREE)</span></li>
            </ol>
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
            case 'basic-instructions':
                return <BasicInstructionsContent />;
            default:
                return <TermsContent />;
        }
    };

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
                <SectionButton label="Basic Instructions" isActive={activeSection === 'basic-instructions'} onClick={() => setActiveSection('basic-instructions')} />
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
