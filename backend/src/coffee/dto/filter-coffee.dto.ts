import { Transform } from "class-transformer";
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  Max,
  Min,
} from "class-validator";

import { CoffeeTypeDto } from "./create-coffee.dto";

export class FilterCoffeeDto {
  @IsOptional()
  @IsEnum(CoffeeTypeDto, {
    message: 'type must be either "arabic" or "robusta"',
  })
  type?: CoffeeTypeDto;

  @IsOptional()
  @Transform(({ value }: { value: string }) => Number.parseInt(value, 10))
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }: { value: string }) => Number.parseInt(value, 10))
  @IsInt()
  @IsPositive()
  @Max(50)
  limit?: number = 12;
}
