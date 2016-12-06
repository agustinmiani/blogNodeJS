// Significa que puede ser expotado e importado por otros js
var articulos = [];

module.exports = {
    // LLaman a noticias.get y va a hacer esto
    cargar: function(){

        var nuevo = new Articulo(0,"Chapecoense","Gana la copa", true,"images/chapeco.jpg", "aca tiro fruta");
        var nuevo1 = new Articulo(1,"Manu","Compra su Quemador de grasas", false, "images/manu.jpg", "aca tiro fruta");
        var nuevo2 = new Articulo(2,"Manu","Le pega a todos por locura de la pill", true,"images/loco.jpg", "aca tiro fruta");
        articulos.push(nuevo);
        articulos.push(nuevo1);
        articulos.push(nuevo2);

        return articulos;
    },
    obtener: function(){

        return articulos;
    },
    nuevoArticulo: function(body){

        var nuevo = new Articulo(articulos.length, body.titulo, body.contenido, body.link, "images/"+body.linkImagen, body.extra);
        articulos.push(nuevo);
    },
    obtenerUltimo: function(){

        return articulos[articulos.length-1];
    },
    obtenerNoticiaEspecifica: function(post){

        return noticia = articulos[post];
    },
    agregarComentario: function(id, body){
        comentario = new Comentario(body.titulo, body.comentario);
        var articulo = articulos[id];
        articulo.comentarios.push(comentario);
    },
};


var Articulo = function (id,titulo, contenido, link, linkImagen, extra) {
    this.id = id;
    this.titulo = titulo;
    this.contenido = contenido;
    this.link = link;
    this.linkImagen = linkImagen;
    this.extra = extra;
    this.comentarios = [];
};

var Comentario = function (titulo, comentario){
    this.titulo = titulo;
    this.comentario = comentario;
}