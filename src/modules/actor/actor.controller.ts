import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ActorService, updateDeleteActorResponse } from './actor.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { Actor } from './entities';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Protected, Roles } from '@decorators';
import { UserRoles } from '../user';

@ApiTags('Actor')
@ApiBearerAuth('auth')
@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Protected(true)
  @Roles([UserRoles.ADMIN])
  @Post()
  create(@Body() createActorDto: CreateActorDto) {
    return this.actorService.create(createActorDto);
  }

  @Protected(true)
  @Roles([UserRoles.ADMIN])
  @Get()
  findAll(): Promise<Actor[]> {
    return this.actorService.findAll();
  }

  @Protected(true)
  @Roles([UserRoles.ADMIN])
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Actor> {
    return this.actorService.findOne(+id);
  }


  @Protected(true)
  @Roles([UserRoles.ADMIN])
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateActorDto: UpdateActorDto,
  ): Promise<updateDeleteActorResponse> {
    return this.actorService.update(+id, updateActorDto);
  }

  @Protected(true)
  @Roles([UserRoles.ADMIN])
  @Delete(':id')
  remove(@Param('id') id: string): Promise<updateDeleteActorResponse> {
    return this.actorService.remove(+id);
  }
}
