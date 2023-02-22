import { FC, useState } from "react"
import _ from "lodash"

import { NotionAssetSync } from "@client/protocols/asset-sync"

import Modal from "@client/components/Modal"

type ManageNotionAssetSyncModalProps = {
	notionData?: NotionAssetSync["notion"]
	title: string
}

const ManageNotionAssetSyncModal: FC<ManageNotionAssetSyncModalProps> = (props) => {
	const { notionData, title, children } = props

	const [data, setData] = useState<NotionAssetSync["notion"]>(_.cloneDeep(notionData))

	return (
		<Modal
			title={title}
		>
			<Modal.Content>
				{data?.database?.name}
			</Modal.Content>

			<Modal.Trigger>
				{children}
			</Modal.Trigger>
		</Modal>
	)
}

export default ManageNotionAssetSyncModal
