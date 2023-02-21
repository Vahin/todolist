import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  for (let i = 0; i < 5; i++) {
    await prisma.task.create({
      data: {
        content: "Lorem ipsum dolor",
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
