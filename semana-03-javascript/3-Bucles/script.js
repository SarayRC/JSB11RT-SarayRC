"use strict";

/* Edita el archivo script.js para crear un "reloj de cuco".

El reloj sólo funcionará un día y dará la hora (imprimiendola por consola) de 8 a 22.

Nota: Aunque lo llamemos reloj, no tiene que funcionar a tiempo real, sino que en cada vuelta aumentará una hora.

Puedes elegir el tipo de bucle que prefieras. Puedes hacer que empiece en 8 y termine en 22 o que vaya de 0 a 24 y usar un condicional, a tu eleccion.

Extra: ¡Hagámoslo un poco más difícil! Además de decir la hora con un número, hará la cantidad de "cucús" correspondientes (ej: "8 cucú cucú cucú cucú cucú cucú cucú cucú"). ¿Serías capaz de hacerlo sin usar el método repeat? Si lo quieres complicar aún más, ¡que los cucús sean en base 12 y no 24! */

let hora = i;

/* let dia = hora > 8 && hora < 22 ? true : false;

for(let i = 0; i <= 24; i++){
    
  }
let i =8
  if (hora >=8 && hora <=22){
    console.log("Son las "+ hora + " horas")
     console.log ("cucú" * hora) 
  } else {
    console.log("No estamos abiertos ")
  } */


  ////////////////////////

  let inicio = 8;
  let fin =22;

  for(let i = 0; i < 24; i++){
    
  

     if (i>= inicio && i <= fin){

      console.log (i)

      let string =""
      for (let j=0; j<i;j++){

        string +="cucú"
        /* console.log (i+j) */
        console.log (string)
      }
    }
    
  }

  //////////////Extra bucle dentro del anterior
