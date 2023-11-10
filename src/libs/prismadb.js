import { PrismaClient } from "@prisma/client";


const prisma = globalThis.prisma || new PrismaClient();

// Don't want to use global in production
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
} 

export default prisma