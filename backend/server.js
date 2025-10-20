require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const routineRoutes = require('./routes/routines');

const app = express();

// Middlewares
app.use(cors({
    origin: (origin, callback) => {
        callback(null, origin || true);
    },
    credentials: true,
    methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));
app.options('*', cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/routines', routineRoutes);

// Variable para guardar la referencia del servidor
let server;

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    const PORT = process.env.PORT || 5000;
    server = app.listen(PORT, () => {
        //console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
        //console.log(`📊 Conectado a MongoDB`);
    });
})
.catch(err => {
    console.error('❌ Error al conectar a MongoDB:', err.message);
    process.exit(1);
});

// Función de cierre graceful
const gracefulShutdown = async (signal) => {
    //console.log(`\n⚠️  ${signal} recibido. Cerrando aplicación...`);
    
    // Cerrar servidor HTTP primero
    if (server) {
        server.close(async () => {
            //console.log('✅ Servidor HTTP cerrado');
            
            try {
                await mongoose.disconnect();
                //console.log('✅ Conexión a MongoDB cerrada');
                process.exit(0);
            } catch (err) {
                console.error('❌ Error al cerrar MongoDB:', err.message);
                process.exit(1);
            }
        });
    } else {
        try {
            await mongoose.disconnect();
            //console.log('✅ Conexión a MongoDB cerrada');
            process.exit(0);
        } catch (err) {
            console.error('❌ Error al cerrar MongoDB:', err.message);
            process.exit(1);
        }
    }

    // Timeout de seguridad
    setTimeout(() => {
        console.error('⏱️  Timeout alcanzado, forzando cierre');
        process.exit(1);
    }, 10000);
};

// Escuchar señales de terminación
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

// Manejar errores no capturados
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection en:', promise);
    console.error('Razón:', reason);
    gracefulShutdown('unhandledRejection');
});

process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    gracefulShutdown('uncaughtException');
});

// Eventos de conexión MongoDB
mongoose.connection.on('error', (err) => {
    console.error('❌ Error de conexión MongoDB:', err.message);
});

mongoose.connection.on('disconnected', () => {
    //console.log('⚠️  MongoDB desconectado');
});