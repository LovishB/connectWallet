import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Calculation } from './dtos/calculation.dto';

@Injectable()
export class AppService {

  constructor(@Inject('MATH_SERVICE') private redisClient: ClientProxy) {}

  async calculation(data: Calculation): Promise<any> {
    return await this.redisClient.send('cal', data);
  }

  async checkBalance() {
    return await this.redisClient.send('checkBalance', {});
  }

  async latestBlock() {
    return await this.redisClient.send('latestBlock', {});
  }

  async transfer() {
    return await this.redisClient.send('transfer', {});
  }
}
