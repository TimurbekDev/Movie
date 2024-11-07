import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReviewsService, updateDeleteReviewresult } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Review } from './entities';
import { Protected, Roles } from '@decorators';
import { UserRoles } from '../user';

@ApiTags('Reviews')
@ApiBearerAuth('auth')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}
  @Protected(true)
  @Roles([UserRoles.ADMIN,UserRoles.BASIC])
  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  findAll(): Promise<Review[]> {
    return this.reviewsService.findAll();
  }

  @Protected(true)
  @Roles([UserRoles.ADMIN])
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Review> {
    return this.reviewsService.findOne(+id);
  }

  @Protected(true)
  @Roles([UserRoles.ADMIN,UserRoles.BASIC])
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<updateDeleteReviewresult> {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Protected(true)
  @Roles([UserRoles.ADMIN,UserRoles.BASIC])
  @Delete(':id')
  remove(@Param('id') id: string): Promise<updateDeleteReviewresult> {
    return this.reviewsService.remove(+id);
  }
}
