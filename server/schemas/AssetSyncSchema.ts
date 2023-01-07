import mongoose, { Document, Schema, Model } from "mongoose"

import AssetSyncEntity from "@server/entities/AssetSyncEntity"

import { UserSchemaDefinition } from "@server/schemas/UserSchema"
import { IntegrationSchemaDefinition } from "@server/schemas/IntegrationSchema"

const SCHEMA_NAME = "AssetSync"

type AssetSyncDocument = Document & AssetSyncEntity

type AssetSyncModel = Model<AssetSyncDocument>

export const AssetSyncSchemaDefinition = new Schema<AssetSyncDocument, AssetSyncModel>({
	user_id: UserSchemaDefinition,
	integration_id: IntegrationSchemaDefinition,
	notion_database_id: {
		type: String,
		required: true,
		index: true
	},
	notion_asset_code_database_property_id: {
		type: String,
		required: true,
		index: true
	},
	notion_asset_price_database_property_id: {
		type: String,
		required: true,
		index: true
	},
	last_sync_at: {
		type: Date,
		required: false
	},
	user: UserSchemaDefinition,
	integration: IntegrationSchemaDefinition
},
{
	timestamps: true
})

export default mongoose.models[SCHEMA_NAME] || mongoose.model(SCHEMA_NAME, AssetSyncSchemaDefinition)
