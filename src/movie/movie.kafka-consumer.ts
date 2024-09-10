// src/movie/movie.kafka-consumer.ts
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { MovieService } from './movie.service';

@Injectable()
export class MovieKafkaConsumer implements OnModuleInit {
  private readonly logger = new Logger(MovieKafkaConsumer.name);

  constructor(
    @Inject('KAFKA_SERVICE') private readonly clientKafka: ClientKafka,
    private readonly movieService: MovieService,
  ) {}

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf('movie_topic');
    await this.clientKafka.connect();
  }

  async handleMessage(message: any) {
    const { id } = message.value;
    try {
      const movie = await this.movieService.findMovieById(id);
      if (movie) {
        this.logger.log(`Movie found: ${JSON.stringify(movie)}`);
      } else {
        this.logger.warn(`Movie with id ${id} not found`);
      }
    } catch (error) {
      this.logger.error(`Error handling message: ${error.message}`);
    }
  }
}
