/* "// Requerimos getDB que hará la conexion con la base de datos */
const getDB = require('./getDB');


// Funcion que creara y borrara las tablas de la base de datos
async function main() {
// Crear la variable que albergará la conexion con la base de datos
let connection;

try {
// Abrir una conexion con la base de datos
connection = await getDB();

// Eliminar las tablas de la base de datos si existen

await connection.query('DROP TABLE IF EXISTS experience_photo');
await connection.query('DROP TABLE IF EXISTS user_booking_experience');
await connection.query('DROP TABLE IF EXISTS experience');
await connection.query('DROP TABLE IF EXISTS company');
await connection.query('DROP TABLE IF EXISTS user');

// Crear las tablas de la base de datos

await connection.query(`
CREATE TABLE IF NOT EXISTS user (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
name VARCHAR (50) NOT NULL,
avatar VARCHAR (255),
surname1 VARCHAR(50) NOT NULL,
surname2 VARCHAR(50),
date_birth DATETIME,
email VARCHAR(100) NOT NULL,
password VARCHAR(200) NOT NULL,
type ENUM ('admin' , 'normal') DEFAULT 'normal',
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`)

await connection.query(`
CREATE TABLE IF NOT EXISTS experience (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(255) NOT NULL,
price DECIMAL (5,2) NOT NULL,
description TEXT,
location VARCHAR (255) NOT NULL,
reserved BOOLEAN DEFAULT false,

idUser INT UNSIGNED NOT NULL,
FOREIGN KEY (idUser) REFERENCES user (id)
)
`)

await connection.query(`
CREATE TABLE IF NOT EXISTS company (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(50) NOT NULL,

idUser INT UNSIGNED NOT NULL,
FOREIGN KEY (idUser) REFERENCES user (id)
)
`)

await connection.query(`
CREATE TABLE IF NOT EXISTS user_booking_experience (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

idUser INT UNSIGNED NOT NULL,
FOREIGN KEY (idUser ) REFERENCES user (id),

idExperience INT UNSIGNED NOT NULL,
FOREIGN KEY (idExperience) REFERENCES experience (id)
)
`)


await connection.query(`
CREATE TABLE IF NOT EXISTS experience_photo (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(255) NOT NULL,
description TEXT,

idExperience INT UNSIGNED NOT NULL,
FOREIGN KEY (idExperience) REFERENCES experience (id)
)
`)

await connection.query(
`INSERT INTO user (name, surname1, surname2, avatar, date_birth, email, password, type, createdAt)
VALUES ('userPrueba01', 'apellido1', 'apellido2', null, '1990-05-15','emailprueba@gmail.com', '123456', 'normal', ?)`,
[new Date()]
)



await connection.query(
`INSERT INTO company (name, idUser)
VALUES ('Empresa1', 1)`
)

await connection.query(
`INSERT INTO experience (name, price, description, location, idUser)
VALUES ('Experiencia1', 195.55, 'primera opcion', 'lugar1', 1)`
)

await connection.query(
    `INSERT INTO user_booking_experience (idUser, idExperience)
    VALUES (1 , 1)`
    )

console.log('Datos de prueba insertados con éxito!');

} catch (error) {
console.error(error.message);
} finally {
// Si o si al final del try catch, ejecuta el codigo dentro del finally

// Siempre al final cerraremos la conexion con la base de datos
if (connection) connection.release();

// Finalizamos la ejecucion del script
process.exit();
}
}

// Ejecutamos la funcion
main();