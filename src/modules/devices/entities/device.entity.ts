import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/modules/user";


@Table({tableName: "devices", timestamps: true})
export class Device extends Model<Device> {
    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @Column({type: DataType.STRING, allowNull: false})
    acces_token: string

    @Column({type: DataType.STRING, allowNull: false})
    refresh_token: string

    @ForeignKey(() => User)
    @Column({ type: DataType.BIGINT, allowNull: false, onDelete: "CASCADE", onUpdate: "NO ACTION" })
    user_id: number
}
