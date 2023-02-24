import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const content = [
  "Купить продукты домой",
  "Сделать домашнее задание",
  "Напомнить Василию про выходные",
  "Накормить собакена",
  "Закончить этот проект",
  "Сделать поделку сыну в школу",
];

async function seed() {
  for (let i = 0; i < 5; i++) {
    await prisma.task.create({
      data: {
        content: content[i],
      },
    });
  }
}
seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
