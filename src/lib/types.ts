
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
    type: 'Gold Coin' | 'Sweeps Coin';
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
    friendIds?: string[];
    riderNumber?: string;
    mxhubStanding?: number;
    isAdmin?: boolean;
};
