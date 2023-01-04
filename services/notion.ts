import { Client } from "@notionhq/client"

import { Database, RawDatabase } from "@/protocols/notion"

import NotionUtil from "@/utils/notion"

class NotionService {
	private readonly client: Client

	constructor (token: string) {
		this.client = new Client({ auth: token })
	}

	async searchDatabase (filter: string): Promise<Database[]> {
		const response = await this.client.search({
			filter: {
				property: "object",
				value: "database"
			},
			query: filter
		})

		const databases = response.results.map(database => (
			NotionUtil.serializeDatabase(database as RawDatabase)
		))

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
}

export default NotionService
