import { ApiHandlerInput } from "@server/contracts/HttpContract"

import NotionLib from "@server/lib/NotionLib"

// import InvestmentService from "@server/services/InvestmentService"

type Body = {
  notionDatabaseId: string
	notionAssetCodeDatabasePropertyId: string
	notionAssetPriceDatabasePropertyId: string
}

class AssetSyncController {
  async connect ({ request, response }: ApiHandlerInput<{}, Body>): Promise<void> {
    const notion = new NotionLib(process.env.NOTION_TOKEN)
    
    const databaseId = request.body.notionDatabaseId
    // const assetCodePropertyId = request.body.notionAssetCodeDatabasePropertyId
    // const assetPricePropertyId = request.body.notionAssetPriceDatabasePropertyId

    const databaseRows = await notion.getDatabaseById(databaseId)

    return response.ok(databaseRows)
  }
}

export default new AssetSyncController()
