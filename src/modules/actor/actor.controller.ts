import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActorService, updateDeleteActorResponse } from './actor.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { Actor } from './entities';

@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Post()
  create(@Body() createActorDto: CreateActorDto) {
    return this.actorService.create(createActorDto);
  }

  @Get()
  findAll(): Promise<Actor[]> {
    return this.actorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string):Promise<Actor> {
    return this.actorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActorDto: UpdateActorDto): Promise<updateDeleteActorResponse> {
    return this.actorService.update(+id, updateActorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string):Promise<updateDeleteActorResponse> {
    return this.actorService.remove(+id);
  }
}
