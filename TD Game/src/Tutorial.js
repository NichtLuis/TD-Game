var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var tilesizeheight = 64;
var tilesizewidth = 64;

var mappng = new Image(); //new picture
mappng.src = "images/images-map/map.desinge.final.png"; //getting the map.png

//import * as enemy from "../enemy.js";

var towers = [];

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

var towerLayer = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

function tryPlaceTower(x, y) {
  for (let dy = 0; dy < 2; dy++) {
    for (let dx = 0; dx < 2; dx++) {
      towerLayer[y + dy][x + dx] = 2;
    }
  }
}

function drawTowers() {
  for (let y = 0; y < 12; y++) {
    for (let x = 0; x < 20; x++) {
      if (towerLayer[y][x] == 2) {
        ctx.fillStyle = "red";
        ctx.fillRect(
          x * tilesizewidth,
          y * tilesizeheight,
          tilesizewidth,
          tilesizeheight
        );
      }
    }
  }
}

function hintergrund() {
  for (let y = 0; y < 12; y++) {
    for (let x = 0; x < 20; x++) {
      if (map[y][x] == 1) {
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

tryPlaceTower(0, 0); // Example of placing a tower

function zeichne() {
  ctx.clearRect(0, 0, 1280, 768); //Hintergrund löschen
  hintergrund(); //Hintergrund neu zeichnen
  drawTowers(); //Türme zeichnen
}
mappng.onload = function () {
  zeichne(); //Bild zeichnen, wenn Sprite geladen wurde. Wird einmal bei Start ausgeführt, da sonst ein leerer Bildschirm erscheinen würde.
};

//var Monster = new enemy(1*tilesizewidth,1*tilesizeheight,6,3,1,5,0,false,1,1);
