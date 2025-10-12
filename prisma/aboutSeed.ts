import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // --- About ---
  await prisma.about.create({
    data: {
      description:
        "My career trajectory begins as a Frontend Developer, where I intend to utilize my proficiency in React, Vue.js, and Next.js to build innovative web applications. I am proactive in seeking opportunities for professional development and aim to steadily advance my career by taking on increasing responsibilities and contributing to more significant projects.",
      cvUrl: "/cv/arsal-nawfal-cv.pdf", 
    },
  })

  // --- Work Experience ---
  await prisma.workExperience.create({
    data: {
      title: "Front-end Developer",
      company: "SOCA AI",
      imgUrl: "https://media.licdn.com/dms/image/v2/D560BAQG5RZlgiOXUHQ/company-logo_200_200/company-logo_200_200/0/1682506784172/soca_ai_logo?e=2147483647&v=beta&t=6ItnW01p9WB3kzvju24LP3Alz9ODGuK_poPDcyYL-fc",
      location: "Kota Bandung, Jawa Barat",
      startDate: new Date("2024-07-01"),
      endDate: new Date("2024-10-01"),
      type: "Internship",
    },
  })

  // --- Education ---
  await prisma.education.createMany({
    data: [
      {
        school: "SMKN 4 Bandung",
        major: "Rekayasa Perangkat Lunak",
        imgUrl: "https://smkn4bdg.sch.id/image/smkn4.png",
        location: "Kota Bandung, Jawa Barat",
        startDate: new Date("2022-07-01"),
        endDate: new Date("2025-05-01"),
        status: "Student",
      },
      {
        school: "Coding Camp DBS Foundation",
        major: "Front-end & Back-end Developer",
        imgUrl: "https://media.licdn.com/dms/image/v2/D560BAQEONBPsiZnU8w/company-logo_200_200/company-logo_200_200/0/1729482329489?e=2147483647&v=beta&t=dkMktUDkXt7130IuDwAyygkV13ZUc5gnI4JksnlUQ84",
        location: "Remote",
        startDate: new Date("2025-01-01"),
        endDate: new Date("2025-05-01"),
        status: "Student",
      },
    ],
  })
}

main()
  .then(async () => {
    console.log("✅ Seeding selesai!")
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error("❌ Error saat seeding:", e)
    await prisma.$disconnect()
    process.exit(1)
  })
