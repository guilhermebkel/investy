import { RawDatabase, Database } from "@/protocols/notion"

class NotionUtil {
	serializeDatabase (database: RawDatabase): Database {
		const properties: Database["properties"] = Object.values(database.properties).map(property => ({
			id: property.id,
			name: property.name,
			type: property.type
		}))

		return {
			id: database.id,
			cover: database.cover?.url ?? null,
			icon: null,
			title: database.title?.[0]?.text?.content,
			url: database.url,
			properties
		}
	}
}

export default new NotionUtil()
