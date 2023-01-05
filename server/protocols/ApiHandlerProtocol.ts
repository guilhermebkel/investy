export type DefaultData = Record<string, unknown>

export type Request<Query, Body> = {
	params?: DefaultData
	query?: Query
	body: Body
}

export type Response<Query> = {
	ok: (data?: unknown) => void
	serverError: (slug?: string) => void
	notFound: (message?: string) => void
	badRequest: (fieldErrors: Record<keyof Query, string>) => void
}

export type HandlerInput<Query, Body> = {
	request: Request<Query, Body>
	response: Response<Query>
}

export interface AdaptedHandler<Query = DefaultData, Body = DefaultData> {
	method: "GET" | "POST" | "PUT"
	handle: (input: HandlerInput<Query, Body>) => Promise<void>
}
