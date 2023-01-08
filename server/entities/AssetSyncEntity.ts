import UserEntity from "@server/entities/UserEntity"
import IntegrationEntity from "@server/entities/IntegrationEntity"

export type AssetSyncExtraData = {
	notion?: {
		asset_code: {
			database_id: string
			property_id: string
		}
		asset_price: {
			database_id: string
			property_id: string
		}
	}
}

interface AssetSyncEntity {
	id: string
	user_id: string
	integration_id: string
	extra_data: AssetSyncExtraData
	last_sync_at?: Date
	created_at: Date
	updated_at: Date
	user?: UserEntity
	integration?: IntegrationEntity
}

export default AssetSyncEntity
