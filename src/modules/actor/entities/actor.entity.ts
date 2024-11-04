import { Column, DataType, Table } from "sequelize-typescript";

@Table({tableName: "actors", timestamps: true})
export class Actor {
    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @Column({type: DataType.STRING, allowNull: false, defaultValue: "image.png"})
    image: string
}
