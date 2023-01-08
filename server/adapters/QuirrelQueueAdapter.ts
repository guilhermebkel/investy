import { Queue } from "quirrel/next"

import {
	QueueContract,
	QueueHandler
} from "@server/contracts/QueueContract"

import LogService from "@server/services/LogService"

class QuirrelQueueAdapter implements QueueContract<Queue<{}>> {
	adaptQueueHandler (handler: QueueHandler): Queue<{}> {
		const route = `api/queues/${handler.name}`

		const queue = Queue(route, async (payload) => {
			LogService.info(`[Queue][${handler.name}] Running...`)

			await handler.handle(payload as any)

			LogService.info(`[Queue][${handler.name}] Success!`)
		})

		return queue
	}
}

export default new QuirrelQueueAdapter()
