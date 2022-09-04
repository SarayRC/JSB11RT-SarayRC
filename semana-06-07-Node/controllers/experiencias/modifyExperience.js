const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const modifyExperience = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // Recuperamos el id de la experiencia de los params
    const { idExperience } = req.params;

   // Recuperamos los datos del cuerpo de la peticion
    const { name, price, description, location } = req.body;

   // Si no envia nada para editar, lanzaremos un error
    if (!name && !price && !description && !location) {
    throw generateError('Te faltan datos obligatorios.', 400);
}

     // Seleccionamos los datos antiguos de la experiencia
        const [experience] = await connection.query(
        `SELECT name, price, description, location FROM experience WHERE id = ?`,
        [idExperience]
    );

   // Actualizamos la tabla experience con los nuevos datos
    await connection.query(
    `UPDATE experience
        SET name = ?,
        price = ?,
        description = ?
        location = ?
        WHERE id = ?`,
    [
        name || experience[0].name,
        price || experience[0].precio,
        description || experience[0].description,
        idExperience,
    ]
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

module.exports = modifyExperience;