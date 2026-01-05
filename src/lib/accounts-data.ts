
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
    password?: string; // In a real app, this would be a hashed password.
    bio: string;
    balances: {
        gold: number;
        sweeps: number;
    };
    betHistory: Bet[];
    friendIds?: string[];
    riderNumber?: string;
    mxhubStanding?: number;
};

export const accounts: Account[] = [
    {
        id: 'user-123',
        name: 'John Doe',
        username: 'johndoe',
        email: 'john.doe@example.com',
        password: 'password123',
        bio: 'Motocross enthusiast and weekend warrior.',
        balances: {
            gold: 15000,
            sweeps: 250.75,
        },
        betHistory: [
            { id: 'bet-1', race: 'Thunder Valley National', opponent: 'motofan99', date: '2024-05-25', amount: 100, coinType: 'Gold Coins', status: 'Won' },
            { id: 'bet-2', race: 'Hangtown Classic', opponent: 'supercross_sally', date: '2024-06-01', amount: 50, coinType: 'Sweeps Coins', status: 'Lost' },
            { id: 'bet-3', race: 'Pala National', opponent: 'braap_brad', date: '2024-05-18', amount: 250, coinType: 'Gold Coins', status: 'Pending' },
        ],
        friendIds: ['user-456', 'user-789'],
        riderNumber: '18',
        mxhubStanding: 5,
    },
    {
        id: 'user-456',
        name: 'Jane Smith',
        username: 'janesmith',
        email: 'jane.smith@example.com',
        password: 'password123',
        bio: 'Supercross superfan.',
        balances: {
            gold: 5000,
            sweeps: 100,
        },
        betHistory: [
            { id: 'bet-4', race: 'Daytona Supercross', opponent: 'johndoe', date: '2024-03-05', amount: 20, coinType: 'Sweeps Coins', status: 'Won' },
        ],
        friendIds: ['user-123'],
        riderNumber: '22',
        mxhubStanding: 12,
    },
     {
        id: 'user-789',
        name: 'Mike Johnson',
        username: 'mikej',
        email: 'mike.j@example.com',
        password: 'password123',
        bio: 'Just here for the races.',
        balances: {
            gold: 1000,
            sweeps: 10,
        },
        betHistory: [],
        friendIds: ['user-123'],
        riderNumber: '7',
        mxhubStanding: 25,
    }
];

export const exchangeRequests: ExchangeRequest[] = [
    { id: 'ex-1', accountId: 'user-123', accountName: 'John Doe', amount: 500, date: '2024-07-28', status: 'Pending' },
    { id: 'ex-2', accountId: 'user-456', accountName: 'Jane Smith', amount: 1200, date: '2024-07-27', status: 'Approved' },
    { id: 'ex-3', accountId: 'user-789', accountName: 'Mike Johnson', amount: 750, date: '2024-07-26', status: 'Rejected' },
];
