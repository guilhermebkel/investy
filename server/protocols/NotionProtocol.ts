import { Client } from "@notionhq/client"

import { Awaited } from "@/server/protocols/UtilityProtocol"

export type RawDatabase = Awaited<ReturnType<Client["databases"]["retrieve"]>> & {
	cover: {
		url: string
	}
	title: [{ text: { content: string } }]
	url: string
	parent: {
		page_id: string
	}
}

export type RawPage = Awaited<ReturnType<Client["pages"]["retrieve"]>> & {
	properties: Record<string, {
		id: string
		type: string
		title: [{ text: { content: string } }]
	}>
}

export type RawProperty = {
	id: string
	name: string
	type: string
}

export type Property = RawProperty

export type Database = {
	id: string
	pageId: string
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

export type PropertyDetail = Property & {
	value: string
}

export type DatabaseRow = {
	page_id: string
	properties: PropertyDetail[]
}
