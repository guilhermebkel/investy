import { PartialMap } from "@server/protocols/UtilityProtocol"

export type CreateInput<Entity> = Omit<Entity, "id" | "created_at" | "updated_at">

export type WhereInput<Entity> = PartialMap<keyof Entity, Entity[keyof Entity]>

export type UpdateInput<Entity> = WhereInput<Entity>

export interface RepositoryContract<Entity> {
	create: (data: CreateInput<Entity>) => Promise<Entity>
	retrieveOne: (where: WhereInput<Entity>) => Promise<Entity | null>
	retrieveAll: (where: WhereInput<Entity>) => Promise<Entity[]>
	update: (where: WhereInput<Entity>, data: UpdateInput<Entity>) => Promise<void>
	delete: (where: WhereInput<Entity>) => Promise<void>
}
