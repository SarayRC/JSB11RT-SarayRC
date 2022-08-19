//Archivo que compara el id del usuario logueado con el id del que quiere modificar, sino, da un error.


const getDB = require("../db/getDB");
const { generateError } = require("../helpers");

const canEditUser = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //Recupera el id del usuario de los params, el que se indica en la ruta
        const {idUser} = req.params;

        //Id del user que hace al request (el logueado)
        const idReqUser = req.userAuth.id;

         //Si son distintos id, no son el mismo user, por lo que no permitimos que modifique los datos

        if (Number(idUser) !== idReqUser){
            throw generateError(
                'No eres el propietario del usuario a editar', 401)
        }



        //Si son el mismo id
        next();
    } catch (error) {
        next(error);
    }finally{
        if (connection) connection.release();
    }
};

module.exports = canEditUser;