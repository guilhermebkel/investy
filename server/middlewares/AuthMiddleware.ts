import { ApiHandlerInput } from "@server/contracts/HttpContract"

import { IntegrationType } from "@server/entities/IntegrationEntity"

import AuthConfig from "@server/config/AuthConfig"

import AuthService from "@server/services/AuthService"

class AuthMiddleware {
  async requireAuth ({ request, response }: ApiHandlerInput<{}, {}>): Promise<void> {
		const authToken = request.headers.get(AuthConfig.tokenKey)

		if (!authToken) {
			return response.unauthorized()
		}

		const authTokenPayload = await AuthService.decodeAuthToken(authToken)

		if (!authTokenPayload) {
			return response.unauthorized()
		}

		request.context.set({ auth: authTokenPayload })
  }
}

export default new AuthMiddleware()
