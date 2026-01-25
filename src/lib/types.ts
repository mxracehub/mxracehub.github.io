

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
    status: 'Won' | 'Lost' | 'Pending' | 'Voided';
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

export type SettlementRecord = {
    id: string;
    date: string; // ISO string
    settledPlays: number;
    updatedAccounts: number;
    triggeredBy: string;
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
    playedTriviaIds?: number[];
};

export type Rider = {
    id: string;
    name: string;
    team: string;
    number: string;
    class: '450cc' | '250cc';
    location?: string;
    dob?: string;
    turnedPro?: string;
    accomplishments?: string[];
    videos?: string[];
};

export type Race = {
    id: string;
    name: string;
    track: string;
    location: string;
    date: string;
    time?: string;
    series: 'Supercross' | 'Motocross' | 'Playoffs' | 'World Supercross';
    division?: 'East' | 'West' | 'East/West Showdown';
    format?: 'Triple Crown';
    round?: number;
    tv?: string;
    raceDayLive?: string;
};

export type RiderResult = {
    pos: number;
    rider: string;
    number: string;
    bike: string;
    points?: number;
    holeshot?: boolean;
    finishes?: string;
};

export type RaceResult = {
    id: string; // raceId
    [eventType: string]: RiderResult[] | string; // To allow for id property
};
