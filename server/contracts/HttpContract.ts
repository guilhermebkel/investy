import { PartialMap } from "@server/protocols/UtilityProtocol"
import { AuthTokenPayload } from "@server/protocols/AuthProtocol"

export type DefaultData = Record<string, unknown>

export type ApiHandlerRequest<Query, Body> = {
	params?: DefaultData
	query?: Query
	body: Body
	headers: {
		get: (key: string) => string | null
	}
	context: {
		set: (data: Partial<RequestContext>) => void
	}
}

export type ApiHandlerResponse<Query, Body> = {
	ok: (data?: unknown) => void
	serverError: (slug?: string) => void
	notFound: (message?: string) => void
	badRequest: (fieldErrors: PartialMap<keyof (Query & Body), string>) => void
	created: (data?: unknown) => void
	noContent: () => void
	unauthorized: () => void
}

export type RequestContext = {
	auth: AuthTokenPayload
}

export type ApiHandlerInput<Query, Body> = {
	request: ApiHandlerRequest<Query, Body>
	response: ApiHandlerResponse<Query, Body>
	context: RequestContext
}

export type ApiHandler<Query = DefaultData, Body = DefaultData> = (input: ApiHandlerInput<Query, Body>) => Promise<void>

export interface HttpContract<RawApiHandler, RawMiddlewareHandler> {
	adaptApiHandler (handler: ApiHandler): RawApiHandler
}
