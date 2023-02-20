export type QueuePayload = {
	SyncAssetPrice: {
		assetSyncId: string
	}
}

export type QueueName = keyof QueuePayload

export interface QueueHandler {
	name: QueueName
	handle: (data: QueuePayload[QueueName]) => Promise<void>
	onCompleted?: (data: QueuePayload[QueueName]) => Promise<void>
	onError?: (data: QueuePayload[QueueName], error: Error) => Promise<void>
}

export interface QueueContract<RawQueueHandler> {
	adaptQueueHandler: (handler: QueueHandler) => RawQueueHandler
}

export type EnqueueInput<Name extends QueueName> = {
	name: Name
	payload: QueuePayload[Name]
	options: {
		scheduleTimeInMilliseconds?: number
		id?: string
	}
}
