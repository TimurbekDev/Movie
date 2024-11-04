import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Actor } from './entities';

export declare interface updateDeleteActorResponse{
  message: string
}

@Injectable()
export class ActorService {
  constructor(@InjectModel(Actor) private actorModel: typeof Actor){}
  async create(createActorDto: CreateActorDto) {
    return await this.actorModel.create(createActorDto);
  }

  async findAll(): Promise<Actor[]> {
    return await this.actorModel.findAll();
  }

  async findOne(id: number): Promise<Actor>  {
    const foundedActor = await this.actorModel.findByPk(id)
    if(!foundedActor){
      throw new NotFoundException("Actor not found")
    }
    return foundedActor;
  }

  async update(id: number, updateActorDto: UpdateActorDto):Promise<updateDeleteActorResponse> {
    const foundedActor = await this.actorModel.findByPk(id)
    if(!foundedActor){
      throw new NotFoundException("Actor not found")
    }
    await this.actorModel.update(updateActorDto, {where: {id: id}})
    return {
      message: "updated success"
    };
  }

  async remove(id: number): Promise<updateDeleteActorResponse> {
    const foundedActor = await this.actorModel.findByPk(id)
    if(!foundedActor){
      throw new NotFoundException("Actor not found")
    }
    await this.actorModel.destroy({where: {id: id}})
    return {
      message: "deleted success"
    };
  }
}
