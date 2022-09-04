const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const getUser = async (req, res, next) => {
    let connection;

    try {

        connection = await getDB();

        // Recuperamos el path param
        const { idUser } = req.params;

        // Seleccionamos los datos del usuario con el id indicado
        const [user] = await connection.query(
            `SELECT * FROM user WHERE id = ?`,
            [idUser]
        );

        // Comprobación si existe un usuario con el mismo id
        if (user.length < 1) {
            throw generateError('No existe el usuario indicado', 404);
        }

        // Si el usuario existe, lo devolvemos
        res.send({
            status: 'Ok',
            message: 'Dispón de los datos solicitados',
            data: user[0],
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getUser;
