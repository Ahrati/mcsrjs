import { UserProfile } from "./user.js";

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

}

export interface UserSeasonResultData {

}
