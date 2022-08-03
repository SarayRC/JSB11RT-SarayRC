"use strict";

/* Partiendo de un objeto que incluye una serie de personas con sus respectivas edades, saca por consola un mensaje por cada persona que diga "_Nombre_ es mayor de edad" o "_Nombre_ es menor de edad", según corresponda.
Cuando sepas hacer funciones, haz que sea una función que reciba el objeto como parámetro. */

const people = {
  Maria: 20,
  Ana: 14,
  Luis: 16,
  Pepe: 35,
  Manuel: 50,
  Teresa: 12,
  Daniel: 27,
  Irene: 23,
  Alex: 10,
};

///FOR IN


function print(obj){
for (let nombre in obj){
  let edad = obj[nombre]


if (edad <=18){
  console.log (" -", nombre , "es menor de edad")
}else {
  console.log ("-",nombre , "es mayor de edad")
}
}
}
print(people)



