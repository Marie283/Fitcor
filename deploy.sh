#!/bin/bash

echo "🚀 Preparando aplicación para Hostinger..."

# Crear build de producción
echo "📦 Creando build de producción..."
npm run build

# Crear carpeta de deploy
echo "📁 Creando carpeta de deploy..."
mkdir -p deploy
rm -rf deploy/*

# Copiar frontend (build)
echo "⚛️ Copiando frontend..."
cp -r build/* deploy/

# Copiar backend
echo "🔧 Copiando backend..."
cp -r backend deploy/

# Crear archivos de configuración para producción
echo "⚙️ Creando archivos de configuración..."

# Archivo .env para frontend (producción)
cat > deploy/.env << EOF
REACT_APP_API_URL=s:https://fitcor.fun
EOF

# Archivo .env para backend (producción)
cat > deploy/backend/.env << EOF
MONGO_URI=mongodb+srv://usuario:contraseña@fitcor.x6ze1ab.mongodb.net/gymapp?retryWrites=true&w=majority
PORT=5000
NODE_ENV=production
JWT_SECRET=tu_jwt_secret_super_seguro_aqui
FRONTEND_URL=https://fitcor.fun
EOF

# Crear archivo de instrucciones
cat > deploy/INSTRUCCIONES.txt << EOF
INSTRUCCIONES PARA HOSTINGER:

1. FRONTEND:
    - Sube todo el contenido de esta carpeta a public_html/
    - O crea una subcarpeta como public_html/fitcor/

2. BACKEND:
    - Sube la carpeta backend/ a tu servidor
    - Asegúrate de que Node.js esté habilitado
    - Ejecuta: cd backend && npm install
    - Ejecuta: cd backend && npm start

3. CONFIGURACIÓN:
    - Edita los archivos .env con tus URLs reales
    - Configura MongoDB Atlas para tu IP de producción
    - Configura CORS en el backend para tu dominio

4. URLs DE EJEMPLO:
    - Frontend: https://fitcor.es
    - Backend: https://tu-dominio.com/api

¡Listo para subir a Hostinger!
EOF

echo "✅ Deploy preparado en la carpeta 'deploy/'"
echo "📋 Lee INSTRUCCIONES.txt para los pasos siguientes"
echo ""
echo "📁 Archivos listos para subir:"
echo "   - Frontend: Todo el contenido de deploy/"
echo "   - Backend: Carpeta deploy/backend/"
