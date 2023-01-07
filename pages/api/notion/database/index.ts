import NotionDatabaseController from "@/server/controllers/NotionDatabaseController"

import NextHttpAdapter from "@server/adapters/NextHttpAdapter"

export default NextHttpAdapter.adaptApiHandler("GET", NotionDatabaseController.search)
