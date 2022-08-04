CREATE DATABASE IF NOT EXISTS ejercicioAulas;
USE ejercicioAulas;

CREATE TABLE IF NOT EXISTS alumno (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, -- dni VARCHAR (11) PRIMARY KEY;
nombre VARCHAR (30) NOT NULL,
apellido1 VARCHAR (50) NOT NULL,
apellido2 VARCHAR (50)
);

CREATE TABLE IF NOT EXISTS profesor (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR (30) NOT NULL,
apellido1 VARCHAR (50) NOT NULL,
apellido2 VARCHAR (50)
);



CREATE TABLE IF NOT EXISTS asignatura (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR (30) NOT NULL,
numHoras VARCHAR (10),

idProfesor INT UNSIGNED NOT NULL,
FOREIGN KEY (idProfesor) REFERENCES profesor (id)
ON DELETE CASCADE
);



CREATE TABLE IF NOT EXISTS alumno_cursa_asignatura (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
fechaIniCurso DATE,
fechaFinCurso DATE,

idAsignatura INT UNSIGNED NOT NULL,
FOREIGN KEY (idAsignatura) REFERENCES asignatura (id),

idAlumno INT UNSIGNED NOT NULL,
FOREIGN KEY (idAlumno) REFERENCES alumno (id) 
ON DELETE CASCADE
);


-- Insertar 4 alumnos
INSERT INTO alumno (nombre, apellido1, apellido2) 
VALUES ('Carlos', 'García', 'Mendez');

DELETE FROM alumno WHERE id = 1;

INSERT INTO alumno (nombre, apellido1, apellido2)
VALUES ('Maria', 'El real', null),
('Sofia', 'Otro', 'Potro'),
('Carmen', 'de', 'Mairena');

DESCRIBE alumno;
SELECT * FROM alumno;
-- Insertar 3 asignaturas



SET SQL_SAFE_UPDATES = 0;

INSERT INTO asignatura (nombre, numHoras,idProfesor) -- OJO, indicar en este caso idProfesor
VALUES ('Mate', '200',1),
('Natu', '150',1),
('Soci', '100',2);

-- Insertar 2 profesores (uno imparte 2 asignaturas y el otro la restante)

INSERT INTO profesor (nombre, apellido1, apellido2)
VALUES ('Juan', 'Murillo', 'García'),
('Trosma', 'Garcia', null);

/*Todos los alumnos están cursando las asignaturas 1 y 3, 
solamente el alumno con id 2 cursa la asignatura con id 2*/

INSERT INTO alumno_cursa_asignatura (idAlumno, idAsignatura, fechaFinCurso)
VALUES ('2','1','2023-06-21'),
('2','2','2023-06-21'),
('2','3','2023-06-21'),
('3','1','2023-06-21'),
('3','2','2023-06-21'),
('3','3','2023-06-21'),
('4','1','2023-06-21'),
('4','2','2023-06-21'),
('4','3','2023-06-21');

DELETE FROM alumno_cursa_asignatura WHERE idAsignatura=2;

INSERT INTO alumno_cursa_asignatura (idAlumno, idAsignatura, fechaFinCurso)
VALUES ('2','1','2023-06-21');


SHOW DATABASES;
SHOW TABLES;
DESCRIBE alumno_cursa_asignatura;
DESCRIBE asignatura;
DESCRIBE profesor;
DESCRIBE alumno;
SELECT * FROM alumno_cursa_asignatura;
SELECT * FROM asignatura;
SELECT * FROM profesor;