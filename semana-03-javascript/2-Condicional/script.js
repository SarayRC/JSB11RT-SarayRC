"use strict"

/*   * Edita el archivo script.js para añadir las variables de nombre y edad del ejercicio anterior.

A continuación, utiliza un condicional para sacar por consola la frase correspondiente de la siguientes:

- A _nombre_ le corresponde el descuento infantil (menores de 12).
- A _nombre_ le corresponde el descuento juvenil (menores de 30).
- A _nombre_ le corresponde el descuento de jubilados (mayores de 60).
- A _nombre_ no le corresponde ningún descuento. */

let nombre= "Zoe"
let edad= 28



if(edad <= 12){

    console.log("A "+nombre + " le corresponde el descuento infantil")

  } else if (edad <= 30){

    console.log("A "+nombre + " le corresponde el descuento juvenil")


  } else if (edad >= 60){

    console.log("A "+nombre + " le corresponde el descuento de jubilados")
     

  } else {

    console.log("A "+nombre + " no le corresponde ningún descuento")


  }


funcion crearfrase(descuento,nombre){
  return `A $(nombre) le corresponde el descuento $(descuento)`
}

