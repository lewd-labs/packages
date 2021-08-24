"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const DatabaseModule_1 = require("./DatabaseModule");
const index_1 = require("../index");
const logger = new index_1.Logger();
// database manager
class Database {
    options;
    schemas = new Map();
    constructor(options) {
        // set config
        this.options = options;
        // get loadable schemas
        options.schemas.map((value) => {
            this.schemas.set(value.name, {
                name: value.name,
                data: mongoose_1.default.model(value.name, new mongoose_1.default.Schema(value.data)),
            });
        });
        mongoose_1.default.connect(options.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: true,
            autoIndex: true,
            useFindAndModify: true,
            autoCreate: false,
            useCreateIndex: false,
        });
        logger.log(`DataBase is online and connected!`);
    }
    async load(schema) {
        return new DatabaseModule_1.DatabaseModule(this.schemas.get(schema));
    }
}
exports.Database = Database;
//# sourceMappingURL=Database.js.map