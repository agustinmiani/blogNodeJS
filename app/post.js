var posts;
module.exports={
  cargarPost: function(){
    posts=[];
    post= new Object();
    post.id=1;
    post.detalle='hola';
    posts.push(post);
    post=new Object();
    post.id=2;
    post.detalle='mundo';
    posts.push(post);

  },
  get: function (){
    return JSON.stringify(posts);
  },
  getById: function(id){
    for (i=0;i<posts.length;i++){
      if (i=id){
        return JSON.stringify(posts[i]);

      }
    }
    return undefined;
  },
  getLast: function(){

    return JSON.stringify(posts[posts.length-1]);
  },
  insert: function( post){
    var cambio=false;
    for (i=0;i<posts.length;i++){
      if (post.id==posts[i].id){
        posts[i].detalle=post.detalle;
      }
    }

    posts.push(post);
  },
  deletePost: function (id) {
    var existe=false;
    var index;
    for(i=0;i<posts.length;i++){
      if (posts[i].id==id){
        existe=true;
        index=i;
      }
    }
    if(existe){
      posts.splice(index,1);
    }
  }

};
