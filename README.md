<div align="center">

# AlquiMaps – Backend  
### API RESTful con NestJS, TypeORM y PostgreSQL

<p align="center">
  <a href="https://nestjs.com/" target="_blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS">
  <img src="https://img.shields.io/badge/TypeORM-262627?style=for-the-badge&logo=typeorm&logoColor=F79C42" alt="TypeORM">
  <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white" alt="pnpm">
</p>

</div>

---

## Descripción General

**AlquiMaps Backend** es una API RESTful desarrollada con **NestJS**, que provee servicios para la gestión de usuarios y alquileres en la plataforma.  
Utiliza **TypeORM** como ORM y **PostgreSQL** como base de datos relacional, con migraciones automatizadas y documentación generada con **Swagger**.

El proyecto está diseñado para integrarse con el frontend de **AlquiMaps**, ofreciendo endpoints seguros y escalables mediante **JWT Authentication** y módulos separados por dominio.

---

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) ≥ 18.x  
- [pnpm](https://pnpm.io/) ≥ 8.x  
- [PostgreSQL](https://www.postgresql.org/)  
- [Git](https://git-scm.com/)

---

## Configuración Inicial

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/ProyectoPoloIT.git
cd ProyectoPoloIT/backend
```
### 2. Instalar dependencias
```bash
pnpm install
```
### 3. Configurar variables de entorno
Crea un archivo .env en la raíz del proyecto con el siguiente contenido:
```bash
DATABASE_URL=postgresql://<usuario>:<password>@<host>:<port>/<database>
JWT_SECRET=clave-secreta
PORT=3000
```
Ejemplo (usando Supabase):

```bash
DATABASE_URL=postgresql://postgres.xxxxx:[CONTRASEÑA]@aws-1-us-east-2.pooler.supabase.com:6543/postgres
```
Scripts Disponibles
<table> 
  <thead> 
    <tr> 
      <th>Comando</th> 
      <th>Descripción</th> 
    </tr> 
  </thead>
  <tbody> 
    <tr> 
      <td><code>pnpm run start:dev</code></td> 
      <td>Inicia el servidor en modo desarrollo (hot-reload).</td> </tr> 
    <tr>
    <tr> 
      <td><code>pnpm run build</code></td> 
      <td>Compila el proyecto para producción.</td> </tr> 
    <tr>
    <tr> 
      <td><code>pnpm run start:prod</code></td> 
      <td>Ejecuta la versión compilada.</td> </tr> 
    <tr>
    <tr> 
      <td><code>pnpm run migration:run</code></td> 
      <td>Ejecuta todas las migraciones pendientes.</td> </tr> 
    <tr>
    <tr> 
      <td><code>pnpm run migration:revert</code></td> 
      <td>Revierte la última migración ejecutada.</td> </tr> 
    <tr>
    <tr> 
      <td><code>pnpm run migration:generate --name NombreDeLaMigracion</code></td> 
      <td>Genera una nueva migración automáticamente.</td> </tr> 
    <tr>
    <tr> 
      <td><code>pnpm run lint</code></td> 
      <td>Analiza el código con ESLint.</td> </tr> 
    <tr>
  </tbody>
</table>

Documentación de la API
Este proyecto incluye documentación automática de endpoints con Swagger.

URL local: http://localhost:3000/api/docs

Endpoints Principales
### Endpoints del Backend

#### **Auth**
| Método | Ruta | Descripción |
|:-------|:-----|:-------------|
| <span style="color:#49cc90; font-weight:bold;">POST</span> | `/auth/register` | Crea un nuevo usuario. |
| <span style="color:#49cc90; font-weight:bold;">POST</span> | `/auth/login` | Inicia sesión y genera un token JWT. |
| <span style="color:#61affe; font-weight:bold;">GET</span> | `/auth/profile` | Devuelve la información del usuario autenticado (requiere token JWT). |

---

#### **Usuarios**
| Método | Ruta | Descripción |
|:-------|:-----|:-------------|
| <span style="color:#61affe; font-weight:bold;">GET</span> | `/users` | Obtiene todos los usuarios. |
| <span style="color:#61affe; font-weight:bold;">GET</span> | `/users/:id` | Obtiene un usuario por su ID. |
| <span style="color:#fca130; font-weight:bold;">PATCH</span> | `/users/:id` | Actualiza los datos de un usuario. |
| <span style="color:#fca130; font-weight:bold;">PATCH</span> | `/users/:id/password` | Actualiza la contraseña de un usuario. |
| <span style="color:#f93e3e; font-weight:bold;">DELETE</span> | `/users/:id` | Elimina un usuario. |

---

#### **Alquileres (Rentals)**
| Método | Ruta | Descripción |
|:-------|:-----|:-------------|
| <span style="color:#49cc90; font-weight:bold;">POST</span> | `/rentals/:userId` | Crea un alquiler asociado a un usuario. |
| <span style="color:#61affe; font-weight:bold;">GET</span> | `/rentals` | Obtiene todos los alquileres. |
| <span style="color:#61affe; font-weight:bold;">GET</span> | `/rentals/:id` | Obtiene un alquiler por su ID. |
| <span style="color:#fca130; font-weight:bold;">PUT</span> | `/rentals/:id` | Actualiza un alquiler existente. |
| <span style="color:#f93e3e; font-weight:bold;">DELETE</span> | `/rentals/:id` | Elimina un alquiler. |



Todos los endpoints protegidos requieren un token JWT en el header Authorization: Bearer <token>.

Estructura del Proyecto
```bash
src/
├── config/                # Configuración de TypeORM y entorno
│   └── data-source.ts
├── docs                   #diagrama de la base da datos
├── migrations/            # Migraciones de base de datos
├── modules/               # Módulos principales de la aplicación
│   ├── auth/              # Módulo de autenticación (JWT, guardias, estrategias)
│   ├── usuarios/          # CRUD de usuarios
│   └── rentals/           # CRUD de alquileres
├── main.ts                # Punto de entrada de la aplicación
└── app.module.ts          # Módulo raíz de NestJS
```
Diagrama de Tablas
<br>
<img src="./backend/src/docs/diagram.png">

Base de Datos
El backend utiliza PostgreSQL.
Para desarrollo local, puedes configurar tu .env de la siguiente forma:

env
Copiar código
DATABASE_URL=postgresql://postgres:password@localhost:5432/alquimaps
Las migraciones se encuentran en src/migrations/ y pueden generarse con:

```bash
pnpm migration:generate --name nombre-migracion
pnpm migration:run
```
### Pruebas

# Pruebas unitarias
```bash
pnpm run test
```
# Pruebas end-to-end
```bash
pnpm run test:e2e
```
# Cobertura de pruebas
```bash
pnpm run test:cov
```
---

### Despliegue
# Para desplegar en producción, compila y ejecuta:

```bash
pnpm build
pnpm start:prod
```

Para entornos cloud (como Railway o Supabase), asegúrate de definir correctamente DATABASE_URL y JWT_SECRET en las variables de entorno del servicio.

### Contribuciones
Realiza un fork del repositorio.

Crea una rama para tu feature:

```bash
git checkout -b feature/nueva-funcionalidad
```
Haz commit de tus cambios:

```bash
git commit -m "Agrega nueva funcionalidad"
```
Haz push a tu rama y abre un Pull Request.

Licencia
Este proyecto está bajo la Licencia MIT.
Consulta el archivo LICENSE para más información.

<br>
Desarrollado por:
<div align="center"><strong>Rueda Juan Bautista</strong> y <strong>Damian Fernández</strong> <strong>AlquiMaps</strong> <br>Backend API </div>