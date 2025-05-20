class Enemy {
    constructor(x, y, speed, money, health, damage, flying, width, height, image) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.money = money;
        this.health = health; // Health of the enemy
        this.damage = damage; // Damage dealt by the enemy   
        this.flying = flying;
        this.width = width;
        this.height = height;

        if (image) {
            this.image = new Image();
            this.image.src = image;
        } else {
            this.image = null; // If no image is provided, set it to null
        }
    }

    //draw(ctx) {
        //ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    //}

    //move() {
       // this.x -= this.speed; // Move left
      // }
    }

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

/// 
const TILE_SIZE = 64;

// Beispiel-Map: 0 = Wand, 1 = Weg
const map = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

// Pfad für Gegner: Reihe von Zellen auf dem Weg
const pfad = [
  { x: 0, y: 448 }, { x: 64, y: 448 }, { x: 128, y: 448 }, { x: 192, y: 448 },
  { x: 256, y: 448 }, { x: 256, y: 448 }, { x: 256, y: 448 }, { x: 320, y: 448 },
  { x: 384, y: 448 }, { x: 448, y: 448 }, { x: 512, y: 448 }, { x: 512, y: 384 },
  { x: 512, y: 320 }, { x: 576, y: 320 },
];

const enemyImg = new Image();
enemyImg.src = "gegner.png"; // Deine PNG-Datei

let pos = { x: pfad[0].x * TILE_SIZE, y: pfad[0].y * TILE_SIZE };
let zielIndex = 1;
const speed = 1.5;

function zeichneMap() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      ctx.fillStyle = map[y][x] === 1 ? "#ccc" : "#333";
      ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  }
}

function bewegeGegner() {
  if (zielIndex >= pfad.length) return;

  const ziel = {
    x: pfad[zielIndex].x * TILE_SIZE,
    y: pfad[zielIndex].y * TILE_SIZE
  };

  const dx = ziel.x - pos.x;
  const dy = ziel.y - pos.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < speed) {
    pos.x = ziel.x;
    pos.y = ziel.y;
    zielIndex++;
  } else {
    pos.x += (dx / dist) * speed;
    pos.y += (dy / dist) * speed;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  zeichneMap();
  ctx.drawImage(enemyImg, pos.x, pos.y, TILE_SIZE, TILE_SIZE);

  requestAnimationFrame(bewegeGegner);
}

enemyImg.onload = () => {
  requestAnimationFrame(bewegeGegner);
};
