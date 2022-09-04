//Express
const express = require("express");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");

const app = express();

//Deserializamos el body
app.use(express.json());

//Middelware de morgan, da más información de las peticiones
app.use(morgan("dev"));

//Middelware que permite leer los archivos en formaro form-data
app.use(fileUpload());

/**
 * ######################
 * # Middlewares #
 * ######################
 */
const isAuth = require("./middelwares/isAuth");
const canEditUser = require("./middelwares/canEditUser");
const canEditExperience = require("./middelwares/canEditExperience");
/**
 * #################################
 * # CONTROLADORES DE EXPERIENCIAS #
 * #################################
 */
const getExperience = require("./controllers/experiencias/getExperience.js");
const newExperience = require("./controllers/experiencias/newExperience");
const modifyExperience = require("./controllers/experiencias/modifyExperience");
const addExperiencePhoto = require("./controllers/experiencias/addExperiencePhoto");
const deleteExperience = require("./controllers/experiencias/deleteExperience");

/**
 * #################################
 * ### CONTROLADORES DE USUARIOS ###
 * #################################
 */
const getUser = require("./controllers/usuarios/getUser");
const newUser = require("./controllers/usuarios/newUser");
const newUserAdmin = require("./controllers/usuarios/newUserAdmin");
const loginUser = require("./controllers/usuarios/loginUser");
const editUserAvatar = require("./controllers/usuarios/editUserAvatar");

const modifyUser = require("./controllers/usuarios/modifyUser");
const editUserPassword = require("./controllers/usuarios/editUserPassword");
const deleteUser = require("./controllers/usuarios/deleteUser");

/**
 * #############################
 * ### ENDPOINTS DE USUARIOS ###
 * #############################
 */
// Registro de usuario
app.post("/register", newUser);
app.post("/registerAdmin", newUserAdmin);
// Login de usuario
app.post("/login", loginUser);
// Recuperamos datos de un usuario
app.get("/users/:idUser", getUser);
// Modificar el avatar del usuario
app.put("/users/:idUser/avatar", isAuth, canEditUser, editUserAvatar);
//Modificar contraseña e email del usuario, necesitamos saber si: -esta logueado,
app.put("/users/:idUser/password", isAuth, canEditUser, editUserPassword);
//Middelware. Modificar datos por usuario logueado.
app.put("/users/:idUser", isAuth, canEditUser, modifyUser);
//Eliminar usuario
app.delete("/users/:idUser", isAuth, canEditUser, deleteUser);
/**
 * #################################
 * ### ENDPOINTS DE EXPERIENCIAS ###
 * #################################
 */
// Recuperamos datos de una experiencia
app.get("/experience/:idExperience", getExperience);
// Registro de experiencia
app.post("/register/newExperience", isAuth, canEditExperience, newExperience);
//Delete experiencia
app.delete(
  "/experience/:idExperience",
  isAuth,
  canEditExperience,
  deleteExperience
);
// Añadir foto de experiencia
app.put(
  "/experience/:idExperience/photo",
  isAuth,
  canEditExperience,
  addExperiencePhoto
);

//Modificar experiencia
app.post(
  "/modifyExperience/:idExperience",
  isAuth,
  canEditExperience,
  modifyExperience
);

/* * #############################
 * #######  MIDDELWARE  ########
 * ############################# */

// Middleware de ERROR
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500);

  res.send({
    status: "Error",
    message: error.message,
  });
});

// Middleware de NOT FOUND

app.use((req, res) => {
  res.status(404);

  res.send({
    status: "Error",
    message: "Not found",
  });
});

// escucha
app.listen(4000, () => {
  console.log("Server listening at http://localhost:4000");
});
