import mongoose, { Document, Schema, Model } from "mongoose"

import { IntegrationEntity } from "@server/entities/IntegrationEntity"

import { UserSchema } from "@server/schemas/UserSchema"

const SCHEMA_NAME = "Integration"

export type EntityDocument = Document & IntegrationEntity

type EntityModel = Model<EntityDocument>

export const IntegrationSchema = new Schema<EntityDocument, EntityModel>({
	user_id: UserSchema,
	type: {
		type: String,
		required: true
	},
	token: {
		type: String,
		required: true
	},
	user: UserSchema
},
{
	timestamps: true
})

export default mongoose.models[SCHEMA_NAME] || mongoose.model(SCHEMA_NAME, IntegrationSchema)
