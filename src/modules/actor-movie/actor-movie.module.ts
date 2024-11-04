import { Module } from '@nestjs/common';
import { ActorMovieService } from './actor-movie.service';
import { ActorMovieController } from './actor-movie.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MovieActor } from './entities';

@Module({
  imports: [SequelizeModule.forFeature([MovieActor])],
  controllers: [ActorMovieController],
  providers: [ActorMovieService],
})
export class ActorMovieModule {}
