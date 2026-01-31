import { Achievement } from "./achievement.js";
import { MatchSeed } from "./match.js";

export type UserIdentifier = string; // uuid, nickname or discord.[snowflake]

export interface UserProfile {
    uuid: string;
    nickname: string;
    roleType: number;
    eloRate: number | null;
    eloRank: number | null;
    country: string | null;
    seasonResults?: {
        eloRate: number;
        eloRank: number | null;
        phasePoint: number;
    } | null;
    predPhasePoint: number;
}

export interface UserData extends UserProfile {
    achievements: {display: Achievement[]; total: Achievement[]};
    timestamp: {firstOnline: number; lastOnline: number; lastRanked: number; nextDecay: number | null};
    statistics: UserStatistics;
    connections: null; // TBI
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

export interface EloLeaderboardData {
    season: {
        startsAt: number;
        endsAt: number;
        number: number;
    };
    users: UserProfile[];
}

export interface PhaseLeaderboardData {
    phase: {
        endsAt: number | null;
        number: number | null;
        season: number
    }
    users: UserProfile[];
}

export type RecordLeaderboardDataEntry = {
    rank: number;
    season: number;
    date: number;
    id: number;
    time: number;
    user: UserProfile;
    seed: MatchSeed;
}

export interface RaceLeaderboardData {
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

