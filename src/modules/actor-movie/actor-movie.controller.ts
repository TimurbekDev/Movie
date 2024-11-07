import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActorMovieService } from './actor-movie.service';
import { CreateActorMovieDto } from './dto/create-actor-movie.dto';
import { UpdateActorMovieDto } from './dto/update-actor-movie.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Protected, Roles } from '@decorators';
import { UserRoles } from '../user';

@ApiTags("ActorMOvie")
@ApiBearerAuth('auth')
@Controller('actor-movie')
export class ActorMovieController {
  constructor(private readonly actorMovieService: ActorMovieService) {}

  @Protected(true)
  @Roles([UserRoles.ADMIN])
  @Post()
  create(@Body() createActorMovieDto: CreateActorMovieDto) {
    return this.actorMovieService.create(createActorMovieDto);
  }

  @Protected(true)
  @Roles([UserRoles.ADMIN])
  @Get()
  findAll() {
    return this.actorMovieService.findAll();
  }


  @Protected(true)
  @Roles([UserRoles.ADMIN])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actorMovieService.findOne(+id);
  }

  @Protected(true)
  @Roles([UserRoles.ADMIN])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActorMovieDto: UpdateActorMovieDto) {
    return this.actorMovieService.update(+id, updateActorMovieDto);
  }

  @Protected(true)
  @Roles([UserRoles.ADMIN])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actorMovieService.remove(+id);
  }
}
