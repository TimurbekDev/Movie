import { Injectable, NotFoundException } from '@nestjs/common';
import { ICreateMovieRequest, IGetMoviesQuery, IUpdateMovieRequest } from './interfaces';
import { InjectModel } from '@nestjs/sequelize';
import { Movie } from './models';
import { Review } from '../reviews/entities/review.entity';

import { Actor } from '../actor';
import { User } from '../user';
import { Op } from 'sequelize';
import { SORT } from './enums';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie) private movieModel: typeof Movie) { }

  async create(payload: ICreateMovieRequest): Promise<Movie> {
    return await this.movieModel.create(payload);
  }

  async findAll(query: Partial<IGetMoviesQuery>) {

    const whereConditions: { language?: object; country?: object, [Op.or]?: object[]; } = {}

    if (query?.name)
      whereConditions[Op.or] = [{ 'name': { [Op.iLike]: `%${query.name}%` } }, { 'description': { [Op.iLike]: `%${query.name}%` } }]

    if (query?.language)
      whereConditions.language = { [Op.iLike]: `%${query.language}%` };

    if (query?.country)
      whereConditions.country = { [Op.iLike]: `%${query.country}%` };

    const result = await this.movieModel.findAndCountAll({
      where: {
        ...whereConditions
      },
      offset: (query?.page - 1) * query?.limit || 0,
      limit: query?.limit || 10
    });

    return {
      count: result.count,
      page: Number(query?.page || 1),
      limit: Number(query?.limit || 10),
      result: result.rows
    }
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
