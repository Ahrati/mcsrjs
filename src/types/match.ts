import { UserProfile } from "./user.js";

export type MatchID = number;

export interface MatchInfo {
    /* As per MatchInfo specification */
    id: MatchID;
    type: MatchType;
    season: number;
    category: string | null;
    date: number;
    players: UserProfile[];
    spectators: UserProfile[];
    seed: MatchSeed | null;
    result: {uuid: string | null; time: number};
    forfeited: boolean;
    decayed: boolean;
    rank: {season: number | null; allTime: number | null};
    changes: {uuid: string; change: number | null; eloRate: number | null}[];
    tag: string | null;
    beginner: boolean;
    vod: {uuid: string, url: string; startsAt: number}[];
    /* advanced */
    completions: Completion[];
    timelines: Timeline[];
    replayExist: boolean;

    /* As gathered from /matches and /matches/{id} */
    gameMode: string;
    botSource: null; // not sure
    seedType: OverworldType | null;
    bastionType: NetherType | null;
}

export type Completion = {
    uuid: string;
    time: number;
}

export type Timeline = {
    uuid: string;
    time: number;
    type: TimelineType | string;
}

export interface MatchSeed {
    /* As per MatchSeed specification */
    id: string | null;
    overworld: OverworldType | null;
    nether: NetherType | null;
    endTowers: number[];
    variations: string[];
}

export const OverworldType = {
    VILLAGE: 'VILLAGE',
    RUINED_PORTAL: 'RUINED_PORTAL',
    SHIPWRECK: 'SHIPWRECK',
    DESERT_TEMPLE: 'DESERT_TEMPLE',
    BURIED_TREASURE: 'BURIED_TREASURE'
} as const;
export type OverworldType = typeof OverworldType[keyof typeof OverworldType];

export const NetherType = {
    STABLES: 'STABLES',
    TREASURE: 'TREASURE',
    BRIDGE: 'BRIDGE',
    HOUSING: 'HOUSING'
} as const;
export type NetherType = typeof NetherType[keyof typeof NetherType];

export const MatchType = {
    CASUAL: 1,
    RANKED: 2,
    PRIVATE: 3,
    EVENT: 4,
    ALL: null
} as const;
export type MatchType = typeof MatchType[keyof typeof MatchType];

export const TimelineType = {
    /* Gathered from scraping recent matches for TimelineTypes */
    STORY: 'story.root',
    ADVENTURE: 'adventure.root',
    NETHER: 'nether.root',
    END: 'end.root',
    HUSBANDRY: 'husbandry.root',

    FORFEIT: 'projectelo.timeline.forfeit',
    BLIND: 'projectelo.timeline.blind_travel',
    DEATH: 'projectelo.timeline.death',
    DRAGON_DEATH: 'projectelo.timeline.dragon_death',
    RESET: 'projectelo.timeline.reset',
    DEATH_SPAWNPOINT: 'projectelo.timeline.death_spawnpoint',
    COMPLETE: 'projectelo.timeline.complete',

    ENTER_NETHER: 'story.enter_the_nether',
    BLAZE_ROD: 'nether.obtain_blaze_rod',
    FORTRESS: 'nether.find_fortress',
    BASTION: 'nether.find_bastion',
    LOOT_BASTION: 'nether.loot_bastion',
    CRYING_OBSIDIAN: 'nether.obtain_crying_obsidian',
    DISTRACT_PIGLIN: 'nether.distract_piglin',
    RETURN_TO_SENDER: 'nether.return_to_sender',
    ANCIENT_DEBRIS: 'nether.obtain_ancient_debris',
    CHARGE_ANCHOR: 'nether.charge_respawn_anchor',
    EXPLORE_NETHER: 'nether.explore_nether',
    WITHER_SKULL: 'nether.get_wither_skull',

    KILL_MOB: 'adventure.kill_a_mob',
    SHOOT_CROSSBOW: 'adventure.ol_betsy',
    SLEEP: 'adventure.sleep_in_bed',
    TRADE: 'adventure.trade',
    SHOOT_BOW: 'adventure.shoot_arrow',

    TAME_ANIMAL: 'husbandry.tame_an_animal',

    LAVA_BUCKET: 'story.lava_bucket',
    MINE_STONE: 'story.mine_stone',
    IRON_TOOLS: 'story.iron_tools',
    SMELT_IRON: 'story.smelt_iron',
    ARMOR: 'story.obtain_armor',
    OBSIDIAN: 'story.form_obsidian',
    IRON_PICKAXE: 'story.upgrade_tools',
    MINE_DIAMOND: 'story.mine_diamond',
    DEFLECT_ARROW: 'story.deflect_arrow',
    SHINY_GEAR: 'story.shiny_gear',
    
    STRONGHOLD: 'story.follow_ender_eye',
    ENTER_END: 'story.enter_the_end',
    DRAGON_BREATH: 'end.dragon_breath',
    KILL_DRAGON: 'end.kill_dragon'
} as const;
export type TimelineType = typeof TimelineType[keyof typeof TimelineType];

export const MatchStatus = {
    IDLE: 'idle',
    COUNTING: 'counting',
    GENERATE: 'generate',
    READY: 'ready',
    RUNNING: 'running',
    DONE: 'done'
} as const;
export type MatchStatus = typeof MatchStatus[keyof typeof MatchStatus];