import { Client } from "@notionhq/client"

import { Awaited } from "@/server/protocols/UtilityProtocol"

export type RawDatabase = Awaited<ReturnType<Client["databases"]["retrieve"]>> & {
	cover: {
		url: string
	}
	title: [{ text: { content: string } }]
	url: string
}

export type Database = {
	id: string
	cover: string
	icon: string
	title: string
	url: string
	properties: Array<{
		id: string
		name: string
		type: string
	}>
}