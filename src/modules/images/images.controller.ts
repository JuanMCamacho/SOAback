import { Controller, Get, Param } from '@nestjs/common';
import { ImagesService } from './images.service';

@Controller('countries')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get(':name/images')
  getImages(@Param('name') name: string) {
    return this.imagesService.getImagesByCountry(name);
  }
}
