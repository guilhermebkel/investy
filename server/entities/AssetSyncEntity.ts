import {
	Entity,
	ObjectID,
	ObjectIdColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn
} from "typeorm"

@Entity("asset_syncs")
class AssetSyncEntity {
	@ObjectIdColumn()
	id: ObjectID

	@Column()
	notion_database_id: string

	@Column()
	notion_asset_code_database_property_id: string

	@Column()
	notion_asset_price_database_property_id: string

	@Column("timestamptz")
	last_sync_at: Date

	@CreateDateColumn()
	created_at: Date;
  
	@UpdateDateColumn()
	updated_at: Date;
}

export default AssetSyncEntity
