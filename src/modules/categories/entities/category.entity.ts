import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Movie } from "src/modules/movies";

@Table({tableName: "categories", timestamps: true})
export class Category extends Model<Category> {
    @Column({type: DataType.STRING, allowNull: false, unique: true})
    name: string

    @HasMany(() => Movie)
    movies: Movie[]
}
