import { AdaptedHandlerFn } from "@/protocols/api-handler"

import { adaptNextApiHandler } from "@/adapters/api-handler"

import NotionService from "@/services/notion"

const handler: AdaptedHandlerFn<{ name: string }> = async ({ request, response }) => {
  try {
    const notionService = new NotionService(process.env.NOTION_TOKEN)

    const name = request.query.name

    if (!name) {
      return response.badRequest({ name: "ParamNotSupplied" })
    }

    const databases = await notionService.searchDatabases(name)

    return response.ok(databases)
  } catch (error) {
    response.serverError(error.name)
  }
}

export default adaptNextApiHandler(handler)
