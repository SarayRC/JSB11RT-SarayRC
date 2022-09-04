const getDB = require("../../db/getDB");
const { generateError, deletePhoto } = require("../../helpers");
const bcrypt = require("bcrypt");

const deleteExperience = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { idExperience } = req.params;

    // Si la experiencia tiene fotos asignadas, primero deberíamos seleccionarlas y elliminarlas
    // de una en una recorriendolas

    // Comprobamos que la experiencia que nos indican existe
    const [experiencia] = await connection.query(
      `SELECT id FROM experiencia WHERE id = ?`,
      [idExperience]
    );

    // Si no devuelve ningun resultado, la experiencia no existe
    if (experiencia.length < 1) {
      throw generateError(
        "La experiencia que intentas eliminar no existe",
        404
      );
    }

    // Si existe la experienica , previamente con el middelware canEditExperience comprobamos que es admin
    await connection.query(`DELETE FROM experiencia WHERE id = ?`, [
      idExperience,
    ]);

    res.send({
      status: "ok",
      message: "Experiencia eliminada!",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteExperience;
