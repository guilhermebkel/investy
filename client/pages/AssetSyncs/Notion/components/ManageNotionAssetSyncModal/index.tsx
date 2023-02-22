import { FC, useState } from "react"

import Modal from "@client/components/Modal"
import SelectInput from "@client/components/SelectInput"
import InputLabel from "@client/components/InputLabel"
import Divider from "@client/components/Divider"

import { NotionAssetSync } from "@client/protocols/asset-sync"

type Data = {
	databaseId: string
	assetCodePropertyId: string
	assetPricePropertyId: string
}

type ManageNotionAssetSyncModalProps = {
	data?: Data
	notionData?: NotionAssetSync["notion"]
	title: string
	onSave?: (data: Data) => Promise<void>
}

const ManageNotionAssetSyncModal: FC<ManageNotionAssetSyncModalProps> = (props) => {
	const {
		notionData,
		data,
		title,
		children,
		onSave
	} = props

	const [updatedData, setUpdatedData] = useState<Data>(data)

	const handleChange = <Field extends keyof Data>(field: Field, value: Data[Field]) => {
		setUpdatedData(lastState => ({
			...lastState,
			[field]: value
		}))
	}

	const handleSave = async () => {
		await onSave?.(updatedData)
	}

	return (
		<Modal
			title={title}
			onConfirm={handleSave}
		>
			<Modal.Content>
				<div>
					<InputLabel
						inputName="databaseId"
					>
						Database
					</InputLabel>
					<SelectInput
						fullWidth
						name="databaseId"
						value={updatedData.databaseId}
						onValueChange={value => handleChange("databaseId", value)}
					>
						<SelectInput.Option
							value={notionData?.database?.id}
						>
							{notionData?.database?.name}
						</SelectInput.Option>
					</SelectInput>
				</div>

				<Divider orientation="horizontal" size="sm" />

				<div>
					<InputLabel
						inputName="assetCodePropertyId"
					>
						Asset Code
					</InputLabel>
					<SelectInput
						fullWidth
						name="assetCodePropertyId"
						value={updatedData.assetCodePropertyId}
						onValueChange={value => handleChange("assetCodePropertyId", value)}
					>
						<SelectInput.Option
							value={notionData?.assetCode?.id}
						>
							{notionData?.assetCode?.name}
						</SelectInput.Option>
					</SelectInput>
				</div>

				<Divider orientation="horizontal" size="sm" />

				<div>
					<InputLabel
						inputName="assetPricePropertyId"
					>
						Asset Price
					</InputLabel>
					<SelectInput
						fullWidth
						name="assetPricePropertyId"
						value={updatedData.assetPricePropertyId}
						onValueChange={value => handleChange("assetPricePropertyId", value)}
					>
						<SelectInput.Option
							value={notionData?.assetPrice?.id}
						>
							{notionData?.assetPrice?.name}
						</SelectInput.Option>
					</SelectInput>
				</div>

				<Divider orientation="horizontal" size="xs" />
			</Modal.Content>

			<Modal.Trigger>
				{children}
			</Modal.Trigger>
		</Modal>
	)
}

export default ManageNotionAssetSyncModal
