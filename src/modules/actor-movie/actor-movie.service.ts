import { Injectable } from '@nestjs/common';
import { CreateActorMovieDto } from './dto/create-actor-movie.dto';
import { UpdateActorMovieDto } from './dto/update-actor-movie.dto';
import { InjectModel } from '@nestjs/sequelize';
import { MovieActor } from './entities';

@Injectable()
export class ActorMovieService {
  constructor(@InjectModel(MovieActor) private actorMovieModel: typeof MovieActor){}
  async create(createActorMovieDto: CreateActorMovieDto) {
    return await this.actorMovieModel.create(createActorMovieDto);
  }

  findAll() {
    return `This action returns all actorMovie`;
  }

  findOne(id: number) {
    return `This action returns a #${id} actorMovie`;
  }

  update(id: number, updateActorMovieDto: UpdateActorMovieDto) {
    return `This action updates a #${id} actorMovie`;
  }

  remove(id: number) {
    return `This action removes a #${id} actorMovie`;
  }
}
