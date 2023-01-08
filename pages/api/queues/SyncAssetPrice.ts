import QuirrelQueueAdapter from "@/server/adapters/QuirrelQueueAdapter"

import SyncAssetPriceQueue from "@/server/queues/SyncAssetPriceQueue"

export default QuirrelQueueAdapter.adaptQueueHandler(SyncAssetPriceQueue)
