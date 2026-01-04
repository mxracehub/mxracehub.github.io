import { PageHeader } from '@/components/page-header';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { SummarizerForm } from '@/components/admin/summarizer-form';
import { ExchangeRequestsTable } from '@/components/admin/exchange-requests-table';

export default function AdminPage() {
  return (
    <div>
      <PageHeader
        title="Admin Panel"
        description="Manage application data and utilize AI tools."
      />
      <Tabs defaultValue="race-data" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="race-data">Race Data Input</TabsTrigger>
          <TabsTrigger value="exchange-data">Exchange Data Sync</TabsTrigger>
          <TabsTrigger value="exchange-requests">Exchange Requests</TabsTrigger>
          <TabsTrigger value="ai-summarizer">AI Summarizer</TabsTrigger>
        </TabsList>

        <TabsContent value="race-data">
          <Card>
            <CardHeader>
              <CardTitle>MxRaceHub Data Management</CardTitle>
              <CardDescription>
                Input details for new races. This will automatically update the
                frontend.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="race-name">Race Name</Label>
                <Input id="race-name" placeholder="e.g., Unadilla National" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image-url">Image URL</Label>
                <Input
                  id="image-url"
                  placeholder="https://images.example.com/race.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="button-text">Button Text</Label>
                <Input id="button-text" placeholder="e.g., View Race" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Race Data</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="exchange-data">
          <Card>
            <CardHeader>
              <CardTitle>Mx Exchange Data Management</CardTitle>
              <CardDescription>
                Update content and settings for the Mx Exchange interface.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="promo-title">Promotion Title</Label>
                <Input id="promo-title" placeholder="e.g., 2x Bonus Week" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="promo-image">Promotion Image URL</Label>
                <Input
                  id="promo-image"
                  placeholder="https://images.example.com/promo.jpg"
                />
              </div>
               <div className="space-y-2">
                <Label htmlFor="redemption-url">Redemption URL</Label>
                <Input id="redemption-url" placeholder="https://mx-exchange.example.com" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Sync Exchange Data</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="exchange-requests">
          <Card>
            <CardHeader>
              <CardTitle>Gold Coin Exchange Requests</CardTitle>
              <CardDescription>
                Review and process user requests to exchange Gold Coins.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ExchangeRequestsTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-summarizer">
          <SummarizerForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
