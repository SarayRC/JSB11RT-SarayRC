/*# Ejercicio sql 1
Crea una tabla que permita guardar usuarios en la que guardes una id, 
su DNI, su tlf., su email, su nombre y apellidos. 
Crea también campos para su dirección: país, CP, varias líneas de dirección...*/

CREATE DATABASE IF NOT EXISTS ejercicio1;
USE ejercicio1;
SHOW DATABASES; 

SHOW TABLES; 
SELECT * FROM usuarios;
SELECT * FROM direccion;
DESCRIBE usuarios;

CREATE TABLE IF NOT EXISTS usuarios (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
dni VARCHAR (15) UNIQUE NOT NULL,
telf CHAR (30) ,
email VARCHAR (80),
nombre VARCHAR (30) NOT NULL,
apellido1 VARCHAR (50) NOT NULL,
apellido2 VARCHAR (50),
);
/*# Ejercicio sql 2
Modifica (mediante el comando ALTER TABLE) la tabla del ejercicio 1 moviendo los datos referidos a 
la dirección a una tabla nueva, relacionando las dos mediante foreign keys. 
Crea un diagrama ER que muestre la base de datos resultante.*/


CREATE TABLE IF NOT EXISTS direccion (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
calle VARCHAR (200) NOT NULL,
numero VARCHAR (20) NOT NULL,
poblacion VARCHAR (100),
cp CHAR (6) NOT NULL,
pais VARCHAR (200)
);
/*ALTER TABLE direccion ADD COLUMN cp VARCHAR (50); */

ALTER TABLE usuarios DROP column calle;
ALTER TABLE usuarios DROP column numero;
ALTER TABLE usuarios DROP column cp;
ALTER TABLE usuarios DROP column poblacion;
ALTER TABLE usuarios DROP column pais;

CREATE TABLE IF NOT EXISTS usuarios_vive_direccion (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,

idUsuarios INT UNSIGNED NOT NULL,
FOREIGN KEY (idUsuarios) REFERENCES usuarios (id),

idDireccion INT UNSIGNED NOT NULL,
FOREIGN KEY (idDireccion) REFERENCES direccion (id)
);

/*# Ejercicio sql 3
Inserta los siguientes datos en la DB del ejercicio 2, 
es posible que tengas que acomodar los datos a tu estructura de base de datos:

id,first_name,last_name,email,tlf,DNI,country,cp,addr_line1,addr_line2
1,Irvin,Lethem,ilethem0@google.com.au,993870144,279948941-9,Indonesia,83297,98339 Loftsgordon Road,Babakanbandung
2,Kylie,Mungan,kmungan1@howstuffworks.com,497494899,748551874-7,Philippines,44455,74641 Dwight Avenue,Bilar
3,Yul,Dibbert,ydibbert2@businesswire.com,776631050,215649413-4,Indonesia,62965,9510 Milwaukee Street,Sumberejo
4,Tamra,Mc Gorley,tmcgorley3@studiopress.com,921948685,617064473-7,Norway,54756,8902 Doe Crossing Alley,Steinkjer
5,Elmira,Imbrey,eimbrey4@cpanel.net,304168000,178988896-4,United States,51471,8616 Stephen Hill,Charleston*/

INSERT INTO usuarios (nombre, apellido1, apellido2, email, telf,dni)
VALUES ('Irvin','Lethem',null,'ilethem0@google.com.au','993870144','279948941-9'),
('Kylie','Mungan', null,'kmungan1@howstuffworks.com','497494899','748551874-7'),
('Yul','Dibbert', null,'ydibbert2@businesswire.com','776631050','215649413-4'),
('Tamra','Mc Gorley', null,'tmcgorley3@studiopress.com','921948685','617064473-7'),
('Elmira','Imbrey', null,'eimbrey4@cpanel.net','304168000','178988896-4');
SELECT * FROM usuarios;

INSERT INTO direccion (pais, cp,numero,calle,poblacion)
VALUES ('Indonesia','83297','98339' ,'Loftsgordon Road','Babakanbandung'),
('Philippines','44455','74641','Dwight Avenue','Bilar'),
('Indonesia','62965','9510', 'Milwaukee Street','Sumberejo'),
('Norway','54756','8902', 'Doe Crossing Alley','Steinkjer'),
('United States','51471','8616', 'Stephen Hill','Charleston');

ALTER TABLE direccion DROP column cp;
ALTER TABLE direccion ADD COLUMN cp VARCHAR (50); 

SELECT * FROM direccion;

/*# Ejercicio sql 4
Selecciona el nombre, apellido y número de teléfono de todos los usuarios, ordenados 
alfabéticamente según su apellido. 
Después haz otra consulta que indique cuántos usuarios hay de cada país, 
basándote en la tabla de direcciones.*/

SELECT nombre, apellido1, telf
FROM usuarios
ORDER BY nombre ASC;

SELECT * FROM usuarios_vive_direccion;
SELECT * FROM usuarios;
SELECT * FROM direccion;

/*SET SQL_SAFE_UPDATES = 0;
UPDATE usuarios_vive_direccion SET idUsuarios = 1 WHERE id = 1;*/ 

INSERT INTO usuarios_vive_direccion (idUsuarios, idDireccion)
VALUES (1,1),
(2,2),
(3,3),
(4,4),
(5,5);

SELECT * FROM direccion;
SELECT COUNT(*),pais
FROM direccion
GROUP BY pais;

/*# Ejercicio join
Usando la base de datos que creamos en los ejercicios de la semana pasada, 
selecciona todos los datos de los usuarios, 
incluida toda la información de su dirección.*/

SELECT u.*,d.*
FROM usuarios u INNER JOIN usuarios_vive_direccion uvd
	ON (u.id = uvd.idUsuarios) INNER JOIN direccion d
		ON (uvd.idDireccion = d.id);

/*# Ejercicio update
Actualiza la tabla de usuarios para añadir una columna para la edad. 
A continuacion, rellena esa columna para los 5 usuarios que existen.*/

/*ALTER TABLE usuarios ADD column edad VARCHAR (20);
ALTER TABLE usuarios DROP column edad;*/
ALTER TABLE usuarios ADD column edad INT;
SELECT * FROM usuarios;

UPDATE usuarios SET edad = 11 WHERE id = 1;
UPDATE usuarios SET edad = 22 WHERE id = 2;
UPDATE usuarios SET edad = 33 WHERE id = 3;
UPDATE usuarios SET edad = 44 WHERE id = 4;
UPDATE usuarios SET edad = 55 WHERE id = 5;

/*# Ejercicio subconsulta
Selecciona el nombre y la edad del/los usuario/s más mayores.*/

SELECT nombre,edad
FROM usuarios
WHERE edad = ( 
SELECT MAX(edad) FROM usuarios);

SELECT nombre,edad
FROM usuarios
WHERE edad = ( 
SELECT edad  FROM usuarios WHERE edad <18);

SELECT nombre,edad
FROM usuarios
WHERE edad IN (                                    -- IN
SELECT edad  FROM usuarios WHERE edad >18);

SELECT nombre,edad
FROM usuarios
ORDER BY edad DESC
LIMIT 3;







