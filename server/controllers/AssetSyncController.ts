import { ApiHandlerInput } from "@server/contracts/HttpContract"

import NotionService from "@server/services/NotionService"
// import InvestmentService from "@server/services/InvestmentService"

export type Body = {
  notionDatabaseId: string
	notionAssetCodeDatabasePropertyId: string
	notionAssetPriceDatabasePropertyId: string
}

class AssetSyncController {
  async connect ({ request, response }: ApiHandlerInput<{}, Body>): Promise<void> {
    const notionService = new NotionService(process.env.NOTION_TOKEN)
    
    const databaseId = request.body.notionDatabaseId
    // const assetCodePropertyId = request.body.notionAssetCodeDatabasePropertyId
    // const assetPricePropertyId = request.body.notionAssetPriceDatabasePropertyId

    const databaseRows = await notionService.getDatabaseById(databaseId)

    return response.ok(databaseRows)
  }
}

export default new AssetSyncController()
