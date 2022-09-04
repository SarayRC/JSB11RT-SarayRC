const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const modifyUser = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // Recuperamos el id del usuario a modificar. creamos variable idUser con path param
        const { idUser } = req.params;

        // Recuperamos el email y username que quiere modificar el usuario
        const { email, username } = req.body;

        // Si no nos indica ninguno de los datos
        if (!(email || username)) {
            throw generateError('Tienes que indicar email y username', 400);
        }

        // Antes de modificar el usuario, vamos a recuperar los datos anteriores
        // de la bbdd
        const [user] = await connection.query(
            `SELECT email, name FROM user WHERE id = ?`,
            [idUser]
        );

        // Hacemos la actualizacion, si no indica un dato (email o username) lo actualizaremos por el dato guardado previamente en la BBDD
        await connection.query(
            `UPDATE user SET email = ?, name = ? WHERE id = ?`,
            [email || user[0].email, username || user[0].username, idUser]
        );

        res.send({
            status: 'Ok',
            message: 'Datos del usuario modificados con éxito',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = modifyUser;