export interface AssetSyncEntity {
	id: number
	notion_database_id: string
	notion_asset_code_database_property_id: string
	notion_asset_price_database_property_id: string
	last_sync_at: Date
	created_at: Date
	updated_at: Date
}
