import { AssetSyncEntity } from "@server/entities/AssetSyncEntity"
import { IntegrationEntity } from "@server/entities/IntegrationEntity"

export interface UserEntity {
	id: string
	name: string
	email: string
	password: string
	picture_url?: string
	created_at: Date
	updated_at: Date
	integrations?: IntegrationEntity[]
	asset_syncs?: AssetSyncEntity[]
}
