// src/app.module.ts
import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaModule } from './kafka/kafka.module';
import { MovieModule } from './movie/movie.module';
import { MovieKafkaConsumer } from './movie/movie.kafka-consumer';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database-1.c7y2mgqsuxz6.us-west-2.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: '12345678',
      database: 'movies',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    KafkaModule,
    MovieModule,
  ],
  providers: [MovieKafkaConsumer],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly movieKafkaConsumer: MovieKafkaConsumer) {}

  async onModuleInit() {
    this.movieKafkaConsumer.onModuleInit();
  }
}
