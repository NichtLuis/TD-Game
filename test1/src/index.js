import { Bullet } from "./classes/bullet.js";
import { Tower } from "./classes/tower.js";
import { Enemy } from "./classes/enemy.js";
import { Laser } from "./classes/laser.js";
import { levels } from "./levels.js";
import { getClosestCannonImage } from "./classes/tower.js";
import { audio , music , playSound, stopAllAudio} from "./audio.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function enableMenuMusicOnce() {
    music.mainMenu_1.currentTime = 0;
    music.mainMenu_1.play();
    document.body.removeEventListener('click', enableMenuMusicOnce);
    document.body.removeEventListener('keydown', enableMenuMusicOnce);
}

// Attach listeners as soon as the page loads
document.body.addEventListener('click', enableMenuMusicOnce);
document.body.addEventListener('keydown', enableMenuMusicOnce);

document.getElementById('level1-btn').onclick = () => {
  currentLevelIndex = 0;
  currentLevel = levels[currentLevelIndex];
  document.getElementById('level-select').style.display = 'none';
  document.getElementById('sidebar').style.display = 'block';
  document.getElementById('main-menu').style.display = 'none';
  stopAllAudio();
  music.bgm_1.play();
  music.bgm_1.loop = true;
  loadLevel();
  gameLoop(); 
};

document.getElementById('level2-btn').onclick = () => {
  currentLevelIndex = 1;
  currentLevel = levels[currentLevelIndex];
  document.getElementById('level-select').style.display = 'none';
  document.getElementById('sidebar').style.display = 'block';
  document.getElementById('main-menu').style.display = 'none';
  stopAllAudio();
  music.bgm_2.play();
  music.bgm_2.loop = true;
  loadLevel();
  gameLoop(); 
};

let waveData = [];
let waypoints = [];
let towerLayer = [];
let currentLevelIndex = 0;
let currentLevel = levels[currentLevelIndex];
let mapImage = new Image();

function loadLevel() {
  mapImage.src = currentLevel.mapImage;
  towerLayer = JSON.parse(JSON.stringify(currentLevel.towerLayer));
  waveData = JSON.parse(JSON.stringify(currentLevel.waveData));
  waypoints = JSON.parse(JSON.stringify(currentLevel.waypoints));
  // Reset wave-related state
  currentWave = 0;
  enemiesToSpawn = [];
  waveInProgress = false;
  waveTimer = 0;
  waveDelayCounter = 0;
  // Reset other state as needed
  resetGameState();
}

const lightningImg = new Image(); // test
lightningImg.src = './assets/bullet/teslaBullet.png';

let hoverTile = null;
let selectedTower = null;
let selectedTowerType = "tesla"; // Default tower type is Tesla
let playerHealth = 100;
let playerMoney = 50;

let currentWave = 0;
let enemiesToSpawn = [];
let waveInProgress = false;
let waveTimer = 0;
let waveDelay = 120; // Delay between waves 
let waveDelayCounter = 0;

function startWave() {
    if (currentWave >= waveData.length) return;
    waveInProgress = true;
    enemiesToSpawn = waveData[currentWave].map(w => ({ ...w, spawned: 0, timer: 0 }));
}

document.querySelectorAll('.tower-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.tower-option').forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
        selectedTowerType = this.getAttribute('data-type');
    });
});

document.getElementById('start-btn').onclick = () => {
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('level-select').style.display = 'flex';
};
document.getElementById('options-btn').onclick = () => {
    alert('Options coming soon!'); // No options yet
};
document.getElementById('exit-btn').onclick = () => {
    alert("You can't exit...") // You can't exit the game so it's useless
};
document.getElementById('retry-btn').onclick = () => {
    stopAllAudio();
    resetGameState();  
    document.getElementById('game-over').style.display = 'none';
    gameLoop();
};

document.getElementById('back-menu-btn').onclick = () => {
    stopAllAudio();
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('main-menu').style.display = 'block';
    document.getElementById('sidebar').style.display = 'none';
    // Goes back to menu, resets the game state
    resetGameState();
};

