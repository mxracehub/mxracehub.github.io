
"use client"

import React, { useState, useEffect } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2, ShieldCheck } from "lucide-react"
import { processPayment } from "@/lib/payment-service"
import { useToast } from "@/hooks/use-toast"
import { useUser, useDoc } from "@/firebase"
import { useRouter } from "next/navigation"
import type { Account } from "@/lib/types"
import { updateAccount } from "@/lib/firebase-config"


const coinPackages = [
  { amount: 500, price: 5.00, id: "gc-500" },
  { amount: 1000, price: 10.00, id: "gc-1k" },
  { amount: 2000, price: 20.00, id: "gc-2k", popular: true },
  { amount: 5000, price: 50.00, id: "gc-5k" },
]

export default function BankPage() {
    const { toast } = useToast();
    const router = useRouter();
    const { user, isLoading: isUserLoading } = useUser();
    const { data: account, isLoading: isAccountLoading } = useDoc<Account>('accounts', user?.uid || '---');

    const [selectedPackageId, setSelectedPackageId] = React.useState("gc-2k");
    const [name, setName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!isUserLoading && !user) {
          router.push('/sign-in');
        }
    }, [isUserLoading, user, router]);

    const selectedPackage = coinPackages.find(p => p.id === selectedPackageId);

    const handlePurchase = async () => {
        if (!selectedPackage || !user || !account) {
            toast({
                title: "Error",
                description: "Please select a package and ensure you are signed in.",
                variant: "destructive"
            });
            return;
        }

        if (!name || !cardNumber || !expiry || !cvc) {
            toast({
                title: "Missing Payment Information",
                description: "Please fill out all card details.",
                variant: "destructive"
            });
            return;
        }

        setIsSubmitting(true);

        const paymentResult = await processPayment(selectedPackage.price, { name, cardNumber, expiry, cvc });

        if (paymentResult.success) {
            try {
                // Update user's gold coin balance in Firestore
                const newGoldBalance = account.balances.gold + selectedPackage.amount;
                await updateAccount(user.uid, { 
                    balances: { 
                        ...account.balances, 
                        gold: newGoldBalance 
                    } 
                });

                toast({
                    title: "Purchase Successful!",
                    description: `You've added ${selectedPackage.amount.toLocaleString()} Gold Coins to your account.`,
                });
                
                // Redirect to account page after successful purchase
                router.push('/account');

            } catch (error) {
                console.error("Error updating account balance:", error);
                toast({
                    title: "Update Failed",
                    description: "Your payment was successful, but we failed to update your coin balance. Please contact support.",
                    variant: "destructive"
                });
            }
        } else {
            toast({
                title: "Payment Failed",
                description: paymentResult.message,
                variant: "destructive"
            });
        }
        setIsSubmitting(false);
    }

    if (isUserLoading || isAccountLoading) {
        return <div>Loading...</div>
    }

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
                        <CardDescription>Select a package and complete your purchase. 100 Gold Coins = $1.00 USD</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-8 md:grid-cols-2">
                        <div>
                            <Label className="text-base font-semibold">Select a Package</Label>
                            <RadioGroup value={selectedPackageId} onValueChange={setSelectedPackageId} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {coinPackages.map((pkg) => (
                                    <Label
                                        key={pkg.id}
                                        htmlFor={pkg.id}
                                        className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary relative`}
                                    >
                                        {pkg.popular && <div className="absolute -top-3 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">Popular</div>}
                                        <RadioGroupItem value={pkg.id} id={pkg.id} className="sr-only" />
                                        <p className="mb-2 text-lg font-semibold">{pkg.amount.toLocaleString()} Coins</p>
                                        <p className="text-xl font-bold">${pkg.price.toFixed(2)}</p>
                                    </Label>
                                ))}
                            </RadioGroup>
                        </div>
                        
                        <div className="space-y-4">
                             <Label className="text-base font-semibold">Payment Information</Label>
                            <div className="space-y-2">
                                <Label htmlFor="name">Name on Card</Label>
                                <Input id="name" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} disabled={isSubmitting} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="card-number">Card Number</Label>
                                <Input id="card-number" placeholder="•••• •••• •••• ••••" value={cardNumber} onChange={e => setCardNumber(e.target.value)} disabled={isSubmitting} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="expiry">Expiration</Label>
                                    <Input id="expiry" placeholder="MM/YY" value={expiry} onChange={e => setExpiry(e.target.value)} disabled={isSubmitting} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cvc">CVC</Label>
                                    <Input id="cvc" placeholder="•••" value={cvc} onChange={e => setCvc(e.target.value)} disabled={isSubmitting} />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col items-stretch">
                        <Button size="lg" className="w-full" onClick={handlePurchase} disabled={isSubmitting || !selectedPackage}>
                            {isSubmitting ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <ShieldCheck className="mr-2 h-4 w-4" />
                            )}
                            {isSubmitting ? 'Processing...' : `Pay $${selectedPackage?.price.toFixed(2) || '0.00'}`}
                        </Button>
                        <p className="mt-4 text-center text-xs text-muted-foreground">
                            All transactions are secure and encrypted. By completing this purchase, you agree to our Terms of Service.
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
