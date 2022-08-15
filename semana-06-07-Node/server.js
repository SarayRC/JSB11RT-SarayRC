//Express
const express = require('express');


const app = express();

//Deserializamos el body
app.use(express.json());

/**
 * #################################
 * ### CONTROLADORES DE USUARIOS ###
 * #################################
 */

const newUser = require('./controllers/usuarios/newUser');

const newUserAdmin = require('./controllers/usuarios/newUserAdmin');

const loginUser = require('./controllers/usuarios/loginUser');

const getUser = require('./controllers/usuarios/getUser');

/**
 * #############################
 * ### ENDPOINTS DE USUARIOS ###
 * #############################
 */

// Registro de usuario
app.post('/register', newUser);

app.post('/registerAdmin', newUserAdmin);

// Login de usuario
app.post('/login', loginUser);

// Recuperamos datos de un usuario
app.get('/users/:idUser', getUser);

/* * #############################
* #######  MIDDELWARE  ########
* ############################# */

// Middleware de ERROR
app.use((error, req, res, next) => {
console.error(error);

res.status(error.httpStatus || 500);


res.send({

status: 'Error',
message: error.message,
});
});

// Middleware de NOT FOUND

app.use((req, res) => {
res.status(404);

res.send({
status: 'Error',
message: 'Not found',
});
});

//Ponemos servidor a la escucha
app.listen(4000, () => {
    console.log('Server listening at http://localhost:4000');
});