import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    methods: ["GET", "POST"],
    origin: ["http://localhost:3000"],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
    }),
  );

  await app.listen(process.env.PORT ? Number(process.env.PORT) : 5000);
}

// eslint-disable-next-line unicorn/prefer-top-level-await
void bootstrap();
