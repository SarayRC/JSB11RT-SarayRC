const getDB = require('../../db/getDB');
const { generateError, savePhoto } = require('../../helpers');

const addExperiencePhoto = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idExperience } = req.params;

        // Vamos a permitir al usuario subir un máximo de 5 fotos de producto. Asi que antes de comprobar
        // si existen archivos que subir, vamos a hacer una llamada a la base de datos para comprobar si ya hay 5 o más fotos guardadas

        const [photos] = await connection.query(
            `SELECT * FROM experience_photo WHERE idExperience = ?`,
            [idExperience]
        );

        // Si ya hay 5 o más fotos, lanzamos un error, no permitimos subir más fotos
        if (photos.length >= 5) {
            throw generateError(
                'La experiencia ya consta con 5 o más fotos, no se permiten más',
                409
            );
        }

        // Si no indica una foto nueva, lanzaremos un error
        if (!req.files || !req.files.experiencePhoto) {
            throw generateError(
                'No has indicado una foto nueva de experiencia a subir',
                400
            );
        }

        // Usamos la funcion savePhoto para guardar la foto recibida en el directorio de static/experiences
        const photoName = await savePhoto(req.files.experiencePhoto, 1); // 1 === tipo de foto experience para la ruta de experiencias

        // Guardar en la base de datos el nombre de la imagen en tabla experience_photo junto al id de la experiencia a la que pertenece
        await connection.query(
            `INSERT INTO experience_photo (name, idExperience)
            VALUES (?, ?)`,
            [photoName, idExperience]
        );

        // Si todo va bien, respondemos
        res.send({
            status: 'Ok',
            message: 'Foto de experiencia insertada con éxito!',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = addExperiencePhoto;
