
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
            <h3 className="text-xl font-bold mb-2 text-card-foreground">21. USE OF LIVE CHAT SERVICES</h3>
            <p>21.1. We may provide you with a Live Chat service to talk to our Customer Support representatives or to talk to other Customers. It is your responsibility to use these services only for their intended purposes. You are not permitted to use our Live Chat services for illegal purposes.</p>
            <p>21.2. Be careful what you post on any Live Chat service. We review and moderate chats, and keep a log and record of statements. Your use of the Live Chat service should be for recreational and social purposes only.</p>
            <p>21.3. Spamming on Live Chat is prohibited. You are prohibited from intimidating, harassing or abusing other Customers or MxRaceHub employees and representatives.</p>
            <p>21.4. You will not use any Live Chat service to engage in any form of harassment or offensive behavior, including but not limited to, threatening, derogatory, abusive or defamatory statements, or racist, sexually explicit, pornographic, obscene or offensive language.</p>
            <p>21.5. You will not use any Live Chat service to infringe the privacy rights, property rights or any other rights of any person.</p>
            <p>21.6. You will not submit any kind of material or information on any Live Chat service that is fraudulent or otherwise unlawful or violates any law.</p>
            <p>21.7. You will not use any Live Chat service to distribute, promote or otherwise publish any material containing any solicitation for funds, advertising or solicitation for goods or services of other forums.</p>
            <p>21.8. You will not use any Live Chat service to distribute, promote or otherwise publish any kind of malicious code or do anything else that might cause harm to the Platform or to other Customer’s systems in any way.</p>
            <p>21.9. We reserve the right to monitor anything and everything submitted by you to any Live Chat service to ensure that it conforms to content guidelines that are monitored by us and subject to change from time to time.</p>
            <p>21.10. If you breach any of the provisions relating to a Live Chat service, we may ban you from using that Live Chat service or all Live Chat services and/or suspend or deactivate your Customer Account. If we deactivate your Customer Account, we reserve the right to cancel or refuse to redeem any Prizes.</p>
            <p>21.11. We reserve the right to remove any Live Chat service from the Platform if abused.</p>
            <p>21.12. We will not be liable if damage arises out of the Live Chat service.</p>
            <p>21.13. You agree to unconditionally indemnify us against any damages arising out of your illegal, unlawful or inappropriate conduct or arising out of violation of the provisions in clause 21 or any other rules on the Platform applying to the Live Chat service.</p>
            <p>21.14. You will not collude in any way through the Live Chat service. Customers are encouraged to report any suspicious behavior to Customer Support.</p>
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
            <p>We consider these Terms to be open and fair. If you need any explanation regarding these Terms or any other part of our Platform, please contact Customer Support via the live chat function accessible when you sign into your Customer Account or by emailing support@mxracehub.me. The Terms prevail over any communication via email or chat. We reserve the right to record all correspondence between you and us.</p>
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
            <p>29.1. These Terms, your use of the Platform and our entire relationship will be governed, and interpreted in accordance with, the laws of the State of Delaware in the United States, without regard for its choice of conflict of law principles. The application of the United Nations Convention on Contracts for the International Sale of Goods is specifically excluded.</p>
            <p>29.2. Subject to clause 26, the parties agree that any dispute, controversy or claim arising out of or in connection with these Terms, or the breach, termination or invalidity of these Terms, will be submitted exclusively to the courts in the State of Delaware, and you and we consent to the venue and personal jurisdiction of those courts. Notwithstanding the foregoing, any motion to compel arbitration or to enforce an arbitral award issued hereunder may be brought before any court of competent jurisdiction.</p>
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
    const [activeSection, setActiveSection] = useState&lt;PolicySection&gt;('terms');

    const renderContent = () => {
        switch (activeSection) {
            case 'terms':
                return &lt;TermsContent /&gt;;
            case 'responsible':
                return &lt;ResponsiblePlayContent /&gt;;
            case 'privacy':
                return &lt;PrivacyPolicyContent /&gt;;
            case 'cookies':
                return &lt;CookiesContent /&gt;;
            default:
                return &lt;TermsContent /&gt;;
        }
    }

  return (
    &lt;div className="max-w-5xl mx-auto"&gt;
      &lt;PageHeader
        title="Policies"
        description="Review our terms, conditions, and privacy information."
      /&gt;
      &lt;div className="grid grid-cols-1 md:grid-cols-4 gap-8"&gt;
        &lt;aside className="md:col-span-1"&gt;
            &lt;nav className="flex flex-col space-y-1 bg-card p-2 rounded-lg"&gt;
                &lt;SectionButton label="Terms &amp; Conditions" isActive={activeSection === 'terms'} onClick={() => setActiveSection('terms')} /&gt;
                &lt;SectionButton label="Responsible Play" isActive={activeSection === 'responsible'} onClick={() => setActiveSection('responsible')} /&gt;
                &lt;SectionButton label="Privacy Policy" isActive={activeSection === 'privacy'} onClick={() => setActiveSection('privacy')} /&gt;
                &lt;SectionButton label="Cookies Policy" isActive={activeSection === 'cookies'} onClick={() => setActiveSection('cookies')} /&gt;
            &lt;/nav&gt;
        &lt;/aside&gt;
        &lt;main className="md:col-span-3"&gt;
            &lt;Card&gt;
                &lt;CardContent className="p-6"&gt;
                    {renderContent()}
                &lt;/CardContent&gt;
            &lt;/Card&gt;
        &lt;/main&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
}

    