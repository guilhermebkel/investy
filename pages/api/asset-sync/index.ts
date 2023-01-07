import AssetSyncController from "@/server/controllers/AssetSyncController"

import NextHttpAdapter from "@server/adapters/NextHttpAdapter"

export default NextHttpAdapter.adaptApiHandler("PUT", AssetSyncController.connect)
