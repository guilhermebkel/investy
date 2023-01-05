import { NextApiRequest, NextApiResponse } from "next"

import { AdaptedHandler, HandlerInput } from "@/server/protocols/ApiHandlerProtocol"

import LogService from "@/server/services/LogService"

type NextHandlerFn = (request: NextApiRequest, response: NextApiResponse) => Promise<void>

class ApiHandlerAdapter {
	adaptNextApiHandler = (adaptedHandler: AdaptedHandler): NextHandlerFn => async (req: NextApiRequest, res: NextApiResponse) => {
		const handlerInput: HandlerInput<{}, {}> = {
			request: {
				body: req.body,
				params: {},
				query: req.query
			},
			response: {
				ok: (data) => res.status(200).json(data),
				serverError: (slug) => res.status(500).json({ error: slug || "Server error" }),
				notFound: (message) => res.status(404).send(message || "Not Found"),
				badRequest: (fieldErrors) => res.status(400).json({ fieldErrors })
			}
		}

		const isValidRequest = String(req.method).toLowerCase() === String(adaptedHandler.method).toLowerCase()

		if (!isValidRequest) {
			return handlerInput.response.notFound(`Could not reach ${req.method} ${req.url}`)
		}

		try {
			await adaptedHandler.handle(handlerInput)
		} catch (error) {
			LogService.error(error)
			return handlerInput.response.serverError()
		}
	}
}

export default new ApiHandlerAdapter()
