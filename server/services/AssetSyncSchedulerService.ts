import QueueModule from "@server/infra/queue"

class AssetSyncSchedulerService {
	async scheduleSync (assetSyncId: string): Promise<void> {
		await QueueModule.cancel("SyncAssetPrice", assetSyncId)

		await QueueModule.enqueue({
			name: "SyncAssetPrice",
			payload: {
				assetSyncId
			},
			options: {
				id: assetSyncId,
				scheduleTimeInMilliseconds: 1000 * 60 * (10) // 10 minutes
			}
		})
	}
}

export default new AssetSyncSchedulerService()
