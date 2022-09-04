const jwt = require ("jsonwebtoken");
const getDB = require("../db/getDB");
const { generateError } = require("../helpers");
require('dotenv').config();

const isAuth = async (req, res,next)=> {

    //Los middelware No envian respuesta, solo dejan pasar
let connection;
    try {
        connection = await getDB();

        //Obtener cabecera de autorización donde va a ir el token. se recibe de la cabecera de la request

        const {authorization} = req.headers;

        // Si no existe cabecera de autorización, generamos nuevo error

        if (!authorization){
            throw generateError(`Falta cabecera de autorización`, 401);
        }

        //Variable que almacenara la info del token
        let tokenInfo;

        //Desencriptar el token (cabecera de autorización)
        try {
            tokenInfo = jwt.verify(authorization, process.env.SECRET)
        } catch (error) {
            //Si el token es válido
            throw generateError('No has iniciado sesión', 401);
        }


        // Seleccionamos al usuario con el id que viene del token
            const [user] = await connection.query(
            `SELECT * FROM user WHERE id = ?`,
            [tokenInfo.id]
    );

    // Si no está el usuario con ese id
    if (user.length < 1) {
    throw generateError('El token no es válido.', 401);
    }

         //Si el user existe y el token es válido, creamos en la request una propiedad que guardará el id del usuario que ha hecho login
        req.userAuth = tokenInfo;

        //Pasamos la pelota
        next();

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release(); // if implícito, por lo que no se ponen las llaves
    }
};
module.exports = isAuth;