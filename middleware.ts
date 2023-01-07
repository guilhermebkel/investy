import { MiddlewareHandlerInput } from "@server/contracts/HttpContract"

import NextHttpAdapter from "@server/adapters/NextHttpAdapter"

export default NextHttpAdapter.adaptMiddlewareHandler(
  async ({ request, response }: MiddlewareHandlerInput): Promise<void> => {
    console.log(request.pathname)
  
    return response.next()
  }
)
