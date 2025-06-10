import { tower_normal, tower_cannon, tower_smg } from "./tower.js";

// Get references to the canvases and their contexts
var backgroundCanvas = document.getElementById("backgroundCanvas");
var towerCanvas = document.getElementById("towerCanvas");
var enemyCanvas = document.getElementById("enemyCanvas");

var backgroundCtx = backgroundCanvas.getContext("2d");
var towerCtx = towerCanvas.getContext("2d");
var enemyCtx = enemyCanvas.getContext("2d");

var tilesizeheight = 64;
var tilesizewidth = 64;

var mappng = new Image(); //new picture
mappng.src = "images/maps/map.desinge.final.png"; //getting the map.png
//enemy
var frames = 0;
var enemyn = new Image();
enemyn.src = "images/GegnerAnim/BigGuyWalkAnimation.png";

// import { enemy_normal } from "./enemy.js";
import { enemy_normal } from "./enemy.js";
import { enemy_speedey } from "./enemy.js";
import { enemy_flying } from "./enemy.js";
import { enemy_tank } from "./enemy.js";
import { enemy_miniboss } from "./enemy.js";
import { enemy_boss } from "./enemy.js";

let image = new Image();
image.src = "images/towerAnim/tesla/turm1.5.png"; // Example tower image

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
var enemyLayer = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function tryPlaceTower(tower) {
  towerLayer[tower.y][tower.x] = tower.placeId;
  towerLayer[tower.y][tower.x + 1] = 0;
  towerLayer[tower.y + 1][tower.x] = 0;
  towerLayer[tower.y + 1][tower.x + 1] = 0;
}

function highlightTower(tower) {
  const yOffset = tower.placeId === 2 ? -30 : 0;
  const width = tower.placeId === 2 ? 140 : 128;
  const height = tower.placeId === 2 ? 140 : 128;

  towerCtx.save();
  towerCtx.globalAlpha = 1;
  // Glow color based on tower level
  let glowColor = "gray";
  if (tower.placeId === 2) {
    glowColor = tower.getGlowColor();
  } else if (tower.placeId === 3) {
    glowColor = tower.getGlowColor();
  } else if (tower.placeId === 4) {
    glowColor = tower.getGlowColor();
  }
  let colorMap = {
    gray: "rgba(180,180,180,1)",
    blue: "rgba(0,120,255,1)",
    purple: "rgba(180,0,255,1)",
    gold: "rgba(255,215,0,1)",
  };
  towerCtx.shadowColor = colorMap[glowColor] || "rgba(180,180,180,1)";
  towerCtx.shadowBlur = 30;
  towerCtx.shadowOffsetX = 0;
  towerCtx.shadowOffsetY = 0;

  towerCtx.drawImage(
    tower.image,
    tower.x * tilesizewidth,
    tower.y * tilesizeheight + yOffset,
    width,
    height
  );

  towerCtx.restore();
}

