import { Achievement } from "./achievement.js";
import { Completion, MatchSeed, MatchType, Timeline } from "./match.js";

export type UserIdentifier = string; // uuid, nickname or discord.[snowflake]

export interface UserProfile {
    /* As per UserProfile specification */
    uuid: string;
    nickname: string;
    roleType: number;
    eloRate: number | null;
    eloRank: number | null;
    country: string | null;
}

export interface UserData extends UserProfile {
    /* As per Get User Data response specification */
    achievements: {display: Achievement[]; total: Achievement[]};
    timestamp: {firstOnline: number; lastOnline: number; lastRanked: number; nextDecay: number | null};
    statistics: UserStatistics;
    connections: {
        [key: string]: {id: Connection | null, name: Connection | null};
    };
    seasonResult: {
        last: {eloRate: number; eloRank: number | null; phasePoint: number};
        highest: number;
        lowest: number;
        phases: {phase: number; eloRate: number; eloRank: number; point: number}[];
    } | null;
    weeklyRaces: {id: number; time: number; rank: number}[];
}

export type UserStatistics = {
    season:
        {bestTime: {ranked: number | null; casual: number | null};
        highestWinStreak: {ranked: number | null; casual: number | null};
        currentWinStreak: {ranked: number | null; casual: number | null}}; 
    total:
        {bestTime: {ranked: number | null; casual: number | null};
        highestWinStreak: {ranked: number | null; casual: number | null};
        currentWinStreak: {ranked: number | null; casual: number | null}}; 
}

export type Connection = string;

export interface EloLeaderboardData {
    /* As per Get Elo Leaderboard response specification */
    season: {
        startsAt: number;
        endsAt: number;
        number: number;
    };
    users: UserProfile[];
}

export interface PhaseLeaderboardData {
    /* As per Get Season Phase Points Leaderboard response specification */
    phase: {
        endsAt: number | null;
        number: number | null;
        season: number
    }
    users: UserProfile[];
}

export type RecordLeaderboardDataEntry = {
    /* As per Get Season Best Time Leaderboard response specification */
    rank: number;
    season: number;
    date: number;
    id: number;
    time: number;
    user: UserProfile;
    seed: MatchSeed;
}

export interface RaceLeaderboardData {
    /* As per Get Weekly Race Leaderboard response specification */
    id: number;
    seed: {
        overworld: string;
        nether: string;
        theEnd: string;
        rng: string;
    }
    endsAt: number;
    leaderboard: {
        rank: number;
        player: UserProfile;
        time: number;
        replayExist: boolean;
    }[]
}

export interface PrivateLiveMatchData {
    /* As per Get User's Live Match Data response specification */
    lastId: number | null;
    type: MatchType;
    status: string;
    time: number;
    players: UserProfile[];
    spectators: UserProfile[];
    timelines: Timeline[];
    completions: Completion[];
}