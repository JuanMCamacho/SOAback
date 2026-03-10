import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';

@Module({
  imports: [HttpModule],
  controllers: [CountryController],
  providers: [CountryService],
  exports: [CountryService],
})
export class CountryModule {}
