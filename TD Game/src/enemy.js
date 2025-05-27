export{enemy_normal,enemy_speedey,enemy_flying,enemy_tank,enemy_miniboss,enemy_boss}
 class Enemy {
    constructor(x, y, health,speed, damage, coins, money, flying, width, height, image) {
        this.x = x;
        this.y = y;
        this.health = health; // Health of the enemy
        this.speed = speed;
        this.damage = damage; // Damage dealt by the enemy   
        this.coins = coins;
        this.money = money;
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
    
    class enemy_normal extends Enemy{
        constructor(x,y){
            super(x, y, 6, 1, 1, 5, 0, false )

        }
    }
    class enemy_speedey extends Enemy{
        constructor(x,y,width,height){
            super(x, y, 3, 2, 3, 6, 0, false, width, height)
        }
    }
    class enemy_flying extends Enemy{
        constructor(x,y){
            super(x, y, 6, 0.75, 3, 8, 1, true, 0, 0)
        }
    }
    class enemy_tank extends Enemy{
        constructor(x,y){
            super(x, y, 10, 0.5, 5, 10, 0, false, 0, 0)
        }
    }
    class enemy_miniboss extends Enemy{
        constructor(x,y){
            super(x, y, 50, 0.5, 100, 0, 10, false, 0, 0)
        }
    }
    class enemy_boss extends Enemy{
        constructor(x,y){
            super(x, y, 100, 0.5, 200, 0, 0, false, 0, 0)
        }
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
  { x: 512, y: 320 }, { x: 576, y: 320 }, { x: 640, y: 320 }, { x: 704, y: 320 },
  { x: 768, y: 320 }, { x: 768, y: 320 }, { x: 768, y: 320 }, { x: 768, y: 320 },
  { x: 832, y: 320 }, { x: 768, y: 896 }, { x: 768, y: 960 }, { x: 768, y: 1024 },
  { x: 768, y: 1088 }, { x: 768, y: 1152 }, { x: 768, y: 1216 },
];

const enemyImg = new Image();
enemyImg.src = "images/enemy.png"; // Pfad zum Gegnerbild

let pos = { x: pfad[0].x * TILE_SIZE, y: pfad[0].y * TILE_SIZE };
let zielIndex = 1;
const speed = speed; // Geschwindigkeit des Gegners in Pixel pro Frame


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
  ctx.drawImage(enemyImg, pos.x, pos.y, TILE_SIZE, TILE_SIZE);

  requestAnimationFrame(bewegeGegner);
}

enemyImg.onload = () => {
  requestAnimationFrame(bewegeGegner);
};