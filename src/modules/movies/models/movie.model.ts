import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Category } from "src/modules/categories";
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

    @Column({type: DataType.STRING, allowNull: false})
    language: string;

    @Column({type: DataType.STRING, allowNull: false})
    country: string;

    @ForeignKey(() => Category)
    @Column({type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE', onUpdate: 'NO ACTION'})
    category_id: number
    @BelongsTo(() => Category)
    category: Category

    @HasMany(()=>Review)
    reviews: Review[]
}
