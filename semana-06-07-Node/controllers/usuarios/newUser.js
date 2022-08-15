//Dependencias requeridas

const getDB = require('../../db/getDB');
const bcrypt = require('bcrypt');
const { generateError } = require('../../helpers');

const newUser = async (req, res, next) => {
let connection;

try {
// Abrir una nueva conexion a la base de datos
connection = await getDB();

// Recuperar los datos que indique el usuario
const { email, username, apellido1, tipo, password } = req.body;

// Comprobaciones
// Si no existe alguno de los campos obligatorios,
if (!email || !username || !password) {

throw generateError('Faltan campos obligatorios', 400);
}

// Comprobamos que el email no existe previamente en la base de datos
const [user] = await connection.query(
`SELECT id FROM usuario WHERE email = ?`,
[email]
);

// Si ya existe un usuario con ese email
if (user.length > 0) {

throw generateError('Ya existe un usuario con este email', 409);
}

// Encriptamos la contraseña
const hashedPassword = await bcrypt.hash(password, 10);

// Insertar el usuario nuevo
await connection.query(
`INSERT INTO usuario (nombre, apellido1, email, password, tipo, createdAt)
VALUES (?, ?, ?, ?,?,?)`,
[username, apellido1, email, hashedPassword, 'normal', new Date()]
);

// Enviar una respuesta conforme todo ha ido correctamente
res.send({
status: 'Ok',
message: 'Usuario creado correctamente',
});

} catch (error) {
// Los errores que ocurran los pasamos al middleware de error
next(error);

} finally {
// Cerramos conexión con la BBDD
if (connection) connection.release();
}
};

module.exports = newUser;