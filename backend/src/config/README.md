#  - NestJS + TypeORM + PostgreSQL

## 📌 Descripción
Este proyecto es un backend construido con **NestJS**, utilizando **TypeORM** como ORM y **PostgreSQL** como base de datos.  
Incluye migraciones para gestionar los cambios en el esquema de la base de datos y una configuración centralizada en `src/config/data-source.ts`.

---

## 🚀 Requisitos previos
Asegúrate de tener instalados los siguientes programas en tu entorno:

- [Node.js](https://nodejs.org/) >= 18.x
- [pnpm](https://pnpm.io/) >= 8.x
- [PostgreSQL](https://www.postgresql.org/) (puedes usar Supabase, Railway, etc.)
- [Git](https://git-scm.com/)

---

## ⚙️ Configuración inicial

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/ProyectoPoloIT.git
   cd ProyectoPoloIT/backend
   ```

2. **Instalar dependencias**
   ```bash
   pnpm install
   ```

3. **Configurar variables de entorno**  
   Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

   ```env
   DATABASE_URL=postgresql://<usuario>:<password>@<host>:<port>/<database>
   ```

   Ejemplo con Supabase:
   ```env
   DATABASE_URL=postgresql://postgres.rwiudalyxtvxvyjxohjo:[CONTRASEÑA]@aws-1-us-east-2.pooler.supabase.com:6543/postgres
   ```

---

## 🛠️ Scripts disponibles

En `package.json` se encuentran los siguientes scripts:

- **Iniciar en desarrollo**
  ```bash
  pnpm start:dev
  ```

- **Compilar el proyecto**
  ```bash
  pnpm build
  ```

- **Correr en producción**
  ```bash
  pnpm start:prod
  ```

- **Ejecutar migraciones**
  ```bash
  pnpm migration:run
  ```

- **Revertir última migración**
  ```bash
  pnpm migration:revert
  ```

- **Generar nueva migración**
  ```bash
  pnpm migration:generate --name NombreDeLaMigracion
  ```

---

## 📂 Estructura del proyecto

```bash
src/
 ├── config/
 │   └── data-source.ts   # Configuración de TypeORM
 ├── migrations/          # Carpeta de migraciones
 ├── modules/             # Módulos de la app (ej: usuarios, auth, etc.)
 └── main.ts              # Punto de entrada de NestJS
```

---

## 🗄️ Base de datos
El proyecto utiliza **PostgreSQL**.  
Si deseas conectarte localmente, puedes configurar en `.env`:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/mi_base
```

---

## 🤝 Contribuciones
1. Haz un fork del repositorio.
2. Crea una rama con tu feature:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Haz commit de tus cambios:
   ```bash
   git commit -m "Agrego nueva funcionalidad"
   ```
4. Haz push a la rama:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. Abre un Pull Request 🚀

---

## 📜 Licencia
Este proyecto está bajo la licencia **MIT**.  
Puedes usarlo libremente para tus propios proyectos.
