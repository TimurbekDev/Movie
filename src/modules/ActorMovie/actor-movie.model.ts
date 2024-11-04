import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Movie } from "../movies";
import { Actor } from "../actor/entities";


@Table({ tableName: "movie_actors", timestamps: true })
export class MovieActor extends Model<MovieActor> {
    @ForeignKey(() => Movie)
    @Column({ type: DataType.INTEGER, allowNull: false })
    movieId: number;

    @ForeignKey(() => Actor)
    @Column({ type: DataType.INTEGER, allowNull: false })
    actorId: number;    
}
