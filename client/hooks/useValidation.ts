import { useState } from "react"
import { AxiosError } from "axios"

type FieldErrors = Record<string, string>

const FIELD_ERROR_MESSAGES: Record<string, string> = {
	UserAlreadyExists: "There is an existing user using this email."
}

const useValidation = () => {
	const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

	const processFieldErrorMessages = () => {
		const messages: Record<string, string> = {}

		Object.entries(fieldErrors).forEach(([field, error]) => {
			messages[field] = FIELD_ERROR_MESSAGES[error]
		})

		return messages
	}

	const processRequestError = (requestError: AxiosError<{ fieldErrors: FieldErrors }>) => {
		const requestFieldErrors = requestError?.response?.data?.fieldErrors

		if (requestFieldErrors) {
			setFieldErrors(requestFieldErrors)
		}
	}

	const clearFieldError = (field: string) => {
		setFieldErrors(lastState => {
			const updatedState = { ...lastState }

			if (field in updatedState) {
				delete updatedState[field]
			}

			return updatedState
		})
	}

	return {
		digestRequestError: processRequestError,
		clearFieldError,
		messages: processFieldErrorMessages()
	}
}

export default useValidation
