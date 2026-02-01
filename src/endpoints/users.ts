import { MatchInfo } from "../types/match.js";
import { UserData, UserIdentifier } from "../types/user.js";
import { ClientOptions, EndpointParameterOptions } from "../types/options.js";
import { Client } from "../client/client.js";
import { buildParams, setParams } from "../client/fetch.js";

export class UsersEndpoint extends Client {
    constructor(
        options: ClientOptions = {}
    ) {
        super(options);
    }

    get(
        identifier: UserIdentifier,
        options: EndpointParameterOptions = {}
    ) : Promise<UserData> {
        const params = setParams(
            ['season'],
            options
        );
        return this.request<UserData>(`/users/${encodeURIComponent(identifier)}?${params}`);
    }

    matchList(
        identifier: UserIdentifier,
        options: EndpointParameterOptions = {},
    ) : Promise<MatchInfo[]> {
        const params = setParams(
            ['before', 'after', 'sort', 'count', 'type', 'season', 'excludedecay'],
            options
        );
        return this.request<MatchInfo[]>(`/users/${encodeURIComponent(identifier)}/matches?${params}`);
    }
}