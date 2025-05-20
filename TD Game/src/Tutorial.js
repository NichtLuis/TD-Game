// Get references to the canvases and their contexts
var backgroundCanvas = document.getElementById("backgroundCanvas");
var towerCanvas = document.getElementById("towerCanvas");

var backgroundCtx = backgroundCanvas.getContext("2d");
var towerCtx = towerCanvas.getContext("2d");

var tilesizeheight = 64;
var tilesizewidth = 64;

var mappng = new Image(); //new picture
mappng.src = "images/images-map/map.desinge.final.png"; //getting the map.png

let image = new Image();
image.src = "images/tem_tower_tesla.png"; // Example tower image

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

// 0: nicht-platzierbar
// 1: platzierbar
// 2: Turm1
// 3: Turm2
// 4: Turm3
var towerLayer = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function tryPlaceTower(x, y) {
  towerLayer[y][x] = 2;
  towerLayer[y][x + 1] = 0;
  towerLayer[y + 1][x] = 0;
  towerLayer[y + 1][x + 1] = 0;
}
tryPlaceTower(1, 4);
tryPlaceTower(3, 4);
tryPlaceTower(5, 4);
function drawTowers() {
  towerCtx.clearRect(0, 0, 1280, 768); // Clear the tower canvas
  for (let y = 0; y < 12; y++) {
    for (let x = 0; x < 20; x++) {
      if (
        towerLayer[y][x] == 2 &&
        towerLayer[y][x + 1] == 0 &&
        towerLayer[y + 1][x] == 0 &&
        towerLayer[y + 1][x + 1] == 0
      ) {
        // Draw the tower image at the top-left corner of the 2x2 block
        towerCtx.drawImage(
          image,
          x * tilesizewidth,
          y * tilesizeheight,
          128,
          128
        );
      }
    }
  }
}

function drawBackground() {
  for (let y = 0; y < 12; y++) {
    for (let x = 0; x < 20; x++) {
      if (map[y][x] == 1) {
        backgroundCtx.drawImage(
          mappng,
          x * tilesizewidth,
          y * tilesizeheight,
          tilesizewidth,
          tilesizeheight,
          x * tilesizewidth,
          y * tilesizeheight,
          tilesizewidth,
          tilesizeheight
        );
      }
    }
  }
}

mappng.onload = function () {
  drawBackground();
  setTimeout(() => {
    drawTowers();
  }, 1000);
};

//var Monster = new enemy(1*tilesizewidth,1*tilesizeheight,6,3,1,5,0,false,1,1);
