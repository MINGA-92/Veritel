
const express= require('express');
const Constructor= express();
const path= require('path');
const { json }= require('express');


//Constructor ejs
Constructor.set('view engine', 'ejs');

Constructor.use('/', express.static(__dirname + '/Img'));
Constructor.use(express.static(path.join(__dirname, 'Controller')));
Constructor.use(express.urlencoded({extended:false}));
Constructor.use(express(json));

Constructor.use('/', require('./Router'));
console.log("---> dirname= ", __dirname);

//Constructor De Conexion
Constructor.listen(7777, function(Peticion, Respuesta){
    console.log("Aplicacion Corriendo En http://localhost:7777         ヾ(⌐■_■)ノ♪ ");
});

