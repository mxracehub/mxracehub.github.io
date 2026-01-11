
'use client';

import React from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';

const coinPackages = [
  { amount: 500, price: 5.0, id: 'gc-500' },
  { amount: 1000, price: 10.0, id: 'gc-1k' },
  { amount: 2000, price: 20.0, id: 'gc-2k', popular: true },
  { amount: 5000, price: 50.0, id: 'gc-5k' },
];

export default function BankPage() {
    const [selectedPackageId, setSelectedPackageId] = React.useState('gc-2k');
    const { user, isLoading: isUserLoading } = useUser();
    const router = useRouter();
    const { toast } = useToast();

    React.useEffect(() => {
        if (!isUserLoading && !user) {
            router.push('/sign-in');
        }
    }, [isUserLoading, user, router]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: 'Purchase Simulated',
            description: "This is a demo. No real transaction has occurred."
        });
        router.push('/account');
    }

    const selectedPackage = coinPackages.find(p => p.id === selectedPackageId);


  return (
    <div>
      <PageHeader
        title="Bank & Checkout"
        description="Securely purchase Gold Coins to use across MxHub."
      />
      <div className="mx-auto max-w-4xl">
        <form onSubmit={handleSubmit}>
            <Card>
            <CardHeader>
                <CardTitle>Purchase Gold Coins</CardTitle>
                <CardDescription>
                Select a package and complete your purchase. 100 Gold Coins =
                $1.00 USD
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-8 md:grid-cols-2">
                <div>
                <Label className="text-base font-semibold">Select a Package</Label>
                <RadioGroup
                    value={selectedPackageId}
                    onValueChange={setSelectedPackageId}
                    className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2"
                >
                    {coinPackages.map((pkg) => (
                    <Label
                        key={pkg.id}
                        htmlFor={pkg.id}
                        className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary relative`}
                    >
                        {pkg.popular && (
                        <div className="absolute -top-3 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                            Popular
                        </div>
                        )}
                        <RadioGroupItem
                        value={pkg.id}
                        id={pkg.id}
                        className="sr-only"
                        />
                        <p className="mb-2 text-lg font-semibold">
                        {pkg.amount.toLocaleString()} Coins
                        </p>
                        <p className="text-xl font-bold">${pkg.price.toFixed(2)}</p>
                    </Label>
                    ))}
                </RadioGroup>
                </div>

                <div className="space-y-4">
                <Label className="text-base font-semibold">
                    Payment Information (Simulation)
                </Label>
                <div className="space-y-2">
                    <Label htmlFor="name">Name on Card</Label>
                    <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="•••• •••• •••• ••••" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="expiry">Expiration</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="•••" />
                    </div>
                </div>
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-4 items-stretch">
                <Button size="lg" type="submit">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Pay ${selectedPackage?.price.toFixed(2)}
                </Button>
                <p className="w-full text-center text-xs text-muted-foreground">
                    This is a simulated checkout. No real payment will be processed. By clicking "Pay", you agree to our Terms of Service.
                </p>
            </CardFooter>
            </Card>
        </form>
      </div>
    </div>
  );
}
