import { MatchInfo, Timeline, TimelineType } from '../types/match.js';
import { RankTier } from '../types/other.js';
import { VersusData, VersusStats } from '../types/stats.js';
const rankTiers: RankTier[] = [
    { name: "Coal I", min: 0, max: 399 },
    { name: "Coal II", min: 400, max: 499 },
    { name: "Coal III", min: 500, max: 599 },

    { name: "Iron I", min: 600, max: 699 },
    { name: "Iron II", min: 700, max: 799 },
    { name: "Iron III", min: 800, max: 899 },

    { name: "Gold I", min: 900, max: 999 },
    { name: "Gold II", min: 1000, max: 1099 },
    { name: "Gold III", min: 1100, max: 1199 },

    { name: "Emerald I", min: 1200, max: 1299 },
    { name: "Emerald II", min: 1300, max: 1399 },
    { name: "Emerald III", min: 1400, max: 1499 },

    { name: "Diamond I", min: 1500, max: 1649 },
    { name: "Diamond II", min: 1650, max: 1799 },
    { name: "Diamond III", min: 1800, max: 1999 },

    { name: "Netherite", min: 2000, max: Infinity },
];

export function eloToRank(
    elo: number | null
) : string {
    if (!elo || elo < 0) return "Unknown";

    const rank = rankTiers.find(r => elo >= r.min && elo <= r.max);
    return rank ? rank.name : "Unknown";
}

export function versusStats(
    data: VersusData
) : VersusStats{

    var stats: VersusStats = {};
    stats[data.players[0].nickname] = {
        ranked: data.results.ranked[data.players[0].uuid],
        casual: data.results.casual[data.players[0].uuid],
        change: data.changes[0]
    };

    stats[data.players[1].nickname] = {
        ranked: data.results.ranked[data.players[1].uuid],
        casual: data.results.casual[data.players[1].uuid],
        change: data.changes[0]
    };
    
    return stats;
}

export function formatTime(
    time: number
) : string {
    const totalSeconds = Math.floor(time / 1000);
    const ms = Math.floor((time % 1000) / 10); // 2-digit ms

    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    if(hours > 0) {
        return `${hours}:${minutes}:${seconds}.${ms.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${seconds}.${ms.toString().padStart(2, "0")}`;
}

export function formatDate(
    date: number
) : string {
    var d = new Date(date * 1000);
    const formatted = d.toLocaleString("en-GB", {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });
    return formatted;
}

export function epoch(
    date: Date
) : number {
    return date.getTime() / 1000;
}

export function timeOf(
    timelines: Timeline[], type: TimelineType
) : number | undefined {
    return timelines.find(t => t.type == type)?.time;
}

/*
    matchList does need to be sorted by date descending
*/
export function findByDate(
    matchList: MatchInfo[],
    date: number
) { 
    if (matchList.length === 0) return null;

    var l = 0;
    var r = matchList.length - 1;
    
    while (l <= r) {
        const mid = (l + r) >> 1;
        const midDate = matchList[mid].date;

        if (midDate === date) {
            return matchList[mid];
        }

        if (midDate > date) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }

    if (l >= matchList.length) return matchList[matchList.length - 1];
    if (r < 0) return matchList[0];

    const newer = matchList[r];
    const older = matchList[l];

    return Math.abs(newer.date - date) <= Math.abs(older.date - date) ? newer : older;
}

/*
    same as findByDate but is reusable for any type of array
    accepts only numeric keys
    has to be sorted ascending!! (so if its by date and the matchlist is from users.matchList, you need to reverse list)
*/
export function findByKey(
    matchList: MatchInfo[],
    key: {[K in keyof MatchInfo]: MatchInfo[K] extends number ? K : never
        }[keyof MatchInfo],
    value: number
) {
    if (matchList.length === 0) return null;

    var l = 0;
    var r = matchList.length - 1;
    
    while (l <= r) {
        const mid = (l + r) >> 1;
        const midValue = matchList[mid][key];

        if (midValue === value) {
            return matchList[mid];
        }

        if (midValue < value) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }

    if (l >= matchList.length) return matchList[matchList.length - 1];
    if (r < 0) return matchList[0];

    const newer = matchList[r];
    const older = matchList[l];

    return Math.abs(newer[key] - value) <= Math.abs(older[key] - value) ? newer : older;
}