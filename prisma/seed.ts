import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import {toHash} from '../src/server/toHash'

async function main() {
  console.log(toHash('12345'))
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {
      email: 'alice@prisma.io',
      name: 'Alice',
      passwordHash: toHash('12345'),
      imageURL: ''
    },
    create: {
      id: '123',
      email: 'alice@prisma.io',
      name: 'Alice',
      passwordHash: toHash('12345'),
      imageURL: ''
    },
  })

  console.log({ alice })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })