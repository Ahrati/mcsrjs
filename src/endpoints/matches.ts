import { Client } from "../client/client.js";
import { setParams } from "../client/fetch.js";
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
        const params = setParams(
            ['before', 'after', 'sort', 'count', 'type', 'tag', 'season', 'includedecay'],
            options
        );
        return this.request<MatchInfo[]>(`/matches?${params}`);
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
        const params = setParams(
            ['before', 'after', 'count', 'type', 'season'],
            options
        );
        return usersEndpoint.request<MatchInfo[]>(`/users/${player_one}/versus/${player_two}/matches?${params}`) // not too nice
    }
}