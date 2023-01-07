import { ObjectId } from "mongoose"

import { ApiHandlerInput } from "@server/contracts/HttpContract"

import IntegrationRepository from "@server/repositories/IntegrationRepository"

import { IntegrationType } from "@server/entities/IntegrationEntity"

type CreateBody = {
  type: IntegrationType
	token: string
}

class IntegrationController {
  async create ({ request, response, context }: ApiHandlerInput<{}, CreateBody>): Promise<void> {
		const { type, token } = request.body

		if (!type || !token) {
			return response.badRequest({
				type: "FieldNotSupplied",
				token: "FieldNotSupplied"
			})
		}

    const integration = await IntegrationRepository.create({
			token,
			type,
			user_id: context.auth.userId
		})

    return response.created({
			id: integration.id
		})
  }
}

export default new IntegrationController()
