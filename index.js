var http = require("http");
var url = require("url");
// Aca llamo al JS Mio
var noticiasService = require('./noticias');
var mu = require('mu2');
var server = http.createServer();
var fs = require('fs');


mu.root = __dirname + '/templates';
// mu.root = __dirname;

var page = {};

server.on ("request", function (req, res) {

	var urlData = url.parse(req.url, true);
	var path = urlData.pathname;

	// if(path == '/' || path == '/noticias') {
	if(path == '/noticias') {

		//WORK WITH MUSTACHE

		mu.clearCache();

		page.title = 'Infobae - Curso - Dinamico';
		page.description = '';
		//LLamas al metodo que te da las noticias
		var noticias = noticiasService.get();
		// var stream = mu.compileAndRender('index.html', {page: page, nombre: "Jonathan", noticias: noticiasService.get()});
		var stream = mu.compileAndRender('index.html', {title: "Infobae", noticias: noticias});

		stream.pipe(res);
	}
	else{
		//Trabajo como antes

		var filePath= "public"+path;
		fs.exists(filePath,function(exists) {
			if (exists) {
				fs.readFile(filePath, function (err, data) {
					if (err) {
						res.writeHead(500);
						if (path == "/") {
							filePath = "templates/index.html";
							fs.readFile(filePath, function (err, data) {
								res.end(data);
							})
						}
					} else {
						res.end(data);
					}
				})
			} else {
				res.writeHead(404);
				res.end("No existe");
			}
		})
	}
});


server.listen(process.env.PORT || 3000);
