import { ReactElement, useState } from "react"
import { MoreVertical as OptionsIcon } from "lucide-react"

import ApplicationLayout from "@client/components/ApplicationLayout"

import Head from "@client/components/Head"
import Table from "@client/components/Table"
import Chip from "@client/components/Chip"
import IconButton from "@client/components/IconButton"
import Dropdown from "@client/components/Dropdown"
import Loading from "@client/components/Loading"
import Link from "@client/components/Link"

import { api } from "@client/services/api"

import { routeConfig } from "@client/config/route"

import useDidMount from "@client/hooks/useDidMount"

import { formatHumanDate } from "@client/utils/date"

type NotionAssetSync = {
	id: string
	lastSyncAt: string
	lastSyncStatus: "success" | "error" | "processing"
	lastSyncError?: Record<string, unknown>
	notion?: {
		database?: {
			id: string
			url: string
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
}

const NotionAssetSyncs = () => {
	const [notionAssetSyncs, setNotionAssetSyncs] = useState<NotionAssetSync[]>([])
	const [loading, setLoading] = useState(true)

	const loadData = async () => {
		const response = await api.get<NotionAssetSync[]>("/asset-syncs/notion")

		setNotionAssetSyncs(response.data)

		setLoading(false)
	}

	const renderLastSyncInfo = (notionAssetSync: NotionAssetSync) => {
		const statusChipMap: Record<NotionAssetSync["lastSyncStatus"] | "default", ReactElement> = {
			success: (
				<Chip
					variant="success"
				>
					Success
				</Chip>
			),
			processing: (
				<Chip
					variant="warning"
				>
					Processing
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

				<Chip
					className="bg-[#F3F4F6] text-[#646464] font-normal"
				>
					{formatHumanDate(notionAssetSync.lastSyncAt)}
				</Chip>
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
					title: `Investy | ${routeConfig.notionAssetSyncs.title}`,
				}}
			/>

			<Loading
				loading={loading}
			>
				<Table>
					<Table.Head>
						<Table.Column>
							Database
						</Table.Column>

						<Table.Column>
							Asset Code
						</Table.Column>

						<Table.Column>
							Asset Price
						</Table.Column>

						<Table.Column>
							Last Sync
						</Table.Column>

						<Table.Column />
					</Table.Head>

					<Table.Body>
						{notionAssetSyncs.map(notionAssetSync => (
							<Table.Row
								key={notionAssetSync.id}
							>
								<Table.Column>
									<Link
										href={notionAssetSync.notion?.database?.url}
										target="_blank"
										rel="noreferrer"
									>
										{notionAssetSync.notion?.database?.name}
									</Link>
								</Table.Column>
								
								<Table.Column>
									{notionAssetSync.notion?.assetCode?.name}
								</Table.Column>

								<Table.Column>
									{notionAssetSync.notion?.assetPrice?.name}
								</Table.Column>

								<Table.Column>
									{renderLastSyncInfo(notionAssetSync)}
								</Table.Column>

								<Table.Column
									className="text-right"
								>
									<Dropdown>
										<IconButton>
											<OptionsIcon />
										</IconButton>
									</Dropdown>
								</Table.Column>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</Loading>
		</ApplicationLayout>
	)
}

export default NotionAssetSyncs
