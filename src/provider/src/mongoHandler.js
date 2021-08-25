"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseProvider = void 0;
const provider_1 = __importDefault(require("./provider"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("../../index");
let logger = new index_1.Logger();
/**
 * Provider using the `Mongoose` library.
 * @param {Model} model - A Mongoose model.
 * @extends {Provider}
 */
class MongooseProvider extends provider_1.default {
    constructor(model, mongooseConnectionString) {
        // info: https://masteringjs.io/tutorials/mongoose/connection-status
        if (mongoose_1.default.connection.readyState !== 1) {
            if (!mongooseConnectionString) {
                throw new Error("There is no established connection with mongoose and a mongoose connection is required!");
            }
        }
        try {
            mongoose_1.default.connect(mongooseConnectionString, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                bufferCommands: true,
                autoIndex: true,
                useFindAndModify: true,
                autoCreate: false,
                useCreateIndex: false,
            });
            /**
             * Mongoose events
             */
            mongoose_1.default.connection.on("connecting", () => {
                logger.log(`Connecting to Mongoose Provider...`);
            });
            mongoose_1.default.connection.on("connected", () => {
                logger.log(`Mongoose Provider has connected to mongoose.`);
            });
            mongoose_1.default.connection.on("disconnecting", () => {
                logger.warn(`Mongoose Provider is disconnecting...`);
            });
            mongoose_1.default.connection.on("disconnected", () => {
                logger.error(`Mongoose Provider has disconnected.`);
            });
        }
        catch (err) {
            logger.error(err);
        }
        if (!model) {
            throw new Error("No model was provided for the mongoose provider. This is required!");
        }
        super();
        /**
         * Mongoose model.
         * @type {Model}
         */
        this.model = model;
    }
    /**
     * Initializes the provider.
     *
     * ! note because the items set is "guild.settings" the mongoose model must use "settings"
     *
     * @returns {Promise<void>}
     */
    async init() {
        const guilds = await this.model.find();
        for (const i in guilds) {
            const guild = guilds[i];
            this.items.set(guild.id, guild.settings);
        }
    }
    /**
     * Gets a value.
     * @param {string} id - guildID.
     * @param {string} key - The key to get.
     * @param {any} [defaultValue] - Default value if not found or null.
     * @returns {any}
     */
    get(id, key, defaultValue) {
        if (this.items.has(id)) {
            const value = this.items.get(id)[key];
            return value == null ? defaultValue : value;
        }
        return defaultValue;
    }
    /**
     * Sets a value.
     * @param {string} id - guildID.
     * @param {string} key - The key to set.
     * @param {any} value - The value.
     * @returns {Promise<any>} - Mongoose query object|document
     */
    async set(id, key, value) {
        const data = this.items.get(id) || {};
        data[key] = value;
        this.items.set(id, data);
        const doc = await this.getDocument(id);
        doc.settings[key] = value;
        doc.markModified("settings");
        return doc.save();
    }
    /**
     * Deletes a value.
     * @param {string} id - guildID.
     * @param {string} key - The key to delete.
     * @returns {Promise<any>} - Mongoose query object|document
     */
    async delete(id, key) {
        const data = this.items.get(id) || {};
        delete data[key];
        const doc = await this.getDocument(id);
        delete doc.settings[key];
        doc.markModified("settings");
        return doc.save();
    }
    /**
     * Removes a document.
     * @param {string} id - GuildID.
     * @returns {Promise<void>}
     */
    async clear(id) {
        this.items.delete(id);
        const doc = await this.getDocument(id);
        if (doc)
            await doc.remove();
    }
    /**
     * Gets a document by guildID.
     * @param {string} id - guildID.
     * @returns {Promise<any>} - Mongoose query object|document
     */
    async getDocument(id) {
        const obj = await this.model.findOne({ id });
        if (!obj) {
            // eslint-disable-next-line new-cap
            const newDoc = await new this.model({ id, settings: {} }).save();
            return newDoc;
        }
        return obj;
    }
}
exports.MongooseProvider = MongooseProvider;
//# sourceMappingURL=mongoHandler.js.map