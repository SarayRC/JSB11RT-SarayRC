const getDB = require("./getDB");

async function main() {
  let connection;

  try {
    connection = await getDB();

    await connection.query("DROP TABLE IF EXISTS experience_photo");
    await connection.query("DROP TABLE IF EXISTS experience");
    await connection.query("DROP TABLE IF EXISTS company");
    await connection.query("DROP TABLE IF EXISTS user");

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
`);

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
`);

    await connection.query(`
CREATE TABLE IF NOT EXISTS company (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(50) NOT NULL,

idUser INT UNSIGNED NOT NULL,
FOREIGN KEY (idUser) REFERENCES user (id)
)
`);

    await connection.query(`
CREATE TABLE IF NOT EXISTS experience_photo (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(255) NOT NULL,
description TEXT,

idExperience INT UNSIGNED NOT NULL,
FOREIGN KEY (idExperience) REFERENCES experience (id)
ON DELETE CASCADE
)
`);

    await connection.query(
      `INSERT INTO user (name, surname1, surname2, avatar, date_birth, email, password, type, createdAt)
VALUES ('userPrueba01', 'apellido1', 'apellido2', null, '1990-05-15','emailprueba@gmail.com', '123456', 'normal', ?)`,
      [new Date()]
    );

    await connection.query(
      `INSERT INTO company (name, idUser)
VALUES ('Empresa1', 1)`
    );

    await connection.query(
      `INSERT INTO experience (name, price, description, location, idUser)
VALUES ('Experiencia1', 195.55, 'primera opcion', 'lugar1', 1)`
    );

    console.log("Datos de prueba insertados con éxito!");
  } catch (error) {
    console.error(error.message);
  } finally {
    if (connection) connection.release();

    process.exit();
  }
}

main();
