/*

//Nos traemos el módulo http
const http = require("http");

//Creamos un puerto nuevo (4000) y creamos un servidor
http.createServer((peticion,respuesta) => {

    //Le indicamos el tipo de contenido que quiero enviarle (200) y el tipo de dato ("Content-type" : "text/html")
    //Con writeHead le estamos enviando la información y como queremos que se vea
    respuesta.writeHead(200, {"Content-type" : "text/html"});

    //El el callback ponemos la petición de la ruta que nos ha dado el usuario
    respuesta.write("El PATH es: " + peticion.url);

    //Cortamos la respuesta para que pueda salir
    respuesta.end();

}).listen(4000);

*/


/* ------------------------------------- */


//PETICIÓN PÁGINA
/*
const {createServer} = require("http");
const {createReadStream} = require("fs");

function contentType(extension){
    if(extension == "html") return "text/html";
    if(extension == "css") return "text/css";
    if(extension == "js") return "text/javascript";
    if(extension == "jpg" || extension == "jpeg") return "image/jpeg";
    if(extension == "png") return "image/png";
    return "text/plain";
}

//Función que recibe la respuesta que se va a iniciar, la ruta que se va a servir y el tipo de fichero
function servirFichero(respuesta,ruta,tipo,estado){

    //Cabecera de estado y configura el content-type
    respuesta.writeHead(estado, {"Content-type" : tipo});

    //Abre el fichero con createReadStream
    let fichero = createReadStream(ruta);

    //Lo conectamos a la respuesta
    fichero.pipe(respuesta);

    //Cuando se ha leído todo, se corta la respuesta y damos por finalizada la petición
    fichero.on("end", () => respuesta.end());
}

createServer((peticion,respuesta) => {
    if(peticion.url == "/"){
        servirFichero(respuesta,"./estaticos/index.html",contentType("html"),200);
    }
    else{
        servirFichero(respuesta,"./estaticos/404.html",contentType("html"),404);
    }

}).listen(4000);
*/


/* ------------------------------------- */


//STAT Y OTROS MÉTODOS

const {createServer} = require("http");
const {createReadStream,stat} = require("fs"); //Añadimos el stat

function contentType(extension){
    if(extension == "html") return "text/html";
    if(extension == "css") return "text/css";
    if(extension == "js") return "text/javascript";
    if(extension == "jpg" || extension == "jpeg") return "image/jpeg";
    if(extension == "png") return "image/png";
    return "text/plain";
}

//Función que recibe la respuesta que se va a iniciar, la ruta que se va a servir y el tipo de fichero
function servirFichero(respuesta,ruta,tipo,estado){

    //Cabecera de estado y configura el content-type
    respuesta.writeHead(estado, {"Content-type" : tipo});

    //Abre el fichero con createReadStream
    let fichero = createReadStream(ruta);

    //Lo conectamos a la respuesta
    fichero.pipe(respuesta);

    //Cuando se ha leído todo, se corta la respuesta y damos por finalizada la petición
    fichero.on("end", () => respuesta.end());
}

//Una vez que llega la petición, se invoca el callback
createServer((peticion,respuesta) => {
    if(peticion.url == "/"){
        servirFichero(respuesta,"./estaticos/index.html",contentType("html"),200);
    }
    else{
        //Creamos la variable para concatenar (unir) el fichero junto con la ruta de la carpeta
        let ruta = "./estaticos" + peticion.url;

        //Al stat de decimos la variable y en el callback ponemos si existió algún error o al información
        stat(ruta, (error,informacion) => {
            if(!error && informacion.isFile()){
                return servirFichero(respuesta,ruta,contentType(ruta.split(".").pop()),200) //Se retorna para no poner el else (respuesta,ruta,url)
            }

            servirFichero(respuesta,"./404.html",contentType("html"),404);

        });
    }

}).listen(4000);