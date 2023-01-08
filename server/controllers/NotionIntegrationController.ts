import { ApiHandlerInput } from "@server/contracts/HttpContract"

import NotionLib from "@server/lib/NotionLib"

import IntegrationService from "@server/services/IntegrationService"

type SearchDatabaseQuery = {
  name: string
}

class NotionIntegrationController {
  async searchDatabase ({ request, response, context }: ApiHandlerInput<SearchDatabaseQuery, {}>): Promise<void> {
    const notionIntegration = await IntegrationService.getNotionIntegration(context.auth.userId)

    const notion = new NotionLib(notionIntegration.token)

    const name = request.query.name

    if (!name) {
      return response.ok([])
    }

    const databases = await notion.searchDatabases(name)

    return response.ok(databases)
  }
}

export default new NotionIntegrationController()
