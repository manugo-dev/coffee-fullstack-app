import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  Max,
  MaxLength,
} from "class-validator";

export enum CoffeeTypeDto {
  ARABIC = "arabic",
  ROBUSTA = "robusta",
}

// PostgreSQL DECIMAL(10,2) max value
const MAX_PRICE = 99_999_999.99;

export class CreateCoffeeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description: string;

  @IsEnum(CoffeeTypeDto, {
    message: 'type must be either "arabic" or "robusta"',
  })
  type: CoffeeTypeDto;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Max(MAX_PRICE, { message: `price cannot exceed ${MAX_PRICE}` })
  price: number;

  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;
}
