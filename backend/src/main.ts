import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    methods: ["GET", "POST"],
    origin: ["http://localhost:3000", process.env.FRONTEND_URL].filter(Boolean),
  });

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
    }),
  );

  await app.listen(
    process.env.BACKEND_PORT ? Number(process.env.BACKEND_PORT) : 5000,
  );
}

// eslint-disable-next-line unicorn/prefer-top-level-await
void bootstrap();
