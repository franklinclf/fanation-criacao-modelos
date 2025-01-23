import { PrismaClient } from "@prisma/client";

const globalPrisma = globalThis;

export const prisma = globalPrisma.prisma || new PrismaClient();
