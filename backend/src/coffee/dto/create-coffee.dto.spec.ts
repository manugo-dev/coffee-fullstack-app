import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

import { CoffeeTypeDto, CreateCoffeeDto } from "./create-coffee.dto";

describe("CreateCoffeeDto", () => {
  const validDto = {
    description: "A delicious test coffee",
    imageUrl: "https://example.com/coffee.jpg",
    name: "Test Coffee",
    price: 12.5,
    type: CoffeeTypeDto.ARABIC,
  };

  it("should pass validation with valid data", async () => {
    const dto = plainToInstance(CreateCoffeeDto, validDto);
    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  describe("name", () => {
    it("should fail when name is empty", async () => {
      const dto = plainToInstance(CreateCoffeeDto, { ...validDto, name: "" });
      const errors = await validate(dto);

      expect(errors.some((error) => error.property === "name")).toBe(true);
    });

    it("should fail when name exceeds 100 characters", async () => {
      const dto = plainToInstance(CreateCoffeeDto, {
        ...validDto,
        name: "a".repeat(101),
      });
      const errors = await validate(dto);

      expect(errors.some((error) => error.property === "name")).toBe(true);
    });
  });

  describe("description", () => {
    it("should fail when description is empty", async () => {
      const dto = plainToInstance(CreateCoffeeDto, {
        ...validDto,
        description: "",
      });
      const errors = await validate(dto);

      expect(errors.some((error) => error.property === "description")).toBe(
        true,
      );
    });

    it("should fail when description exceeds 500 characters", async () => {
      const dto = plainToInstance(CreateCoffeeDto, {
        ...validDto,
        description: "a".repeat(501),
      });
      const errors = await validate(dto);

      expect(errors.some((error) => error.property === "description")).toBe(
        true,
      );
    });
  });

  describe("type", () => {
    it("should accept arabic type", async () => {
      const dto = plainToInstance(CreateCoffeeDto, {
        ...validDto,
        type: CoffeeTypeDto.ARABIC,
      });
      const errors = await validate(dto);

      expect(errors.length).toBe(0);
    });

    it("should accept robusta type", async () => {
      const dto = plainToInstance(CreateCoffeeDto, {
        ...validDto,
        type: CoffeeTypeDto.ROBUSTA,
      });
      const errors = await validate(dto);

      expect(errors.length).toBe(0);
    });

    it("should fail with invalid type", async () => {
      const dto = plainToInstance(CreateCoffeeDto, {
        ...validDto,
        type: "invalid",
      });
      const errors = await validate(dto);

      expect(errors.some((error) => error.property === "type")).toBe(true);
    });
  });

  describe("price", () => {
    it("should fail when price is negative", async () => {
      const dto = plainToInstance(CreateCoffeeDto, {
        ...validDto,
        price: -10,
      });
      const errors = await validate(dto);

      expect(errors.some((error) => error.property === "price")).toBe(true);
    });

    it("should fail when price has more than 2 decimal places", async () => {
      const dto = plainToInstance(CreateCoffeeDto, {
        ...validDto,
        price: 12.999,
      });
      const errors = await validate(dto);

      expect(errors.some((error) => error.property === "price")).toBe(true);
    });

    it("should fail when price is not a number", async () => {
      const dto = plainToInstance(CreateCoffeeDto, {
        ...validDto,
        price: "not-a-number",
      });
      const errors = await validate(dto);

      expect(errors.some((error) => error.property === "price")).toBe(true);
    });
  });

  describe("imageUrl", () => {
    it("should fail when imageUrl is not a valid URL", async () => {
      const dto = plainToInstance(CreateCoffeeDto, {
        ...validDto,
        imageUrl: "not-a-url",
      });
      const errors = await validate(dto);

      expect(errors.some((error) => error.property === "imageUrl")).toBe(true);
    });

    it("should fail when imageUrl is empty", async () => {
      const dto = plainToInstance(CreateCoffeeDto, {
        ...validDto,
        imageUrl: "",
      });
      const errors = await validate(dto);

      expect(errors.some((error) => error.property === "imageUrl")).toBe(true);
    });
  });
});
