import { Injectable } from '@nestjs/common';
import { PrismaClient } from '~prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { databaseUrl } from 'prisma.config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaPg({
      connectionString: databaseUrl,
    });
    super({ adapter });
  }
}
