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

        // Una consulta a la base de datos donde se seleccione un campo de la tabla producto WHERE el id corresponda
        // con el idProduct y el idUser que lo ha subido corresponde con el idReqUser

        const [user] = await connection.query(
         /*    `SELECT * FROM experience WHERE id = ? AND idUser = ?`,
            [idExperience, idReqUser]
        ); */

           `SELECT u.id, e.id FROM user u INNER JOIN experience e ON (u.id = e.idExperience) WHERE u.type = 'admin' AND`,
            [idExperience, idReqUser]
        );

        // Si la consulta no devuelve ningun resultado quiere decir que el producto a editar no pertenece al usuario logueado
        if (user.length < 1) {
            throw generateError(
                'No eres el propietario del producto a editar',
                401
            );
        }

        // Si es el propietario del producto pasamos la pelota
        next();
    } catch (error) {
        next(error);
    }finally{
        if (connection) connection.release();
    }
};

module.exports = canEditExperience;