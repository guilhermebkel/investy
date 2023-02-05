import axios from "axios"

import { apiConfig } from "@client/config/api"
import { authConfig } from "@client/config/auth"

import { getAuthToken } from "@client/services/auth"

export const api = axios.create({
	baseURL: apiConfig.baseURL
})

api.interceptors.request.use(async config => {
	config.headers[authConfig.authTokenKey] = getAuthToken()

	return config
})
