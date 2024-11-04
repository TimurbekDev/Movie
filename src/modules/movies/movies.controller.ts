import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { UpdateMovieDto } from './dtos/update-movie.dto';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/config';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiOperation({ summary: 'Yangi movie yaratish' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'video', maxCount: 1 },
      ],
      multerConfig,
    ),
  )
  @Post()
  create(
    @Body() createMovieDto: CreateMovieDto,
    @UploadedFiles()
    files: { image: Express.Multer.File[]; video: Express.Multer.File[] },
  ) {
    return this.moviesService.create({
      ...createMovieDto,
      image: files?.image ? files?.image[0]?.filename : '',
      video: files?.video ? files?.video[0]?.filename : '',
    });
  }

  @ApiOperation({ summary: 'Barcha movielarni olish' })
  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @ApiOperation({ summary: `Bitta movieni idsi bo'yicha olish` })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.findOne(id);
  }

  @ApiOperation({ summary: 'Yangi movie yaratish' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'video', maxCount: 1 },
      ],
      multerConfig,
    ),
  )
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMovieDto: UpdateMovieDto,
    @UploadedFiles() files: { image: Express.Multer.File[], video: Express.Multer.File[] },
  ) {
    return this.moviesService.update(id, {
      ...updateMovieDto,
      image: files?.image ? files?.image[0]?.filename : "",
      video: files?.video ? files?.video[0]?.filename : "",
    });
  }

  @ApiOperation({ summary: "movieni idsi bo'yicha o'chirish" })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.remove(id);
  }
}
