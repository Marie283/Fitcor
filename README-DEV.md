# 🏋️ GymApp - Aplicación de Gimnasio

Una aplicación completa de gimnasio con frontend en React y backend en Node.js/Express.

## 🚀 Inicio Rápido

### Opción 1: Inicio Automático (Recomendado)
```bash
npm run dev
```
Este comando iniciará automáticamente tanto el backend como el frontend.

### Opción 2: Inicio con Concurrently
```bash
npm run dev:concurrent
```

### Opción 3: Inicio con Nodemon (Desarrollo)
```bash
npm run dev:full
```

## 📋 Scripts Disponibles

- `npm run dev` - Inicia ambos servicios automáticamente
- `npm run dev:concurrent` - Inicia ambos servicios con concurrently
- `npm run dev:full` - Inicia ambos servicios con nodemon para desarrollo
- `npm run frontend` - Solo frontend (React)
- `npm run backend` - Solo backend (Node.js)
- `npm run backend:dev` - Backend con nodemon

## 🌐 URLs

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

## ⚙️ Configuración

1. Copia `env.example` como `.env` en la raíz del proyecto
2. Configura las variables de entorno según tu entorno
3. Asegúrate de que MongoDB esté configurado correctamente

## 🛑 Detener Servicios

Presiona `Ctrl+C` para detener ambos servicios de forma segura.

## 📁 Estructura del Proyecto

```
gymapp/
├── src/                 # Frontend React
├── backend/            # Backend Node.js/Express
├── package.json        # Configuración principal
├── start-dev.js       # Script de inicio automático
└── env.example        # Variables de entorno de ejemplo
```
