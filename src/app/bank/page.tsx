
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
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUser, useDoc } from '@/firebase';
import { useRouter } from 'next/navigation';
import type { Account } from '@/lib/types';
import { updateAccount } from '@/lib/firebase-config';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { loadStripe, type StripeElementsOptions } from '@stripe/stripe-js';
import { Skeleton } from '@/components/ui/skeleton';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
);

const coinPackages = [
  { amount: 500, price: 5.0, id: 'gc-500' },
  { amount: 1000, price: 10.0, id: 'gc-1k' },
  { amount: 2000, price: 20.0, id: 'gc-2k', popular: true },
  { amount: 5000, price: 50.0, id: 'gc-5k' },
];

function CheckoutForm({
  selectedPackageId,
  onSuccessfulPurchase,
}: {
  selectedPackageId: string;
  onSuccessfulPurchase: (amount: number) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required', // Stay on page to handle result
    });

    if (error) {
      toast({
        title: 'Payment Failed',
        description: error.message,
        variant: 'destructive',
      });
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        const purchasedPackage = coinPackages.find(p => p.id === selectedPackageId);
        if (purchasedPackage) {
            onSuccessfulPurchase(purchasedPackage.amount);
        }
    } else {
        toast({
            title: 'Payment Incomplete',
            description: 'Your payment was not successful. Please try again.',
            variant: 'destructive',
        });
        setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button
        size="lg"
        className="w-full mt-6"
        disabled={isProcessing || !stripe || !elements}
      >
        {isProcessing ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <ShieldCheck className="mr-2 h-4 w-4" />
        )}
        {isProcessing
          ? 'Processing...'
          : `Pay $${
              coinPackages.find((p) => p.id === selectedPackageId)?.price.toFixed(2) || '0.00'
            }`}
      </Button>
    </form>
  );
}

export default function BankPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { user, isLoading: isUserLoading } = useUser();
  const { data: account, isLoading: isAccountLoading } = useDoc<Account>(
    'accounts',
    user?.uid || '---'
  );

  const [selectedPackageId, setSelectedPackageId] = React.useState('gc-2k');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
   const [isInitializingPayment, setIsInitializingPayment] = useState(true);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/sign-in');
    }
  }, [isUserLoading, user, router]);

  useEffect(() => {
    const selectedPackage = coinPackages.find((p) => p.id === selectedPackageId);
    if (selectedPackage) {
      setIsInitializingPayment(true);
      // Amount must be in cents for Stripe
      const amountInCents = selectedPackage.price * 100;
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amountInCents }),
      })
        .then((res) => res.json())
        .then((data) => {
            if (data.clientSecret) {
                setClientSecret(data.clientSecret)
            } else {
                console.error("Failed to get client secret:", data.error);
                toast({
                    title: "Payment Error",
                    description: "Could not initialize payment. Please refresh and try again.",
                    variant: "destructive"
                });
            }
        }).finally(() => {
            setIsInitializingPayment(false);
        });
    }
  }, [selectedPackageId, toast]);

  const handleSuccessfulPurchase = async (purchasedAmount: number) => {
    if (!user || !account) return;
    try {
        const newGoldBalance = account.balances.gold + purchasedAmount;
        await updateAccount(user.uid, {
            balances: {
            ...account.balances,
            gold: newGoldBalance,
            },
        });

        toast({
            title: 'Purchase Successful!',
            description: `You've added ${purchasedAmount.toLocaleString()} Gold Coins to your account.`,
        });

        router.push('/account');
    } catch (error) {
        console.error('Error updating account balance:', error);
        toast({
            title: 'Update Failed',
            description: 'Your payment was successful, but we failed to update your coin balance. Please contact support.',
            variant: 'destructive',
        });
    }
  }


  if (isUserLoading || isAccountLoading) {
    return <div>Loading...</div>;
  }

  const options: StripeElementsOptions = {
    clientSecret: clientSecret || undefined,
    appearance: {
      theme: 'night',
      labels: 'floating',
    },
  };

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
              <RadioGroup
                value={selectedPackageId}
                onValueChange={setSelectedPackageId}
                className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2"
                disabled={isInitializingPayment}
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
                Payment Information
              </Label>
              {isInitializingPayment || !clientSecret ? (
                <div className="space-y-4 pt-2">
                    <Skeleton className="h-14 w-full" />
                    <Skeleton className="h-11 w-full" />
                </div>
              ) : (
                <Elements stripe={stripePromise} options={options}>
                  <CheckoutForm selectedPackageId={selectedPackageId} onSuccessfulPurchase={handleSuccessfulPurchase} />
                </Elements>
              )}
            </div>
          </CardContent>
           <CardFooter>
             <p className="w-full text-center text-xs text-muted-foreground">
                All transactions are secure and encrypted by Stripe. By completing this purchase, you agree to our Terms of Service.
            </p>
           </CardFooter>
        </Card>
      </div>
    </div>
  );
}
