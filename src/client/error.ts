export class mcsrjsError extends Error {
    readonly status?: number;
    readonly endpoint?: string;

    constructor(
        message: string,
        options?: {
            status?: number;
            endpoint?: string;
            cause?: unknown;
        }
    ) {
        super(message);
        this.name = "mcsrjs.error";
        this.status = options?.status;
        this.endpoint = options?.endpoint;
        this.cause = options?.cause;
    }
}