import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";

import { AppModule } from "./../src/app.module";
import { PrismaService } from "./../src/prisma/prisma.service";
import { App } from "supertest/types";

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

const mockPrismaService = {
  $connect: jest.fn().mockResolvedValue(undefined),
  $disconnect: jest.fn().mockResolvedValue(undefined),
  coffee: {
    count: jest.fn(),
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
  onModuleDestroy: jest.fn().mockResolvedValue(undefined),
  onModuleInit: jest.fn().mockResolvedValue(undefined),
};

describe("App (e2e)", () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Ensure mock methods return promises
    mockPrismaService.$connect.mockResolvedValue(undefined);
    mockPrismaService.$disconnect.mockResolvedValue(undefined);
    mockPrismaService.onModuleInit.mockResolvedValue(undefined);
    mockPrismaService.onModuleDestroy.mockResolvedValue(undefined);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        forbidNonWhitelisted: true,
        transform: true,
        whitelist: true,
      }),
    );

    await app.init();
  });

  afterEach(async () => {
    if (app) {
      await app.close();
    }
    jest.clearAllMocks();
  });

  describe("AppController", () => {
    it("/health (GET)", () => {
      return request(app.getHttpServer())
        .get("/health")
        .expect(200)
        .expect("OK");
    });
  });

  describe("CoffeeController", () => {
    describe("GET /coffees", () => {
      it("should return paginated coffees", () => {
        mockPrismaService.coffee.findMany.mockResolvedValue([mockCoffee]);
        mockPrismaService.coffee.count.mockResolvedValue(1);

        return request(app.getHttpServer())
          .get("/coffees")
          .expect(200)
          .expect((res) => {
            expect(res.body.data).toHaveLength(1);
            expect(res.body.data[0]).toMatchObject({
              description: mockCoffee.description,
              id: mockCoffee.id,
              imageUrl: mockCoffee.imageUrl,
              name: mockCoffee.name,
              price: mockCoffee.price,
              type: mockCoffee.type,
            });
            expect(res.body.meta).toMatchObject({
              limit: 12,
              page: 1,
              total: 1,
              totalPages: 1,
            });
          });
      });

      it("should filter by type", () => {
        mockPrismaService.coffee.findMany.mockResolvedValue([mockCoffee]);
        mockPrismaService.coffee.count.mockResolvedValue(1);

        return request(app.getHttpServer())
          .get("/coffees?type=arabic")
          .expect(200)
          .expect((res) => {
            expect(res.body.data).toBeInstanceOf(Array);
            expect(mockPrismaService.coffee.findMany).toHaveBeenCalled();
          });
      });

      it("should handle pagination", () => {
        mockPrismaService.coffee.findMany.mockResolvedValue([]);
        mockPrismaService.coffee.count.mockResolvedValue(25);

        return request(app.getHttpServer())
          .get("/coffees?page=2&limit=10")
          .expect(200)
          .expect((res) => {
            expect(res.body.meta).toMatchObject({
              limit: 10,
              page: 2,
              total: 25,
              totalPages: 3,
            });
          });
      });
    });

    describe("POST /coffees", () => {
      const createCoffeeDto = {
        description: "A new coffee",
        imageUrl: "https://example.com/new-coffee.jpg",
        name: "New Coffee",
        price: 15.99,
        type: "robusta",
      };

      it("should create a coffee successfully", () => {
        mockPrismaService.coffee.findUnique.mockResolvedValue(null);
        mockPrismaService.coffee.create.mockResolvedValue({
          ...mockCoffee,
          ...createCoffeeDto,
        });

        return request(app.getHttpServer())
          .post("/coffees")
          .send(createCoffeeDto)
          .expect(201)
          .expect((res) => {
            expect(res.body).toMatchObject(createCoffeeDto);
            expect(mockPrismaService.coffee.findUnique).toHaveBeenCalledWith({
              where: { name: createCoffeeDto.name },
            });
            expect(mockPrismaService.coffee.create).toHaveBeenCalled();
          });
      });

      it("should return 409 when coffee name already exists", () => {
        mockPrismaService.coffee.findUnique.mockResolvedValue(mockCoffee);

        return request(app.getHttpServer())
          .post("/coffees")
          .send(createCoffeeDto)
          .expect(409)
          .expect((res) => {
            expect(res.body.message).toContain("already exists");
          });
      });

      it("should validate required fields", () => {
        return request(app.getHttpServer())
          .post("/coffees")
          .send({})
          .expect(400);
      });

      it("should validate coffee type", () => {
        return request(app.getHttpServer())
          .post("/coffees")
          .send({
            ...createCoffeeDto,
            type: "invalid-type",
          })
          .expect(400);
      });
    });
  });
});
