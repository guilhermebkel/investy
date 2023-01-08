import { ApiHandlerInput } from "@server/contracts/HttpContract"

import NotionLib from "@server/lib/NotionLib"

import IntegrationService from "@server/services/IntegrationService"

import AssetSyncRepository from "@server/repositories/AssetSyncRepository"

import { AssetSyncExtraData } from "@server/entities/AssetSyncEntity"

type NotionBody = {
	notion: {
		assetCode: {
			databaseId: string
			propertyId: string
		}
		assetPrice: {
			databaseId: string
			propertyId: string
		}
	}
}

type UpdateParams = {
	id: string
}

class NotionAssetSyncController {
	async create ({ request, response, context }: ApiHandlerInput<{}, NotionBody, {}>): Promise<void> {
		const notionIntegration = await IntegrationService.getNotionIntegration(context.auth.userId)

		await AssetSyncRepository.create({
			user_id: context.auth.userId,
			integration_id: notionIntegration.id,
			extra_data: {
				notion: {
					asset_code: {
						database_id: request.body.notion.assetCode.databaseId,
						property_id: request.body.notion.assetCode.propertyId
					},
					asset_price: {
						database_id: request.body.notion.assetPrice.databaseId,
						property_id: request.body.notion.assetPrice.propertyId
					}
				}
			}
		})

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
				asset_code: {
					database_id: updatedNotionData.assetCode.databaseId ?? currentNotionData.asset_code.database_id,
					property_id: updatedNotionData.assetCode.propertyId ?? currentNotionData.asset_code.property_id
				},
				asset_price: {
					database_id: updatedNotionData.assetPrice.databaseId ?? currentNotionData.asset_price.database_id,
					property_id: updatedNotionData.assetPrice.propertyId ?? currentNotionData.asset_price.property_id
				}
			}
		}

		await AssetSyncRepository.update({ id: notionAssetSync.id }, {
			extra_data: updatedExtraData
		})

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
				const [assetCodeDatabase, assetPriceDatabase] = await Promise.all([
					notion.getDatabase(notionAssetSync.extra_data.notion.asset_code.database_id),
					notion.getDatabase(notionAssetSync.extra_data.notion.asset_price.database_id)
				])

				const assetCodeColumn = assetCodeDatabase?.columns.find(({ id }) => id === notionAssetSync.extra_data.notion.asset_code.property_id)
				const assetPriceColumn = assetPriceDatabase?.columns.find(({ id }) => id === notionAssetSync.extra_data.notion.asset_price.property_id)

				return {
					id: notionAssetSync.id,
					database: assetCodeDatabase ? {
						id: assetCodeDatabase.id,
						name: assetCodeDatabase.title,
						cover: assetCodeDatabase.cover,
						icon: assetCodeDatabase.icon
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
