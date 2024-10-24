
//EJERCICIO: Cada vez que se recargue la página, queremos que el color de fondo sea diferente

//Creamos una costante para el body
const body = document.querySelector("body");

//Añadimos un color aleatorio al body
body.style.backgroundColor = 'rgb(${},${},${})';

//Creamos los colores aleatorios y con Math.floor quitamos los decimales para que sean nº enteros
Math.floor(Math.random() * 256);