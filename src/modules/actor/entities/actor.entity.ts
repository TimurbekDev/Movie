
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { MovieActor } from "src/modules/actor-movie/entities";

import { Movie } from "src/modules/movies";


@Table({ tableName: 'actors', timestamps: true })
export class Actor extends Model<Actor> {
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
  @BelongsToMany(() => Movie, () => MovieActor)
  movies: Movie[];

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'image.png',
  })
  image: string;

}
