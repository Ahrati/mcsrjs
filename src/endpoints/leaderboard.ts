import { Client } from "../client/client.js";
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
        const {
            season,
            country
        } = options;

        const params = new URLSearchParams();
        if (season !== undefined) params.append("season", String(season));
        if (country !== undefined) params.append("country", country);
        return this.request<EloLeaderboardData>(`/leaderboard?${params.toString()}`);
    }

    phase(
        options: EndpointParameterOptions = {}
    ) : Promise<PhaseLeaderboardData> {
        const {
            season,
            country,
            predicted
        } = options;

        const params = new URLSearchParams();
        if (season !== undefined) params.append("season", String(season));
        if (country !== undefined) params.append("country", country);
        if (predicted !== undefined) params.append("predicted", String(predicted));
        return this.request<PhaseLeaderboardData>(`/phase-leaderboard?${params.toString()}`);
    }

    record(
        options: EndpointParameterOptions = {}
    ) : Promise<RecordLeaderboardDataEntry[]> {
        const {
            season,
            distinct
        } = options;

        const params = new URLSearchParams();
        if (season !== undefined) params.append("season", String(season));
        if (distinct !== undefined) params.append("distinct", String(distinct));
        return this.request<RecordLeaderboardDataEntry[]>(`/record-leaderboard?${params.toString()}`);
    }

    race(
        id?: number
    ) : Promise<RaceLeaderboardData> {
        return this.request<RaceLeaderboardData>(`/weekly-race/${id}`);
    }
}