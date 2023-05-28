import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ProductResponse } from '../interfaces/products.interface';

@Injectable()
export class ProductsApiService {
  constructor(private readonly httpService: HttpService) {}

  async getProductByUUID(productUUID: string): Promise<ProductResponse> {
    try {
      return this.httpService.axiosRef
        .get(`/products/${productUUID}`)
        .then((response) => {
          return response.data;
        });
    } catch (error) {
      Logger.error({
        message: 'Error getting product by uuid',
        error: error.response?.data,
      });
    }
  }
}
