import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { IUser } from "../interfaces";
import { UserRoles } from "../enums";
import { Device } from "src/modules/devices";

@Table({
    tableName: 'User'
})
export class User extends Model<IUser> implements IUser {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    full_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.ENUM(...Object.values(UserRoles)),
        allowNull: false,
        defaultValue: UserRoles.BASIC
    })
    role: UserRoles;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;


    @HasMany(()=>Device)
    devices: Device[]
}