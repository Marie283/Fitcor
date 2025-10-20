# 🏋️ GymApp - Aplicación de Gimnasio

Una aplicación completa de gimnasio tipo Basic Fit/Synergy Gym con frontend en React y backend en Node.js/Express.

## 🚀 Características

- ✅ **Frontend React** con navegación por rutas
- ✅ **Backend Node.js/Express** con autenticación JWT
- ✅ **Base de datos MongoDB Atlas**
- ✅ **Diseño responsive** para móvil, tablet y desktop
- ✅ **PWA** (Progressive Web App)
- ✅ **Lazy loading** para mejor rendimiento
- ✅ **Modales y toasts** en lugar de alerts
- ✅ **PropTypes** para validación de props
- ✅ **Logging inteligente** (solo en desarrollo)

## 📋 Requisitos Previos

- Node.js 18.x o superior
- npm o yarn
- MongoDB Atlas (gratuito)
- Cuenta en Hostinger o cualquier sitio que te de hosting y dominio (para producción)

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <tu-repositorio>
cd gymapp
```

### 2. Instalar dependencias
```bash
# Frontend
npm install

# Backend
cd backend
npm install
cd ..
```

### 3. Configurar variables de entorno

**Frontend** (crear `.env` en la raíz):
```env
REACT_APP_API_URL=https://www.fitcor.fun
```

**Backend** (crear `.env` en `backend/`):
```env
MONGO_URI=mongodb+srv://usuario:contraseña@fitcor.x6ze1ab.mongodb.net/gymapp?retryWrites=true&w=majority
NODE_ENV=development
JWT_SECRET=tu_jwt_secret_super_seguro
FRONTEND_URL=http://localhost:3000
```

### 4. Configurar MongoDB Atlas
- Crear cluster en [MongoDB Atlas](https://cloud.mongodb.com)
- Configurar Network Access (agregar `0.0.0.0/0` para desarrollo)
- Crear usuario de base de datos
- Obtener cadena de conexión

## 🚀 Comandos Disponibles

### Desarrollo
```bash
# Iniciar ambos servicios automáticamente
npm run dev

# Solo frontend
npm run frontend

# Solo backend
npm run backend

# Backend con nodemon (auto-reload)
npm run backend:dev
```

### Producción
```bash
# Crear build de producción
npm run build

# Preparar archivos para Hostinger
npm run deploy:prepare
```

### Testing
```bash
# Ejecutar tests
npm test

# Build con análisis
npm run build
```

## 🌐 URLs de Desarrollo

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **API Docs**: http://localhost:5000/api

## 📱 Funcionalidades

### Frontend
- 🏠 **Inicio**: Dashboard principal con estadísticas
- 👤 **Perfil**: Gestión de usuario y configuración
- 💪 **Entrenamiento**: Rutinas y ejercicios
- 📊 **Progreso**: Seguimiento de objetivos
- 🏢 **Clubs**: Información de gimnasios
- ⏱️ **Temporizador**: Cronómetro para entrenamientos

### Backend
- 🔐 **Autenticación**: Login/registro con JWT
- 📝 **Rutinas**: CRUD de rutinas de ejercicio
- 👥 **Usuarios**: Gestión de perfiles
- 🛡️ **Middleware**: Validación y seguridad

## 🏗️ Estructura del Proyecto

```
gymapp/
├── src/                    # Frontend React
│   ├── components/         # Componentes reutilizables
│   ├── paginas/           # Páginas principales
│   ├── api/               # Configuración de API
│   ├── utils/             # Utilidades
│   └── img/               # Imágenes
├── backend/               # Backend Node.js
│   ├── routes/            # Rutas de API
│   ├── models/            # Modelos de MongoDB
│   ├── middleware/        # Middleware personalizado
│   └── server.js          # Servidor principal
├── public/                # Archivos estáticos
└── docs/                  # Documentación
```

## 🚀 Despliegue en Hostinger

### 1. Preparar archivos
```bash
npm run deploy:prepare
```

### 2. Configurar en Hostinger
- Habilitar Node.js en el panel
- Subir archivos según `HOSTINGER-GUIDE.md`
- Configurar variables de entorno
- Instalar dependencias del backend

### 3. URLs de producción
- **Frontend**: `https://tu-dominio.com`
- **Backend**: `https://tu-dominio.com/backend`

## 🔧 Tecnologías Utilizadas

### Frontend
- **React 19** - Framework principal
- **React Router** - Navegación
- **React Toastify** - Notificaciones
- **PropTypes** - Validación de props
- **Lazy Loading** - Carga diferida

### Backend
- **Node.js** - Runtime
- **Express** - Framework web
- **MongoDB** - Base de datos
- **Mongoose** - ODM
- **JWT** - Autenticación
- **CORS** - Cross-origin requests

## 📚 Documentación Adicional

- [Guía de Desarrollo](README-DEV.md)
- [Guía de Despliegue](HOSTINGER-GUIDE.md)
- [Configuración de MongoDB](HOSTINGER-DEPLOY.md)

## 🐛 Solución de Problemas

### Error de conexión a MongoDB
1. Verificar cadena de conexión
2. Comprobar IP en whitelist
3. Revisar credenciales de usuario

### Error 502/503 en producción
1. Verificar que Node.js esté habilitado
2. Comprobar variables de entorno
3. Revisar logs en el panel de Hostinger

### CORS Error
1. Verificar configuración de CORS
2. Comprobar URLs en variables de entorno
3. Asegurar uso de HTTPS en producción

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Soporte

Si tienes problemas o preguntas:
1. Revisa la documentación
2. Busca en los issues existentes
3. Crea un nuevo issue con detalles del problema

---

**¡Disfruta entrenando! 💪**
