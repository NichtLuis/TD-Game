import { tower_normal } from "./tower.js";

// Get references to the canvases and their contexts
var backgroundCanvas = document.getElementById("backgroundCanvas");
var towerCanvas = document.getElementById("towerCanvas");

var backgroundCtx = backgroundCanvas.getContext("2d");
var towerCtx = towerCanvas.getContext("2d");

var tilesizeheight = 64;
var tilesizewidth = 64;

var mappng = new Image(); //new picture
mappng.src = "images/images-map/map.desinge.final.png"; //getting the map.png
var enemyn = new Image();
enemyn.src = "images/images-enemy/BigGuyWalkAnimatin.png";

import { enemy_normal } from "./enemy.js";
import { enemy_speedey } from "./enemy.js";
import { enemy_flying } from "./enemy.js";
import { enemy_tank } from "./enemy.js";
import { enemy_miniboss } from "./enemy.js";
import { enemy_boss } from "./enemy.js";

let image = new Image();
image.src = "images/tem_tower_tesla.png"; // Example tower image

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

function createTower() {}

function tryPlaceTower(tower) {
  towerLayer[tower.y][tower.x] = tower.placeId;
  towerLayer[tower.y][tower.x + 1] = 0;
  towerLayer[tower.y + 1][tower.x] = 0;
  towerLayer[tower.y + 1][tower.x + 1] = 0;
}

const tower1 = new tower_normal(1, 4);
tryPlaceTower(tower1); // Place a tower at (4, 1)

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

function zeichne() {
  ctx.clearRect(0, 0, 1280, 768); //Hintergrund löschen
  hintergrund(); //Hintergrund neu zeichnen
  drawTowers(); //Türme zeichnen

  if (enemy1 == enemy1) {
    //picture,absolute x    , abssolute y    ,size x         , size y         ,absolute x + x1,absolute y+ y1  , size x2       ,size y2
    //picture,                                        map position                                             ,      picture.png
    ctx.drawImage(
      enemyn,
      0 * tilesizewidth,
      0 * tilesizeheight,
      2 * tilesizewidth,
      2 * tilesizeheight,
      0 * tilesizewidth,
      0 * tilesizeheight,
      2 * tilesizewidth,
      2 * tilesizeheight
    );
  }
}

document.onmousemove = (event) => {
  towerCtx.clearRect(0, 0, 1280, 768); // Clear previous highlights and towers
  drawTowers(); // Redraw towers

  const x_tile = Math.floor(event.offsetX / tilesizewidth);
  const y_tile = Math.floor(event.offsetY / tilesizeheight);

  // Possible 2x2 block offsets: [dx, dy]
  const offsets = [
    [0, 0], // bottom-right
    [0, -1], // top-right
    [-1, 0], // bottom-left
    [-1, -1], // top-left
  ];

  for (const [dx, dy] of offsets) {
    const x = x_tile + dx;
    const y = y_tile + dy;
    // Check bounds
    if (
      x >= 0 &&
      x + 1 < 20 &&
      y >= 0 &&
      y + 1 < 12 &&
      towerLayer[y][x] == 1 &&
      towerLayer[y][x + 1] == 1 &&
      towerLayer[y + 1][x] == 1 &&
      towerLayer[y + 1][x + 1] == 1
    ) {
      towerCtx.globalAlpha = 0.4;
      towerCtx.fillStyle = "yellow";
      towerCtx.fillRect(
        x * tilesizewidth,
        y * tilesizeheight,
        2 * tilesizewidth,
        2 * tilesizeheight
      );
      towerCtx.globalAlpha = 1.0;
      break; // Only highlight the first valid position
    }
  }
};

document.onclick = (event) => {
  const x_tile = Math.floor(event.offsetX / tilesizewidth);
  const y_tile = Math.floor(event.offsetY / tilesizeheight);

  // Possible 2x2 block offsets: [dx, dy]
  const offsets = [
    [0, 0], // bottom-right
    [0, -1], // top-right
    [-1, 0], // bottom-left
    [-1, -1], // top-left
  ];

  for (const [dx, dy] of offsets) {
    const x = x_tile + dx;
    const y = y_tile + dy;
    // Check bounds and if the position is valid for placing a tower
    if (
      x >= 0 &&
      x + 1 < 20 &&
      y >= 0 &&
      y + 1 < 12 &&
      towerLayer[y][x] == 1 &&
      towerLayer[y][x + 1] == 1 &&
      towerLayer[y + 1][x] == 1 &&
      towerLayer[y + 1][x + 1] == 1
    ) {
      const newTower = new tower_normal(x, y);
      tryPlaceTower(newTower);
      drawTowers();
      break; // Only place one tower at a time
    }
  }
};

mappng.onload = function () {
  drawBackground();
  setTimeout(() => {
    drawTowers();
  }, 1000);
};

var enemy1 = new enemy_normal(2 * tilesizeheight, 2 * tilesizewidth);
