import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Actor } from "src/modules/actor/entities";
import { Movie } from "src/modules/movies";



@Table({ tableName: "movie_actors", timestamps: true })
export class MovieActor extends Model<MovieActor> {
    @ForeignKey(() => Movie)
    @Column({ type: DataType.INTEGER, allowNull: false })
    movieId: number;

    @ForeignKey(() => Actor)
    @Column({ type: DataType.INTEGER, allowNull: false })
    actorId: number;    
}
