import { Model } from "mongoose"

import { RepositoryContract, CreateInput, WhereInput, UpdateInput } from "@server/contracts/RepositoryContract"

class MongooseRepositoryAdapter<Entity> implements RepositoryContract<Entity> {
	private readonly schema: Model<Entity>

	constructor (schema: Model<Entity>) {
		this.schema = schema
	}

	async create (data: CreateInput<Entity>): Promise<Entity> {
		const teste = await this.schema.create(data)

		return teste
	}

	async retrieveOne (where: WhereInput<Entity>): Promise<Entity | null> {
		const entity = await this.schema.findOne({ where })

		if (!entity) {
			return null
		}

		return entity
	}

	async retrieveAll (where: WhereInput<Entity>): Promise<Entity[]> {
		const entities = await this.schema.find({ where })

		return entities
	}

	async update (where: WhereInput<Entity>, data: UpdateInput<Entity>): Promise<void> {
		await this.schema.updateMany(where, data)
	}

	async delete (where: WhereInput<Entity>): Promise<void> {
		await this.schema.deleteMany(where)
	}
}

export default MongooseRepositoryAdapter
