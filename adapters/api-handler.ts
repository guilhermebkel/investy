import { NextApiRequest, NextApiResponse } from "next"

import { AdaptedHandler, HandlerInput } from "@/protocols/api-handler"

import LogService from "@/services/log"

type NextHandlerFn = (request: NextApiRequest, response: NextApiResponse) => Promise<void>

export const adaptNextApiHandler = (adaptedHandler: AdaptedHandler): NextHandlerFn => async (req: NextApiRequest, res: NextApiResponse) => {
	const handlerInput: HandlerInput<{}> = {
		request: {
			body: req.body,
			params: {},
			query: req.query
		},
		response: {
			ok: (data) => res.status(200).json(data),
			serverError: (slug) => res.status(500).json({ error: slug || "Server error" }),
			notFound: () => res.status(404),
			badRequest: (fieldErrors) => res.status(400).json({ fieldErrors })
		}
	}

	try {
		await adaptedHandler.handle(handlerInput)
	} catch (error) {
		LogService.error(error)
		return handlerInput.response.serverError()
	}
}
