"use strict";

// puntuaciones 
const puntuaciones = [
  {
    equipo: "Toros Negros",
    puntos: [1, 3, 4, 2, 10, 8],
  },  {
    equipo: "Amanecer Dorado",
    puntos: [8, 5, 2, 4, 7, 5, 3],
  },  {
    equipo: "Águilas Plateadas",
    puntos: [5, 8, 3, 2, 5, 3],
  },  {
    equipo: "Leones Carmesí",
    puntos: [5, 4, 3, 1, 2, 3, 4],
  },  {
    equipo: "Rosas Azules",
    puntos: [2, 1, 3, 1, 4, 3, 4],
  },  {
    equipo: "Mantis Verdes",
    puntos: [1, 4, 5, 1, 3],
  },  {
    equipo: "Ciervos Celestes",
    puntos: [3, 5, 1, 1],
  },  {
    equipo: "Pavos Reales Coral",
    puntos: [2, 3, 2, 1, 4, 3],
  },  {
    equipo: "Orcas Moradas",
    puntos: [2, 3, 3, 4],
  },
];
/* console.log (puntuaciones) */ 

/* Edita el archivo script.js para crear una función que reciba una array de objetos (equipos y puntos conseguidos) y muestre por consola el ** nombre ** del que más y del que menos puntos hayan conseguido, con sus respectivos ** totales **.
Encontrarás un array de ejemplo en el propio documento. */

let newArray = []
for(let arr of puntuaciones){
  /* console.log(arr) */
  console.log (arr.equipo)
  console.log (arr.puntos)
   let {equipo}= arr

  let total = arr.puntos.reduce(reduceCB)
/* console.log ( total) */

  let totales = (Number( total ));
console.log (totales)

 
    
  
  newArray.push( {equipo,totales})
  
}
console.log (newArray)

function reduceCB(acc, current){
/*     console.log("acc: ", acc)
    console.log("current: ",current) */

    return (acc + current)
  }

let arrayCopia = (puntuaciones.slice(0))
console.log (arrayCopia)






