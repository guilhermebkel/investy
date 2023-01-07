import mongoose, { Document, Schema, Model } from "mongoose"

import { AssetSyncEntity } from "@server/entities/AssetSyncEntity"

import { UserSchema } from "@server/schemas/UserSchema"
import { IntegrationSchema } from "@server/schemas/IntegrationSchema"

const SCHEMA_NAME = "AssetSync"

export type EntityDocument = Document & AssetSyncEntity

type EntityModel = Model<EntityDocument>

const AssetSyncSchema = new Schema<EntityDocument, EntityModel>({
	user_id: UserSchema,
	integration_id: IntegrationSchema,
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
	user: UserSchema,
	integration: IntegrationSchema
},
{
	timestamps: true
})

export default mongoose.models[SCHEMA_NAME] || mongoose.model(SCHEMA_NAME, AssetSyncSchema)
