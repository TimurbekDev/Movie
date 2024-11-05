import { Injectable, NotFoundException } from '@nestjs/common';
import { ICreateMovieRequest, IUpdateMovieRequest } from './interfaces';
import { InjectModel } from '@nestjs/sequelize';
import { Movie } from './models';
import { Review } from '../reviews/entities/review.entity';
import { User } from '../users';

import { Actor } from '../actor';

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
          include: [
            { 
              model: User
            }
          ],
        },
        {
          model: Actor,
          through: {attributes: []}
        }
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
    if (!(await this.movieModel.findByPk(id))) {
      throw new NotFoundException('Movie not found');
    }
    await this.movieModel.update(payload, { where: { id } });
    const movie = await this.movieModel.findByPk(id);
    return movie;
  }

  async remove(id: number) {
    if (!(await this.movieModel.findByPk(id))) {
      throw new NotFoundException('Movie not found');
    }

    return await this.movieModel.destroy({ where: { id } });
  }
}
