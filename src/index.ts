import { MCSR } from "./client/mcsr.js";
import * as types from './types/index.js'
import * as util from './util/index.js'
import * as result from './client/result.js'
import * as fetch from './client/fetch.js'

export function mcsrjs(
    options?: types.ClientOptions
) : MCSR {
        return new MCSR(options);
}
export namespace mcsrjs {
    export interface Achievement extends types.Achievement {}
    export interface LiveData extends types.LiveData {}
    export interface LiveMatchData extends types.LiveMatchData {}
    export interface MatchInfo extends types.MatchInfo {}
    export type MatchID = types.MatchID;
    export interface MatchSeed extends types.MatchSeed {}
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
    export type Result<T> = result.Result<T>;
    export type UserIdentifier = types.UserIdentifier;

    export var eloToRank: typeof util.eloToRank = util.eloToRank;
    export var safe: typeof result.safe = result.safe;
    export var unsafe: typeof result.unsafe = result.unsafe;
    export var fetchJSON: typeof fetch.fetchJSON = fetch.fetchJSON;
    export var formatTime: typeof util.formatTime = util.formatTime;
    export var formatDate: typeof util.formatDate = util.formatDate;
    export var timeOf: typeof util.timeOf = util.timeOf;

    export type MatchType = types.MatchType;
    export var MatchType = types.MatchType;
    export type OverworldType = types.OverworldType;
    export var OverworldType = types.OverworldType;
    export type NetherType = types.NetherType;
    export var NetherType = types.NetherType;
    export type TimelineType = types.TimelineType;
    export var TimelineType = types.TimelineType;
}

export default mcsrjs;