import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { ImagesResponseDto } from './dto/images-response.dto';

@Injectable()
export class ImagesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getImagesByCountry(country: string): Promise<ImagesResponseDto> {
    const apiKey = this.configService.get<string>('PEXELS_API_KEY');

    try {
      const { data } = await firstValueFrom(
        this.httpService.get('https://api.pexels.com/v1/search', {
          params: { query: country, per_page: 6 },
          headers: { Authorization: apiKey },
        }),
      );

      const images: string[] = data.photos.map(
        (photo: { src: { large: string } }) => photo.src.large,
      );

      return { images };
    } catch {
      throw new HttpException(
        'Failed to fetch images',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
