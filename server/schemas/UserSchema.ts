import mongoose, { Document, Schema, Model } from "mongoose"

import { UserEntity } from "@server/entities/UserEntity"

const SCHEMA_NAME = "User"

export type EntityDocument = Document & UserEntity

type EntityModel = Model<EntityDocument>

export const UserSchema = new Schema<EntityDocument, EntityModel>({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		index: true
	},
	password: {
		type: String,
		required: true
	},
	picture_url: {
		type: String
	},
	asset_syncs: [{
		type: Schema.Types.ObjectId,
		ref: "AssetSync"
	}],
	integrations: [{
		type: Schema.Types.ObjectId,
		ref: "Integration"
	}]
},
{
	timestamps: true
})

export default mongoose.models[SCHEMA_NAME] || mongoose.model(SCHEMA_NAME, UserSchema)
