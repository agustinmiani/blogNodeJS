var http = require("http");
var url = require("url");
var noticiasService = require('./noticias');
var mu = require('mu2');
var server = http.createServer();
var fs = require('fs');
var express = require("express");
var app = express();
mu.root = __dirname + '/templates';
var page = {};





noticiasService.cargar();

body = require('body-parser');
app.use(body.json());
app.use(body.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.get('/', function (req, res) {
    mu.clearCache();
    page.title = 'Infobae';
    page.description = '';
    var noticias = noticiasService.obtener();
    // var stream = mu.compileAndRender('index.html', {page: page, nombre: "Jonathan", noticias: noticiasService.get()});
    var stream = mu.compileAndRender('index.html', {title: page.title, noticias: noticias});

    stream.pipe(res);
});

//
// app.get('/delArticulo/:id',function (req,res) {
//     mu.clearCache();
//     page.title = 'Reddit - Curso - Dinamico';
//     page.description = '';
//     var stream = mu.compileAndRender('formularioArticulo.html', {title: "Reddit"});
//     stream.pipe(res);
// });
//
// app.get('/newArticulo', function (req, res) {
//     mu.clearCache();
//     var idborrar = req.params.id;
//     page.title = 'Reddit - Curso - Dinamico';
//     page.description = '';
//     manejadorArticulos.borrarArticulo(idborrar);
//     var stream = mu.compileAndRender('formularioArticulo.html', {title: "Reddit"});
//     stream.pipe(res);
// });

app.get('/insertar', function (req, res) {
    mu.clearCache();
    page.title = 'Infobae';
    page.description = '';
    // var stream = mu.compileAndRender('index.html', {page: page, nombre: "Jonathan", noticias: noticiasService.get()});
    var stream = mu.compileAndRender('insertar.html', {title: "Infobae"});

    stream.pipe(res);
});


app.post("/postArticulo",function(req,res){
    mu.clearCache();
    page.title = 'Infobae';
    page.description = '';
    var nuevoArticulo = JSON.stringify(req.body);
    console.log(nuevoArticulo);
    noticiasService.nuevoArticulo(req.body);
    var noticias = noticiasService.obtener();
    var stream = mu.compileAndRender('index.html', {title: page.title, noticias: noticias});
    stream.pipe(res);
});



// app.get('/index.html', function (req, res) {
//     mu.clearCache();
//     page.title = 'Reddit - Curso - Dinamico';
//     page.description = '';
//     var noticias = manejadorArticulos.imprimirNoticias();
//     var stream = mu.compileAndRender('index.html', {title: "Reddit", noticias: noticias});
//     stream.pipe(res);
//
// });


app.get('/ultimo', function (req, res) {
    mu.clearCache();
    page.title = 'Infobae';
    page.description = '';
    var noticia = noticiasService.obtenerUltimo();
    // var stream = mu.compileAndRender('../templates/index.html', {title: page.title, noticias: noticia});
    // var noticias = noticiasService.obtener();
    var stream = mu.compileAndRender('noticiaIndividual.html', {title: page.title, noticia: noticia});
    stream.pipe(res);
});


//
//
app.get('/leerMas:id', function (req, res) {
    mu.clearCache();
    var post = req.params.id;
    page.title = 'Infobae';
    page.description = '';
    var noticia = noticiasService.obtenerNoticiaEspecifica(post);
    var stream = mu.compileAndRender('noticiaIndividual.html', {title: page.title, noticia: noticia});
    stream.pipe(res);
});
//

// app.use(function(req, res, next){
//     res.status(404);
//
//     if (req.accepts('html')) {
//         mu.clearCache();
//         page.title = 'Reddit - Curso - Dinamico';
//         page.description = '';
//         // var stream = mu.compileAndRender('index.html', {page: page, nombre: "Jonathan", noticias: noticiasService.get()});
//         var stream = mu.compileAndRender('404.html', {title: "Reddit"});
//         stream.pipe(res);
//         return;
//     }
//
// });

app.use("/css",express.static(__dirname + '/public/stylesheets/css'));
// app.use("/scss",express.static(__dirname + '/public/scss'));
app.use("/img",express.static(__dirname + '/public/images'));
app.use("/js",express.static(__dirname + '/public/js'));
app.use(express.static(__dirname +  '/public'));

app.listen(process.env.PORT || 3000);