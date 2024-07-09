import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Calculation } from './dtos/calculation.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('cal')
  cal(@Body() calDto: Calculation) {
    console.log(
      `${calDto.cal}: ${calDto.num1} to ${calDto.num2}`,
    );
    return this.appService.calculation(calDto);
  }

  @Get('checkBalance')
  checkBalance() {
    console.log( 'Checking Balance of my wallet');
    return this.appService.checkBalance();
  }

  @Get('latestBlock')
  latestBlock() {
    console.log( 'Checking latestBlock of Sepolia');
    return this.appService.latestBlock();
  }
  
  @Get('transfer')
  transfer() {
    console.log( 'Transfering Sepolia');
    return this.appService.transfer();
  }
}
