import { NextApiRequest, NextApiResponse } from "next"

import { AdaptedHandlerFn } from "@/protocols/api-handler"

type NextHandlerFn = (request: NextApiRequest, response: NextApiResponse) => Promise<void>

export const adaptNextApiHandler = (adaptedHandlerFn: AdaptedHandlerFn): NextHandlerFn => {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		await adaptedHandlerFn({
			request: {
				body: req.body,
				params: {},
				query: req.query
			},
			response: {
				ok: (data) => res.status(200).json(data),
				serverError: (slug) => res.status(500).json({ error: slug }),
				notFound: () => res.status(404),
				badRequest: (fieldErrors) => res.status(400).json({ fieldErrors })
			}
		})
	}
}