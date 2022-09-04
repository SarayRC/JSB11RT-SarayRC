const getDB = require("../../db/getDB");
const { generateError } = require("../../helpers");
const bcrypt = require('bcrypt');

// Funcion que modifica la password
const editUserPassword = async (req, res,next) => {
    let connection;

    try {
        connection = await getDB();

        //Recuperamos el idUser de los parámetros de ruta (path params)
        const {idUser} = req.params;

        //Obtenemos campos del body
        const {oldPass, newPass} = req.body;

        //Si no aportan la nueva o la antigua contraseña
        if (!oldPass || !newPass){
            throw generateError('Debes indica la contraseña antigua y la nueva', 404
            );
        }




        //Recuperamos la antigua contraseña de la BBDD
        const [user] = await connection.query(
            `SELECT password FROM user WHERE id = ?`,
            [idUser]
        );

        //Comprobamos si la antigua conincide con la guardada en la BBDD
            const isValid = await bcrypt.compare(oldPass, user[0].password);

            //Si la contraseña antigua no coincide

            if (!isValid){
                throw generateError(' La contraseña antigua no coindide', 401);
            }
        //Si la contraseña es correcta, encriptamos la nueva contraseña

        const hashedPassword = await bcrypt.hash(newPass, 10);

//Actualizamos la BBDD con la nueva pass
        await connection.query (`UPDATE user SET password = ? WHERE id = ?`,
        [idUser]
);


    } catch (error) {
        next(error);
    }finally{
if (connection) connection.release();
    }
};


module.exports = editUserPassword;