export type DefaultData = Record<string, unknown>

export type ApiHandlerRequest<Query, Body> = {
	params?: DefaultData
	query?: Query
	body: Body
}

export type MiddlewareHandlerResponse = {
	next: () => void
	serverError: (slug?: string) => void
}

export type MiddlewareHandlerRequest = {
	pathname: string
}

export type ApiHandlerResponse<Query> = {
	ok: (data?: unknown) => void
	serverError: (slug?: string) => void
	notFound: (message?: string) => void
	badRequest: (fieldErrors: Record<keyof Query, string>) => void
}

export type ApiHandlerInput<Query, Body> = {
	request: ApiHandlerRequest<Query, Body>
	response: ApiHandlerResponse<Query>
}

export type MiddlewareHandlerInput = {
	request: MiddlewareHandlerRequest
	response: MiddlewareHandlerResponse
}

export type ApiHandlerMethod = "GET" | "POST" | "PUT"
export type ApiHandler<Query = DefaultData, Body = DefaultData> = (input: ApiHandlerInput<Query, Body>) => Promise<void>
export type MiddlewareHandler = (input: MiddlewareHandlerInput) => Promise<void>

export interface HttpContract<RawApiHandler, RawMiddlewareHandler> {
	adaptApiHandler (method: ApiHandlerMethod, handler: ApiHandler): RawApiHandler
	adaptMiddlewareHandler(handler: MiddlewareHandler): RawMiddlewareHandler
}
