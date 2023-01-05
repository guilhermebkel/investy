import { Client } from "@notionhq/client"

import { Database, RawDatabase } from "@/server/protocols/NotionProtocol"

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

	async getDatabasePropertyValues (databaseId: string, propertyId: string): Promise<any> {
		return await this.client.pages.retrieve({
			page_id: databaseId
		})
		return await this.client.pages.properties.retrieve({
			page_id: databaseId,
			property_id: propertyId
		})
	}
}

export default NotionService
