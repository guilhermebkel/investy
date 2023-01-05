import axios from "axios"

import { Asset, InvestmentHandler } from "@/server/protocols/InvestmentProtocol"
import { RawAsset } from "@/server/protocols/StatusInvestProtocol"

class StatusInvestLib implements InvestmentHandler {
	private readonly client = axios.create({ baseURL: "https://statusinvest.com.br" })

	async getAsset (code: string): Promise<Asset | null> {
		const response = await this.client.post<RawAsset[]>(`/home/mainsearchquery?q=${code}`)
	
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
}

export default new StatusInvestLib()
