import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
} from "class-validator";

export enum CoffeeTypeDto {
  ARABIC = "arabic",
  ROBUSTA = "robusta",
}

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
  price: number;

  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;
}
