const getDB = require("../../db/getDB");
const { generateError, savePhoto } = require("../../helpers");

const addExperiencePhoto = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { idExperience } = req.params;

    // Permitimos al usuario subir un máximo de 3 fotos. Comprobamos: si existen archivos que subir, vamos a hacer una llamada a la base de datos para comprobar si ya hay 5 o más fotos guardadas

    const [photos] = await connection.query(
      `SELECT * FROM experiencia_photo WHERE idExperience = ?`,
      [idExperience]
    );

    // Lanzamos un error si sube más de 3 fotos
    if (photos.length >= 3) {
      throw generateError("La experiencia ya tiene 3, no se permiten más", 409);
    }

    // Si no indica nueva foto, lanzamos error
    if (!req.files || !req.files.experiencesPhoto) {
      throw generateError("No has indicado una foto nueva ", 400);
    }

    // Usamos savePhoto para guardar la foto recibida en el directorio de static/experiences
    const photoName = await savePhoto(req.files.productPhoto, 1); // 1 === tipo de foto  para la ruta de experiencias

    // Guardar en la base de datos el nombre de la imagen en la tabla experiencia_photo junto al id de la experiencia a la q pertenece
    await connection.query(
      `INSERT INTO experiencia_photo (name, idExperience)
            VALUES (?, ?)`,
      [photoName, idExperience]
    );

    // Respondemos
    res.send({
      status: "Ok",
      message: "Foto de experiencia insertada con éxito!",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = addExperiencePhoto;
