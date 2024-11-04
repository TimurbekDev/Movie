import { unlink } from 'fs';
import { join } from 'path';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ICreateMovieRequest, IUpdateMovieRequest } from './interfaces';
import { InjectModel } from '@nestjs/sequelize';
import { Movie } from './models';
import { Review } from '../reviews/entities/review.entity';
import { User } from '../users';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie) private movieModel: typeof Movie) {}

  async create(payload: ICreateMovieRequest): Promise<Movie> {
    return await this.movieModel.create(payload);
  }

  async findAll(): Promise<Movie[]> {
    return await this.movieModel.findAll({
      include: [
        {
          model: Review,
          attributes: ['user_id', 'text'],
          include: [{ model: User }],
        },
      ],
    });
  }

  async findOne(id: number): Promise<Movie> {
    if (!(await this.movieModel.findByPk(id))) {
      throw new NotFoundException('Movie not found');
    }
    return await this.movieModel.findByPk(id);
  }

  async update(id: number, payload: IUpdateMovieRequest): Promise<Movie> {
    const updated_movie = await this.movieModel.findByPk(id);
    if (!updated_movie) {
      throw new NotFoundException('Movie not found');
    }

    await this.movieModel.update(
      {
        name: payload?.name ? payload?.name : updated_movie.name,
        description: payload?.description
          ? payload?.description
          : updated_movie.description,
        image: payload?.image ? payload?.image : updated_movie.image,
        video: payload?.video ? payload?.video : updated_movie.video,
        language: payload?.language
          ? payload?.language
          : updated_movie.language,
        country: payload?.country ? payload?.country : updated_movie.country,
        category_id: payload?.category_id
          ? payload?.category_id
          : updated_movie.category_id,
      },
      { where: { id } },
    );

    // // Avvalgi rasmni o'chirib yuborish
    if (payload?.image) {
      unlink(
        join(__dirname, '..', '..', '..', 'uploads', updated_movie.image),
        (err) => {
          if (err)
            console.log("File o'chirishda xatolik yoki fayl mavjud emas");
        },
      );
    }

    // // Avvalgi videoni o'chirib yuborish
    if (payload?.video) {
      unlink(
        join(__dirname, '..', '..', '..', 'uploads', updated_movie.video),
        (err) => {
          if (err)
            console.log("File o'chirishda xatolik yoki fayl mavjud emas");
        },
      );
    }

    const movie = await this.movieModel.findByPk(id);
    return movie;
  }

  async remove(id: number) {
    const deleted_movie = await this.movieModel.findByPk(id);
    if (!deleted_movie) {
      throw new NotFoundException('Movie not found');
    }

    if (deleted_movie?.image) {
      unlink(
        join(__dirname, '..', '..', '..', 'uploads', deleted_movie.image),
        (err) => {
          if (err)
            console.log("File o'chirishda xatolik yoki fayl mavjud emas");
        },
      );
    }

    if (deleted_movie?.video) {
      unlink(
        join(__dirname, '..', '..', '..', 'uploads', deleted_movie.video),
        (err) => {
          if (err)
            console.log("File o'chirishda xatolik yoki fayl mavjud emas");
        },
      );
    }

    await this.movieModel.destroy({ where: { id } });

    return "Successfully deleted movie"
  }
}
