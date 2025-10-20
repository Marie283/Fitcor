# 🚀 GUÍA COMPLETA PARA SUBIR A HOSTINGER

## 📋 PASOS PREVIOS:

### 1. Preparar archivos
```bash
npm run deploy:prepare
```

### 2. Configurar MongoDB Atlas para producción
- Ve a Network Access en MongoDB Atlas
- Agrega la IP de tu servidor Hostinger
- O usa `0.0.0.0/0` temporalmente (menos seguro)

## 📁 ESTRUCTURA PARA HOSTINGER:

```
public_html/
├── index.html          # Frontend (desde build/)
├── static/            # Archivos estáticos
├── manifest.json      # PWA manifest
└── backend/           # Carpeta del backend
    ├── server.js
    ├── package.json
    ├── .env           # Variables de producción
    └── node_modules/  # Después de npm install
```

## 🔧 CONFIGURACIÓN EN HOSTINGER:

### 1. Panel de Control
- Ve a "Avanzado" → "Node.js"
- Habilita Node.js
- Configura la versión (recomendado: 18.x o superior)

### 2. Variables de Entorno
En el panel de Node.js, configura:
```
MONGO_URI=mongodb+srv://X:Gymapp1@fitcor.x6ze1ab.mongodb.net/
JWT_SECRET=clave_super_secreta_fitcor123
NODE_ENV=production
FRONTEND_URL=https://tu-dominio.com
```

### 3. Archivo de Inicio
Configura el archivo de inicio como: `backend/server.js`

## 📤 SUBIR ARCHIVOS:

### Opción A: File Manager
1. Ve a File Manager en Hostinger
2. Sube el contenido de `build/` a `public_html/`
3. Sube la carpeta `backend/` a `public_html/backend/`

### Opción B: FTP/SFTP
1. Conecta con FileZilla o similar
2. Sube archivos como se indica arriba

## ⚙️ CONFIGURACIÓN FINAL:

### 1. Instalar dependencias del backend
```bash
cd public_html/backend
npm install --production
```

### 2. Configurar CORS en el backend
El backend ya está configurado para aceptar tu dominio.

### 3. Probar la aplicación
- Frontend: `https://tu-dominio.com`
- Backend: `https://tu-dominio.com/backend` (si usas subcarpeta)

## 🔍 VERIFICACIÓN:

### 1. Frontend funciona
- Abre tu dominio en el navegador
- Debe cargar la aplicación React

### 2. Backend funciona
- Ve a `https://tu-dominio.com/backend/api/auth/login`
- Debe responder (aunque sea con error, significa que está funcionando)

### 3. Conexión a MongoDB
- Revisa los logs en el panel de Node.js
- Debe mostrar "✅ Conectado a MongoDB Atlas"

## 🚨 PROBLEMAS COMUNES:

### Error 502/503
- Verifica que Node.js esté habilitado
- Revisa que el puerto sea correcto
- Comprueba las variables de entorno

### CORS Error
- Verifica que FRONTEND_URL sea correcta
- Asegúrate de usar HTTPS en producción

### MongoDB Connection Error
- Verifica la cadena de conexión
- Comprueba que la IP esté en whitelist
- Revisa las credenciales

## 📞 SOPORTE:
Si tienes problemas, revisa:
1. Logs de Node.js en el panel de Hostinger
2. Console del navegador para errores de frontend
3. Network tab para errores de API
