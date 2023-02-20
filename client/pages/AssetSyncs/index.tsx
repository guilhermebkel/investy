import { useState } from "react"

import ApplicationLayout from "@client/components/ApplicationLayout"

import Head from "@client/components/Head"
import Table from "@client/components/Table"

import { api } from "@client/services/api"

import { routeConfig } from "@client/config/route"

import useDidMount from "@client/hooks/useDidMount"

type NotionAssetSync = {
	id: string
	database?: {
		id: string
		name: string
		cover: string
		icon: string
	}
	assetCode?: {
		id: string
		name: string
		type: string
	}
	assetPrice?: {
		id: string
		name: string
		type: string
	}
}

const AssetSyncs = () => {
	const [notionAssetSyncs, setNotionAssetSyncs] = useState<NotionAssetSync[]>([])

	const loadData = async () => {
		const response = await api.get<NotionAssetSync[]>("/asset-syncs/notion")

		setNotionAssetSyncs(response.data)
	}

	useDidMount(() => {
		loadData()
	})

	return (
		<ApplicationLayout>
			<Head
				page={{
					title: `Investy | ${routeConfig.assetSyncs.title}`,
				}}
			/>

			<Table.Container>
				<Table.Head>
					<Table.Column scope="col" >
						ID
					</Table.Column>
					<Table.Column scope="col" >
						Database
					</Table.Column>
					<Table.Column scope="col" >
						Asset Code
					</Table.Column>
					<Table.Column scope="col" >
						Asset Price
					</Table.Column>
				</Table.Head>

				<Table.Body>
					{notionAssetSyncs.map(notionAssetSync => (
						<Table.Row
							key={notionAssetSync.id}
						>
							<Table.Column>
								{notionAssetSync.id}
							</Table.Column>

							<Table.Column>
								{notionAssetSync.database?.name}
							</Table.Column>
							
							<Table.Column>
								{notionAssetSync.assetCode?.name}
							</Table.Column>

							<Table.Column>
								{notionAssetSync.assetPrice?.name}
							</Table.Column>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Container>
		</ApplicationLayout>
	)
}

export default AssetSyncs
