"use strict";

/* Edita el archivo script.js para crear una función que haga lo siguiente:

- Generar una contraseña (número entero aleatorio del 0 al 100) */



/* - Pedir al usuario que introduzca un número dentro de ese rango. */

////* const numUser = (+prompt("Introduce un número del 0 al 100")) */;///prompt devuelve string, lo convierto a number

/* - Si el número introducido es igual a la contraseña, aparecerá en pantalla un mensaje indicando que ha ganado; si no, el mensaje indicará si la contraseña en un número mayor o menor al introducido y dará una nueva oportunidad. */



/* - El usuario tendrá 5 oportunidades de acertar, si no lo consigue, aparecerá un mensaje indicando que ha perdido.

* Para pedir datos al usuario utiliza la función _prompt_: 

¡OJO! Prompt **siempre** devuelve un string. */
let numberRandom = Math.floor(Math.random() * 100)+1;
  let tries = 5;
  let min=0;
  let max=100
  let numeroIntroducido;

  function getRandom (min,max){
    return Math.round(Math.random ()*(max-min) + min)

    //contraseña
    function game (min,max,tries)

    let pass = getRandom(min,max)

    for(let i=0;i<tries;i++){
      let userPass = +prompt (`Ìntroduce un número entre el $(min) y el $(max)`)
    }
  }
/* console.log (getRandom (min,max)) */
console.log (pass)
game (0,100,5)

/* for(intentos; intentos <5;intentos++){

if (numUser===numberRandom){
  console.log (alert ("Has ganado"))

}else if (numUser > numberRandom){

  console.log(alert ("la contraseña es menor al numero introducido"))

} else if (numUser < numberRandom){

  console.log(alert ("la contraseña es mayor al numero introducido"))
  
} else {

  console.log(alert ("Has perdido"))

}
} */
