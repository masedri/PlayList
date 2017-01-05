$(function(){
  initPlayer();
  getSongs();
});

var audio = document.getElementById('player');
var music;

function getSongs(){
  $.getJSON("js/app.json", function(ejson){
    music = ejson;
    console.log(music);
    getList(music);
  });

}
function getList(music){
  /*$.each(music.songs, function(i, value){
    $('#playlist').append('<li class="list-group-item" id="'+i+'">'+value.nombre+'</li>');
    console.log(i + ':' +value);
  });*/
  /*for (var i = 0; i < music.songs.length; i++) {
    var obj = music.songs[i];
    $('#playlist').append('<li class="list-group-item" id="'+i+'">'+obj.nombre+'</li>');
    console.log(music.songs[i]);
  }*/

  for(var i in music.songs){
    var cancion = music.songs[i];
    $('#playlist').append('<li class="list-group-item" id="'+i+'">'+cancion.nombre+'</li>');
    /*append --> selector más append // appendTo --> le agregegas a la etiqueta*/
    $('#playlist').css({'cursor':'pointer'});
    console.log(music.songs[i]);
  }
  $('#playlist li').click(function(){
    var selectedSong = /*e.target;*/ $(this).attr('id');
    // console.log(selectedSong);
    playSong(selectedSong);
  });

}

function playSong(e){
  console.log(e); /*music.songs[e].nombre*/
  if (e >= music.songs.length) {
    console.log('Se acabo las canciones');
    audio.pause(); /* --> $('#player').trigger('pause');*/
  }else{
   $('#img-album').attr('src', music.songs[e].img);
   $('#player').attr('src', music.songs[e].song);
   audio.play();
   console.log('Hay más canciones');
   cambiarCancion(e);
 }

}

function cambiarCancion(e){
  audio.onended = function(){
    console.log('Termino la canción');
    playSong(parseInt(e)+1);
  };

}

function shuffle(array) {
       
  for (var i = array.length-1; i >=0; i--) {
         
    var randomNumber = Math.floor(Math.random()*(i));
    var randomNumber_2 = array[randomNumber];
             
    array[randomNumber] = array[i];
    array[i] = randomNumber_2;

      }

      return array;
}
 
function initPlayer(){
  $('#shuffle').click(function(){
    $('#playlist').empty();
    shuffle(music.songs);
    getList(music);
    playSong(0);
  });
}
