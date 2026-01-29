import { fetchJSON } from "./fetch.js";
import { FetchOptions, ClientOptions } from "../types/options.js";

export class Client {
    protected readonly baseUrl: string;
    protected readonly fetchOptions?: FetchOptions;
    protected readonly requestQueue?: RequestQueue;
    protected readonly apiKey?: string;
    protected readonly privateKey?: string;
    protected readonly _cache: Map<string, Promise<any>>;

    constructor(
        options: ClientOptions = {}
    ) {
        this.baseUrl = options.baseUrl ?? 'https://mcsrranked.com/api'
        this.fetchOptions = options.fetchOptions;
        this.apiKey = options.apiKey;
        this.privateKey = options.privateKey;
        this._cache = new Map<string, Promise<any>>();
        if(options.rateLimit) {
            const ms = (600 / options.rateLimit) * 1000;
            this.requestQueue = new RequestQueue(ms);
        }
    }

    protected url(
        path: string
    ) : string {
        return `${this.baseUrl}${path}`;
    }

    public request<T>(
        path: string
    ) : Promise<T> {
        const req = () => fetchJSON<T>(
            this.url(path),
            this.fetchOptions
        );

        if(this.requestQueue) {
            return this.requestQueue.enqueue(req);
        }

        return req();
    }

    protected cache<A, T>(
        id: string,
        args: A,
        fn: () => Promise<T>
    ) {
        const key = `${id}:${JSON.stringify(args)}`;

        const cached = this._cache.get(key);
        if(cached) return cached;

        const promise = fn().catch(e => {
            this._cache.delete(key);
            throw e;
        });

        this._cache.set(key, promise);
        return promise;
    }
}

class RequestQueue {
    private mem: (() => Promise<any>)[] = [];
    private alive = false;

    constructor(
        private ms: number
    ) {}

    enqueue<T>(
        fn: () => Promise<T>
    ) : Promise<T> {
        return new Promise<T>(
            (resolve, reject) => {
                this.mem.push(
                    () => fn().then(resolve).catch(reject)
                );
                this.run();
            }
        )
    } 

    private async run(
    ) {
        if(this.alive) return;
        this.alive = true;

        while(this.mem.length > 0) {
            const fn = this.mem.shift()!;
            await fn();
            if(this.ms > 0) {
                await new Promise(
                    r => setTimeout(r, this.ms)
                );
            }
        }

        this.alive = false;
    }
}