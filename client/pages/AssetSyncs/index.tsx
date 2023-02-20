import { ReactElement, useState } from "react"

import ApplicationLayout from "@client/components/ApplicationLayout"

import Head from "@client/components/Head"
import Table from "@client/components/Table"
import Chip from "@client/components/Chip"

import { api } from "@client/services/api"

import { routeConfig } from "@client/config/route"

import useDidMount from "@client/hooks/useDidMount"

type NotionAssetSync = {
	id: string
	lastSyncAt: string
	lastSyncStatus: "success" | "error"
	lastSyncError?: Record<string, unknown>
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

	const renderLastSyncStatus = (notionAssetSync: NotionAssetSync) => {
		const statusChipMap: Record<NotionAssetSync["lastSyncStatus"] | "default", ReactElement> = {
			success: (
				<Chip
					variant="success"
				>
					Success
				</Chip>
			),
			error: (
				<Chip
					variant="error"
				>
					Error
				</Chip>
			),
			default: (
				<Chip
					className="bg-[#F3F4F6] text-[#1F2937]"
				>
					Unknown
				</Chip>
			)
		}

		return (
			<>
				{statusChipMap[notionAssetSync.lastSyncStatus] || statusChipMap.default}
			</>
		)
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
					<Table.Column>
						ID
					</Table.Column>

					<Table.Column>
						Last Sync
					</Table.Column>

					<Table.Column>
						Database
					</Table.Column>

					<Table.Column>
						Asset Code
					</Table.Column>

					<Table.Column>
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
								{renderLastSyncStatus(notionAssetSync)}
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
