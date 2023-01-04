export type DefaultData = Record<string, unknown>

export type Request<Query> = {
	params?: DefaultData
	query?: Query
	body: DefaultData
}

export type Response<Query> = {
	ok: (data?: unknown) => void
	serverError: (slug?: string) => void
	notFound: () => void
	badRequest: (fieldErrors: Record<keyof Query, string>) => void
}

export type HandlerInput<Query> = {
	request: Request<Query>
	response: Response<Query>
}

export interface AdaptedHandler<Query = DefaultData> {
	handle: (input: HandlerInput<Query>) => Promise<void>
}