document.getElementById('win-retry-btn').onclick = () => {
    stopAllAudio();
    resetGameState();
    document.getElementById('game-win').style.display = 'none';
    gameLoop();
};

document.getElementById('win-menu-btn').onclick = () => {
    stopAllAudio();
    document.getElementById('game-win').style.display = 'none';
    document.getElementById('main-menu').style.display = 'block';
    document.getElementById('sidebar').style.display = 'none';
    resetGameState();
};

function resetGameState() {
    playerHealth = 100;
    playerMoney = 50;
    towers.length = 0;
    enemies.length = 0;
    bullets.length = 0;
    lasers.length = 0;
    selectedTower = null;
    hoverTile = null;
    currentWave = 0;
    enemiesToSpawn = [];
    waveInProgress = false;
    waveTimer = 0;
    waveDelayCounter = 0;
    towerLayer = JSON.parse(JSON.stringify(currentLevel.towerLayer));
    startWave();
}

function showGameOver() {
    document.getElementById('game-over').style.display = 'flex';
}

function showGameWin() {
    document.getElementById('game-win').style.display = 'flex';
}

const towerCosts = {
    tesla: 10,
    cannon: 20,
    antiAir: 25
};

function getUpgradeCost(tower) {
    const base = towerCosts[tower.type] || 10;
    if (tower.level === 1) return Math.round(base * 1.5);
    if (tower.level === 2) return base * 2;
    if (tower.level === 3) return base * 3;
    return 9999; 
}

function getSellValue(tower) {
    let totalCost = towerCosts[tower.type] || 10;
    for (let lvl = 1; lvl < tower.level; lvl++) {
        if (lvl === 1) totalCost += Math.round((towerCosts[tower.type] || 10) * 1.5);
        if (lvl === 2) totalCost += (towerCosts[tower.type] || 10) * 2;
        if (lvl === 3) totalCost += (towerCosts[tower.type] || 10) * 3;
    }
    return Math.round(totalCost * 0.8);
}

const enemies = [];
const towers = [];
let bullets = [];
let lasers = []; // test

function isInsideCanvas(x, y) {
    return x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height;
}

function drawTowers(deltaTime) {
    for (let tower of towers) {
        if (tower.type === "cannon") {
            // Only look for a new target if:
            // - No target
            // - Target is dead
            // - Target is out of range
            // - Target is off-canvas
            // - Cannon is ready to shoot (cooldown <= 0)
            if (
                !tower.target ||
                tower.target.health <= 0 ||
                Math.hypot(tower.target.x - tower.x, tower.target.y - tower.y) > tower.range ||
                !isInsideCanvas(tower.target.x, tower.target.y) ||
                tower.cooldown <= 0 // Only switch when ready to shoot
            ) {
                let closest = null;
                let minDist = Infinity;
                for (let enemy of enemies) {
                    if (enemy.isFlying) continue;
                    if (!isInsideCanvas(enemy.x, enemy.y)) continue;
                    const dx = enemy.x - tower.x;
                    const dy = enemy.y - tower.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < tower.range && dist < minDist) {
                        minDist = dist;
                        closest = enemy;
                    }
                }
                tower.target = closest;
            }
        }
        tower.update(deltaTime);
        tower.draw(ctx);
    }
}

