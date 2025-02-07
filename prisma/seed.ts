import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.timeSlot.deleteMany();
  await prisma.user.deleteMany();

  // Create test users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: "Coach Alice",
        phone: "123-456-7890",
        isCoach: true,
      },
    }),
    prisma.user.create({
      data: {
        name: "Coach Eric",
        phone: "234-567-8901",
        isCoach: true,
      },
    }),
    prisma.user.create({
      data: {
        name: "Student Charlie",
        phone: "345-678-9012",
        isCoach: false,
      },
    }),
    prisma.user.create({
      data: {
        name: "Student Diana",
        phone: "456-789-0123",
        isCoach: false,
      },
    }),
  ]);

  console.log("Seeded users:", users);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
