import { ApiHandlerInput } from "@server/contracts/HttpContract"

import NotionLib from "@server/lib/NotionLib"

type Query = {
  name: string
}

class IntegrationNotionDatabaseController {
  async search ({ request, response }: ApiHandlerInput<Query, {}>): Promise<void> {
    const notion = new NotionLib(process.env.NOTION_TOKEN)

    const name = request.query.name

    if (!name) {
      return response.ok([])
    }

    const databases = await notion.searchDatabases(name)

    return response.ok(databases)
  }
}

export default new IntegrationNotionDatabaseController()
