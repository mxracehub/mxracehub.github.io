"use client"

import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ShieldCheck } from "lucide-react"
import React from "react"

const coinPackages = [
  { amount: "5,000", price: 4.99, id: "gc-5k" },
  { amount: "12,000", price: 9.99, id: "gc-12k", popular: true },
  { amount: "30,000", price: 19.99, id: "gc-30k" },
  { amount: "80,000", price: 49.99, id: "gc-80k" },
]

export default function BankPage() {
    const [selectedPackage, setSelectedPackage] = React.useState("gc-12k")

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
                        <CardDescription>Select a package and complete your purchase.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-8 md:grid-cols-2">
                        <div>
                            <Label className="text-base font-semibold">Select a Package</Label>
                            <RadioGroup value={selectedPackage} onValueChange={setSelectedPackage} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {coinPackages.map((pkg) => (
                                    <Label
                                        key={pkg.id}
                                        htmlFor={pkg.id}
                                        className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary relative`}
                                    >
                                        {pkg.popular && <div className="absolute -top-3 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">Popular</div>}
                                        <RadioGroupItem value={pkg.id} id={pkg.id} className="sr-only" />
                                        <p className="mb-2 text-lg font-semibold">{pkg.amount} Coins</p>
                                        <p className="text-xl font-bold">${pkg.price.toFixed(2)}</p>
                                    </Label>
                                ))}
                            </RadioGroup>
                        </div>
                        
                        <div className="space-y-4">
                             <Label className="text-base font-semibold">Payment Information</Label>
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
                    <CardFooter className="flex-col items-stretch">
                        <Button size="lg" className="w-full">
                            <ShieldCheck className="mr-2 h-4 w-4" />
                            Pay ${coinPackages.find(p => p.id === selectedPackage)?.price.toFixed(2)}
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
