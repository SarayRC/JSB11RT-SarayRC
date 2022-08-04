use ejercicioAulas;
select * from alumno;
select * from alumno_cursa_asignatura;
select * from asignatura;
select * from profesor;

-- Inserta 2 nuevos profesores
INSERT INTO profesor (nombre, apellido1, apellido2)
VALUES ('Josefa', 'de', null),
('Manuel', 'Del', 'Pardo');
-- Modifica todos los profesores que no tengan un segundo apellido y añadele como apellido2 'No tiene segundo apellido'
SET SQL_SAFE_UPDATES = 0;
UPDATE profesor SET apellido2 = 'No tiene segundo apellido' WHERE apellido2 IS NULL;
-- Añade 2 nuevas asignaturas
SET FOREIGN_KEY_CHECKS = 0; -- TRUKI
 
INSERT INTO asignatura (nombre, numHoras, idProfesor)
VALUES ('Lengua', '170', 1),
('Ingles', '180',2);

-- Elimina la última asignatura y el último profesor insertados
DELETE FROM asignatura WHERE nombre = 'Ingles';
DELETE FROM profesor WHERE apellido1  LIKE '%R%';
-- Selecciona todos los datos de las asignaturas junto a los profesores que las imparten
                      /*da vacio*/
UPDATE asignatura SET idProfesor = 5 WHERE idProfesor = 2;
                      
SELECT a.*, p.nombre
FROM asignatura a INNER JOIN profesor p
	ON (a.idProfesor = p.id);
    
    
/*Selecciona el nombre, nHoras de las asignaturas y nombre y apellido de los profesores que las imparten 
de las asignaturas cuyo nombre empiece por 'M'.*/
     /*da vacio*/
SELECT a.nombre, a.numHoras, p.nombre, p.apellido1, p.apellido2
FROM asignatura a INNER JOIN profesor p
	ON (a.idProfesor = p.id)
WHERE a.nombre LIKE 'M%';

/*Muestra el nombre, apellido, fechaIniCurso, fechaFinCurso y nombre de asignatura de todos los alumnos
que estén cursando una asignatura.*/

SELECT a.nombre, aca.fechaIniCurso, aca.fechaFinCurso, al.nombre, al.apellido1, al.apellido2
FROM asignatura a INNER JOIN alumno_cursa_asignatura aca
	ON (a.id = aca.idAsignatura) INNER JOIN alumno al
		ON (aca.idAlumno = al.id);

-- Muestra el nombre, apellido, fechaIniCurso, fechaFinCurso y nombre de asignatura de todos los alumnos
-- que estén cursando una asignatura donde el alumno tenga segundo apellido y la asignatura dure más de 120 horas.
SELECT a.nombre, aca.fechaIniCurso, aca.fechaFinCurso, al.nombre, al.apellido1, al.apellido2
FROM asignatura a INNER JOIN alumno_cursa_asignatura aca
	ON (a.id = aca.idAsignatura) INNER JOIN alumno al
		ON (aca.idAlumno = al.id)
        WHERE (al.apellido2 <>'No tiene segundo apellido' ) AND a.numHOras>=120;

