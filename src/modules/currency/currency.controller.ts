import { Controller, Get, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('convert')
  convert(@Query('from') from: string, @Query('to') to: string) {
    return this.currencyService.convertCurrency(from, to);
  }
}
