import { DatabaseOptions } from "./interfaces/DatabaseOptions"
import { ParsedSchema } from "./interfaces/DatabaseSchema"
import { SortFunction } from "./interfaces/SortFunction"

declare class DatabaseModule {
	public _schema: ParsedSchema
	public constructor(schema: ParsedSchema)
	public create(data: object): Promise<Document>
	public update(searchData: object, updateData: object): Promise<Document>
	public findOne(searchData: object): Promise<Document>
	public increment(
		search: object,
		key: string,
		value: number
	): Promise<Document>
	public decrement(
		search: object,
		key: string,
		value: number
	): Promise<Document>
	public leaderboard(sort: SortFunction): Promise<Array<Document>>
	public find(data: object): Promise<Array<Document>>
	public delete(data: object): Promise<boolean>
	public push(search: object, key: string, value: any): Promise<Document>
}

declare class Database {
	public options: DatabaseOptions
	public schemas: Map<string, ParsedSchema>
	public constructor(options: DatabaseOptions)
	public load(schema: string): Promise<DatabaseModule>
}
export { Database, DatabaseModule }
