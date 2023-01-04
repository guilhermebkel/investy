import { Asset } from "@/protocols/investment"

import { getAsset } from "@/lib/status-invest"

class InvestmentService {
	async getAsset (code: string): Promise<Asset> {
		return await getAsset(code)
	}
}

export default new InvestmentService()
