
'use client';

import houseBankAccount from './house-bank-account.json';

type CardDetails = {
    name: string;
    cardNumber: string;
    expiry: string;
    cvc: string;
};

type PaymentResult = {
    success: boolean;
    transactionId?: string;
    message: string;
};

// This is a simulated payment processing function.
// In a real application, this would make a secure API call to a payment provider like Stripe.
export const processPayment = async (amount: number, cardDetails: CardDetails): Promise<PaymentResult> => {
    console.log(`Starting payment process for $${amount}...`);
    console.log('Card Details:', { ...cardDetails, cardNumber: '**** **** **** ' + cardDetails.cardNumber.slice(-4) });
    console.log('House Bank Info:', houseBankAccount);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate validation
    if (!cardDetails.name || !cardDetails.cardNumber || !cardDetails.expiry || !cardDetails.cvc) {
        console.error('Payment failed: Missing card details.');
        return {
            success: false,
            message: 'Payment failed. Please provide all card details.',
        };
    }

    // Simulate a successful transaction
    const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    console.log(`Payment successful! Transaction ID: ${transactionId}`);
    
    return {
        success: true,
        transactionId: transactionId,
        message: 'Your payment was successful.',
    };
};
