import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Review } from "src/modules/reviews/entities/review.entity";

@Table({tableName: "movies", timestamps: true})
export class Movie extends Model<Movie> {
    @Column({type: DataType.STRING, allowNull: false, unique: true})
    name: string

    @Column({type: DataType.STRING(20000), allowNull: false})
    description: string

    @Column({type: DataType.STRING, allowNull: false})
    image: string

    @Column({type: DataType.STRING, allowNull: false})
    video: string

    @HasMany(()=>Review)
    reviews: Review[]
}
