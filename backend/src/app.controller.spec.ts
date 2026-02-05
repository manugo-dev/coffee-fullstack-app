import { Test, TestingModule } from "@nestjs/testing";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

describe("AppController", () => {
  let controller: AppController;
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    controller = module.get<AppController>(AppController);
    service = module.get<AppService>(AppService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("getHello", () => {
    it('should return "Hello World!"', () => {
      expect(controller.getHello()).toBe("Hello World!");
    });
  });

  describe("healthCheck", () => {
    it('should return "OK"', () => {
      expect(controller.healthCheck()).toBe("OK");
    });
  });
});
