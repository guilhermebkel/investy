import { ApiHandlerInput } from "@server/contracts/HttpContract"

import NotionService from "@server/services/NotionService"

export type Query = {
  name: string
}

class NotionDatabaseController {
  async search ({ request, response }: ApiHandlerInput<Query, {}>): Promise<void> {
    const notionService = new NotionService(process.env.NOTION_TOKEN)

    const name = request.query.name

    if (!name) {
      return response.ok([])
    }

    const databases = await notionService.searchDatabases(name)

    return response.ok(databases)
  }
}

export default new NotionDatabaseController()
