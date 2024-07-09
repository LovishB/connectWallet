import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Calculation } from './dtos/calculation.dto';
import { NestJSWeb3Adapter } from 'src/nestjs-web3/nestjs-web3.adapter';
import { Web3AdapterService } from 'src/contract-web3/web3-adapter.service';

@Controller('app')
export class AppController {

    constructor(
        private readonly nestjsweb3Adapter: NestJSWeb3Adapter,
        private readonly web3Adapter: Web3AdapterService 
    ) {}

    @MessagePattern('cal')
    async cal(data: Calculation): Promise<string> {
        console.log(
            `${data.cal}: ${data.num1} to ${data.num2}`,
        );
        if (data.cal === 'sum') {
            return this.web3Adapter.addition(data.num1, data.num2);
        } else if (data.cal === 'sub') {
            return this.web3Adapter.subtraction(data.num1, data.num2);
        } else if (data.cal === 'mul') {
            return this.web3Adapter.multiplication(data.num1, data.num2);
        } else {
            throw new Error('Invalid calculation type');
        }
    }

    @MessagePattern('checkBalance')
    async checkBalance() {
        return this.nestjsweb3Adapter.getBalance();
    }

    @MessagePattern('latestBlock')
    async latestBlock() {
        return this.nestjsweb3Adapter.getLatestBlockNumber();
    }

    @MessagePattern('transfer')
    async transfer() {
        return this.nestjsweb3Adapter.transfer();
    }

}
