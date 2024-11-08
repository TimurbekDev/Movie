
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Actor, Category, MovieActor, Review } from "@modules"


@Table({ tableName: 'movies', timestamps: false })
export class Movie extends Model<Movie> {
  @Column({ type: DataType.STRING, allowNull: false, unique: false })
  name: string;

  @Column({ type: DataType.STRING(20000), allowNull: false })
  description: string;

  @Column({ type: DataType.STRING, allowNull: false })
  image: string;

  @Column({ type: DataType.STRING, allowNull: false })
  video: string;

  @Column({ type: DataType.STRING, allowNull: false })
  language: string;

  @Column({ type: DataType.STRING, allowNull: false })
  country: string;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE', onUpdate: 'NO ACTION' })
  category_id: number

  @BelongsTo(() => Category)
  category: Category

  @HasMany(() => Review)
  reviews: Review[]

  @BelongsToMany(() => Actor, () => MovieActor)
  actors: Actor[];
}
