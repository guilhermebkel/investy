const AUTH_TOKEN_LOCAL_STORAGE_KEY = "auth-token"

export const setAuthToken = (authToken: string) => {
	localStorage.setItem(AUTH_TOKEN_LOCAL_STORAGE_KEY, authToken)
}

export const getAuthToken = () => {
	const authToken = localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY)

	return authToken ?? null
}

export const isAuthenticated = () => {
	return Boolean(getAuthToken())
}
