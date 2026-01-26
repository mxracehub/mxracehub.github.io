
'use client';

import React, { useState, useEffect } from 'react';
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
import { ShieldCheck, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUser, useDoc } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import type { Account } from '@/lib/types';
import { updateAccount, addGoldCoinPurchase } from '@/lib/firebase-config';
import { Skeleton } from '@/components/ui/skeleton';

const coinPackages = [
  { amount: 500, price: 5.0, id: 'gc-500' },
  { amount: 1000, price: 10.0, id: 'gc-1k' },
  { amount: 2000, price: 20.0, id: 'gc-2k', popular: true },
  { amount: 5000, price: 50.0, id: 'gc-5k' },
];

function BankPageSkeleton() {
    const selectedPackage = coinPackages.find(p => p.id === 'gc-2k');
    return (
        <div>
            <PageHeader
                title="Bank & Checkout"
                description="Securely purchase Gold Coins to use across MxHub."
            />
            <div className="mx-auto max-w-4xl">
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
                            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {coinPackages.map((pkg) => (
                                    <Skeleton key={pkg.id} className="h-[108px] w-full" />
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                             <Label className="text-base font-semibold">
                                Payment Information (Simulation)
                            </Label>
                             <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                             <div className="space-y-2">
                                 <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                             <div className="grid grid-cols-2 gap-4">
                                 <div className="space-y-2">
                                     <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                                 <div className="space-y-2">
                                     <Skeleton className="h-4 w-12" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                     <CardFooter className="flex-col gap-4 items-stretch">
                        <Skeleton className="h-11 w-full" />
                        <Skeleton className="h-4 w-3/4 mx-auto" />
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default function BankPage() {
    const [selectedPackageId, setSelectedPackageId] = React.useState('gc-2k');
    const { user, isLoading: isUserLoading } = useUser();
    const { data: account, isLoading: isAccountLoading } = useDoc<Account>('accounts', user?.uid);
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!isUserLoading && !user) {
            router.push('/sign-in');
        }
    }, [isUserLoading, user, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user || !account) {
             toast({
                title: 'Error',
                description: 'You must be signed in to make a purchase.',
                variant: 'destructive',
            });
            return;
        }

        const selectedPkg = coinPackages.find(p => p.id === selectedPackageId);
        if (!selectedPkg) {
             toast({
                title: 'Error',
                description: 'Please select a valid package.',
                variant: 'destructive',
            });
            return;
        }

        setIsSubmitting(true);
        
        try {
            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Create a record of the purchase
            await addGoldCoinPurchase({
                userId: user.uid,
                packageId: selectedPkg.id,
                amount: selectedPkg.amount,
                price: selectedPkg.price,
                date: new Date().toISOString(),
                status: 'Completed',
            });

            // Update user's balance
            const newGoldBalance = account.balances.gold + selectedPkg.amount;
            await updateAccount(user.uid, { balances: { ...account.balances, gold: newGoldBalance } });
            
            toast({
                title: 'Purchase Successful!',
                description: `You've purchased ${selectedPkg.amount.toLocaleString()} Gold Coins.`,
            });
            router.push('/account');

        } catch (error) {
            console.error('Purchase simulation failed:', error);
             toast({
                title: 'Purchase Failed',
                description: 'Something went wrong. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    const selectedPackage = coinPackages.find(p => p.id === selectedPackageId);
    
    const isLoading = isUserLoading || isAccountLoading;

    if (isLoading) {
        return <BankPageSkeleton />;
    }

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
                        <Input id="name" placeholder="John Doe" disabled={isSubmitting} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input id="card-number" placeholder="•••• •••• •••• ••••" disabled={isSubmitting} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="expiry">Expiration</Label>
                            <Input id="expiry" placeholder="MM/YY" disabled={isSubmitting} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="•••" disabled={isSubmitting} />
                        </div>
                    </div>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-4 items-stretch">
                    <Button size="lg" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                             <ShieldCheck className="mr-2 h-4 w-4" />
                        )}
                       
                        {isSubmitting ? 'Processing...' : `Pay $${selectedPackage?.price.toFixed(2)}`}
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
