import UserEntity from "@server/entities/UserEntity"
import IntegrationEntity from "@server/entities/IntegrationEntity"

interface AssetSyncEntity {
	id: string
	user_id: UserEntity
	integration_id: IntegrationEntity
	notion_database_id: string
	notion_asset_code_database_property_id: string
	notion_asset_price_database_property_id: string
	last_sync_at: Date
	created_at: Date
	updated_at: Date
	user?: UserEntity
	integration?: IntegrationEntity
}

export default AssetSyncEntity
