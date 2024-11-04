import { PartialType } from '@nestjs/mapped-types';
import { CreateActorMovieDto } from './create-actor-movie.dto';

export class UpdateActorMovieDto extends PartialType(CreateActorMovieDto) {}
