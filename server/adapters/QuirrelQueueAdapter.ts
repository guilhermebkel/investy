import { Queue } from "quirrel/next"

import {
	QueueContract,
	QueueHandler,
	QueuePayload,
	QueueName
} from "@server/contracts/QueueContract"

import LogService from "@server/services/LogService"

class QuirrelQueueAdapter implements QueueContract<Queue<{}>> {
	adaptQueueHandler (handler: QueueHandler): Queue<{}> {
		const route = `api/queues/${handler.name}`

		const queue = Queue<QueuePayload[QueueName]>(route, async (payload) => {
			try {
				await this.onActive(handler, payload)
				await handler.handle(payload)
				await this.onCompleted(handler, payload)
			} catch (error) {
				await this.onError(handler, payload, error)
			}
		})

		return queue
	}

	private async onActive (handler: QueueHandler, payload: QueuePayload[QueueName]): Promise<void> {
		LogService.info(`[Queue][${handler.name}] Running...`)

		await handler?.onActive(payload)?.catch(LogService.error)
	}

	private async onError (handler: QueueHandler, payload: QueuePayload[QueueName], error: Error): Promise<void> {
		LogService.info(`[Queue][${handler.name}] ERROR!`)
		LogService.error(error)

		setImmediate(() => {
			handler?.onError(payload, error)?.catch(LogService.error)
		})	
	}

	private async onCompleted (handler: QueueHandler, payload: QueuePayload[QueueName]): Promise<void> {
		LogService.info(`[Queue][${handler.name}] Success!`)

		setImmediate(() => {
			handler?.onCompleted?.(payload)?.catch(LogService.error)
		})
	}
}

export default new QuirrelQueueAdapter()
