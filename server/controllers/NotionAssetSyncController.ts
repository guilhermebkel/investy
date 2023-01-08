import { ApiHandlerInput } from "@server/contracts/HttpContract"

import NotionLib from "@server/lib/NotionLib"

import IntegrationService from "@server/services/IntegrationService"

import AssetSyncRepository from "@server/repositories/AssetSyncRepository"

type ConnectBody = {
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

class NotionAssetSyncController {
  async connect ({ request, response, context }: ApiHandlerInput<{}, ConnectBody>): Promise<void> {
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

  async retrieveAll ({ response, context }: ApiHandlerInput<{}, {}>): Promise<void> {
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

        const assetCodeColumn = assetCodeDatabase.columns.find(({ id }) => id === notionAssetSync.extra_data.notion.asset_code.property_id)
        const assetPriceColumn = assetPriceDatabase.columns.find(({ id }) => id === notionAssetSync.extra_data.notion.asset_price.property_id)

        return {
          database: {
            id: assetCodeDatabase.id,
            name: assetCodeDatabase.title,
            cover: assetCodeDatabase.cover,
            icon: assetCodeDatabase.icon
          },
          assetCodeColumn: {
            id: assetCodeColumn.id,
            name: assetCodeColumn.name,
            type: assetCodeColumn.type
          },
          assetPriceColumn: {
            id: assetPriceColumn.id,
            name: assetPriceColumn.name,
            type: assetPriceColumn.type
          }
        }
      })
    )

    return response.ok(formattedAssetSyncs)
  }
}

export default new NotionAssetSyncController()
