import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ['error', 'warn'],
  errorFormat: 'pretty',
  transactionOptions: {
    timeout: 3000,
    maxWait: 3000,
  }
});

export default prisma