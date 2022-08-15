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

await connection.query('DROP TABLE IF EXISTS experiencia');
await connection.query('DROP TABLE IF EXISTS empresa');
await connection.query('DROP TABLE IF EXISTS usuario');


// Crear las tablas de la base de datos

await connection.query(`
CREATE TABLE IF NOT EXISTS usuario (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR (50) NOT NULL,
apellido1 VARCHAR(50) NOT NULL,
apellido2 VARCHAR(50),
fecha_nac DATETIME,
email VARCHAR(100) NOT NULL,
password VARCHAR(200) NOT NULL,
tipo ENUM ('admin' , 'normal') ,
createdAt DATETIME
)
`);

await connection.query(`
CREATE TABLE IF NOT EXISTS empresa (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR(50) NOT NULL
)
`);

await connection.query(`
CREATE TABLE IF NOT EXISTS experiencia (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(255) NOT NULL,
precio DECIMAL (5,2) NOT NULL,
descripcion TEXT,
localizacion VARCHAR (255) NOT NULL,

idEmpresaOrganiza  INT UNSIGNED NOT NULL,
FOREIGN KEY (idEmpresaOrganiza ) REFERENCES empresa  (id)
)
`);


await connection.query(
`INSERT INTO usuario (nombre, apellido1, apellido2, fecha_nac, email, password, tipo, createdAt)
VALUES ('userPrueba01', 'apellido1', 'apellido2', '1990-05-15','emailprueba@gmail.com', '123456', 'normal', ?)`,
[new Date()]
);


await connection.query(
`INSERT INTO empresa (nombre)
VALUES ('Empresa1'),
('Empresa2')`
);

await connection.query(
`INSERT INTO experiencia (titulo, precio, descripcion, localizacion, idEmpresaOrganiza)
VALUES ('Experiencia1', 19.55, 'primera opcion', 'lugar1', 1 ),
('Experiencia2', 59.55, 'segunda opcion', 'lugar2', 1 ),
('Experiencia3', 79.55, 'tercera opcion', 'lugar3', 2 ),
('Experiencia4', 195.55, 'cuarta opcion', 'lugar4', 2 )`
);

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