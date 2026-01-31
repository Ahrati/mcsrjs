import { Client } from "../client/client.js";
import { setParams } from "../client/fetch.js";
import { ClientOptions, EndpointParameterOptions } from "../types/options.js";
import { EloLeaderboardData,  PhaseLeaderboardData, RaceLeaderboardData, RecordLeaderboardDataEntry } from "../types/user.js";

export class LeaderboardEndpoint extends Client {
    constructor(
        options: ClientOptions = {}
    ) {
        super(options);
    }

    elo(
        options: EndpointParameterOptions = {}
    ) : Promise<EloLeaderboardData> {
        const params = setParams(
            ['season', 'country'],
            options
        );
        return this.request<EloLeaderboardData>(`/leaderboard?${params}`);
    }

    phase(
        options: EndpointParameterOptions = {}
    ) : Promise<PhaseLeaderboardData> {
        const params = setParams(
            ['season', 'country', 'predicted'],
            options
        );
        return this.request<PhaseLeaderboardData>(`/phase-leaderboard?${params}`);
    }

    record(
        options: EndpointParameterOptions = {}
    ) : Promise<RecordLeaderboardDataEntry[]> {
        const params = setParams(
            ['season', 'distinct'],
            options
        );
        return this.request<RecordLeaderboardDataEntry[]>(`/record-leaderboard?${params}`);
    }

    race(
        id?: number
    ) : Promise<RaceLeaderboardData> {
        return this.request<RaceLeaderboardData>(`/weekly-race/${id}`);
    }
}