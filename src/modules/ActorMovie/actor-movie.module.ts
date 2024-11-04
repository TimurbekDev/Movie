import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { MovieActor } from "./actor-movie.model";

@Module({
    imports: [SequelizeModule.forFeature([MovieActor])]
})
export class ActorMovieModule{}