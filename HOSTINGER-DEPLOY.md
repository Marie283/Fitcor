#README DE COMO SUBIR A HOSTINGER
# Configuración para Hostinger - Producción

## 📁 Estructura de archivos para subir:

### Frontend (Carpeta build/)
- Sube todo el contenido de la carpeta `build/` a la raíz de tu dominio
- O a una subcarpeta como `public_html/gymapp/`

### Backend (Carpeta backend/)
- Sube toda la carpeta `backend/` a tu servidor
- Asegúrate de que Node.js esté habilitado en tu hosting

## 🔧 Variables de entorno para producción:

### Frontend (.env en la raíz):
```
REACT_APP_API_URL=https://tu-dominio.com/api
```

### Backend (.env en backend/):
```
MONGO_URI=mongodb+srv://usuario:contraseña@fitcor.x6ze1ab.mongodb.net/gymapp?retryWrites=true&w=majority
PORT=5000
NODE_ENV=production
JWT_SECRET=tu_jwt_secret_super_seguro
FRONTEND_URL=https://tu-dominio.com
```

## 🌐 URLs de ejemplo:
- Frontend: https://tu-dominio.com
- Backend: https://tu-dominio.com/api (si usas subcarpeta)
- O Backend: https://api.tu-dominio.com (si usas subdominio)

## ⚠️ Importante:
1. Cambia todas las URLs de localhost por tu dominio real
2. Configura MongoDB Atlas para permitir tu IP de producción
3. Usa HTTPS en producción
4. Configura CORS correctamente para tu dominio
