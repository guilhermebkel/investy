import { RawDatabase, RawPage, RawProperty, Database, DatabaseRow, Property } from "@/server/protocols/NotionProtocol"

class NotionUtil {
	serializeDatabase (database: RawDatabase): Database {
		const properties: Database["properties"] = Object.values(database.properties).map(property => ({
			id: property.id,
			name: property.name,
			type: property.type
		}))
	
		return {
			id: database.id,
			pageId: database.parent?.page_id,
			cover: database.cover?.url ?? null,
			icon: null,
			title: database.title?.[0]?.text?.content,
			url: database.url,
			properties
		}
	}

	serializeDatabaseRow (page: RawPage): DatabaseRow {
		const properties: DatabaseRow["properties"] = Object.entries(page.properties).map(([propertyName, propertyContent]) => {
			const propertyType = propertyContent?.type

			let value: string

			if (propertyType === "title") {
				value = propertyContent?.title?.[0]?.text?.content
			} else {
				value = propertyContent?.[propertyType]
			}

			return {
				...this.serializeProperty(propertyContent as any),
				name: propertyName,
				value
			}
		})

		return {
			page_id: page.id,
			properties
		}
	}

	private serializeProperty (property: RawProperty): Property {
		return {
			id: property.id,
			name: property.name,
			type: property.type
		}
	}
}

export default new NotionUtil()
