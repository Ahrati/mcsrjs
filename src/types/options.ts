import { MatchID, MatchType } from "./match.js";

export interface FetchOptions {
    retries?: number;
    retryDelay?: number;
    signal?: AbortSignal;
}

export interface ClientOptions {
    baseUrl?: string;
    fetchOptions?: FetchOptions;
    rateLimit?: number; // requests per 10 minutes !!
    apiKey?: string; // not implemented
    privateKey?: string; // not implemented
}

export interface EndpointParameterOptions {
    before?: MatchID;
    after?: MatchID;
    sort?: "newest" | "oldest" | "fastest" | "slowest";
    count?: number;
    type?: MatchType | null;
    season?: number;
    country?: string;
    excludedecay?: boolean;
    includedecay?: boolean;
    tag?: string;
    predicted?: any;
    distinct?: any;
}