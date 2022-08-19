const getDB = require('../../db/getDB');
const { generateError, deletePhoto, savePhoto } = require('../../helpers');

const editUserAvatar = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idUser } = req.params;


console.log(req.files);

        // Comprobamos que existe el archivo del nuevo avatar
        if (!req.files || !req.files.avatar) {
            throw generateError('Debes indicar un nuevo avatar', 400);
        }

        // Recuperamos avatar antiguo del usuario de la BBDD
        const [user] = await connection.query(
            `SELECT avatar FROM user WHERE id = ?`,
            [idUser]
        );

        // Si existe un avatar previo lo eliminamos
        if (user[0].avatar) {
            await deletePhoto(user[0].avatar, 0); // recibe el nombre de la imagen a eliminar y el tipo que identifica si es un avatar o producto
        }

        // Guardar nuevo avatar en el servidor
        const avatarName = await savePhoto(req.files.avatar, 0);

        // Modificar en BBDD el nombre de la imagen de usuario
        await connection.query(`UPDATE user SET avatar = ? WHERE id = ?`, [
            avatarName,
            idUser,
        ]);

        res.send({
            status: 'Ok',
            message: 'Avatar modificado con éxito',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = editUserAvatar;