function drawTowers() {
  towerCtx.clearRect(0, 0, 1280, 768); // Clear the tower canvas
  for (let y = 0; y < 12; y++) {
    for (let x = 0; x < 20; x++) {
      // Find a tower at this position in the towers array
      const tower = towers.find((t) => t.x === x && t.y === y);
      if (
        tower &&
        towerLayer[y][x] == tower.placeId &&
        towerLayer[y][x + 1] == 0 &&
        towerLayer[y + 1][x] == 0 &&
        towerLayer[y + 1][x + 1] == 0
      ) {
        // Draw the tower's image at the top-left corner of the 2x2 block
        // if its tower1 a margin is added to rearrange the image
        const yOffset = tower.placeId === 2 ? -30 : 0;
        const width = tower.placeId === 2 ? 140 : 128; // Resize Tower 1's width
        const height = tower.placeId === 2 ? 140 : 128; // Resize Tower 1's height

        towerCtx.drawImage(
          tower.image,
          x * tilesizewidth,
          y * tilesizeheight + yOffset,
          width,
          height
        );
      }
    }
  }
  // Highlight selectedPlacedTower if menu is open
  if (selectedPlacedTower) {
    highlightTower(selectedPlacedTower);
  }
  drawFloatingTexts();
}
function drawEnemy() {
  enemyCtx.clearRect(0, 0, 1280, 768); //Hintergrund löschen
  if (enemy1 == enemy1) {
    enemyCtx.drawImage(
      enemyn,
      //position picture
      (0 + frames) * tilesizewidth,
      0 * tilesizeheight,
      //size picture
      2 * tilesizewidth,
      2 * tilesizeheight,
      //position map
      0 * tilesizewidth,
      6 * tilesizeheight,
      //size map
      2 * tilesizewidth,
      2 * tilesizeheight
    );
  }
  frames = frames + 2;
  frames = frames % 22;
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

// array to keep track of floating texts
let floatingTexts = [];

function drawFloatingTexts() {
  for (let i = floatingTexts.length - 1; i >= 0; i--) {
    const text = floatingTexts[i];
    // Animation: move up and fade out
    text.y -= 1;
    text.alpha -= 0.02;
    towerCtx.save();
    towerCtx.globalAlpha = Math.max(0, text.alpha);
    towerCtx.font = "28px Arial";
    towerCtx.fillStyle = "#ffe066";
    towerCtx.strokeStyle = "#bfa100";
    towerCtx.lineWidth = 2;
    towerCtx.textAlign = "center";
    towerCtx.strokeText(text.text, text.x, text.y);
    towerCtx.fillText(text.text, text.x, text.y);
    towerCtx.restore();
    if (text.alpha <= 0) {
      floatingTexts.splice(i, 1);
    }
  }
}

const TOWER_PRICES = {
  2: 10, // normal
  3: 15, // cannon
  4: 15, // smg
};

// --- Tower selection menu logic ---
let selectedPlacedTower = null;
let towerMenu = null;
let upgradeBtn = null;
let sellBtn = null;
let playerMoney = 100;
window.playerMoney = playerMoney;

function showTowerMenu(tower) {
  // Use existing menu and buttons from the DOM
  if (!towerMenu) {
    towerMenu = document.getElementById("tower-menu");
    upgradeBtn = document.getElementById("upgrade-btn");
    sellBtn = document.getElementById("sell-btn");
    if (upgradeBtn) {
      upgradeBtn.onclick = (e) => {
        e.stopPropagation();
        if (selectedPlacedTower && selectedPlacedTower.canUpgrade()) {
          const cost = selectedPlacedTower.getUpgradeCost();
          if (playerMoney >= cost) {
            setPlayerMoney(playerMoney - cost);
            selectedPlacedTower.levelUp();
            floatingTexts.push({
              text: `- ${cost} 💰`,
              x: (selectedPlacedTower.x + 1) * tilesizewidth,
              y: (selectedPlacedTower.y + 1) * tilesizeheight - 40,
              alpha: 1,
            });
            drawTowers();
          } else {
            floatingTexts.push({
              text: `Not enough 💰`,
              x: (selectedPlacedTower.x + 1) * tilesizewidth,
              y: (selectedPlacedTower.y + 1) * tilesizeheight - 40,
              alpha: 1,
            });
          }
        }
        hideTowerMenu();
      };
    }
    if (sellBtn) {
      sellBtn.onclick = (e) => {
        e.stopPropagation();
        if (selectedPlacedTower) {
          const index = towers.indexOf(selectedPlacedTower);
          if (index !== -1) {
            towers.splice(index, 1);
          }
          const x = selectedPlacedTower.x;
          const y = selectedPlacedTower.y;
          towerLayer[y][x] = 1;
          towerLayer[y][x + 1] = 1;
          towerLayer[y + 1][x] = 1;
          towerLayer[y + 1][x + 1] = 1;

          const price = TOWER_PRICES[selectedPlacedTower.placeId || 10];
          const sellValue = Math.round(price * 0.7);

          floatingTexts.push({
            text: `+${sellValue} 💰`,
            x: (x + 1) * tilesizewidth,
            y: (y + 1) * tilesizeheight - 20,
            alpha: 1,
          });

          setPlayerMoney(playerMoney + sellValue);

          drawTowers();
        }
        hideTowerMenu();
      };
    }
  }
  if (!towerMenu) return; // If menu not found, do nothing

  // Position menu above the tower
  const rect = towerCanvas.getBoundingClientRect();
  const yOffset = tower.placeId === 2 ? -30 : 0;
  const width = tower.placeId === 2 ? 140 : 128;
  const height = tower.placeId === 2 ? 140 : 128;
  const menuX =
    rect.left + window.scrollX + tower.x * tilesizewidth + width / 2 - 60;
  const menuY =
    rect.top + window.scrollY + tower.y * tilesizeheight + yOffset - 40;
  towerMenu.style.position = "absolute";
  towerMenu.style.left = `${menuX}px`;
  towerMenu.style.top = `${menuY}px`;
  towerMenu.style.display = "flex";
  towerMenu.style.zIndex = 1000;
}

function hideTowerMenu() {
  if (towerMenu) {
    towerMenu.style.display = "none";
  }
  selectedPlacedTower = null;
}

function animateFloatingTexts() {
  if (floatingTexts.length > 0) {
    drawTowers();
  }
  requestAnimationFrame(animateFloatingTexts);
}
animateFloatingTexts();

// hover effect
document.onmousemove = (event) => {
  drawTowers(); // Redraw towers

  const mouseX = event.offsetX;
  const mouseY = event.offsetY;

  // Check if the mouse is hovering over an existing tower
  const tower = towers.find((t) => {
    const yOffset = t.placeId === 2 ? -30 : 0;
    const width = t.placeId === 2 ? 140 : 128; // Tower width
    const height = t.placeId === 2 ? 140 : 128; // Tower height

    const towerX = t.x * tilesizewidth;
    const towerY = t.y * tilesizeheight + yOffset;

    return (
      mouseX >= towerX &&
      mouseX <= towerX + width &&
      mouseY >= towerY &&
      mouseY <= towerY + height
    );
  });

  if (tower) {
    // Highlight the existing tower with a shadow effect
    highlightTower(tower);
    return; // Skip further hover logic
  }

  // Possible offsets for placing a new tower
  const offsets = [
    [0, 0], // bottom-right
    [0, -1], // top-right
    [-1, 0], // bottom-left
    [-1, -1], // top-left
  ];

  for (const [dx, dy] of offsets) {
    const x_tile = Math.floor(mouseX / tilesizewidth) + dx;
    const y_tile = Math.floor(mouseY / tilesizeheight) + dy;

    // Check bounds
    if (
      x_tile >= 0 &&
      x_tile + 1 < 20 &&
      y_tile >= 0 &&
      y_tile + 1 < 12 &&
      towerLayer[y_tile][x_tile] == 1 &&
      towerLayer[y_tile][x_tile + 1] == 1 &&
      towerLayer[y_tile + 1][x_tile] == 1 &&
      towerLayer[y_tile + 1][x_tile + 1] == 1
    ) {
      let previewTower;
      if (selectedTowerType === "normal") {
        previewTower = new tower_normal(x_tile, y_tile);
      } else if (selectedTowerType === "cannon") {
        previewTower = new tower_cannon(x_tile, y_tile);
      } else if (selectedTowerType === "smg") {
        previewTower = new tower_smg(x_tile, y_tile);
      } else {
        previewTower = new tower_normal(x_tile, y_tile);
      }

      const yOffset = previewTower.placeId === 2 ? -30 : 0;
      const width = previewTower.placeId === 2 ? 140 : 128; // Resize Tower 1's width
      const height = previewTower.placeId === 2 ? 140 : 128; // Resize Tower 1's height
      // Draw the tower preview
      towerCtx.globalAlpha = 0.6;
      towerCtx.drawImage(
        previewTower.image,
        x_tile * tilesizewidth,
        y_tile * tilesizeheight + yOffset,
        width,
        height
      );

      // Draw the range
      towerCtx.beginPath();
      towerCtx.arc(
        x_tile * tilesizewidth + tilesizewidth,
        y_tile * tilesizeheight + tilesizeheight,
        previewTower.range,
        0,
        Math.PI * 2
      );
      towerCtx.fillStyle = "rgba(0,150,255,0.3)";
      towerCtx.fill();
      towerCtx.lineWidth = 1;
      towerCtx.strokeStyle = "rgb(0, 105, 180)";
      towerCtx.stroke();
      towerCtx.closePath();

      // hover rect
      // Draw a hover rectangle around the 2x2 tower placement area
      towerCtx.save();
      towerCtx.globalAlpha = 0.2;
      towerCtx.fillStyle = "rgba(255, 255, 255, 0.36)";
      towerCtx.fillRect(
        x_tile * tilesizewidth,
        y_tile * tilesizeheight,
        tilesizewidth * 2,
        tilesizeheight * 2
      );

      towerCtx.restore();

      towerCtx.globalAlpha = 1;

      break; // Only highlight the first valid position
    }
  }
};

// Tower selection logic
let selectedTowerType = "normal"; // default

const towerElements = document.querySelectorAll(".tower-selection .tower");
towerElements.forEach((el) => {
  el.addEventListener("click", function () {
    towerElements.forEach((e) => e.classList.remove("selected"));
    this.classList.add("selected");
    selectedTowerType = this.getAttribute("data-tower-type");
  });
});
// Set initial selection
document.getElementById("tower1").classList.add("selected");

document.onclick = (event) => {
  // Get mouse position relative to canvas
  const mouseX = event.offsetX;
  const mouseY = event.offsetY;

  // Check if clicking on a placed tower
  const tower = towers.find((t) => {
    const yOffset = t.placeId === 2 ? -30 : 0;
    const width = t.placeId === 2 ? 140 : 128;
    const height = t.placeId === 2 ? 140 : 128;
    const towerX = t.x * tilesizewidth;
    const towerY = t.y * tilesizeheight + yOffset;
    return (
      mouseX >= towerX &&
      mouseX <= towerX + width &&
      mouseY >= towerY &&
      mouseY <= towerY + height
    );
  });

  if (tower) {
    // If clicking on a different tower, show menu for it
    if (selectedPlacedTower !== tower) {
      selectedPlacedTower = tower;
      showTowerMenu(tower);
    }
    // If clicking the same tower, do nothing (menu stays)
    return;
  } else {
    // Not clicking a tower: hide menu
    hideTowerMenu();
  }

  // --- Tower placement logic ---
  const x_tile = Math.floor(mouseX / tilesizewidth);
  const y_tile = Math.floor(mouseY / tilesizeheight);

  const offsets = [
    [0, 0], // bottom-right
    [0, -1], // top-right
    [-1, 0], // bottom-left
    [-1, -1], // top-left
  ];

  for (const [dx, dy] of offsets) {
    const x = x_tile + dx;
    const y = y_tile + dy;
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
      let newTower;
      if (selectedTowerType === "normal") {
        newTower = new tower_normal(x, y);
      } else if (selectedTowerType === "cannon") {
        newTower = new tower_cannon(x, y);
      } else if (selectedTowerType === "smg") {
        newTower = new tower_smg(x, y);
      } else {
        newTower = new tower_normal(x, y); // fallback
      }
      towers.push(newTower); // Store the tower instance
      tryPlaceTower(newTower);
      drawTowers();
      break; // Only place one tower at a time
    }
  }
};

// Hide menu if clicking anywhere else in the document (outside canvas)
document.body.addEventListener("mousedown", function (e) {
  // If menu is open and click is outside menu, hide it
  if (
    towerMenu &&
    towerMenu.style.display !== "none" &&
    !towerMenu.contains(e.target)
  ) {
    hideTowerMenu();
  }
});

mappng.onload = function () {
  drawBackground();
  setTimeout(() => {
    drawTowers();
  }, 1000);
};

var enemy1 = new enemy_normal(2 * tilesizeheight, 2 * tilesizewidth);
var enemy2 = new enemy_speedey(2 * tilesizeheight, 2 * tilesizewidth);

//DON'T TOUCH THE INTERVAL
let enemyanimation = setInterval(drawEnemy, 123);
