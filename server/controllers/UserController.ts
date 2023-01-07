import { ApiHandlerInput } from "@server/contracts/HttpContract"

import AuthService from "@server/services/AuthService"

import UserRepository from "@server/repositories/UserRepository"

type SignupBody = {
  name: string
	email: string
	password: string
}

type LoginBody = {
	email: string
	password: string
}

class UserController {
  async signup ({ request, response }: ApiHandlerInput<{}, SignupBody>): Promise<void> {
		const { email, name, password } = request.body

		if (!email || !name || !password) {
			return response.badRequest({
				email: "FieldNotSupplied",
				name: "FieldNotSupplied",
				password: "FieldNotSupplied"
			})
		}

    const existingUser = await UserRepository.retrieveOne({ email })

		if (existingUser) {
			return response.badRequest({ email: "UserAlreadyExists" })
		}

		const hashedPassword = await AuthService.makeHashedPassword(password)

		const user = await UserRepository.create({
			email,
			name,
			password: hashedPassword
		})

		const authToken = await AuthService.generateAuthToken(user.id)

    return response.created({ authToken })
  }

	async login ({ request, response }: ApiHandlerInput<{}, LoginBody>): Promise<void> {
		const { email, password } = request.body

    const user = await UserRepository.retrieveOne({ email })

		if (!user) {
			return response.badRequest({ email: "InvalidCredentials" })
		}

		const isValidPassword = await AuthService.isValidPassword(password, user.password)

		if (!isValidPassword) {
			return response.badRequest({ email: "InvalidCredentials" })
		}

		const authToken = await AuthService.generateAuthToken(user.id)

    return response.ok({ authToken })
  }
}

export default new UserController()
