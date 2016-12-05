// Significa que puede ser expotado e importado por otros js
module.exports = {
    // LLaman a noticias.get y va a hacer esto
    get: function(){
        var articulos = [];
        var nuevo = new Articulo(0,"Chapecoense","Gana la copa", true, "aca tiro fruta", "images/chapeco.jpg");
        var nuevo1 = new Articulo(1,"Manu","Compra su Quemador de grasas", false, "aca tiro fruta", "images/manu.jpg");
        var nuevo2 = new Articulo(2,"Manu","Le pega a todos por locura de la pill", true, "aca tiro fruta", "images/loco.jpg");
        articulos.push(nuevo);
        articulos.push(nuevo1);
        articulos.push(nuevo2);

        return articulos;
    },
};


var Articulo = function (id,titulo, contenido, link, extra, linkImagen) {
    this.id = id;
    this.titulo = titulo;
    this.contenido = contenido;
    this.link = link;
    this.linkImagen = linkImagen;
    this.extra = extra;
};