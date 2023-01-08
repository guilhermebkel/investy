import UserEntity from "@server/entities/UserEntity"
import IntegrationEntity from "@server/entities/IntegrationEntity"

import { DefaultEntity } from "@server/contracts/RepositoryContract"

export type AssetSyncExtraData = {
	notion?: {
		database_id: string
		asset_code_property_id: string
		asset_price_property_id: string
	}
}

interface AssetSyncEntity extends DefaultEntity {
	user_id: string
	integration_id: string
	extra_data: AssetSyncExtraData
	last_sync_at?: Date
	user?: UserEntity
	integration?: IntegrationEntity
}

export default AssetSyncEntity
