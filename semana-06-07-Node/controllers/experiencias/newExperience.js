const getDB = require("../../db/getDB");
const { generateError } = require("../../helpers");
const bcrypt = require('bcrypt');

const newExperience = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //Recuperamos id de las experiencias
        const {idExperience} = req.params;

        //Recuperamos datos del cuerpo de la petición
        const {name, price, description} = req.body;

 // recuperamos id del usuario para asignarselo a la experiencia

        const idReqUser = req.userAuth.id;

//Si falta algun campo obligatorio
if (!name || !price) {
    throw generateError('Debes indicar campos obligatorios', 400);
}

//si nos indica nombre y precio, insertamos nueva experiencia
await connection.query(
    `INSERT INTO experience (name, price, description, location, idUser)
    VALUES (?,?,?,?,?)`,
    [name, price, description, 'location', idReqUser]
);

res.send({
    status: 'Ok',
    message: 'Experiencia insertada con éxito!',
});

    } catch (error) {
        next(error);
    }finally {
        if (connection) connection.release();
    }
};

module.exports = newExperience;