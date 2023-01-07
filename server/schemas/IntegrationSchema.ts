import mongoose, { Document, Schema, Model } from "mongoose"

import IntegrationEntity from "@server/entities/IntegrationEntity"

import { UserSchemaDefinition } from "@server/schemas/UserSchema"

const SCHEMA_NAME = "Integration"

type IntegrationDocument = Document & IntegrationEntity

type IntegrationModel = Model<IntegrationDocument>

export const IntegrationSchemaDefinition = new Schema<IntegrationDocument, IntegrationModel>({
	user_id: UserSchemaDefinition,
	type: {
		type: String,
		required: true
	},
	token: {
		type: String,
		required: true
	},
	user: UserSchemaDefinition
},
{
	timestamps: true
})

export default mongoose.models[SCHEMA_NAME] || mongoose.model(SCHEMA_NAME, IntegrationSchemaDefinition)
