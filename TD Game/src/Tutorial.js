var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var tilesizeheight = 64;
var tilesizewidth = 64;

var mappng = new Image(); //new picture
mappng.src = "images/images-map/map.desinge.final.png"; //getting the map.png

//import * as enemy from "../enemy.js";

var map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

function hintergrund() {
  for (let y = 0; y < 12; y++) {
    for (let x = 0; x < 20; x++) {
      if ((map[y][x] = 1)) {
        ctx.drawImage(
          mappng,
          (x + 0) * tilesizewidth,
          (y + 0) * tilesizeheight,
          tilesizewidth,
          tilesizeheight,
          (x + 0) * tilesizewidth,
          (y + 0) * tilesizeheight,
          tilesizewidth,
          tilesizeheight
        );
      }
    }
  }
}
function zeichne() {
  ctx.clearRect(0, 0, 1280, 768); //Hintergrund löschen
  hintergrund(); //Hintergrund neu zeichnen
}
mappng.onload = function () {
  zeichne(); //Bild zeichnen, wenn Sprite geladen wurde. Wird einmal bei Start ausgeführt, da sonst ein leerer Bildschirm erscheinen würde.
};

//var Monster = new enemy(1*tilesizewidth,1*tilesizeheight,6,3,1,5,0,false,1,1);
