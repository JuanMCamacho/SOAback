import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CountryResponseDto } from './dto/country-response.dto';

@Injectable()
export class CountryService {
  constructor(private readonly httpService: HttpService) {}

  async getCountryByName(name: string): Promise<CountryResponseDto> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`https://restcountries.com/v3.1/name/${name}`),
      );

      const country = data[0];
      const currencyCode = country.currencies
        ? Object.keys(country.currencies)[0]
        : 'N/A';
      const currencyInfo = country.currencies?.[currencyCode];
      const language = country.languages
        ? (Object.values(country.languages)[0] as string)
        : 'N/A';

      return {
        name: country.name.common,
        capital: country.capital?.[0] ?? 'N/A',
        population: country.population,
        currency: currencyCode,
        currencyName: currencyInfo?.name ?? 'N/A',
        flag: country.flags?.png ?? country.flags?.svg ?? '',
        language,
      };
    } catch {
      throw new HttpException('Country not found', HttpStatus.NOT_FOUND);
    }
  }
}
