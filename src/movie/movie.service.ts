// src/movie/movie.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
  private readonly logger = new Logger(MovieService.name);

  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async findMovieById(id: number): Promise<Movie | null> {
    try {
      return await this.movieRepository.findOneBy({ id });
    } catch (error) {
      this.logger.error('Error finding movie', error.stack);
      throw new Error('Error finding movie');
    }
  }
}
