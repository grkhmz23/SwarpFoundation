import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Prevent multiple instances in development due to hot reloading
export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

// Handle connection errors gracefully
export async function connectDB() {
  try {
    await db.$connect();
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
}
