"use strict"; 
/* Una pizerría ofrece pizzas "mitad y mitad".
Cada mitad debe corresponderse a una pizza de su catálogo, pero éste cambia constantemente, por lo que el número de combinaciones posibles, también.

Escribe una función que reciba el catálogo de pizzas (un array de strings) y devuelva una lista de las combinaciones.

Seguramente en tu primera aproximación devuelva pizzas con la misma combinación pero al revés (ej: carbonara y barbacoa, barbacoa y carbonara) pero ¡son la misma pizza!

De la misma manera, si las dos mitades son iguales (ej: carbonara y carbonara) no sería una combinación, sino una pizza normal.

¿Serías capáz de solucionar eso, sin añadir ninguna línea de código? ¡Es más fácil de lo que puede parecer!

Ejemplo input:



Ejemplo output:

```javascript
[
  "margarita y cuatro quesos",
  "margarita y prosciutto",
  "margarita y carbonara",
  "margarita y barbacoa",
  "margarita y tropical",
  "cuatro quesos y prosciutto",
  "cuatro quesos y carbonara",
  "cuatro quesos y barbacoa",
  "cuatro quesos y tropical",
  "prosciutto y carbonara",
  "prosciutto y barbacoa",
  "prosciutto y tropical",
  "carbonara y barbacoa",
  "carbonara y tropical",
  "barbacoa y tropical",
];
``` */

///////////////////////////

const catalogo = [
  "margarita",
  "cuatro quesos",
  "prosciutto",
  "carbonara",
  "barbacoa",
  "tropical",
];
/* console.log (catalogo)
let catalogo2=(catalogo.slice(0))
console.log (catalogo2)
for (let i=0;i<=5;i++){
}
 */
/////////////////

function combinar (catalogo){
  
  let newArr = []
  
  for (let i=0; i< catalogo.length; i++){

    for (let j=i + 1;j<catalogo.length;j++){/////la clave era cambiar el inicio de bucle
      /* console.log (catalogo[i],catalogo[j]) */
      newArr.push (`$ {catalogo[i]} y ${catalogo[j]}`)
    }
  }
  return newArr
}
    
