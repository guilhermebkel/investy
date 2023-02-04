import { Queue } from "quirrel/next"

import { QueueName, QueuePayload, EnqueueInput } from "@server/contracts/QueueContract"

import SyncAssetPriceQueue from "@/pages/api/queues/SyncAssetPrice"

import LogService from "@server/services/LogService"

class QueueModule {
	private readonly queues: Record<QueueName, Queue<any>> = {
		SyncAssetPrice: SyncAssetPriceQueue
	}

	async start (): Promise<void> {
		const queuesCount = Object.keys(this.queues).length

		LogService.info(`[Core] All queues are configured... (${queuesCount} queues)`)
	}

	async enqueue<Name extends QueueName>(input: EnqueueInput<Name>): Promise<void> {
		const { name, payload, options } = input

		const queue = this.queues[name]

		if (queue) {
			await queue.enqueue(payload, {
				delay: options?.scheduleTimeInMilliseconds,
				id: options?.id
			})
		}
	}

	async cancel<Name extends QueueName> (queueName: Name, jobId: string): Promise<void> {
		const queue = this.queues[queueName]

		if (queue) {
			await queue.delete(jobId)
		}
	}
}

export default new QueueModule()
