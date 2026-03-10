import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CurrencyResponseDto } from './dto/currency-response.dto';

@Injectable()
export class CurrencyService {
  constructor(private readonly httpService: HttpService) {}

  async convertCurrency(
    from: string,
    to: string,
  ): Promise<CurrencyResponseDto> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get('https://api.frankfurter.app/latest', {
          params: { from, to },
        }),
      );

      return {
        from,
        to,
        rate: data.rates[to],
      };
    } catch {
      throw new HttpException(
        'Failed to fetch exchange rate',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
