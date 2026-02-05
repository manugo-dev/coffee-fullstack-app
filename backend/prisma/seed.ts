import { PrismaPg } from "@prisma/adapter-pg";

import { CoffeeType, PrismaClient } from "~prisma/client";

import { databaseUrl } from "prisma.config";

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
        description:
          "Balanced Colombian Arabica with rich chocolate notes and a hint of caramel. Medium roast with a smooth, velvety finish.",
        imageUrl:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800",
        name: "Medellín Sunrise",
        price: "12.50",
        type: CoffeeType.arabic,
      },
      {
        description:
          "Bright and floral with notes of jasmine, bergamot, and lemon zest. Light roast showcasing the origin's natural sweetness.",
        imageUrl:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
        name: "Ethiopian Yirgacheffe",
        price: "16.90",
        type: CoffeeType.arabic,
      },
      {
        description:
          "Bold and wine-like with blackcurrant acidity, tomato sweetness, and a long savory finish. Single origin from Nyeri region.",
        imageUrl:
          "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800",
        name: "Kenyan AA Reserve",
        price: "18.50",
        type: CoffeeType.arabic,
      },
      {
        description:
          "Full-bodied with smoky, spicy notes and hints of dark chocolate. Grown at high altitude in volcanic soil.",
        imageUrl:
          "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800",
        name: "Guatemala Antigua",
        price: "14.75",
        type: CoffeeType.arabic,
      },
      {
        description:
          "Clean and crisp with bright citrus acidity, honey sweetness, and a buttery mouthfeel. Washed process.",
        imageUrl:
          "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=800",
        name: "Costa Rica Tarrazú",
        price: "15.25",
        type: CoffeeType.arabic,
      },
      {
        description:
          "Nutty and low-acid with notes of toasted almonds, milk chocolate, and brown sugar. Perfect for espresso blends.",
        imageUrl:
          "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800",
        name: "Brazil Santos",
        price: "11.90",
        type: CoffeeType.arabic,
      },
      {
        description:
          "Legendary smoothness with mild flavor, bright acidity, and no bitterness. Notes of herbs and sweet florals.",
        imageUrl:
          "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=800",
        name: "Jamaica Blue Mountain",
        price: "45.00",
        type: CoffeeType.arabic,
      },
      {
        description:
          "Exceptional clarity with tea-like body, tropical fruit notes, and jasmine aromatics. Award-winning variety.",
        imageUrl:
          "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800",
        name: "Panama Geisha",
        price: "55.00",
        type: CoffeeType.arabic,
      },
      {
        description:
          "Earthy and complex with low acidity, full body, and notes of cedar, tobacco, and dark cocoa.",
        imageUrl:
          "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800",
        name: "Sumatra Mandheling",
        price: "13.80",
        type: CoffeeType.arabic,
      },
      {
        description:
          "Mild and sweet with balanced acidity, notes of vanilla, caramel apple, and roasted nuts.",
        imageUrl:
          "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800",
        name: "Peru Chanchamayo",
        price: "12.25",
        type: CoffeeType.arabic,
      },
      {
        description:
          "Sweet and fruity with notes of tropical mango, caramel, and a hint of orange blossom. Organic certified.",
        imageUrl:
          "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=800",
        name: "Honduras Marcala",
        price: "13.50",
        type: CoffeeType.arabic,
      },
      {
        description:
          "Bright and juicy with wine-like acidity, black cherry notes, and a creamy chocolate finish.",
        imageUrl:
          "https://images.unsplash.com/photo-1504627298434-2119d6928e93?w=800",
        name: "Tanzania Peaberry",
        price: "17.90",
        type: CoffeeType.arabic,
      },
      {
        description:
          "Ancient variety with wild, fruity complexity. Notes of dried fruit, wine, and rich chocolate. Sun-dried process.",
        imageUrl:
          "https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=800",
        name: "Yemen Mocha",
        price: "38.00",
        type: CoffeeType.arabic,
      },
      {
        description:
          "Silky body with bright red fruit notes, floral aromatics, and a long sweet finish. Direct trade.",
        imageUrl:
          "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800",
        name: "Rwanda Bourbon",
        price: "16.50",
        type: CoffeeType.arabic,
      },
      {
        description:
          "Light and delicate with notes of milk chocolate, graham cracker, and subtle citrus. Shade grown.",
        imageUrl:
          "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=800",
        name: "Mexico Chiapas",
        price: "11.50",
        type: CoffeeType.arabic,
      },
      {
        description:
          "Complex and bold with notes of red wine, dark berries, and baking spices. Honey processed.",
        imageUrl:
          "https://images.unsplash.com/photo-1521302080334-4bebac2763a6?w=800",
        name: "El Salvador Pacamara",
        price: "19.90",
        type: CoffeeType.arabic,
      },
      {
        description:
          "Vibrant and complex with notes of blackberry, lemon verbena, and raw honey. Washed and sun-dried.",
        imageUrl:
          "https://images.unsplash.com/photo-1495774856032-8b90bbb32b32?w=800",
        name: "Burundi Kayanza",
        price: "17.25",
        type: CoffeeType.arabic,
      },
      {
        description:
          "Well-balanced with notes of bittersweet chocolate, walnut, and stone fruit. Rainforest Alliance certified.",
        imageUrl:
          "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800",
        name: "Nicaragua Jinotega",
        price: "13.75",
        type: CoffeeType.arabic,
      },
      {
        description:
          "Exceptionally smooth with bright acidity, notes of brown sugar, macadamia, and subtle spice.",
        imageUrl:
          "https://images.unsplash.com/photo-1501747315-124a0eaca060?w=800",
        name: "Hawaiian Kona",
        price: "42.00",
        type: CoffeeType.arabic,
      },
      {
        description:
          "Rare and exquisite with notes of red grape, milk chocolate, and floral honey. Small-lot production.",
        imageUrl:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
        name: "Bolivia Caranavi",
        price: "22.00",
        type: CoffeeType.arabic,
      },
      {
        description:
          "Strong and bold with earthy notes, hints of dark chocolate, and a powerful caffeine kick. Traditional phin brewing recommended.",
        imageUrl:
          "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?w=800",
        name: "Vietnam Highland Robusta",
        price: "9.90",
        type: CoffeeType.robusta,
      },
      {
        description:
          "Full-bodied with low acidity, woody notes, and hints of tobacco and leather. Excellent for espresso blends.",
        imageUrl:
          "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800",
        name: "Indonesian Java Robusta",
        price: "10.50",
        type: CoffeeType.robusta,
      },
      {
        description:
          "Unusually sweet for Robusta with notes of dark chocolate, peanut butter, and a hint of dried fruit.",
        imageUrl:
          "https://images.unsplash.com/photo-1501492673258-2f5fa4de7fc0?w=800",
        name: "Uganda Bugisu Robusta",
        price: "11.25",
        type: CoffeeType.robusta,
      },
      {
        description:
          "Monsoon-processed Robusta with mellow acidity, spicy notes, and hints of wood and nuts. Bold crema producer.",
        imageUrl:
          "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800",
        name: "India Kappi Royale",
        price: "12.00",
        type: CoffeeType.robusta,
      },
      {
        description:
          "Smooth and chocolatey with low bitterness, notes of hazelnut and caramel. Brazilian Robusta variety.",
        imageUrl:
          "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=800",
        name: "Brazilian Conilon",
        price: "9.50",
        type: CoffeeType.robusta,
      },
      {
        description:
          "Bold and aromatic with a distinctive strong flavor, woody notes, and hints of anise. Traditional Filipino variety.",
        imageUrl:
          "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=800",
        name: "Philippines Barako",
        price: "14.50",
        type: CoffeeType.robusta,
      },
      {
        description:
          "Intense and full-bodied with chocolate undertones, earthy depth, and persistent finish. West African origin.",
        imageUrl:
          "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800",
        name: "Cameroon Robusta Premium",
        price: "10.75",
        type: CoffeeType.robusta,
      },
      {
        description:
          "Smooth with surprisingly bright acidity, notes of dark caramel, and a clean finish. Hill tribe grown.",
        imageUrl:
          "https://images.unsplash.com/photo-1534778101666-5ba6e3e0b8e6?w=800",
        name: "Thailand Doi Chaang Robusta",
        price: "13.25",
        type: CoffeeType.robusta,
      },
      {
        description:
          "Traditional West African profile with intense body, bitter chocolate notes, and a long smoky finish.",
        imageUrl:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
        name: "Ivory Coast Robusta",
        price: "8.90",
        type: CoffeeType.robusta,
      },
      {
        description:
          "Unique island-grown variety with wild, rustic character, hints of tropical fruit, and spicy undertones.",
        imageUrl:
          "https://images.unsplash.com/photo-1497636577773-f1231844b336?w=800",
        name: "Madagascar Robusta Wild",
        price: "15.00",
        type: CoffeeType.robusta,
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => prisma.$disconnect())
  // eslint-disable-next-line unicorn/prefer-top-level-await
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  });
