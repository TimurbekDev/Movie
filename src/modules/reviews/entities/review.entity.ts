import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Movie, User } from '@modules';



@Table({ tableName: 'reviews', timestamps: true })
export class Review extends Model<Review> {
  @Column({ type: DataType.TEXT, allowNull: false })
  text: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Movie)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  movie_id: number;
  @BelongsTo(() => Movie)
  movie: Movie;
}
