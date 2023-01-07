import { MiddlewareHandlerInput } from "@server/contracts/HttpContract"

import NextHttpAdapter from "@server/adapters/NextHttpAdapter"

export default NextHttpAdapter.adaptMiddlewareHandler(
  async ({ response }: MiddlewareHandlerInput): Promise<void> => {
    return response.next()
  }
)
