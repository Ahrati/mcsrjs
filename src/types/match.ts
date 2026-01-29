import { UserProfile } from "./user.js";

export type MatchID = number;

export interface MatchInfo {
    id: MatchID;
    type: MatchType | null;
    seed: MatchSeed;
    category: string | null;
    gameMode: string;
    players: UserProfile[];
    spectators: UserProfile[];
    result: {uuid: string | null; time: number};
    forfeited: boolean;
    decayed: boolean;
    rank: {season: number | null; allTime: number | null};
    vod: {uuid: string, url: string; startsAt: number}[];
    changes: {uuid: string; change: number | null; eloRate: number | null}[];
    beginner: boolean;
    botSource: null; // not sure
    date: number;
    seedType: string | null;
    bastionType: string | null;
    tag: string | null;
    completions: Completion[];
    timelines: Timeline[];
    replayExist: boolean;
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
    id: MatchID | null;
    overworld: string | null;
    nether: string | null;
    endTowers: number[];
    variations: string[];
}

export const MatchType = {
    CASUAL: 1,
    RANKED: 2,
    PRIVATE: 3,
    EVENT: 4,
    ALL: null
} as const;
export type MatchType = typeof MatchType[keyof typeof MatchType];

export const TimelineType = {
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
    KILL_DRAGON: 'end.kill_dragon',
} as const;
export type TimelineType = typeof TimelineType[keyof typeof TimelineType];