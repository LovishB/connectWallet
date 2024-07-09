import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { NestjsWeb3Module } from './nestjs-web3/nestjs-web3.module';
import { ContractWeb3Module } from './contract-web3/contract-web3.module';

@Module({
  imports: [NestjsWeb3Module, ContractWeb3Module],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
