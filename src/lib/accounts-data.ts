
export type Bet = {
    id: string;
    race: string;
    opponent: string;
    date: string;
    amount: number;
    coinType: 'Gold Coins' | 'Sweeps Coins';
    status: 'Won' | 'Lost' | 'Pending';
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
