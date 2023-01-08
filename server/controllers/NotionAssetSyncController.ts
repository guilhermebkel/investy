import { ApiHandlerInput } from "@server/contracts/HttpContract"

import NotionLib from "@server/lib/NotionLib"

import IntegrationService from "@server/services/IntegrationService"
import AssetSyncSchedulerService from "@server/services/AssetSyncSchedulerService"

import AssetSyncRepository from "@server/repositories/AssetSyncRepository"

import { AssetSyncExtraData } from "@server/entities/AssetSyncEntity"

type NotionBody = {
	notion: {
		databaseId: string
		assetCodePropertyId: string
		assetPricePropertyId: string
	}
}

type UpdateParams = {
	id: string
}

class NotionAssetSyncController {
	async create ({ request, response, context }: ApiHandlerInput<{}, NotionBody, {}>): Promise<void> {
		const notionIntegration = await IntegrationService.getNotionIntegration(context.auth.userId)

		const notionAssetSync = await AssetSyncRepository.create({
			user_id: context.auth.userId,
			integration_id: notionIntegration.id,
			extra_data: {
				notion: {
					database_id: request.body.notion.databaseId,
					asset_code_property_id: request.body.notion.assetCodePropertyId,
					asset_price_property_id: request.body.notion.assetPricePropertyId
				}
			}
		})
		
		await AssetSyncSchedulerService.scheduleSync(notionAssetSync.id)

		return response.noContent()
	}

	async update ({ request, response, context }: ApiHandlerInput<{}, NotionBody, UpdateParams>): Promise<void> {
		const notionIntegration = await IntegrationService.getNotionIntegration(context.auth.userId)

		const notionAssetSync = await AssetSyncRepository.retrieveOne({
			id: request.params.id,
			user_id: context.auth.userId,
			integration_id: notionIntegration.id
		})
		
		if (!notionAssetSync) {
			return response.notFound()
		}

		const updatedNotionData = request.body.notion
		const currentNotionData = notionAssetSync.extra_data.notion

		const updatedExtraData: AssetSyncExtraData = {
			notion: {
				database_id: updatedNotionData.databaseId ?? currentNotionData.database_id,
				asset_code_property_id: updatedNotionData.assetCodePropertyId ?? currentNotionData.asset_code_property_id,
				asset_price_property_id: updatedNotionData.assetPricePropertyId ?? currentNotionData.asset_price_property_id
			}
		}

		await AssetSyncRepository.updateOneById(notionAssetSync.id, { extra_data: updatedExtraData })

		await AssetSyncSchedulerService.scheduleSync(notionAssetSync.id)

		return response.noContent()
	}

	async retrieveAll ({ response, context }: ApiHandlerInput<{}, {}, {}>): Promise<void> {
		const notionIntegration = await IntegrationService.getNotionIntegration(context.auth.userId)

		const notionAssetSyncs = await AssetSyncRepository.retrieveAll({
			user_id: context.auth.userId,
			integration_id: notionIntegration.id
		})

		const notion = new NotionLib(notionIntegration.token)

		const formattedAssetSyncs = await Promise.all(
			notionAssetSyncs.map(async notionAssetSync => {
				const database = await notion.getDatabase(notionAssetSync.extra_data.notion.database_id)

				const assetCodeColumn = database?.columns.find(({ id }) => id === notionAssetSync.extra_data.notion.asset_code_property_id)
				const assetPriceColumn = database?.columns.find(({ id }) => id === notionAssetSync.extra_data.notion.asset_price_property_id)

				return {
					id: notionAssetSync.id,
					database: database ? {
						id: database.id,
						name: database.title,
						cover: database.cover,
						icon: database.icon
					} : {},
					assetCode: assetCodeColumn ? {
						id: assetCodeColumn.id,
						name: assetCodeColumn.name,
						type: assetCodeColumn.type
					} : {},
					assetPrice: assetPriceColumn ? {
						id: assetPriceColumn.id,
						name: assetPriceColumn.name,
						type: assetPriceColumn.type
					} : {}
				}
			})
		)

		return response.ok(formattedAssetSyncs)
	}
}

export default new NotionAssetSyncController()
