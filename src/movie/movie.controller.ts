// src/movie/movie.controller.ts
import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get(':id')
  async getMovie(@Param('id') id: number) {
    const movie = await this.movieService.findMovieById(id);
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }
}
