
import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
} from '@/components/ui/card';

export default function RulesPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader title="Rules" />
      <Card>
        <CardContent className="p-6 space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Bets</h3>
            <p className="text-muted-foreground">
              When betting with a friend all bets are final. Winning bets will take all GC for SC win. SC need bet at least once before exchange.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">KYC Agreement</h3>
            <p className="text-muted-foreground">
              When accepting a friend you automatically become close friends.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">(GC) Gold Coins</h3>
            <p className="text-muted-foreground">
              You need gold coins to play. You can exchange gold back to dollars anytime for free.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">(SC) Sweeps Coins</h3>
            <p className="text-muted-foreground">
              Sweeps winning coins need to be played once before changing to cash with the party of mxexchange.site with a 2% fee.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
