import { Client } from "@notionhq/client"

class NotionService {
	private readonly client: Client

	constructor (token: string) {
		this.client = new Client({ auth: token })
	}

	async searchDatabase (filter: string) {
		return await this.client.search({
			filter: {
				property: "object",
				value: "database"
			},
			query: filter
		})
	}
}

export default NotionService
