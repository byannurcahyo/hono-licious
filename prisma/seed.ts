import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
    await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 0;`);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE users;`);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE tokens;`);

    await prisma.user.create({
        data: {
            username: "honolicious",
            name: "Create Honolicious",
            password: await Bun.password.hash("12345678"),
            role: "ADMIN",
        },
    });
    for (let i = 0; i < 10; i++) {
        await prisma.user.create({
            data: {
                username: faker.internet.username().toLowerCase(),
                name: faker.person.fullName(),
                password: await Bun.password.hash("12345678"),
                role: "USER",
            },
        });
    }

    console.log("Data seeded successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
