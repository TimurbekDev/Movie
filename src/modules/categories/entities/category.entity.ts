import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Movie } from 'src/modules/movies';

@Table({ tableName: 'categories', timestamps: false })
export class Category extends Model<Category> {
  @Column({ type: DataType.STRING, allowNull: false, unique: false })
  name: string;

  @HasMany(() => Movie)
  movies: Movie[];
}
