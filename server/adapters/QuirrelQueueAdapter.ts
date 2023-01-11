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
			LogService.info(`[Queue][${handler.name}] Running...`)

			await handler.handle(payload)

			LogService.info(`[Queue][${handler.name}] Success!`)

			setImmediate(() => {
				handler?.onCompleted?.(payload)?.catch(LogService.error)
			})
		})

		return queue
	}
}

export default new QuirrelQueueAdapter()
