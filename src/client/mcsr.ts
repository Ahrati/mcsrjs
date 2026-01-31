import { ClientOptions } from "../types/options.js";
import { LiveEndpoint } from "../endpoints/live.js";
import { MatchesEndpoint } from "../endpoints/matches.js";
import { UsersEndpoint } from "../endpoints/users.js";
import { LeaderboardEndpoint } from "../endpoints/leaderboard.js";
import { StatsModule } from "../modules/stats.js";

export class MCSR {
    //Endpoints
    readonly users: UsersEndpoint;
    readonly matches: MatchesEndpoint;
    readonly live: LiveEndpoint;
    readonly leaderboard: LeaderboardEndpoint;

    //Modules
    readonly stats: StatsModule;
    
    //Data
    private m_season!: number;
    private m_players!: number;

    constructor(
        options?: ClientOptions
    ) {
        this.users = new UsersEndpoint(options);
        this.matches = new MatchesEndpoint(options);
        this.live = new LiveEndpoint(options);
        this.leaderboard = new LeaderboardEndpoint(options);

        this.stats = new StatsModule(this.users, this.matches); //wip
    
        this.refresh();
    }

    public async refresh(
    ) {
        this.m_season = (await this.leaderboard.elo()).season.number;;
        this.m_players = (await this.live.get()).players;
    }

    get current_season(
    ) : number {
        return this.m_season;
    }

    get online_players(
    ) : number {
        return this.m_players;
    }
}