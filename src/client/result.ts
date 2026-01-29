import { mcsrjsError } from "../client/error.js";

export type Result<T> =
    | { ok: true; value: T }
    | { ok: false; error: mcsrjsError };

export async function safe<T>(
    result: Promise<T>
) : Promise<Result<T>> {
    try {
        return { ok: true, value: await result };
    } catch (e) {
        return {
            ok: false,
            error: e instanceof mcsrjsError ? e : new mcsrjsError(
            "Unknown Error", { cause: e }
        )};
    }
}

export async function unsafe<T>(
    result: Promise<Result<T>> | Result<T>
) : Promise<T> {
    const x = await result;
    if(x.ok) return x.value;
    else throw x.error;
}