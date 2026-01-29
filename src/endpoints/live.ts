import { UserIdentifier, UserData } from "../types/user.js";
import { LiveMatchData, LiveData } from "../types/live.js";
import { Client } from "../client/client.js"
import { ClientOptions } from "../types/options.js";
import { mcsrjsError } from "../client/error.js";
import { UsersEndpoint } from "./users.js";
import { Result, safe } from "../client/result.js";

export class LiveEndpoint extends Client {
    constructor(
        options: ClientOptions = {}
    ) {
        super(options);
    }

    get(
    ) : Promise<LiveData> {
        return this.request<LiveData>(`/live`);
    }

    async find(
        uuid: string // will try changing later to work with any UserIdentifier
    ) : Promise<Result<LiveMatchData>> {
        const data = await safe(this.get());
        if(!data.ok) {
            return {
                ok: false,
                error: new mcsrjsError(`LiveData not available`,
                {
                    endpoint: 'LiveEndpoint.find@data.ok'
                })
            }
        }
                
        for (const match of data.value.liveMatches) {
            if(match.players.some(p => p.uuid === uuid)) {
                return {
                    ok: true,
                    value: match
                };
            }
            for(const puuid in match.data) {
                if(puuid === uuid) {
                    return {
                        ok: true,
                        value: match
                    };
                }
            }
        }
        return {
            ok: false,
            error: new mcsrjsError(`User is not live or in a live match`,
            {
                endpoint: 'LiveEndpoint.find'
            }) 
        }
    }

    //WIP
    async __getPlayersFromLiveMatch(
        usersEndpoint: UsersEndpoint,
        data: LiveMatchData
    ) : Promise<Result<UserData>[]> {
        // doesnt guarantee a userdata to be returned,
        // so it should be checked on users side if the result is ok

        let players: Result<UserData>[] = [];
        for(const uuid in data?.data) {
            const result = await safe(usersEndpoint.get(uuid));
            players.push(result);
        }
        return players;
    }
    async __getLiveOpponent(
        usersEndpoint: UsersEndpoint,
        user: UserIdentifier,
    ) : Promise<Result<UserData>> {
        const u = await usersEndpoint.get(user);
        const liveData = await this.find(u.uuid);

        if(!liveData.ok) {
            return {
                ok: false,
                error: new mcsrjsError(`User is not live or in a live match`,
                {
                    endpoint: 'LiveEndpoint.__getLiveOpponent@liveData.ok'
                }) 
            }
        };

        const players = await this.__getPlayersFromLiveMatch(usersEndpoint, liveData.value);
        const foundPlayer = players.find(p => {
                if(!p.ok) return false
                return p.value.uuid !== u.uuid
            });
        if(!foundPlayer) {
            return {
                ok: false,
                error: new mcsrjsError(`Opponent data isn't present in LiveMatchData`,
                {
                    endpoint: 'LiveEndpoint.__getLiveOpponent@foundPlayer'
                }) 
            }
        }
        return foundPlayer;
    }
}