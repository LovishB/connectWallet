import { Module } from '@nestjs/common';
import { Web3AdapterService } from './web3-adapter.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Web3 from 'web3';

@Module({
    imports:[
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ConfigModule
    ],
    providers:[
        {
            provide: 'Web3',
            useFactory: (configService: ConfigService) => {
              return new Web3(configService.get<string>('INFURA_SEPOLIA_URL'));
            },
            inject: [ConfigService],
        },
        {
            provide: 'Config',
            useFactory: (configService: ConfigService) => {
              return {
                wallet: configService.get<string>('WALLET'),
                privateKey: configService.get<string>('PRIVATE_KEY'),
                contractAbi: JSON.parse(configService.get<string>('CONTRACT_ABI')),
                contractAddress: configService.get<string>('CONTRACT_ADDRESS'),
              };
            },
            inject: [ConfigService],
        },
        Web3AdapterService],
        exports: [
            Web3AdapterService
          ],
})
export class ContractWeb3Module {}
