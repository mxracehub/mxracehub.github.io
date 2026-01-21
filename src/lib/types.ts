

export type Play = {
    id: string;
    race: string;
    raceId: string; // To link to results page
    playType: 'Race Winner' | 'Holeshot' | 'Championship Winner';
    raceType?: 'Main Event' | 'Heat 1' | 'Heat 2' | 'Heat 3'; // For heats/main
    opponent: string; // opponent's username
    opponentId: string;
    date: string;
    amount: number;
    coinType: 'Gold Coins' | 'Sweeps Coins';
    status: 'Won' | 'Lost' | 'Pending';
    userRider: string; // Name of rider or manufacturer the user played on
    opponentRider: string; // Name of rider or manufacturer the opponent played on
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

export type GoldCoinPurchase = {
    id: string;
    userId: string;
    packageId: string;
    amount: number;
    price: number;
    date: string;
    status: 'Completed' | 'Refund Requested' | 'Refunded';
};

export type Account = {
    id: string;
    name: string;
    username: string;
    email: string;
    bio: string;
    state?: string;
    balances: {
        gold: number;
        sweeps: number;
    };
    playHistory: Play[];
    friendIds?: string[];
    riderNumber?: string;
    mxhubStanding?: number;
    isAdmin?: boolean;
    lastTriviaPlayed?: string;
};
