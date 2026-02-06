import { Test, TestingModule } from "@nestjs/testing";

import { CoffeeController } from "./coffee.controller";
import { CoffeeService } from "./coffee.service";
import { CoffeeTypeDto, CreateCoffeeDto, FilterCoffeeDto } from "./dto";

const mockCoffeeService = {
  create: jest.fn(),
  findAll: jest.fn(),
};

jest.mock("../prisma/prisma.service", () => ({
  PrismaService: jest.fn(),
}));

describe("CoffeeController", () => {
  let controller: CoffeeController;

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
      controllers: [CoffeeController],
      providers: [
        {
          provide: CoffeeService,
          useValue: mockCoffeeService,
        },
      ],
    }).compile();

    controller = module.get<CoffeeController>(CoffeeController);

    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should return paginated coffees", async () => {
      const expectedResult = {
        data: [mockCoffee],
        meta: {
          limit: 12,
          page: 1,
          total: 1,
          totalPages: 1,
        },
      };
      mockCoffeeService.findAll.mockResolvedValue(expectedResult);

      const filterDto: FilterCoffeeDto = {};
      const result = await controller.findAll(filterDto);

      expect(result).toEqual(expectedResult);
      expect(mockCoffeeService.findAll).toHaveBeenCalledWith(filterDto);
    });

    it("should pass filter parameters to service", async () => {
      const expectedResult = {
        data: [mockCoffee],
        meta: { limit: 10, page: 2, total: 1, totalPages: 1 },
      };
      mockCoffeeService.findAll.mockResolvedValue(expectedResult);

      const filterDto: FilterCoffeeDto = {
        limit: 10,
        page: 2,
        type: CoffeeTypeDto.ARABIC,
      };
      await controller.findAll(filterDto);

      expect(mockCoffeeService.findAll).toHaveBeenCalledWith(filterDto);
    });
  });

  describe("create", () => {
    it("should create a new coffee", async () => {
      const createCoffeeDto: CreateCoffeeDto = {
        description: "A new coffee",
        imageUrl: "https://example.com/new-coffee.jpg",
        name: "New Coffee",
        price: 15.99,
        type: CoffeeTypeDto.ROBUSTA,
      };
      const expectedResult = {
        id: "123e4567-e89b-12d3-a456-426614174001",
        ...createCoffeeDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockCoffeeService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createCoffeeDto);

      expect(result).toEqual(expectedResult);
      expect(mockCoffeeService.create).toHaveBeenCalledWith(createCoffeeDto);
    });
  });
});
