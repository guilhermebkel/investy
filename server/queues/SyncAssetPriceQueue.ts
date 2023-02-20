import { QueueHandler, QueueName, QueuePayload } from "@server/contracts/QueueContract"

import AssetSyncRepository from "@server/repositories/AssetSyncRepository"
import IntegrationRepository from "@server/repositories/IntegrationRepository"

import AssetSyncSchedulerService from "@server/services/AssetSyncSchedulerService"

import NotionLib from "@server/lib/NotionLib"
import StatusInvestLib from "@server/lib/StatusInvestLib"

import NumberUtil from "@server/utils/NumberUtil"
import ErrorSerializationUtil from "@server/utils/ErrorSerializationUtil"

class SyncAssetPriceQueue implements QueueHandler {
	name: QueueName = "SyncAssetPrice"

	async handle (payload: QueuePayload["SyncAssetPrice"]): Promise<void> {
		const { assetSyncId } = payload

		const assetSync = await AssetSyncRepository.retrieveOneById(assetSyncId)

		if (!assetSync) {
			return
		}

		const integration = await IntegrationRepository.retrieveOneById(assetSync.integration_id)

		if (!integration) {
			return
		}

		const notionData = assetSync.extra_data.notion

		const notion = new NotionLib(integration.token)

		const databaseRows = await notion.getDatabaseRows(notionData.database_id)

		await Promise.all(
			databaseRows.map(async row => {
				const assetCodeColumn = row.columns.find(({ id }) => id === notionData.asset_code_property_id)
				const assetCode = assetCodeColumn.value

				const assetInfo = await StatusInvestLib.getAsset(assetCode)
				const formattedAssetPrice = NumberUtil.toDecimal(assetInfo.priceInCents)

				await notion.updateDatabaseRow(notionData.asset_price_property_id, row.id, formattedAssetPrice)
			})
		)
	}

	async onCompleted (payload: QueuePayload["SyncAssetPrice"]): Promise<void> {
		const { assetSyncId } = payload

		await AssetSyncRepository.updateOneById(assetSyncId, {
			last_sync_at: new Date(),
			last_sync_status: "success"
		})

		await AssetSyncSchedulerService.scheduleSync(assetSyncId)
	}

	async onError (payload: QueuePayload["SyncAssetPrice"], error: Error): Promise<void> {
		const { assetSyncId } = payload

		await AssetSyncRepository.updateOneById(assetSyncId, {
			last_sync_at: new Date(),
			last_sync_status: "error",
			last_sync_error: ErrorSerializationUtil.serialize(error)
		})

		await AssetSyncSchedulerService.scheduleSync(assetSyncId)
	}
}

export default new SyncAssetPriceQueue()
