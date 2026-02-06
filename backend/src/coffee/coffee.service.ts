import { ConflictException, Injectable } from "@nestjs/common";

import { CoffeeType } from "~prisma/client";

import { PrismaService } from "../prisma/prisma.service";
import { CreateCoffeeDto, FilterCoffeeDto } from "./dto";

@Injectable()
export class CoffeeService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filterDto: FilterCoffeeDto) {
    const { limit = 12, page = 1, type } = filterDto;
    const skip = (page - 1) * limit;

    const where = type ? { type: type as CoffeeType } : {};

    const [coffees, total] = await Promise.all([
      this.prisma.coffee.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        where,
      }),
      this.prisma.coffee.count({ where }),
    ]);

    return {
      data: coffees,
      meta: {
        limit,
        page,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const existingCoffee = await this.prisma.coffee.findUnique({
      where: { name: createCoffeeDto.name },
    });

    if (existingCoffee) {
      throw new ConflictException(
        `Coffee with name "${createCoffeeDto.name}" already exists`,
      );
    }

    return this.prisma.coffee.create({
      data: {
        description: createCoffeeDto.description,
        imageUrl: createCoffeeDto.imageUrl,
        name: createCoffeeDto.name,
        price: createCoffeeDto.price,
        type: createCoffeeDto.type as CoffeeType,
      },
    });
  }
}
