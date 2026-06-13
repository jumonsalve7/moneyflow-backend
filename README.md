ENGLISH VERSION
markdown
# 💰 MoneyFlow Backend API

RESTful API for the MoneyFlow application - A personal finance tracker with user authentication and transaction management.

## 🚀 Features

- ✅ **JWT Authentication** - Secure user registration and login
- ✅ **Transaction CRUD** - Create, read, update, and delete transactions
- ✅ **MongoDB Atlas** - Cloud database (or local MongoDB)
- ✅ **Route Protection** - Endpoints protected with JWT
- ✅ **Validations** - Multi-level data validation
- ✅ **Error Handling** - Robust error handling system
- ✅ **CORS Configured** - Production-ready security
- ✅ **TypeScript Ready** - TypeScript configuration included

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB ODM |
| **JWT** | Authentication |
| **Bcryptjs** | Password encryption |
| **CORS** | Cross-origin security |
| **Dotenv** | Environment variables |

## 📁 Project Structure
moneyflow-backend/
├── src/
│ ├── config/
│ │ └── database.js # MongoDB connection
│ ├── controllers/
│ │ ├── authController.js # Authentication logic
│ │ └── transactionController.js
│ ├── middleware/
│ │ ├── auth.js # JWT verification
│ │ ├── errorHandler.js # Error handling
│ │ └── validation.js # Validations
│ ├── models/
│ │ ├── User.js # User model
│ │ └── Transaction.js # Transaction model
│ ├── routes/
│ │ ├── authRoutes.js # Auth endpoints
│ │ └── transactionRoutes.js # Transaction endpoints
│ ├── utils/
│ │ └── validators.js # Validation functions
│ └── app.js # Express configuration
├── .env # Environment variables
├── .gitignore # Ignored files
├── package.json
├── server.js # Entry point
└── README.md

text

## 🚦 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user (protected) |

### Transactions (`/api/transactions`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/transactions` | Get all user transactions |
| GET | `/api/transactions/:id` | Get single transaction |
| POST | `/api/transactions` | Create new transaction |
| PUT | `/api/transactions/:id` | Update transaction |
| DELETE | `/api/transactions/:id` | Delete transaction |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Check server status |

## 📝 Usage Examples

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"123456"}'
Login
bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"123456"}'
Create Transaction (requires token)
bash
curl -X POST http://localhost:5000/api/transactions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Coffee",
    "amount": 5.50,
    "originalAmount": 5.50,
    "originalCurrency": "USD",
    "type": "expense",
    "category": "Food",
    "date": "2026-06-13"
  }'
🚀 Installation
Prerequisites
Node.js (v18 or higher)

MongoDB (local or Atlas)

Setup
bash
# Clone the repository
git clone https://github.com/jumonsalve7/moneyflow-backend.git
cd moneyflow-backend

# Install dependencies
npm install

# Create .env file (see example below)
# Run in development mode
npm run dev
Environment Variables (.env)
env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/moneyflow
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
Scripts
Command	Description
npm run dev	Development mode with nodemon
npm start	Production mode
npm run build	Compile TypeScript
🔒 Security
✅ Passwords encrypted with bcrypt

✅ JWT tokens with expiration

✅ Input data validation

✅ Injection protection

✅ CORS configured

🤝 Frontend Connection
This backend is designed to work with the MoneyFlow frontend:

Frontend Repo: moneyflow-frontend

Frontend Stack: React, Vite, Recharts, Context API

📄 License
MIT

👨‍💻 Author
Juan Pablo Monsalve

GitHub: @jumonsalve7

⭐ Star this project if you like it!

text

---

## 🇪🇸 VERSIÓN EN ESPAÑOL

