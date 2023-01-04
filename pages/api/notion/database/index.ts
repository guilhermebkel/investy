import { AdaptedHandler, HandlerInput } from "@/protocols/api-handler"

import { adaptNextApiHandler } from "@/adapters/api-handler"

import NotionService from "@/services/notion"

export type Query = {
  name: string
}

class Handler implements AdaptedHandler<Query> {
  async handle ({ request, response }: HandlerInput<Query>): Promise<void> {
    const notionService = new NotionService(process.env.NOTION_TOKEN)
  
    const name = request.query.name

    if (!name) {
      return response.badRequest({ name: "ParamNotSupplied" })
    }

    const databases = await notionService.searchDatabases(name)

    return response.ok(databases)
  }
}

export default adaptNextApiHandler(new Handler())
