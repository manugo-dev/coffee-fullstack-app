import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from "@nestjs/common";

import { CoffeeService } from "./coffee.service";
import { CreateCoffeeDto, FilterCoffeeDto } from "./dto";

@Controller("coffees")
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Get()
  findAll(@Query() filterDto: FilterCoffeeDto) {
    return this.coffeeService.findAll(filterDto);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeeService.create(createCoffeeDto);
  }
}
