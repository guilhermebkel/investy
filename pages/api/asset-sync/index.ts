import { AdaptedHandler, HandlerInput } from "@/server/protocols/ApiHandlerProtocol"

import ApiHandlerAdapter from "@/server/adapters/ApiHandlerAdapter"

import NotionService from "@/server/services/NotionService"
// import InvestmentService from "@/server/services/InvestmentService"

export type Body = {
  notionDatabaseId: string
	notionAssetCodeDatabasePropertyId: string
	notionAssetPriceDatabasePropertyId: string
}

class Handler implements AdaptedHandler<{}, Body> {
  async handle ({ request, response }: HandlerInput<{}, Body>): Promise<void> {
    const notionService = new NotionService(process.env.NOTION_TOKEN)
  
    const databaseId = request.body.notionDatabaseId
    // const assetCodePropertyId = request.body.notionAssetCodeDatabasePropertyId
    // const assetPricePropertyId = request.body.notionAssetPriceDatabasePropertyId

    const databaseRows = await notionService.getDatabaseById(databaseId)

    return response.ok(databaseRows)
  }
}

export default ApiHandlerAdapter.adaptNextApiHandler(new Handler(), "PUT")
