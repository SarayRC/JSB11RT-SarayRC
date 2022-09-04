const getDB = require('../../db/getDB');
const bcrypt = require('bcrypt');
const { generateError } = require('../../helpers');

const newUserAdmin = async (req, res, next) => {
let connection;

try {

connection = await getDB();

// Recuperar los datos que indique el usuario
const { email, username, surname1, type, password } = req.body;

// Si no existe alguno de los datos obligatorios,
if (!email || !username || !password) {

throw generateError('Faltan campos obligatorios', 400);
}

// Comprobamos que el email no existe ya creado en la base de datos
const [user] = await connection.query(
`SELECT id FROM user WHERE email = ?`,
[email]
);


if (user.length > 0) {

throw generateError('Ya existe un usuario con este email', 409);
}

// Encriptamos la contraseña
const hashedPassword = await bcrypt.hash(password, 10);

// Insertar el usuario nuevo
await connection.query(
`INSERT INTO user (name, surname1, email, password, type, createdAt)
VALUES (?, ?, ?, ?,?,?)`,
[username, surname1, email, hashedPassword, 'admin', new Date()]
);

// Enviar una respuesta conforme todo ha ido correctamente
res.send({
status: 'Ok',
message: 'Usuario admin creado',
});

} catch (error) {
// Los errores que ocurran los pasamos al middleware de error
next(error);

} finally {
// Cerramos conexión con la BBDD
if (connection) connection.release();
}
};

module.exports = newUserAdmin;