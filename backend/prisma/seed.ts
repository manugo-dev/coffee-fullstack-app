import { databaseUrl } from 'prisma.config';
import { CoffeeType, PrismaClient } from '~prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: databaseUrl,
});
const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.coffee.createMany({
    data: [
      {
        name: 'Medellín Sunrise',
        description: 'Balanced, chocolate notes, medium roast.',
        type: CoffeeType.arabic,
        price: '12.50',
        imageUrl:
          'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
      },
      {
        name: 'Robusta Power',
        description: 'Strong body, higher caffeine, intense finish.',
        type: CoffeeType.robusta,
        price: '9.90',
        imageUrl:
          'https://images.unsplash.com/photo-1442512595331-e89e73853f31',
      },
      {
        name: 'Barcelona Brew',
        description: 'Smooth and bright, perfect for espresso.',
        type: CoffeeType.arabic,
        price: '14.00',
        imageUrl:
          'https://images.unsplash.com/photo-1512568400610-62da28bc8a13',
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
