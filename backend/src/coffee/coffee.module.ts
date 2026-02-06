import { Module } from "@nestjs/common";

import { PrismaModule } from "../prisma/prisma.module";
import { CoffeeController } from "./coffee.controller";
import { CoffeeService } from "./coffee.service";

@Module({
  controllers: [CoffeeController],
  exports: [CoffeeService],
  imports: [PrismaModule],
  providers: [CoffeeService],
})
export class CoffeeModule {}
