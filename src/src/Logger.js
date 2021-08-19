"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const LoggerColors_1 = require("./LoggerColors");
class Logger {
    constructor(options) {
        this.name = options === null || options === void 0 ? void 0 : options.name;
    }
    /*
    [Date] [MemUsed][Name] [Type] <value>
    */
    base(type, value, color) {
        // const used_mem: number = process.memoryUsage().heapUsed / 1024 / 1024
        let outputBuilder = "";
        outputBuilder +=
            `[${new Date().toLocaleTimeString()}|${new Date().toLocaleDateString()}]${color}${LoggerColors_1.default.DIM}`.trim();
        outputBuilder += `[${Math.round(5 * 100) / 100} MB]${this.name ? `[${this.name}]` : ""}[${type}]:${LoggerColors_1.default.BRIGHT}`.trim();
        return console.log(outputBuilder, value, LoggerColors_1.default.RESET);
    }
    /**
     * basic Log - output green
     * @param value
     * @returns
     */
    log(value) {
        return this.base("INFO", value, LoggerColors_1.default.GREEN);
    }
    /**
     * Information logs - output cyan
     * @param value
     * @returns
     */
    info(value) {
        return this.base("INFO", value, LoggerColors_1.default.CYAN);
    }
    /**
     * Warning logs - output yellow
     * @param value
     * @returns
     */
    warn(value) {
        return this.base("WARN", value, LoggerColors_1.default.YELLOW);
    }
    /**
     * Error logs - output red
     * @param value
     * @returns
     */
    error(value) {
        return this.base("ERR", value instanceof Error ? value.message : value, LoggerColors_1.default.RED);
    }
}
exports.Logger = Logger;
console.log("Running logger!");
