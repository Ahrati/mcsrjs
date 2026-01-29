import { UserProfile } from "./user.js";

export interface LiveData {
    players: number;
    liveMatches: {
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
    }[];
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