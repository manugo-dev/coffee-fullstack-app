import { ConflictException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { PrismaService } from "../prisma/prisma.service";
import { CoffeeService } from "./coffee.service";
import { CoffeeTypeDto, CreateCoffeeDto } from "./dto";

const mockCoffeeMethods = {
  count: jest.fn(),
  create: jest.fn(),
  findMany: jest.fn(),
  findUnique: jest.fn(),
};

const mockPrismaService = {
  coffee: mockCoffeeMethods,
} as unknown as PrismaService;

jest.mock("../prisma/prisma.service", () => ({
  PrismaService: jest.fn().mockImplementation(() => mockPrismaService),
}));

describe("CoffeeService", () => {
  let service: CoffeeService;

  const mockCoffee = {
    createdAt: new Date(),
    description: "A test coffee",
    id: "123e4567-e89b-12d3-a456-426614174000",
    imageUrl: "https://example.com/coffee.jpg",
    name: "Test Coffee",
    price: 12.5,
    type: "arabic",
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CoffeeService,
          useFactory: () => new CoffeeService(mockPrismaService),
        },
      ],
    }).compile();

    service = module.get<CoffeeService>(CoffeeService);

    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should return paginated coffees without filters", async () => {
      const coffees = [mockCoffee];
      mockCoffeeMethods.findMany.mockResolvedValue(coffees);
      mockCoffeeMethods.count.mockResolvedValue(1);

      const result = await service.findAll({});

      expect(result).toEqual({
        data: coffees,
        meta: {
          limit: 12,
          page: 1,
          total: 1,
          totalPages: 1,
        },
      });
      expect(mockCoffeeMethods.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: "desc" },
        skip: 0,
        take: 12,
        where: {},
      });
    });

    it("should filter by coffee type", async () => {
      const coffees = [mockCoffee];
      mockCoffeeMethods.findMany.mockResolvedValue(coffees);
      mockCoffeeMethods.count.mockResolvedValue(1);

      const result = await service.findAll({ type: CoffeeTypeDto.ARABIC });

      expect(result.data).toEqual(coffees);
      expect(mockCoffeeMethods.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: "desc" },
        skip: 0,
        take: 12,
        where: { type: "arabic" },
      });
    });

    it("should apply pagination correctly", async () => {
      mockCoffeeMethods.findMany.mockResolvedValue([]);
      mockCoffeeMethods.count.mockResolvedValue(25);

      const result = await service.findAll({ limit: 10, page: 2 });

      expect(result.meta).toEqual({
        limit: 10,
        page: 2,
        total: 25,
        totalPages: 3,
      });
      expect(mockCoffeeMethods.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: "desc" },
        skip: 10,
        take: 10,
        where: {},
      });
    });

    it("should calculate totalPages correctly when total is not divisible by limit", async () => {
      mockCoffeeMethods.findMany.mockResolvedValue([]);
      mockCoffeeMethods.count.mockResolvedValue(23);

      const result = await service.findAll({ limit: 10 });

      expect(result.meta.totalPages).toBe(3);
    });
  });

  describe("create", () => {
    const createCoffeeDto: CreateCoffeeDto = {
      description: "A new coffee",
      imageUrl: "https://example.com/new-coffee.jpg",
      name: "New Coffee",
      price: 15.99,
      type: CoffeeTypeDto.ROBUSTA,
    };

    it("should create a coffee successfully", async () => {
      mockCoffeeMethods.findUnique.mockResolvedValue(null);
      mockCoffeeMethods.create.mockResolvedValue({
        id: "123e4567-e89b-12d3-a456-426614174001",
        ...createCoffeeDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await service.create(createCoffeeDto);

      expect(result.name).toBe(createCoffeeDto.name);
      expect(mockCoffeeMethods.findUnique).toHaveBeenCalledWith({
        where: { name: createCoffeeDto.name },
      });
      expect(mockCoffeeMethods.create).toHaveBeenCalledWith({
        data: {
          description: createCoffeeDto.description,
          imageUrl: createCoffeeDto.imageUrl,
          name: createCoffeeDto.name,
          price: createCoffeeDto.price,
          type: createCoffeeDto.type,
        },
      });
    });

    it("should throw ConflictException when coffee name already exists", async () => {
      mockCoffeeMethods.findUnique.mockResolvedValue(mockCoffee);

      await expect(service.create(createCoffeeDto)).rejects.toThrow(
        ConflictException,
      );
      await expect(service.create(createCoffeeDto)).rejects.toThrow(
        `Coffee with name "${createCoffeeDto.name}" already exists`,
      );
      expect(mockCoffeeMethods.create).not.toHaveBeenCalled();
    });
  });
});
