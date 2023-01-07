import { NextResponse, NextRequest } from "next/server"
import { NextApiRequest, NextApiResponse } from "next"

import {
	ApiHandler,
	ApiHandlerInput,
	ApiHandlerMethod,
	ApiHandlerRequest,
	ApiHandlerResponse,
	MiddlewareHandlerInput,
	MiddlewareHandlerRequest,
	MiddlewareHandlerResponse,
	DefaultData,
	HttpContract,
	MiddlewareHandler
} from "@server/contracts/HttpContract"

import {
	RawApiHandler,
	RawMiddlewareHandler
} from "@server/protocols/NextHttpProtocol"

import LogService from "@server/services/LogService"

class NextHttpAdapter implements HttpContract<RawApiHandler, RawMiddlewareHandler> {
	adaptApiHandler (method: ApiHandlerMethod, handler: ApiHandler): RawApiHandler {
		return async (req: NextApiRequest, res: NextApiResponse) => {
			const input: ApiHandlerInput<{}, {}> = {
				request: this.adaptApiHandlerRequest(req),
				response: this.adaptApiHandlerResponse(res)
			}

			const isValidRequest = String(req.method).toLowerCase() === String(method).toLowerCase()
	
			if (!isValidRequest) {
				return input.response.notFound(`Could not reach ${req.method} ${req.url}`)
			}
	
			try {
				return await handler(input)
			} catch (error) {
				LogService.error(error)
				return input.response.serverError()
			}
		}
	}

	adaptMiddlewareHandler (handler: MiddlewareHandler): RawMiddlewareHandler {
		return async (req: NextRequest) => {
			const input: MiddlewareHandlerInput = {
				request: this.adaptMiddlewareHandlerRequest(req),
				response: this.adaptMiddlewareHandlerResponse()
			}
	
			try {
				return await handler(input)
			} catch (error) {
				LogService.error(error)
				return input.response.serverError()
			}
		}
	}

	private adaptApiHandlerRequest<Query = DefaultData, Body = DefaultData> (req: NextApiRequest): ApiHandlerRequest<Query, Body> {
		return {
			body: req.body,
			params: {},
			query: req.query as any
		}
	}

	private adaptApiHandlerResponse<Query = DefaultData> (res: NextApiResponse): ApiHandlerResponse<Query> {
		return {
			ok: (data) => res.status(200).json(data),
			serverError: (slug) => res.status(500).json({ error: slug || "Server error" }),
			notFound: (message) => res.status(404).send(message || "Not Found"),
			badRequest: (fieldErrors) => res.status(400).json({ fieldErrors })
		}
	}

	private adaptMiddlewareHandlerResponse (): MiddlewareHandlerResponse {
		return {
			next: () => NextResponse.next(),
			serverError: (slug) => NextResponse.json({ error: slug || "Server error" }, { status: 500 }),
		}
	}

	private adaptMiddlewareHandlerRequest (req: NextRequest): MiddlewareHandlerRequest {
		return {
			pathname: req.nextUrl.pathname
		}
	}
}

export default new NextHttpAdapter()
