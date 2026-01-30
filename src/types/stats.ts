import { MatchSeed, NetherType, OverworldType } from "./match.js";
import { UserProfile, UserStatistics } from "./user.js";

export type VersusResultMap = {
  total: number;
  [uuid: string]: number;
};

export type VersusResults = {
  ranked: VersusResultMap;
  casual: VersusResultMap;
};

export type VersusChanges = {
  [uuid: string]: number;
};

export interface VersusData {
  players: UserProfile[];
  results: VersusResults;
  changes: VersusChanges;
};

export interface VersusStats {
    [nickname: string]: {
        ranked: number,
        casual: number,
        change: number
    }
}

export interface UserStats {
  statistics: UserStatistics;
  averageTimes: SplitTimes;
  bestTimes: SplitTimes;
  bestSeeds: {
    overworld: OverworldType;
    nether: NetherType;
  }
}

export type SplitTimes = {
  overworld: number | null;
  bastion: number | null;
  fortress: number | null;
  blind: number | null;
  stronghold: number | null;
  end: number | null;
}

export interface UserSeasonResultData {

}
