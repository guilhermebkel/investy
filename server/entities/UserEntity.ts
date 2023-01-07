import { AssetSyncEntity } from "@server/entities/AssetSyncEntity"
import { IntegrationEntity } from "@server/entities/IntegrationEntity"

export interface UserEntity {
	id: string
	picture_url?: string
	first_name: string
	last_name?: string
	created_at: Date
	updated_at: Date
	integrations?: IntegrationEntity[]
	asset_syncs?: AssetSyncEntity[]
}
