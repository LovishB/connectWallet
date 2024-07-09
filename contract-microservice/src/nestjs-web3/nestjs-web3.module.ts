import { Module } from '@nestjs/common';
import { CreateWeb3jsServiceDto, Web3jsModule } from 'nestjs-web3js';
import { NestJSWeb3Adapter } from './nestjs-web3.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        Web3jsModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
              infuraUrl: `https://sepolia.infura.io/v3/${configService.get<string>('INFURA_API_KEY')}`,
            }),
        }),      
    ],
    providers: [
        {
          provide: 'Config',
          useFactory: (configService: ConfigService) => ({
            wallet: configService.get('WALLET'),
            privateKey: configService.get('PRIVATE_KEY'),
          }),
          inject: [ConfigService],
        },
        NestJSWeb3Adapter,
      ],
      exports: [
        NestJSWeb3Adapter,
        Web3jsModule,
      ]
})

export class NestjsWeb3Module {}
