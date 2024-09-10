import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class KafkaService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientProxy,
  ) {}

  sendMessage(pattern: string, message: any): Observable<any> {
    return this.kafkaClient.send(pattern, message);
  }
}
