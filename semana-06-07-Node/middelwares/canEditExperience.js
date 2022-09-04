//Archivo que compara el id del usuario logueado con el id del que quiere modificar, sino, da un error.
const getDB = require("../db/getDB");
const { generateError } = require("../helpers");

const canEditExperience = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Solamente el usuario propietario del producto a "editar" puede modificar sus datos

    // Id del producto que queremos modificar
    const { idExperience } = req.params;

    // Id del usuario login
    const idReqUser = req.userAuth.id;

    // Recupero type del usuario login, previamente en loginUser e añadido type a recuperar en la variable creada tokenInfo, que recupera objeto con lo solicitado
    const typeReqUser = req.userAuth.type;

    //otra manera es recuperar el tipo del user logado.
    // Consultamos a la base de datos segun el id del usuario logueado y sacamos el tipo de usuario que es
    /*    const [user] = await connection.query(
    `SELECT tipo FROM usuario WHERE id = ?`,
    [idReqUser]
);

// Si el tipo de este usuario NO es admin, lanzamos un error
if (user[0].tipo !== 'admin') {
    throw generateError('No eres un usuario administrador', 401);
} */

    if (typeReqUser !== `admin`) {
      throw generateError("No puedes editar experiencias", 401);
    }

    // Si es el user es admin pasamos la pelota
    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = canEditExperience;
