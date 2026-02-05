import { Controller, Get } from "@nestjs/common";

import { AppService } from "./app.service";
import { PrismaService } from "./prisma/prisma.service";

@Controller()
export class AppController {
  constructor(
    private prisma: PrismaService,
    private appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  getItems() {
    return this.prisma.coffee.findMany();
  }
}
