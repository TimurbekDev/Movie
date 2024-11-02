import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({tableName: "categories", timestamps: true})
export class Category extends Model<Category> {
@Column({type: DataType.STRING, allowNull: false, unique: true})
name: string
}
