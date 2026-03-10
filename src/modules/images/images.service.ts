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
    const accessKey = this.configService.get<string>('UNSPLASH_ACCESS_KEY');

    try {
      const { data } = await firstValueFrom(
        this.httpService.get('https://api.unsplash.com/search/photos', {
          params: { query: country, per_page: 6 },
          headers: { Authorization: `Client-ID ${accessKey}` },
        }),
      );

      const images: string[] = data.results.map(
        (photo: { urls: { regular: string } }) => photo.urls.regular,
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
