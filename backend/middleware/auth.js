const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    
    // LOGS DE DEBUG (temporal)
    console.log('🔑 Token recibido:', token ? 'SÍ' : 'NO');
    console.log('🔑 Token value:', token ? token.substring(0, 20) + '...' : 'undefined');
    console.log('🔑 JWT_SECRET existe:', !!process.env.JWT_SECRET);
    
    if (!token) return res.status(401).json({ msg: 'No hay token, autorización denegada' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('✅ Token decodificado:', decoded);
        req.user = decoded.userId;
        next();
    } catch (err) {
        console.error('❌ Error al verificar token:', err.message);
        res.status(401).json({ msg: 'Token no válido' });
    }
};
