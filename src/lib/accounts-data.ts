
export type Bet = {
    id: string;
    race: string;
    opponent: string;
    date: string;
    amount: number;
    coinType: 'Gold Coins' | 'Sweeps Coins';
    status: 'Won' | 'Lost' | 'Pending';
};

export type ExchangeRequest = {
    id: string;
    accountId: string;
    accountName: string;
    amount: number;
    date: string;
    status: 'Pending' | 'Approved' | 'Rejected';
};

export type Account = {
    id: string;
    name: string;
    username: string;
    email: string;
    bio: string;
    balances: {
        gold: number;
        sweeps: number;
    };
    betHistory: Bet[];
};

export const accounts: Account[] = [
    {
        id: 'user-123',
        name: 'John Doe',
        username: 'johndoe',
        email: 'john.doe@example.com',
        bio: 'Motocross enthusiast and weekend warrior.',
        balances: {
            gold: 15000,
            sweeps: 250.75,
        },
        betHistory: [
            { id: 'bet-1', race: 'Thunder Valley National', opponent: 'motofan99', date: '2024-05-25', amount: 100, coinType: 'Gold Coins', status: 'Won' },
            { id: 'bet-2', race: 'Hangtown Classic', opponent: 'supercross_sally', date: '2024-06-01', amount: 50, coinType: 'Sweeps Coins', status: 'Lost' },
            { id: 'bet-3', race: 'Pala National', opponent: 'braap_brad', date: '2024-05-18', amount: 250, coinType: 'Gold Coins', status: 'Pending' },
        ]
    }
];

export const exchangeRequests: ExchangeRequest[] = [
    { id: 'ex-1', accountId: 'user-123', accountName: 'John Doe', amount: 500, date: '2024-07-28', status: 'Pending' },
    { id: 'ex-2', accountId: 'user-456', accountName: 'Jane Smith', amount: 1200, date: '2024-07-27', status: 'Approved' },
    { id: 'ex-3', accountId: 'user-789', accountName: 'Mike Johnson', amount: 750, date: '2024-07-26', status: 'Rejected' },
];
