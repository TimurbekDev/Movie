import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './entities/review.entity';

export declare interface updateDeleteReviewresult {
  message: string
}

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review) private reviewModel: typeof Review){}
  async create(createReviewDto: CreateReviewDto) {
    return await this.reviewModel.create(createReviewDto) ;
  }

  async findAll(): Promise<Review[]> {
    return await this.reviewModel.findAll();
  }

  async findOne(id: number): Promise<Review> {
    return await this.reviewModel.findByPk(id);
  }

  async update(id: number, updateReviewDto: UpdateReviewDto):Promise<updateDeleteReviewresult> {
    const foundedReview = await this.reviewModel.findByPk(id)
    if(!foundedReview){
      throw new NotFoundException("Review not found")
    }
    return {
      message: "Review updated"
    };
  }

  async remove(id: number): Promise<updateDeleteReviewresult> {
    const foundedReview = await this.reviewModel.findByPk(id)
    if(!foundedReview){
      throw new NotFoundException("Review not found")
    }
    return {
      message: "Review deleted"
    };
  }
}
