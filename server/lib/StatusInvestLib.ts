import axios from "axios"

import { Asset, InvestmentHandler } from "@/server/protocols/InvestmentProtocol"
import { RawAsset } from "@/server/protocols/StatusInvestProtocol"

class StatusInvestLib implements InvestmentHandler {
	private readonly client = axios.create({
		baseURL: "https://statusinvest.com.br",
		withCredentials: true,
		headers: {
			"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36"
		}
	})

	async getAsset (code: string): Promise<Asset | null> {
		const response = await this.client.get<RawAsset[]>("/home/mainsearchquery", {
			params: {
				q: code
			}
		})
	
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
