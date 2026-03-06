import "dotenv/config"
import bcrypt from "bcrypt"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient, enum_Users_role } from "../generated/prisma"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!
})

const prisma = new PrismaClient({ adapter })

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 10)

  await prisma.users.upsert({
    where: { email: "admin@omnimarket.com" },
    update: {},
    create: {
      name: "Administrador",
      email: "admin@omnimarket.com",
      password: adminPassword,
      role: enum_Users_role.ADMIN,
    },
  })

  console.log("🌱 Usuário admin seedado com sucesso")
}

main()
  .finally(async () => {
    await prisma.$disconnect()
  })