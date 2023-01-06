import { getMongoRepository, MongoRepository } from "typeorm"

import {
	AdaptedRepository,
	CreateInput,
	WhereInput,
	UpdateInput
} from "@/server/protocols/RepositoryProtocol"

class TypeormRepositoryAdapter<Entity> implements AdaptedRepository<Entity> {
	private readonly repository: MongoRepository<Entity>

	constructor (entity: Entity) {
		this.repository = getMongoRepository(entity as any)
	}

	async create (data: CreateInput<Entity>): Promise<Entity> {
		const teste = this.repository.create(data as any)

		await teste.save()

		return teste
	}

	async retrieveOne (where: WhereInput<Entity>): Promise<Entity | null> {
		const entity = await this.repository.findOne({ where: where as any })

		if (!entity) {
			return null
		}

		return entity
	}

	async retrieveAll (where: WhereInput<Entity>): Promise<Entity[]> {
		const entities = await this.repository.find({ where: where as any })

		return entities
	}

	async update (where: WhereInput<Entity>, data: UpdateInput<Entity>): Promise<void> {
		await this.repository.updateMany(where, data)
	}

	async delete (where: WhereInput<Entity>): Promise<void> {
		await this.repository.deleteMany(where)
	}
}

export default TypeormRepositoryAdapter
