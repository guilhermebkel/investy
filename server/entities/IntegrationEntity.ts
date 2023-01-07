import UserEntity from "@server/entities/UserEntity"

export type IntegrationType = "notion"

interface IntegrationEntity {
	id: string
	user_id: string
	type: IntegrationType
	token: string
	created_at: Date
	updated_at: Date
	user?: UserEntity
}

export default IntegrationEntity
