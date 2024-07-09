import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

 @Module({
  imports: [
    ClientsModule.register([
      //importing redis client
      {
        name: "MATH_SERVICE",
        transport: Transport.REDIS,
        options: {
            host: 'redis',
            port: 6379,
        },
      },
    ]),
  ],
  exports: [
    ClientsModule.register([
      //exporting redis client
      {
        name: "MATH_SERVICE",
        transport: Transport.REDIS,
        options: {
            host: 'redis',
            port: 6379,
        },
      },
    ]),
  ],
})

export class RedisClientModule {}