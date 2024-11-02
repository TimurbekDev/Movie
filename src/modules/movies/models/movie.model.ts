import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: "movies", timestamps: true})
export class Movie extends Model<Movie> {
    @Column({type: DataType.STRING, allowNull: false, unique: true})
    name: string

    @Column({type: DataType.STRING(20000), allowNull: false})
    description: string

    @Column({type: DataType.STRING, allowNull: false})
    image: string

    @Column({type: DataType.STRING, allowNull: false})
    video: string
}
