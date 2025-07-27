# NestJS Google OAuth API

API RESTful construida con NestJS que implementa autenticación local y Google OAuth2, gestión de usuarios y tareas.

## 🚀 Características

- ✅ Autenticación Local con JWT
- 🔑 Integración con Google OAuth2
- 👥 Gestión de Usuarios
- ✅ Sistema de Tareas
- 🛡️ Control de Acceso Basado en Roles (RBAC)
- 🔒 Seguridad y Validaciones

## 🛠️ Tecnologías

- NestJS
- TypeORM
- MySQL
- JWT
- Passport
- Google OAuth2

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- MySQL
- Google OAuth credentials

## ⚙️ Configuración

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd nestjs_google_oauth
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crear archivo `.env` basado en `env.example`:
```env
# Base de datos
_DB_HOST=localhost
_DB_PORT=3306
_DB_USERNAME=your_db_username
_DB_PASSWORD=your_db_password
_DB_NAME=nestjs_google_oauth_db

# JWT
_JWT_SECRET=your_jwt_secret_key_here

# Google OAuth2
_GOOGLE_CLIENT_ID=your_google_client_id
_GOOGLE_CLIENT_SECRET=your_google_client_secret
_GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

4. **Configurar Base de Datos**
```bash
# La base de datos se creará automáticamente al iniciar la aplicación
# gracias a la configuración synchronize: true en TypeORM
```

## 🚀 Ejecución

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## 📚 Estructura del Proyecto

```
src/
├── auth/                  # Módulo de autenticación
│   ├── dto/              # Data Transfer Objects
│   ├── strategies/       # Estrategias de autenticación
│   └── guards/           # Guards de autenticación
├── users/                # Módulo de usuarios
│   ├── dto/
│   └── entities/
├── tasks/                # Módulo de tareas
│   ├── dto/
│   └── entities/
└── common/              # Código compartido
    ├── filters/         # Filtros de excepciones
    └── interceptors/    # Interceptores
```

## 🔑 Módulos Principales

### 1. Autenticación (`/auth`)

- Registro local
- Login local
- Autenticación con Google
- Perfil de usuario

### 2. Usuarios (`/users`)

- CRUD completo
- Relación con tareas
- Validaciones
- Roles de usuario (ADMIN, USER)
- Gestión de permisos

### 3. Tareas (`/tasks`)

- CRUD completo
- Relación con usuarios
- Prioridades y fechas



## 🔒 Seguridad y Autorización

- JWT para sesiones
- Encriptación de contraseñas con bcrypt
- Validación de datos con class-validator
- Protección contra ataques comunes
- Sistema de roles (ADMIN, USER)
- Decoradores de autorización (@AdminRoute, @RequireOwnership, @Auth)
- Guards para verificación de permisos

## 🛡️ Sistema de Autorización

El proyecto implementa un sistema de autorización basado en roles y propiedad de recursos:

- **Roles de Usuario**: 
  - `ADMIN`: Acceso completo a todos los recursos
  - `USER`: Acceso limitado a sus propios recursos

- **Decoradores de Autorización**:
  - `@AdminRoute()`: Restringe el acceso solo a administradores
  - `@RequireOwnership()`: Verifica que el usuario sea propietario del recurso
  - `@Auth()`: Combina autenticación JWT con autorización

- **Guard de Autorización**: Implementa la lógica de verificación de permisos basada en roles y propiedad de recursos

## 📋 Notas de Desarrollo

- Se han eliminado las anotaciones de Swagger para permitir mayor flexibilidad en el desarrollo

## 🌐 Endpoints Principales

### Autenticación
```typescript
POST /auth/register     // Registro de usuario
POST /auth/login       // Login de usuario
GET  /auth/google      // Login con Google
GET  /auth/profile     // Perfil de usuario
```

### Usuarios
```typescript
GET    /users          // Listar usuarios
POST   /users          // Crear usuario
GET    /users/:id      // Obtener usuario
PATCH  /users/:id      // Actualizar usuario
DELETE /users/:id      // Eliminar usuario
```

### Tareas
```typescript
GET    /tasks          // Listar tareas
POST   /tasks          // Crear tarea
GET    /tasks/:id      // Obtener tarea
PATCH  /tasks/:id      // Actualizar tarea
DELETE /tasks/:id      // Eliminar tarea
GET    /tasks/user/:userId  // Tareas por usuario
```

## 🧪 Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## 📦 Despliegue

1. Configurar variables de entorno de producción
2. Construir la aplicación
```bash
npm run build
```
3. Iniciar en modo producción
```bash
npm run start:prod
```

## ⚠️ Consideraciones Importantes

- El token JWT expira en 1 hora
- Las contraseñas deben tener mínimo 6 caracteres
- Los emails deben ser únicos

## 🤝 Contribución

1. Fork el proyecto
2. Crear feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request


