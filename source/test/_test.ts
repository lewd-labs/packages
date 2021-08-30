/**
 * mock test for modules
 */

import { Logger } from "../logger"
import { MongooseProvider } from "../provider"
import ms from "ms"

var log = new Logger()

import mongoose from "mongoose"
const mongoTestModel = new mongoose.Schema(
	{
		/**
		 * @param {String} id
		 * @description The guild Id for this server
		 */
		id: {
			type: String,
			required: true,
		},
		/**
		 * @param {String} settings
		 * @description Settings for database provider
		 */
		settings: {
			type: Object,
			require: true,
			default: "!",
		},
	},
	{ minimize: false }
)
export = mongoose.model("_testSettingsModel", mongoTestModel)



try {
	log.info(`${ms(MongooseProvider.ping())}`)
	new MongooseProvider(mongoTestModel, "mongodb://localhost:27017/test")
} catch (error) {
	log.log(`[0]${error}`)
} finally {
	console.log("Test Finished!")
}