function drawTowerHover() {
    if (!hoverTile || selectedTower) return;

    // Tower preview
    const towerType = typeof selectedTowerType !== "undefined" ? selectedTowerType : "tesla";
    let TowerImage;
    if (selectedTowerType === "cannon") {
        // Show the cannon at 0 degrees for preview
        TowerImage = getClosestCannonImage(0);
    } else {
        TowerImage = Tower.images[selectedTowerType];
    }
    // Center position for the 2x2 tower
    const centerX = hoverTile.tileX * 64 + 64;
    let centerY = hoverTile.tileY * 64 + 64;

    // Apply vertical offset for tesla (image is kind of not centered) 
    let offsetY = 0;
    if (towerType === "tesla") offsetY = -32;
    if (towerType === "cannon") offsetY = -32; 
    if (towerType === "antiAir") offsetY = -16; 
    centerY += offsetY;

    // Get range for the tower type 
    let range = 200;
    if (towerType === "cannon") range = 300;
    else if (towerType === "antiAir") range = 250;

    // Check if placable
    const placable =
        canPlaceTowerAt(hoverTile.tileX, hoverTile.tileY) &&
        canPlaceTowerAt(hoverTile.tileX + 1, hoverTile.tileY) &&
        canPlaceTowerAt(hoverTile.tileX, hoverTile.tileY + 1) &&
        canPlaceTowerAt(hoverTile.tileX + 1, hoverTile.tileY + 1);

    // Draw range circle (blue if placable, red if not)
    ctx.save();
    ctx.globalAlpha = 0.2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, range, 0, Math.PI * 2);
    ctx.fillStyle = placable ? "#00bfff" : "#ff4444";
    ctx.fill();
    ctx.restore();

    // Draw tower image with opacity
    if (TowerImage && TowerImage.complete && TowerImage.naturalWidth !== 0) {
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.drawImage(TowerImage, centerX - 64, centerY - 64, 128, 128);
    ctx.restore();
} else {
    // Draw a placeholder if image is missing
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 64, 0, Math.PI * 2);
    ctx.fillStyle = 'gray';
    ctx.fill();
    ctx.restore();
}
}

function drawEnemies(deltaTime) {
    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        enemy.update(deltaTime);
        // Check if enemy reached the last waypoint
        if (enemy.waypointIndex >= waypoints.length) {
            playerHealth -= 10; 
            enemies.splice(i, 1); 
            continue;
        }
        enemy.draw(ctx);
    }
}

function drawBullets(deltaTime) {
    bullets.forEach(bullet => {
        bullet.update(deltaTime);
        bullet.draw(ctx);
    });
}

function drawLasers(deltaTime) {
    lasers.forEach(laser => {
        laser.update(deltaTime);
        laser.draw(ctx, lightningImg);
    });
    lasers = lasers.filter(laser => laser.timer > 0);
}

function drawHUD() {
    ctx.save();
    ctx.font = "28px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("Health: " + playerHealth, 20, 40);
    ctx.fillText("Money: $" + playerMoney, 20, 80);
    ctx.fillText("Wave: " + (currentWave + (waveInProgress ? 1 : 0)), 20, 120);
    ctx.restore();
}

function shootBullets() {
    towers.forEach(tower => {
        const shot = tower.shoot(enemies); 
        if (shot) {
            if (tower.type === "tesla") { 
                lasers.push(new Laser(tower.x, tower.y, shot.target.x, shot.target.y, shot.damage, "tesla", 5));
                playSound(audio.teslaShoot.src);
                shot.target.takeDamage(shot.damage); 
            } else if (tower.type === "cannon") {
                bullets.push(new Bullet(shot.x, shot.y, shot.vx, shot.vy, shot.damage, tower.type));
                playSound(audio.cannonShoot.src);
            } else if (tower.type === "antiAir") {
                bullets.push(new Bullet(shot.x, shot.y, shot.vx, shot.vy, shot.damage, tower.type));
            }
        }
    });
}

function handleBulletHits() {
    bullets = bullets.filter(bullet => {
        for (let enemy of enemies) {
            // Simple collision check
            if (
                bullet.x > enemy.x - enemy.width / 2 &&
                bullet.x < enemy.x + enemy.width / 2 &&
                bullet.y > enemy.y - enemy.height / 2 &&
                bullet.y < enemy.y + enemy.height / 2
            ) {
                enemy.takeDamage(bullet.damage);
                return false; // Remove bullet
            }
        }
        return true;
    });
    // Remove dead enemies
    for (let i = enemies.length - 1; i >= 0; i--) {
        if (enemies[i].health <= 0) {
            playerMoney += enemies[i].money; 
            playSound(audio.enemyDeath.src);
            enemies.splice(i, 1);
        }
    }
}

