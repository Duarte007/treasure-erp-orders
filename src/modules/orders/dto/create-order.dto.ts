import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class OrderItemsDTO {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  product_uuid: string;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  quantity: number;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  price: number;
}

export class OrderCustomerDTO {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  uuid: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  document: string;
}

export class OrderPaymentDTO {
  @ApiProperty()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  method: number;
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  amount: number;
  @ApiProperty()
  @IsDefined()
  @IsDateString()
  @IsNotEmpty()
  date: Date;
}

export class CreateOrderDTO {
  @ApiProperty({ type: OrderCustomerDTO })
  @IsDefined()
  @ValidateNested()
  customer: OrderCustomerDTO;
  @ApiProperty({ type: OrderPaymentDTO })
  @IsDefined()
  @ValidateNested()
  payment: OrderPaymentDTO;
  @ApiProperty({ type: OrderItemsDTO, isArray: true })
  @IsDefined()
  @ValidateNested()
  items: OrderItemsDTO[];
  @ApiProperty()
  @IsDefined()
  @IsDateString()
  date: Date;
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  value: number;
}
