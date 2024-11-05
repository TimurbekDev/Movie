import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { userStatus } from '../userStatus';
import { Review } from 'src/modules/reviews/entities/review.entity';
import { Device } from 'src/modules/devices';

@Table({ tableName: 'users', timestamps: true })
export class User extends Model<User> {
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({
    type: DataType.ENUM(
      userStatus.ADMIN,
      userStatus.PREMIUM,
      userStatus.SUPER_ADMIN,
      userStatus.USER,
    ),
    defaultValue: userStatus.USER,
    allowNull: false,
  })
  status: string;

  @HasMany(() => Review)
  reviews: Review[];

  @HasMany(() => Device)
  device: Device[]
}
