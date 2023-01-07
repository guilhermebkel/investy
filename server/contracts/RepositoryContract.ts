export type CreateInput<Entity> = Record<keyof Omit<Entity, "id">, Omit<Entity, "id">[keyof Omit<Entity, "id">]>

export type WhereInput<Entity> = {
	[key in keyof Entity]?: Entity[keyof Entity]
}

export type UpdateInput<Entity> = WhereInput<Entity>

export interface RepositoryContract<Entity> {
	create: (data: CreateInput<Entity>) => Promise<Entity>
	retrieveOne: (where: WhereInput<Entity>) => Promise<Entity | null>
	retrieveAll: (where: WhereInput<Entity>) => Promise<Entity[]>
	update: (where: WhereInput<Entity>, data: UpdateInput<Entity>) => Promise<void>
	delete: (where: WhereInput<Entity>) => Promise<void>
}
