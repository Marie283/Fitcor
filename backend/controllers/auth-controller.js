const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { withTransaction } = require('../utils/with-transaction');

// Registro: crea un usuario nuevo con la contraseña hasheada y devuelve un JWT
exports.register = async (req, res) => {
    const { email, password } = req.body;
    try {
        // nunca se guarda la contraseña en texto plano, solo su hash con salt.
        // Se calcula antes de la transacción para que esta dure lo mínimo posible.
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Comprobar que el email no existe y crear el usuario en la misma transacción,
        // para que dos registros simultáneos con el mismo email no puedan colarse a la vez
        const user = await withTransaction(async (session) => {
            const exists = await User.findOne({ email }).session(session);
            if (exists) return null;
            return new User({ email, password: hashedPassword }).save({ session });
        });
        if (!user) return res.status(400).json({ msg: 'El usuario ya existe' });

        // el token solo lleva el id de usuario; no incluye datos sensibles
        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

// Login: valida credenciales contra el hash guardado y devuelve un JWT de sesión.
// Solo lee datos, así que no necesita transacción.
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Credenciales inválidas' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Credenciales inválidas' });

        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};