function canPlaceTowerAt(tileX, tileY) {
    return towerLayer[tileY] && towerLayer[tileY][tileX] === 1;
}

function getTileFromMouse(x, y) {
    return {
        tileX: Math.floor(x / 64),
        tileY: Math.floor(y / 64)
    };
}

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // If a tower is selected, check if Sell or Upgrade button was clicked
    if (selectedTower) {
        const btnWidth = 80, btnHeight = 30;
        const sellX = selectedTower.x - btnWidth - 10;
        const upgradeX = selectedTower.x + 10;
        const btnY = selectedTower.y + 70;

        // Sell button
        if (
            mouseX >= sellX && mouseX <= sellX + btnWidth &&
            mouseY >= btnY && mouseY <= btnY + btnHeight
        ) {
        const idx = towers.indexOf(selectedTower);
        if (idx !== -1) {
            // Calculate the top-left tile of the tower
            const tileX = Math.floor((selectedTower.x - 64) / 64);
            const tileY = Math.floor((selectedTower.y - 64) / 64);
            // Set the 2x2 area back to 1
            towerLayer[tileY][tileX] = 1;
            towerLayer[tileY][tileX + 1] = 1;
            towerLayer[tileY + 1][tileX] = 1;
            towerLayer[tileY + 1][tileX + 1] = 1;
            playSound(audio.towerSell.src);
            playerMoney += getSellValue(selectedTower);
            towers.splice(idx, 1); // Remove from array
        }
        selectedTower = null;
        return;
        }

        // Upgrade button
        if (
            mouseX >= upgradeX && mouseX <= upgradeX + btnWidth &&
            mouseY >= btnY && mouseY <= btnY + btnHeight
        ) {
            const upgradeCost = getUpgradeCost(selectedTower);
            if (selectedTower.level < 3 && playerMoney >= upgradeCost) {
            playSound(audio.towerLevelUp.src);
            playerMoney -= upgradeCost;
            selectedTower.level++;
            selectedTower.damage *= 1.25;
            selectedTower.range *= 1.15;
            return;
            }
        }
    }

    // Check if a tower was clicked (for selection)
    let foundTower = null;
    for (let tower of towers) {
        if (
            mouseX >= tower.x - 64 && mouseX <= tower.x + 64 &&
            mouseY >= tower.y - 64 && mouseY <= tower.y + 64
        ) {
            foundTower = tower;
            break;
        }
    }
    if (foundTower) {
        selectedTower = foundTower;
        return; 
    } else {
        selectedTower = null;
    }

    // Place new tower 
    const { tileX, tileY } = getTileFromMouse(mouseX, mouseY);
    const cost = towerCosts[selectedTowerType];
    if (
        canPlaceTowerAt(tileX, tileY) &&
        canPlaceTowerAt(tileX + 1, tileY) &&
        canPlaceTowerAt(tileX, tileY + 1) &&
        canPlaceTowerAt(tileX + 1, tileY + 1) &&
        playerMoney >= cost
    ) {
        playSound(audio.towerBuy.src);
        playerMoney -= cost; 
        const towerX = tileX * 64 + 64;
        const towerY = tileY * 64 + 64;
        towers.push(new Tower(towerX, towerY, selectedTowerType));
        // Mark the 2x2 area with 2 = occupied
        towerLayer[tileY][tileX] = 2;
        towerLayer[tileY][tileX + 1] = 2;
        towerLayer[tileY + 1][tileX] = 2;
        towerLayer[tileY + 1][tileX + 1] = 2;
    }
});


