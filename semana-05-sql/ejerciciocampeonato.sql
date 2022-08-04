CREATE DATABASE IF NOT EXISTS campeonato;
USE campeonato;

SHOW DATABASES;
SHOW TABLES;
DESCRIBE equipo;
DESCRIBE equipo_juega_partido;
DESCRIBE jugador;
DESCRIBE partido;

CREATE TABLE IF NOT EXISTS equipo (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR (30) NOT NULL, 
patrocinador1 VARCHAR (50),
patrocinador2 VARCHAR (50),
categoria ENUM ('primera', 'segunda', 'tercera') NOT NULL,
color VARCHAR (20) NOT NULL 
);

CREATE TABLE IF NOT EXISTS jugador (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
dni VARCHAR (15) UNIQUE NOT NULL,
nombre VARCHAR (30) NOT NULL,
apelido1 VARCHAR (50) NOT NULL,
apellido2 VARCHAR (50),
telefono INT UNSIGNED NOT NULL,  -- VARCHAR (12)
calle VARCHAR (80) NOT NULL,
cp CHAR (5) NOT NULL,
fechaNac VARCHAR (30) NOT NULL,

idEquipo INT UNSIGNED NOT NULL,
FOREIGN KEY (idEquipo) REFERENCES equipo (id)
);

CREATE TABLE IF NOT EXISTS partido (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
campo VARCHAR (30) NOT NULL, 
resultado VARCHAR (50) NOT NULL,
arbitro VARCHAR (50) NOT NULL,
incidencia TEXT                            -- TEXT
);

CREATE TABLE IF NOT EXISTS equipo_juega_partido (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
idEquipoLocal INT UNSIGNED NOT NULL,
FOREIGN KEY (idEquipoLocal) REFERENCES equipo (id)
ON DELETE CASCADE,
idEquipoVisitante INT UNSIGNED NOT NULL,
FOREIGN KEY (idEquipoVisitante) REFERENCES equipo (id) /*con ON DELTE CASCADE, al incluirse con Foreing Key, éste último no lleva coma*/
ON DELETE CASCADE,
idPartido INT UNSIGNED NOT NULL,
FOREIGN KEY (idPartido) REFERENCES partido (id)
);

DESCRIBE partido;
ALTER TABLE jugador DROP COLUMN goles; 
DESCRIBE partido;

ALTER TABLE jugador ADD COLUMN goles TINYINT UNSIGNED;

DESCRIBE jugador;

/*ALTER TABLE partido ADD COLUMN arbitro; 
DESCRIBE partido;*/

DROP TABLE IF EXISTS equipo_juega_partido ; 
DROP TABLE IF EXISTS partido; 
DROP TABLE IF EXISTS jugador; 
DROP TABLE IF EXISTS equipo; 
DROP DATABASE campeonato;
DROP DATABASE IF EXISTS campeonato;
