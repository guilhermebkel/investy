import { AdaptedHandler, HandlerInput } from "@/server/protocols/HttpProtocol"

import HttpAdapter from "@/server/adapters/HttpAdapter"

import NotionService from "@/server/services/NotionService"

export type Query = {
  name: string
}

class Handler implements AdaptedHandler<Query> {
  async handle ({ request, response }: HandlerInput<Query, {}>): Promise<void> {
    const notionService = new NotionService(process.env.NOTION_TOKEN)

    const name = request.query.name

    if (!name) {
      return response.ok([])
    }

    const databases = await notionService.searchDatabases(name)

    return response.ok(databases)
  }
}

export default HttpAdapter.adaptNextApiHandler(new Handler(), "GET")
