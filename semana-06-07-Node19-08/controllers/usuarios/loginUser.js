//Login de usuario

const getDB = require('../../db/getDB');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateError } = require('../../helpers');
require('dotenv').config();

const loginUser = async (req, res, next) => {
    let connection;

    try {

        connection = await getDB();

        // recuperamos email y password del body
        const { email, password} = req.body;

        if (!email || !password ) {
            throw generateError('Faltan campos obligatorios', 400);
        }

        // Comprobamos si existe un usuario con el email indicado en la BBDD
        const [user] = await connection.query(
            `SELECT id, email, password FROM user WHERE email = ?`,
            [email]
        );
////////////AÑADIR CONDICION PÀRA LA PASSWORD////////////////

        // Si no existe usuario con ese email, lanzamos un error
        if (user.length < 1) {
            throw generateError('No existe ningún usuario registrado con este email', 404);
        }

        // Si existe un usuario con ese email comprobamos que las contraseñas coinciden

        const validPassword = await bcrypt.compare(password, user[0].password);

        // Si no coinciden las contraseñas damos un error
        if (!validPassword) {
            throw generateError('La contraseña es errónea', 401);
        }

        // Si los datos son correctos, generaremos un token de inicio de sesion

        // Creamos un objeto con la info que pasaremos al token
        const tokenInfo = {
            id: user[0].id,
        };

        // Creamos el token
        const token = jwt.sign(tokenInfo, process.env.SECRET, {
            expiresIn: '10d',
        });

        // Enviamos respuesta el token generado
        res.send({
            status: 'Ok',
            message: 'Usuario logueado',
            authToken: token,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = loginUser;
