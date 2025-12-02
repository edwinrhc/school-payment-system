# 📘 Prisma Cheat Sheet - Comandos, Buenas Prácticas y Flujo de Trabajo

Guía rápida y profesional para trabajar con Prisma en proyectos NestJS + MySQL.

---

# 1. Comandos principales

### 🔹 Inicializar Prisma en el proyecto
```bash
npx prisma init
```

### 🔹 Formatear el schema
```bash
npx prisma format
```

### 🔹 Generar el Prisma Client
```bash
npx prisma generate
```

### 🔹 Crear una migración y aplicarla a la base de datos
```bash
npx prisma migrate dev --name nombre_de_migracion
```

### 🔹 Ver estado de migraciones
```bash
npx prisma migrate status
```

### 🔹 Resetear la base de datos (solo desarrollo)
```bash
npx prisma migrate reset
```

### 🔹 Validar el schema
```bash
npx prisma validate
```

### 🔹 Abrir Prisma Studio
```bash
npx prisma studio
```

---

# 2. Buenas prácticas oficiales

### ✔ Versiona siempre la carpeta prisma/migrations/
Nunca la ignores en `.gitignore`. Es parte del historial del proyecto.

### ✔ Después de cada cambio en el schema:
1. `npx prisma format`
2. `npx prisma migrate dev --name <cambio>`
3. `npx prisma generate`

### ✔ Si un campo es NOT NULL y hay datos en BD
- Agregar un valor `default` temporal.
- O usar `create-only` y editar la migración.

### ✔ No modifiques migraciones viejas ya aplicadas
Prisma las usa como "historial".

### ✔ No borres migraciones individuales
Haz un squash solo si estás en desarrollo.

---

# 3. Comandos Útiles Adicionales

## ⚙️ Comandos de Mantenimiento y Producción

| Comando | Descripción |
| :--- | :--- |
| `npx prisma db pull` | **Invierte la ingeniería** y genera automáticamente el esquema (`schema.prisma`) a partir de una base de datos existente. |
| `npx prisma db push` | Aplica el estado actual del `schema.prisma` a la base de datos **sin crear archivos de migración**. Útil para prototipos rápidos. |
| `npx prisma migrate deploy` | **Producción/Ambientes QA:** Aplica todas las migraciones pendientes en el orden correcto. **Comando esencial para CI/CD.** |
| `npx prisma migrate resolve --rolled-back <nombre_migracion>` | **Solución de Errores:** Marca una migración fallida como resuelta. |

## 🔍 Comandos de Depuración

| Comando | Descripción |
| :--- | :--- |
| `npx prisma db seed` | **Poblar la Base de Datos:** Ejecuta el *script* de *seed* (datos iniciales de prueba) que definas en tu proyecto. |

---

# 4. Flujo de Trabajo en CI/CD y Despliegue

### ⚙️ Secuencia de Pasos en Producción (CI/CD)

En tus scripts de despliegue (ej. GitHub Actions o TeamCity), la secuencia de Prisma debe ser:

1. Instalar dependencias: `npm install`
2. **Aplicar Migraciones:** `npx prisma migrate deploy`
3. **Generar Cliente:** `npx prisma generate` (Asegura la versión correcta para el código compilado)
4. Iniciar Aplicación: `npm run start:prod`