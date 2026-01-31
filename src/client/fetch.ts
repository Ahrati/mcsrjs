import { mcsrjsError } from "./error.js";
import { EndpointParameterOptions, FetchOptions } from "../types/options.js";

const sleep = (
    ms: number
) => new Promise(res => setTimeout(res, ms));

export async function fetchJSON<T>(
    url: string,
    options: FetchOptions = {}
) : Promise<T> {
    const {
        retries = 2,
        retryDelay = 250,
        signal
    } = options;
    let lastError: unknown;

    for(let attempt = 0; attempt <= retries; attempt++) {
        try {
            const res = await fetch(url, { signal });

            if(!res.ok) {
                throw new mcsrjsError(
                    `Request failed: ${res.status}`,
                    {
                        status: res.status,
                        endpoint: url
                    });
            }

            const json = await res.json();
            if(json == null) {
                throw new mcsrjsError(
                    'API returned empty response',
                    {
                        endpoint: url
                    });
            }

            if(json.data) {
                return json.data as T;
            } else {
                throw new mcsrjsError(
                    'API failed to return a data block',
                    {
                        endpoint: url
                    });
            }
            
        } catch(e) {
            lastError = e;

            if(e instanceof DOMException && e.name === "AbortError") {
                throw e;
            }

            if(attempt < retries) {
                await sleep(retryDelay * (attempt + 1));
            }
        }
    }

    throw lastError instanceof Error ? lastError : new mcsrjsError("Unknown fetch Error");
}

export function buildParams( params : any ) : URLSearchParams {
    const _params = new URLSearchParams();
    for(let key in params) {
        if(params[key] !== undefined) _params.append(key, String(params[key]));
    }
    return _params
}

export function setParams( keys: (keyof EndpointParameterOptions)[], options: EndpointParameterOptions ) : string {
    const params: Partial<EndpointParameterOptions> = {};
    for(let key of keys) {
        params[key] = options[key];
    }

    return buildParams(params).toString();
}

export function buildHeader() {

}