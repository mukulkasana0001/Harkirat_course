# Prisma Singleton Pattern

When using **Prisma Client** in a Node.js or Next.js project, it's important to create only **one instance** of the client.  
Multiple instances can cause **too many database connections**, especially during development with **hot reloads**.

---

## Why Singleton?

- **Prisma Client** opens a connection pool to the database.
- If the server restarts (e.g., during development hot reloads), each restart may create a new PrismaClient instance.
- This can quickly exhaust available connections, causing errors like:

```
PrismaClientInitializationError: Too many connections
```

---

## Singleton Implementations

### 1. Full (Recommended) Version – Handles Hot Reloads in Dev
```ts
// prismaClient.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma; // Cache Prisma in development
}
```

Usage:
```ts
import { prisma } from "./prismaClient";

async function getUsers() {
  return await prisma.user.findMany();
}
```

---

### 2. Simpler Version
```ts
// prismaClient.ts
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (!global.prisma) {
  global.prisma = new PrismaClient();
}

prisma = global.prisma;

export default prisma;
```

Usage:
```ts
import prisma from "./prismaClient";

async function getUsers() {
  return await prisma.user.findMany();
}
```

Both versions achieve the same goal: ensuring only **one PrismaClient instance** exists.

---

## Hot Reloads vs Browser Reloads

### 🔥 Hot Reloads (Development Mode)
- Triggered when **backend code changes** (e.g., Next.js `npm run dev`, Express + nodemon).  
- Server process **restarts** → Node.js files re-executed.  
- Without singleton, every restart creates a **new PrismaClient instance**, leading to **connection leaks**.

### 🔄 Browser Reloads (Refreshing the Page)
- Triggered when you press **F5 / Refresh**.  
- Browser sends a new request to the same running server.  
- No new PrismaClient is created → it reuses the **same singleton instance**.  
- **Safe and no risk of too many connections.**

---

## ✅ Summary
- Use Prisma **singleton pattern** to prevent multiple client instances during **hot reloads** in development.
- In **production**, server runs once → no hot reloads → singleton caching is not strictly necessary.
- Browser reloads are safe and always use the same PrismaClient instance.
