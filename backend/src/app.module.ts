import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CoffeeModule } from "./coffee/coffee.module";

@Module({
  controllers: [AppController],
  imports: [CoffeeModule],
  providers: [AppService],
})
export class AppModule {}
