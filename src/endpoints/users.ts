import { MatchInfo } from "../types/match.js";
import { UserData, UserIdentifier } from "../types/user.js";
import { ClientOptions, EndpointParameterOptions } from "../types/options.js";
import { Client } from "../client/client.js";

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
        const {
            season
        } = options;

        const params = new URLSearchParams();
        if (season !== undefined) params.append("season", String(season));
        return this.request<UserData>(`/users/${encodeURIComponent(identifier)}?${params.toString()}`);
    }

    matchList(
        identifier: UserIdentifier,
        options: EndpointParameterOptions = {}
    ) : Promise<MatchInfo[]> {
        const {
            before,
            after,
            sort = "newest",
            count = 20,
            type = null,
            season,
            excludedecay = false,
        } = options;

        const params = new URLSearchParams();
        if (before !== undefined) params.append("before", String(before));
        if (after !== undefined) params.append("after", String(after));
        params.append("sort", sort);
        params.append("count", String(count));
        if (type !== null) params.append("type", String(type));
        if (season !== undefined) params.append("season", String(season));
        if (excludedecay) params.append("excludedecay", "true");

        return this.request<MatchInfo[]>(`/users/${encodeURIComponent(identifier)}/matches?${params.toString()}`);
    }
}