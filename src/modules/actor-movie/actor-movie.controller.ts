import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActorMovieService } from './actor-movie.service';
import { CreateActorMovieDto } from './dto/create-actor-movie.dto';
import { UpdateActorMovieDto } from './dto/update-actor-movie.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("ActorMOvie")
@Controller('actor-movie')
export class ActorMovieController {
  constructor(private readonly actorMovieService: ActorMovieService) {}

  @Post()
  create(@Body() createActorMovieDto: CreateActorMovieDto) {
    return this.actorMovieService.create(createActorMovieDto);
  }

  @Get()
  findAll() {
    return this.actorMovieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actorMovieService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActorMovieDto: UpdateActorMovieDto) {
    return this.actorMovieService.update(+id, updateActorMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actorMovieService.remove(+id);
  }
}
