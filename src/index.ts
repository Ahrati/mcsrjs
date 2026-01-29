import { MCSR } from "./client/mcsr.js";
import * as types from './types/index.js'
import * as util from './util/index.js'

function mcsr(options?: types.ClientOptions) : MCSR {
    return new MCSR(options);
}

namespace mcsr {
    export interface Achievement extends types.Achievement {}
    export interface LiveData extends types.LiveData {}
    export interface LiveMatchData extends types.LiveMatchData {}
    export interface MatchInfo extends types.MatchInfo {}
    export type MatchID = types.MatchID;
    export interface MatchSeed extends types.MatchSeed {}
    export type MatchType = types.MatchType;
    export type TimelineType = types.TimelineType;
    export interface FetchOptions extends types.FetchOptions {}
    export interface ClientOptions extends types.ClientOptions {}
    export interface EndpointParameterOptions extends types.EndpointParameterOptions {}
    export interface VersusStats extends types.VersusStats {}
    export interface VersusData extends types.VersusData {}
    export interface UserStats extends types.UserStats {}
    export interface UserSeasonResultData extends types.UserSeasonResultData {}
    export interface UserProfile extends types.UserProfile {}
    export interface UserData extends types.UserData {}
    export interface RaceLeaderboardData extends types.RaceLeaderboardData {}
    export interface PhaseLeaderboardData extends types.PhaseLeaderboardData {}
    export interface EloLeaderboardData extends types.EloLeaderboardData {}

    export var eloToRank: typeof util.eloToRank;
}

export default mcsr;