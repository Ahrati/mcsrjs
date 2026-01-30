import { Client } from "../client/client.js";
import { ClientOptions, EndpointParameterOptions } from "../types/options.js"
import { UserData, UserIdentifier } from "../types/user.js";
import { VersusData, UserSeasonResultData, UserStats, SplitTimes } from "../types/stats.js"
import { mcsrjsError } from "../client/error.js";
import { UsersEndpoint } from "../endpoints/users.js";
import { MatchInfo, MatchType, NetherType, OverworldType, Timeline, TimelineType } from "../types/match.js";
import { MatchesEndpoint } from "../endpoints/matches.js";
import { timeOf } from "../util/util.js";


// WIP experimental

export class StatsModule {
    constructor(
        private readonly userClient: UsersEndpoint, //idk dont like it
        private readonly matchClient: MatchesEndpoint
    ) {}

    versus(
        player_one: UserIdentifier,
        player_two: UserIdentifier,
        options: EndpointParameterOptions = {}
    ) : Promise<VersusData> {
        const {
            season
        } = options;
        
        const params = new URLSearchParams();
        if (season !== undefined) params.append("season", String(season));
        return this.userClient.request<VersusData>(`/users/${player_one}/versus/${player_two}?${params.toString()}`)
    }

    async player( // yucky need to fix later
        identifer: UserIdentifier,
        options?: EndpointParameterOptions
    ) : Promise<UserStats> {
        /*
            Constructs user statistics from the past 50 games played
        */

        var stats: UserStats;
        const matches: MatchInfo[] = await Promise.all(
                                        (await this.userClient.matchList( identifer, { sort: 'newest', type: MatchType.RANKED, count: 50 } )
                                    ).map(
                                        m => this.matchClient.get(m.id)
                                    ));
        const userdata: UserData = await this.userClient.get(identifer);

        const statistics = userdata.statistics;
        
        const overworlds: number[] = []; 
        const bastions: number[] = [];
        const fortresses: number[] = [];
        const blinds: number[] = [];
        const strongholds: number[] = [];
        const ends: number[] = [];

        type Seed = {
            type: OverworldType | NetherType,
            time: number
        }
        const overworld_seeds: Seed[] = [];
        const nether_seeds: Seed[] = [];

        for(let m of matches) {
            const timelines: Timeline[] = m.timelines.filter(t => t.uuid == userdata.uuid);

            const overworld = timeOf(timelines, TimelineType.ENTER_NETHER);
            const bastion = timeOf(timelines, TimelineType.BASTION);
            const fortress = timeOf(timelines, TimelineType.FORTRESS);
            const blind = timeOf(timelines, TimelineType.BLIND);
            const stronghold = timeOf(timelines, TimelineType.STRONGHOLD);
            const end = timeOf(timelines, TimelineType.ENTER_END);
            const dragon = timeOf(timelines, TimelineType.DRAGON_DEATH);
            const run_duration = m.result.time;

            if(overworld != null) overworlds.push(overworld);
            if(fortress != null && bastion != null) bastions.push(fortress - bastion);
            if(blind != null && fortress != null) fortresses.push(blind - fortress);
            if(stronghold != null && blind != null) blinds.push(stronghold - blind);
            if(end != null && stronghold != null) strongholds.push(end - stronghold);
            if(dragon != null && end != null) ends.push(dragon - end);

            if (!m.seedType || !m.bastionType) continue;
            const overworld_type = m.seedType;
            const nether_type = m.bastionType;

            overworld_seeds.push({
                type: overworld_type,
                time: overworld ? overworld : run_duration
            });

            let netherTime: number | null = null;

            if (overworld != null) {
                if (blind != null) {
                    netherTime = blind - overworld;
                } else {
                    netherTime = run_duration - overworld;
                }
            }
            if (netherTime != null) {
                nether_seeds.push({
                    type: nether_type,
                    time: netherTime
                })
            }
        }

        const avg = (arr: number[]) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null;
        const best = (arr: number[]) => arr.length ? Math.min(...arr) : null;

        const splitAverages: SplitTimes = {
            overworld: avg(overworlds),
            bastion: avg(bastions),
            fortress: avg(fortresses),
            blind: avg(blinds),
            stronghold: avg(strongholds),
            end: avg(ends)
        }
        const bestTimes: SplitTimes = {
            overworld: best(overworlds),
            bastion: best(bastions),
            fortress: best(fortresses),
            blind: best(blinds),
            stronghold: best(strongholds),
            end: best(ends)
        }

        var avg_best_overworld: OverworldType | null = null;
        var bestAvg_overworld = Infinity;
        const ow_seed_times = overworld_seeds.reduce((a, seed) => {
            const key: string = seed.type;
            if(!a[key]) a[key] = [];
            a[key].push(seed.time);
            return a;
        }, {} as {[key: string]: number[]})
        for(let seed in ow_seed_times) {
            const t = ow_seed_times[seed];
            const average = t.reduce((sum, t) => sum + t, 0) / t.length;
            if(average < bestAvg_overworld) {
                bestAvg_overworld = average;
                avg_best_overworld = seed as OverworldType;
            }
        }

        var avg_best_nether: NetherType | null = null;
        var bestAvg_nether = Infinity;
        const n_seed_times = nether_seeds.reduce((a, seed) => {
            const key: string = seed.type;
            if(!a[key]) a[key] = [];
            a[key].push(seed.time);
            return a;
        }, {} as {[key: string]: number[]})
        for(let seed in n_seed_times) {
            const t = n_seed_times[seed];
            const average = t.reduce((sum, t) => sum + t, 0) / t.length;
            if(average < bestAvg_nether) {
                bestAvg_nether = average;
                avg_best_nether = seed as NetherType;
            }
        }

        stats = {
            statistics: statistics,
            averageTimes: splitAverages,
            bestTimes: bestTimes,
            bestSeeds: {
                overworld: avg_best_overworld,
                nether: avg_best_nether
            }
        }

        return stats;
    }

    seasonResults(
        identifer: UserIdentifier,
        options?: EndpointParameterOptions
    ) : Promise<UserSeasonResultData> {
        throw new mcsrjsError("not implemented");
    }
}