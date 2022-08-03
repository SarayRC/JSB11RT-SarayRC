"use strict";

/* Escribe un código que, partiendo de un array inicial, elimine las strings repetidas del mismo.
Cuando sepas hacer funciones, haz que sea una función que reciba el array como parámetro (y por tanto elimine los lementos repetidos de cualquier array). */
const names = [
  "A-Jay",
  "Manuel",
  "Manuel",
  "Eddie",
  "A-Jay",
  "Su",
  "Reean",
  "Manuel",
  "A-Jay",
  "Zacharie",
  "Zacharie",
  "Tyra",
  "Rishi",
  "Arun",
  "Kenton", 
];
////////MI CODIGO
let length = (names.length)

let namesFinal=[]

for(let i = 0; i < length; i++){

if(namesFinal.includes(names[i])){
  console.log ("Se repite el nombre" + names[i]);
}else{
  namesFinal.push(names[i])
}
}
console.log ("//////////////////////")
console.log (namesFinal)

//////////////////////



function clean (arr){
  let newArr = []

for(let name of names){
if (!newArr.includes (name)){
  newArr.push(name)
}
} return newArr
}
console.log (clean (names))
