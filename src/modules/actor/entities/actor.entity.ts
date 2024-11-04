import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: "actors", timestamps: true})
export class Actor extends  Model<Actor> {
    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @Column({type: DataType.STRING, allowNull: false, defaultValue: "image.png"})
    image: string
}
