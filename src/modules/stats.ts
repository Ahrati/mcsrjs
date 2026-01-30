import { Client } from "../client/client.js";
import { ClientOptions, EndpointParameterOptions } from "../types/options.js"
import { UserIdentifier } from "../types/user.js";
import { VersusData, UserSeasonResultData, UserStats } from "../types/stats.js"
import { mcsrjsError } from "../client/error.js";
import { UsersEndpoint } from "../endpoints/users.js";


// WIP experimental

export class StatsModule {
    constructor(
        private readonly userClient: UsersEndpoint //idk dont like it
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

    player(
        identifer: UserIdentifier,
        options?: EndpointParameterOptions
    ) : Promise<UserStats> {
        /*
            Constructs user statistics from the past 50 games played
        */
        throw new mcsrjsError("not implemented");
    }

    seasonResults(
        identifer: UserIdentifier,
        options?: EndpointParameterOptions
    ) : Promise<UserSeasonResultData> {
        throw new mcsrjsError("not implemented");
    }
}