function drawTowerUI() {
    if (!selectedTower) return;

    // Draw tower range
    ctx.save();
    ctx.globalAlpha = 0.2;
    ctx.beginPath();
    ctx.arc(selectedTower.x, selectedTower.y, selectedTower.range, 0, Math.PI * 2);
    ctx.fillStyle = "#00bfff";
    ctx.fill();
    ctx.globalAlpha = 1.0;
    ctx.restore();

    // Draw buttons below the tower
    const btnWidth = 80, btnHeight = 30;
    const sellX = selectedTower.x - btnWidth - 10;
    const upgradeX = selectedTower.x + 10;
    const btnY = selectedTower.y + 70;

    // Sell button
    ctx.fillStyle = "#d9534f";
    ctx.fillRect(sellX, btnY, btnWidth, btnHeight);
    ctx.fillStyle = "#fff";
    ctx.font = "16px Arial";
    ctx.fillText("Sell", sellX + 20, btnY + 20);
    const sellValue = getSellValue(selectedTower);
    ctx.font = "12px Arial";
    ctx.fillText("$" + sellValue, sellX + 30, btnY + 45);

    // Upgrade button
    ctx.fillStyle = "#5bc0de";
    ctx.fillRect(upgradeX, btnY, btnWidth, btnHeight);
    ctx.fillStyle = "#fff";
    ctx.fillText("Upgrade", upgradeX + 10, btnY + 20);
    const upgradeCost = getUpgradeCost(selectedTower);
    ctx.fillText("Upgrade", upgradeX + 10, btnY + 20);
    ctx.font = "12px Arial";
    ctx.fillText("$" + upgradeCost, upgradeX + 30, btnY + 45);

    // Tower info
    ctx.fillStyle = "#fff";
    ctx.font = "14px Arial";
    ctx.fillText("Lv." + selectedTower.level, selectedTower.x - 10, selectedTower.y + 60);
}

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const { tileX, tileY } = getTileFromMouse(mouseX, mouseY);
    hoverTile = { tileX, tileY };
});

let lastTimestamp = performance.now();

function gameLoop(timestamp = performance.now()) {
    const deltaTime = (timestamp - lastTimestamp) / 16.6667; // Normalize to 60 FPS "ticks"
    lastTimestamp = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (mapImage.complete && mapImage.naturalWidth !== 0) {
        ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);
    }

    drawTowerHover();

    drawTowers(deltaTime);
    drawTowerUI();
    drawEnemies(deltaTime);
    shootBullets();
    drawLasers(deltaTime); 
    drawBullets(deltaTime);
    handleBulletHits();

    drawHUD();

    if (playerHealth <= 0) {
        showGameOver();
        stopAllAudio();
        music.gameOver.currentTime = 0; 
        music.gameOver.play();
        return; // Stops the game loop
    }
    // Wave spawning
    if (waveInProgress && enemiesToSpawn.length > 0) {
        for (let w of enemiesToSpawn) {
            w.timer+= deltaTime;
            if (w.spawned < w.count && w.timer >= w.interval) {
                enemies.push(new Enemy(-120, -120, w.type, waypoints));
                w.spawned++;
                w.timer = 0;
            }
        }
        // Remove finished spawners
        enemiesToSpawn = enemiesToSpawn.filter(w => w.spawned < w.count);
    }
    if (waveInProgress && enemiesToSpawn.length === 0 && enemies.length === 0) {
        waveInProgress = false;
        currentWave++;
        if (currentWave >= waveData.length) {
            showGameWin();
            stopAllAudio();
            music.win.currentTime = 0;
            music.win.play();
            return; // Stop the game loop
        }
    waveDelayCounter = waveDelay;
}

    // Starts next wave 
    if (!waveInProgress && waveDelayCounter > 0) {
        waveDelayCounter -= deltaTime;
        if (waveDelayCounter <= 0 && currentWave < waveData.length) {
            waveDelayCounter = 0;
            startWave();
        }
    }
    requestAnimationFrame(gameLoop);
}

mapImage.onload = () => {
    console.log("Map loaded successfully");
}


