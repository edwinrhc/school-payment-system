# 🎓 School Payment System – Backend (NestJS + Prisma + MySQL)

Backend del sistema de control de pagos escolares.  
Incluye autenticación, roles, Prisma ORM, modularidad y buenas prácticas.

---

## 🚀 Tecnologías principales

- NestJS
- Prisma ORM
- MySQL
- JWT + Passport
- Bcrypt
- TypeScript
- Arquitectura modular

---

## 📁 Estructura del Proyecto

    Backend/
     ├── prisma/
     │    ├── schema.prisma
     │    └── migrations/
     ├── src/
     │    ├── auth/
     │    ├── users/
     │    ├── common/
     │    ├── prisma/
     │    └── main.ts
     ├── .env
     ├── prisma.config.ts
     └── package.json

---

## 🗄️ Configuración de la Base de Datos

### 1. Archivo `.env` en la raíz del Backend

Crear en:

    Backend/.env

Contenido:

    DATABASE_URL="mysql://root:password@localhost:3306/school_payments"
    JWT_SECRET="school_payment_secret"
    JWT_EXPIRES="2h"

> Asegúrate de crear la base de datos `school_payments` en MySQL.

---

## 🔧 Configuración de Prisma

### 2. Archivo `prisma.config.ts` (en la raíz del backend)

    import { defineConfig, env } from "prisma/config";

    export default defineConfig({
      schema: "prisma/schema.prisma",
      migrations: {
        path: "prisma/migrations",
      },
      engine: "classic",
      datasource: {
        url: env("DATABASE_URL"),
      },
    });

### 3. Archivo `prisma/schema.prisma`

    generator client {
      provider = "prisma-client"
      output   = "../generated/prisma"
    }

    datasource db {
      provider = "mysql"
      url      = env("DATABASE_URL")
    }

    model User {
      id        Int      @id @default(autoincrement())
      name      String
      email     String   @unique
      password  String
      role      String   @default("parent")  // admin | parent
      createdAt DateTime @default(now())
    }

---

## 🏗️ Inicializar Prisma

### 1. Instalar Prisma (si no está instalado)

    npm install prisma --save-dev
    npm install @prisma/client

### 2. Generar el cliente

    npx prisma generate

### 3. Crear migración inicial

    npx prisma migrate dev --name init

> Esto creará las tablas en `school_payments` según el `schema.prisma`.

### 4. Prisma Studio (opcional)

    npx prisma studio

---

## 🔐 Autenticación incluida

- Registro de usuarios
- Login
- JWT Strategy
- Guards protegidos
- Roles:
    - `admin`
    - `parent`

---

## ▶️ Scripts de ejecución

### Desarrollo

    npm run start:dev

### Modo normal

    npm run start

### Producción

    npm run start:prod

---

## 🧩 Futuras ampliaciones del sistema

- Gestión de alumnos
- Gestión de padres
- Gestión de pensiones
- Módulo de pagos
- Integración con Stripe / Culqi
- Reportes PDF
- Panel administrativo

---

## 👤 Autor

**Edwin RHC – Backend Developer**  
GitHub: https://github.com/edwinrhc  
Tecnologías: Java · Spring Boot · NestJS · Angular · MySQL · Docker

---

## 📄 Licencia

MIT – Libre para usar, modificar y mejorar.
