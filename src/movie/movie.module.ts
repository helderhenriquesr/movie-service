// src/movie/movie.module.ts
import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { Movie } from './movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaModule } from '../kafka/kafka.module';
import { MovieKafkaConsumer } from './movie.kafka-consumer';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), KafkaModule],
  providers: [MovieService, MovieKafkaConsumer],
  controllers: [MovieController],
  exports: [MovieService],
})
export class MovieModule {}
