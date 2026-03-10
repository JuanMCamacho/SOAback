import { Controller, Get, Param } from '@nestjs/common';
import { CountryService } from './country.service';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get(':name')
  getCountry(@Param('name') name: string) {
    return this.countryService.getCountryByName(name);
  }
}
