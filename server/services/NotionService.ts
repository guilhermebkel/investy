import { Client } from "@notionhq/client"

import { Database, RawDatabase, RawPage, DatabaseRow } from "@/server/protocols/NotionProtocol"

import NotionUtil from "@/server/utils/NotionUtil"

class NotionService {
	private readonly client: Client

	constructor (token: string) {
		this.client = new Client({ auth: token })
	}

	async searchDatabases (filter: string): Promise<Database[]> {
		const response = await this.client.search({
			filter: {
				property: "object",
				value: "database"
			},
			query: filter
		})

		const databases = response.results.map(database => NotionUtil.serializeDatabase(database as RawDatabase))

		return databases
	}

	async getDatabaseById (databaseId: string): Promise<Database | null> {
		try {
			const database = await this.client.databases.retrieve({ database_id: databaseId })
	
			return NotionUtil.serializeDatabase(database as RawDatabase)
		} catch (error) {
			return null
		}
	}

	async getDatabaseRows (databaseId: string): Promise<DatabaseRow[]> {
		const database = await this.client.databases.query({
			database_id: databaseId
		})
		
		const databaseRows = database.results.map(page => NotionUtil.serializeDatabaseRow(page as RawPage))

		return databaseRows
	}

	async updateDatabasePropertyDetail (propertyId: string, propertyPageId: string, value: string): Promise<void> {
		await this.client.pages.update({
			properties: [
				{
					id: propertyId,
					title: [{ type: "text", text: { content: value }}]
				}
			],
			page_id: propertyPageId
		})
	}
}

export default NotionService
