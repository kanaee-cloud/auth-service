import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const profile = await prisma.personalize.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Arsal Nawfal",
      age: 18,
      bio: "Recent graduate with a solid understanding of front-end development and a passion for creating engaging web experiences.",
      avatarUrl: null,
      stats: {
        create: [
          { label: "Years Old", value: "18" },
          { label: "Repository", value: "45+" },
          { label: "Experience", value: "5+" },
        ],
      },
      techSkills: {
        create: [
          { name: "Node.js" },
          { name: "Express.js" },
          { name: "Vite" },
          { name: "Firebase" },
          { name: "React" },
          { name: "Next.js" },
        ],
      },
    },
  });

  console.log("Portfolio data created:", profile);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
