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
            `SELECT * FROM experiencia_photo WHERE idExperience = ?`,
            [idExperience]
        );

        // Si ya hay 5 o más fotos, lanzamos un error, no permitimos subir más fotos
        if (photos.length >= 5) {
            throw generateError(
                'El producto ya consta con 5 o más fotos, no se permiten más',
                409
            );
        }

        // Si no indica una foto nueva, lanzaremos un error
        if (!req.files || !req.files.productPhoto) {
            throw generateError(
                'No has indicado una foto nueva de producto a subir',
                400
            );
        }

        // Usamos la funcion savePhoto para guardar la foto recibida en el directorio de static/products
        const photoName = await savePhoto(req.files.productPhoto, 1); // 1 === tipo de foto producto para la ruta de productos

        // Guardar en la base de datos el nombre de la imagen en la tabla product_photo junto al id del producto al que pertenece
        await connection.query(
            `INSERT INTO product_photo (name, idProduct)
            VALUES (?, ?)`,
            [photoName, idProduct]
        );

        // Si todo va bien, respondemos
        res.send({
            status: 'Ok',
            message: 'Foto de producto insertada con éxito!',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = addExperiencePhoto;