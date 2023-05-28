import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsApiService } from './services/products.api.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get('PRODUCTS_API_URL'),
        maxRedirects: 3,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [ProductsApiService],
  exports: [ProductsApiService],
})
export class ProductsApiModule {}
