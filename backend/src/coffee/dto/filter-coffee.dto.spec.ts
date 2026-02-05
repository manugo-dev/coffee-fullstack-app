import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

import { CoffeeTypeDto } from "./create-coffee.dto";
import { FilterCoffeeDto } from "./filter-coffee.dto";

describe("FilterCoffeeDto", () => {
  it("should pass validation with empty object (all optional)", async () => {
    const dto = plainToInstance(FilterCoffeeDto, {});
    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it("should have default values", () => {
    const dto = new FilterCoffeeDto();

    expect(dto.page).toBe(1);
    expect(dto.limit).toBe(12);
  });

  describe("type", () => {
    it("should accept arabic type", async () => {
      const dto = plainToInstance(FilterCoffeeDto, {
        type: CoffeeTypeDto.ARABIC,
      });
      const errors = await validate(dto);

      expect(errors.length).toBe(0);
    });

    it("should accept robusta type", async () => {
      const dto = plainToInstance(FilterCoffeeDto, {
        type: CoffeeTypeDto.ROBUSTA,
      });
      const errors = await validate(dto);

      expect(errors.length).toBe(0);
    });

    it("should fail with invalid type", async () => {
      const dto = plainToInstance(FilterCoffeeDto, { type: "invalid" });
      const errors = await validate(dto);

      expect(errors.some((error) => error.property === "type")).toBe(true);
    });
  });

  describe("page", () => {
    it("should transform string to number", () => {
      const dto = plainToInstance(FilterCoffeeDto, { page: "2" });

      expect(dto.page).toBe(2);
    });

    it("should fail when page is less than 1", async () => {
      const dto = plainToInstance(FilterCoffeeDto, { page: "0" });
      const errors = await validate(dto);

      expect(errors.some((error) => error.property === "page")).toBe(true);
    });

    it("should fail when page is negative", async () => {
      const dto = plainToInstance(FilterCoffeeDto, { page: "-1" });
      const errors = await validate(dto);

      expect(errors.some((error) => error.property === "page")).toBe(true);
    });
  });

  describe("limit", () => {
    it("should transform string to number", () => {
      const dto = plainToInstance(FilterCoffeeDto, { limit: "20" });

      expect(dto.limit).toBe(20);
    });

    it("should fail when limit exceeds 50", async () => {
      const dto = plainToInstance(FilterCoffeeDto, { limit: "51" });
      const errors = await validate(dto);

      expect(errors.some((error) => error.property === "limit")).toBe(true);
    });

    it("should fail when limit is not positive", async () => {
      const dto = plainToInstance(FilterCoffeeDto, { limit: "0" });
      const errors = await validate(dto);

      expect(errors.some((error) => error.property === "limit")).toBe(true);
    });
  });
});
