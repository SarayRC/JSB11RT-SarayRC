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
const { email, username, surname1, type, password } = req.body;

  // Comprobaciones


  // Si no existe alguno de los campos obligatorios,
if (!email || !username || !password || !surname1) {
    throw generateError("Faltan campos obligatorios", 400);
}

  // Comprobamos que el email no existe previamente en la base de datos
const [user] = await connection.query(`SELECT id FROM user WHERE email = ?`, [
    email]
    );

  // Si ya existe un usuario con ese email
if (user.length > 0) {
    throw generateError(`Ya existe un usuario con el email indicado: ${email}`,409);
}

  // Encriptamos la contraseña
const hashedPassword = await bcrypt.hash(password, 10);

  // Insertar el usuario nuevo
await connection.query(
    `INSERT INTO user (name, surname1, email, password)
VALUES (?, ?, ?, ? )`,
    [username, surname1, email, hashedPassword]
);

  // Enviar una respuesta conforme todo ha ido correctamente
    res.send({
    status: "Ok",
    message: "Usuario creado correctamente",
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