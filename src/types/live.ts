import { UserProfile } from "./user.js";

export interface LiveData {
    /* As per Get Online Players & Live Stream Matches response specification */
    players: number;
    liveMatches: LiveMatchData[];
}

export interface LiveMatchData {
    currentTime: number;
    players: UserProfile[];
    data: {
        [uuid: string]: {
            liveUrl: string | null;
            timeline: {
                time: number;
                type: string;
            }
        }
    }
}