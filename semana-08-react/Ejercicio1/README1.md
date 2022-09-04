# Modificar estado

Crea un proyecto de react usando Create React App y en el componente principal (`App`) crea una variable de estado usando `useState` que contenga este valor inicial:

```js
[{
  id: 1
  task: 'Ir a la compra',
  done: false
},
{
  id: 2,
  task: 'Hacer ejercicios de react',
  done: true
}]
```

Crea y añade a `App.js` un componente llamado `Lista` y pásale el estado anterior como `prop`.

El componente `Lista` debe renderizar un `<ul>` y debe mostrar cada uno de los elementos del array del estado de `App` como un `<li>`. Los elementos que tengan la propiedad `done` con valor `true` deben mostrar el texto tachado.


# Modificar estado: formularios

Partiendo del estado final del ejercicio anterior añade al componente `App` un componente `Form` que muestre un `<input type="text">` y un `<button>` que permita añadir un nuevo elemento al estado de `App.js`. El input tiene que tener un máximo de 100 caracteres.


# Modificar estado: más formularios

Partiendo del estado final del ejercicio anterior añade a cada uno de los `<li>` un checkbox (`<input type="checkbox">`) que al hacer click modifique la propiedad `done` del elemento correspondiente del estado de `App.js`.

# Create React App (CRA)

Para hacer este ejercicio tendrás que buscar en la [documentación de CRA](https://create-react-app.dev/docs/getting-started) lo que no sepas hacer.

1. Lanza la aplicación de los ejercicios anteriores en modo desarrollo
2. Crea un build de producción y lanza un servidor para poder verlo en el navegador (fíjate en lo que muestra el comando).
3. Haz que la aplicación sirva un archivo estático, por ejemplo crea una imagen `foto.jpg` con (public) el contenido que quieras y haz que esa imagen se sirva estáticamente en la aplicación de React con esta URL: (http://localhost:3000/foto.jpg). Pista: busca la documentación de _Public Folder_.
4. CRA también permite usar un archivo **.env**, busca la documentación y crea un archivo .env con una variable. Haz que esa variable se muestre en la aplicación.