```markdown
# 💰 MoneyFlow Backend API

API RESTful para la aplicación MoneyFlow - Un rastreador de finanzas personales con autenticación de usuarios y gestión de transacciones.

## 🚀 Características

- ✅ **Autenticación JWT** - Registro e inicio de sesión seguros
- ✅ **CRUD de Transacciones** - Crear, leer, actualizar y eliminar transacciones
- ✅ **MongoDB Atlas** - Base de datos en la nube (o local)
- ✅ **Protección de Rutas** - Endpoints protegidos con JWT
- ✅ **Validaciones** - Validación de datos en múltiples niveles
- ✅ **Manejo de Errores** - Sistema robusto de manejo de errores
- ✅ **CORS Configurado** - Seguro para producción
- ✅ **TypeScript Ready** - Configuración incluida

## 🛠️ Tecnologías

| Tecnología | Propósito |
|------------|-----------|
| **Node.js** | Runtime JavaScript |
| **Express.js** | Framework web |
| **MongoDB** | Base de datos NoSQL |
| **Mongoose** | ODM para MongoDB |
| **JWT** | Autenticación |
| **Bcryptjs** | Encriptación de contraseñas |
| **CORS** | Seguridad entre dominios |
| **Dotenv** | Variables de entorno |

## 📁 Estructura del Proyecto
moneyflow-backend/
├── src/
│ ├── config/
│ │ └── database.js # Conexión a MongoDB
│ ├── controllers/
│ │ ├── authController.js # Lógica de autenticación
│ │ └── transactionController.js
│ ├── middleware/
│ │ ├── auth.js # Verificación JWT
│ │ ├── errorHandler.js # Manejo de errores
│ │ └── validation.js # Validaciones
│ ├── models/
│ │ ├── User.js # Modelo de usuario
│ │ └── Transaction.js # Modelo de transacción
│ ├── routes/
│ │ ├── authRoutes.js # Endpoints de autenticación
│ │ └── transactionRoutes.js # Endpoints de transacciones
│ ├── utils/
│ │ └── validators.js # Funciones de validación
│ └── app.js # Configuración de Express
├── .env # Variables de entorno
├── .gitignore # Archivos ignorados
├── package.json
├── server.js # Punto de entrada
└── README.md

text

## 🚦 Endpoints de la API

### Autenticación (`/api/auth`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/register` | Registrar nuevo usuario |
| POST | `/api/auth/login` | Iniciar sesión |
| GET | `/api/auth/me` | Obtener usuario actual (protegido) |

### Transacciones (`/api/transactions`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/transactions` | Obtener todas las transacciones del usuario |
| GET | `/api/transactions/:id` | Obtener una transacción específica |
| POST | `/api/transactions` | Crear nueva transacción |
| PUT | `/api/transactions/:id` | Actualizar transacción |
| DELETE | `/api/transactions/:id` | Eliminar transacción |

### Health Check

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/health` | Verificar estado del servidor |

## 📝 Ejemplos de Uso

### Registrar usuario
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan Pablo","email":"juan@example.com","password":"123456"}'
Iniciar sesión
bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"juan@example.com","password":"123456"}'
Crear transacción (requiere token)
bash
curl -X POST http://localhost:5000/api/transactions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{
    "name": "Café",
    "amount": 5.50,
    "originalAmount": 5.50,
    "originalCurrency": "USD",
    "type": "expense",
    "category": "Food",
    "date": "2026-06-13"
  }'
🚀 Instalación
Requisitos Previos
Node.js (v18 o superior)

MongoDB (local o Atlas)

Configuración
bash
# Clonar el repositorio
git clone https://github.com/jumonsalve7/moneyflow-backend.git
cd moneyflow-backend

# Instalar dependencias
npm install

# Crear archivo .env (ver ejemplo abajo)
# Ejecutar en modo desarrollo
npm run dev
Variables de Entorno (.env)
env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/moneyflow
JWT_SECRET=tu_secreto_jwt_aqui
NODE_ENV=development
Scripts
Comando	Descripción
npm run dev	Modo desarrollo con nodemon
npm start	Modo producción
npm run build	Compilar TypeScript
🔒 Seguridad
✅ Contraseñas encriptadas con bcrypt

✅ Tokens JWT con expiración

✅ Validación de datos de entrada

✅ Protección contra inyección

✅ CORS configurado

🤝 Conexión con el Frontend
Este backend está diseñado para funcionar con el frontend de MoneyFlow:

Frontend Repo: moneyflow-frontend

Tecnologías Frontend: React, Vite, Recharts, Context API

📄 Licencia
MIT

👨‍💻 Autor
Juan Pablo Monsalve

GitHub: @jumonsalve7