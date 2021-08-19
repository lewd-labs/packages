"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const error_1 = __importDefault(require("./util/error"));
class Provider {
    constructor() {
        /**
         * Cached entries.
         * @type {Collection<string, Object>}
         */
        this.items = new discord_js_1.Collection();
    }
    /**
     * Initializes the provider.
     * @abstract
     * @returns {any}
     */
    init() {
        throw new error_1.default("NOT_IMPLEMENTED", this.constructor.name, "init");
    }
    /**
     * Gets a value.
     * @abstract
     * @param {string} id - ID of entry.
     * @param {string} key - The key to get.
     * @param {any} [defaultValue] - Default value if not found or null.
     * @returns {any}
     */
    get(id, key, defaultValue) {
        throw new error_1.default("NOT_IMPLEMENTED", this.constructor.name, "get");
        id;
        key;
        defaultValue;
    }
    /**
     * Sets a value.
     * @abstract
     * @param {string} id - ID of entry.
     * @param {string} key - The key to set.
     * @param {any} value - The value.
     * @returns {any}
     */
    async set(id, key, value) {
        throw new error_1.default("NOT_IMPLEMENTED", this.constructor.name, "set");
        id;
        key;
        value;
    }
    /**
     * Deletes a value.
     * @abstract
     * @param {string} id - ID of entry.
     * @param {string} key - The key to delete.
     * @returns {any}
     */
    async delete(id, key) {
        throw new error_1.default("NOT_IMPLEMENTED", this.constructor.name, "delete");
        id;
        key;
    }
    /**
     * Clears an entry.
     * @abstract
     * @param {string} id - ID of entry.
     * @returns {any}
     */
    async clear(id) {
        throw new error_1.default("NOT_IMPLEMENTED", this.constructor.name, "clear");
        id;
    }
}
exports.default = Provider;
//# sourceMappingURL=provider.js.map