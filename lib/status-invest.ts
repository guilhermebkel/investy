import axios from "axios"

import { Asset } from "@/protocols/investment"
import { RawAsset } from "@/protocols/status-invest"

const client = axios.create({
	baseURL: "https://statusinvest.com.br"
})

export const getAsset = async (code: string): Promise<Asset | null> => {
	const response = await client.post<RawAsset[]>(`/home/mainsearchquery?q=${code}`)

	const [rawAsset] = response.data

	if (!rawAsset) {
		return null
	}

	const priceInCents = Number(rawAsset.price.replace(/\D/g, ""))

	return {
		code: rawAsset.code,
		name: rawAsset.name,
		priceInCents
	}
}
