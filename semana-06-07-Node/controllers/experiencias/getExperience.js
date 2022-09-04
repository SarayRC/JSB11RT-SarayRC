const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

// Funcion encargada de listar los productos en base de datos
const getExperience = async (req, res, next) => {
    let connection;

    try {
        // Abrimos una nueva conexion a la base de datos
        connection = await getDB();

        // Realizar una consulta a la base de datos para recuperar las experiencias
        const [experiencia] = await connection.query(`
            SELECT * FROM experience
        `);

        // Una vez recibidas las experiencias podemos responder con la lista de las mismas en BBDD
        res.send({
            status: 'Ok',
            data: experiencia,
        });
    } catch (error) {
        // Si ocurre algun error lo pasamos (en el servidor lo captura el middleware de error para mostrarlo)
        next(error);
    } finally {
        // Para evitar llegar al límite de conexiones y saturar la base de datos
        // Cerramos la conexion
        if (connection) connection.release();
    }
};


module.exports = getExperience;