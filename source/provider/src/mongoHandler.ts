import Provider from "./provider"
import mongoose from "mongoose"
import { Logger } from "../../index"
let logger = new Logger()
const mongo = mongoose.connection

/**
 * Provider using the `Mongoose` library.
 * @param {Model} model - A Mongoose model.
 * @extends {Provider}
 */

export class MongooseProvider extends Provider {
	static ping() {
		const currentNano = process.hrtime()
		setTimeout(() => {}, 2000)
		const time = process.hrtime(currentNano)
		return (time[0] * 1e9 + time[1]) * 1e-6
	}
	constructor(model: any, mongooseConnectionString: string) {
		// info: https://masteringjs.io/tutorials/mongoose/connection-status
		if (mongo.readyState !== 1) {
			if (!mongooseConnectionString) {
				throw new Error(
					"There is no established connection with mongoose and a mongoose connection is required!"
				)
			}
		}
		try {
			mongoose.connect(mongooseConnectionString, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				bufferCommands: true,
				autoIndex: true,
				useFindAndModify: true,
				autoCreate: false,
				useCreateIndex: false,
				connectTimeoutMS: 15000,
				family: 4,
				poolSize: 5,
			})
			/**
			 * Mongoose events
			 */
			mongo.on("connecting", () => {
				logger.log(`Connecting to Mongoose Provider...`)
			})
			mongo.on("connected", () => {
				logger.log(`Mongoose Provider has connected to mongoose.`)
			})
			mongo.on("disconnecting", () => {
				logger.warn(`Mongoose Provider is disconnecting...`)
			})
			mongo.on("disconnected", () => {
				logger.error(`Mongoose Provider has disconnected.`)
			})
		} catch (err) {
			logger.error(err)
		}
		if (!model) {
			throw new Error(
				"No model was provided for the mongoose provider. This is required!"
			)
		}
		super()

		/**
		 * Mongoose model.
		 * @type {Model}
		 */
		this.model = model
	}

	/**
	 * Initializes the provider.
	 *
	 * ! note because the items set is "guild.settings" the mongoose model must use "settings"
	 *
	 * @returns {Promise<void>}
	 */
	async init(): Promise<void> {
		const guilds = await this.model.find()
		for (const i in guilds) {
			const guild = guilds[i]
			this.items.set(guild.id, guild.settings)
		}
	}

	/**
	 * Gets a value.
	 * @param {string} id - guildID.
	 * @param {string} key - The key to get.
	 * @param {any} [defaultValue] - Default value if not found or null.
	 * @returns {any}
	 */
	get(id: string, key: string, defaultValue: any): any {
		if (this.items.has(id)) {
			const value = this.items.get(id)[key]
			return value == null ? defaultValue : value
		}

		return defaultValue
	}

	/**
	 * Sets a value.
	 * @param {string} id - guildID.
	 * @param {string} key - The key to set.
	 * @param {any} value - The value.
	 * @returns {Promise<any>} - Mongoose query object|document
	 */
	async set(id: string, key: string, value: any): Promise<any> {
		const data = this.items.get(id) || {}
		data[key] = value
		this.items.set(id, data)

		const doc = await this.getDocument(id)
		doc.settings[key] = value
		doc.markModified("settings")
		return doc.save()
	}

	/**
	 * Deletes a value.
	 * @param {string} id - guildID.
	 * @param {string} key - The key to delete.
	 * @returns {Promise<any>} - Mongoose query object|document
	 */
	async delete(id: string, key: string): Promise<any> {
		const data = this.items.get(id) || {}
		delete data[key]

		const doc = await this.getDocument(id)
		delete doc.settings[key]
		doc.markModified("settings")
		return doc.save()
	}

	/**
	 * Removes a document.
	 * @param {string} id - GuildID.
	 * @returns {Promise<void>}
	 */
	async clear(id: string): Promise<void> {
		this.items.delete(id)
		const doc = await this.getDocument(id)
		if (doc) await doc.remove()
	}

	/**
	 * Gets a document by guildID.
	 * @param {string} id - guildID.
	 * @returns {Promise<any>} - Mongoose query object|document
	 */
	async getDocument(id: string): Promise<any> {
		const obj = await this.model.findOne({ id })
		if (!obj) {
			// eslint-disable-next-line new-cap
			const newDoc = await new this.model({ id, settings: {} }).save()
			return newDoc
		}

		return obj
	}
}
