import type { LoggerOptions } from "../typings/utilTypes";
export declare class Logger {
    private readonly name?;
    constructor(options?: LoggerOptions);
    private base;
    /**
     * basic Log - output green
     * @param value
     * @returns
     */
    log(value: string): void;
    /**
     * Information logs - output cyan
     * @param value
     * @returns
     */
    info(value: string): void;
    /**
     * Warning logs - output yellow
     * @param value
     * @returns
     */
    warn(value: string): void;
    /**
     * Error logs - output red
     * @param value
     * @returns
     */
    error(value: string | Error): void;
}
