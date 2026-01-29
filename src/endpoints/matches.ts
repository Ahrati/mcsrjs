import { Client } from "../client/client.js";
import { MatchID, MatchInfo, MatchType } from "../types/match.js";
import { ClientOptions, EndpointParameterOptions } from "../types/options.js";
import { UserIdentifier } from "../types/user.js";
import { UsersEndpoint } from "./users.js";

export class MatchesEndpoint extends Client {
    constructor(
        options: ClientOptions = {}
    ) {
        super(options);
    }

    recent(
        options: EndpointParameterOptions = {}
    ) : Promise<MatchInfo[]> {
        const {
            before,
            after,
            sort = "newest",
            count = 20,
            type = MatchType.ALL,   
            tag,
            season,
            includedecay = false,
        } = options;

        const params = new URLSearchParams();
        if (before !== undefined) params.append("before", String(before));
        if (after !== undefined) params.append("after", String(after));
        params.append("sort", sort);
        params.append("count", String(count));
        if (type !== null) params.append("type", String(type));
        if (season !== undefined) params.append("season", String(season));
        if (includedecay) params.append("includedecay", "true");
        return this.request<MatchInfo[]>(`/matches?${params.toString()}`);
    }

    /* cached */
    get(
        matchId: MatchID
    ) : Promise<MatchInfo> {
        return this.cache<MatchID, MatchInfo>(
            'matches.get',
            matchId,
            () => this.request<MatchInfo>(`/matches/${matchId}`)
        );
    }

    versus(
        usersEndpoint: UsersEndpoint,
        player_one: UserIdentifier,
        player_two: UserIdentifier,
        options: EndpointParameterOptions = {}
    ) : Promise<MatchInfo[]> {
        const {
            before,
            after,
            count,
            type,
            season
        } = options;
        
        const params = new URLSearchParams();
        if (before !== undefined) params.append("before", String(before));
        if (after !== undefined) params.append("after", String(after));
        if (count !== undefined) params.append("count", String(count));
        if (type !== null) params.append("type", String(type));
        if (season !== undefined) params.append("season", String(season));
        return usersEndpoint.request<MatchInfo[]>(`/users/${player_one}/versus/${player_two}/matches?${params.toString()}`) // not too nice
    }
}