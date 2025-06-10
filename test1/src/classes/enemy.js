import { waypoints } from "../waypoints.js";

const enemySprites = {
    normal: new Image(),
    flying: new Image(),
    boss: new Image()
};
enemySprites.normal.src = '../../assets/enemy/normalEnemy.png';
enemySprites.flying.src = '../../assets/enemy/flyingEnemy.png';
enemySprites.boss.src = '../../assets/enemy/bossEnemy.png';

export class Enemy {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.frame = 0;
        this.frameTimer = 0;
        this.frameInterval = 10;
        this.waypointIndex = 0; // Start at the first waypoint

        if (type == "normal"){
            this.sprite = enemySprites.normal;
            this.width = 128;
            this.frameW = 128;
            this.height = 128;
            this.frameH = 128;
            this.speed = 1;
            this.health = 200;
            this.maxHealth = 200;
            this.money = 1;
            this.isFlying = false;
            this.frameCount = 11;
        } else if (type == "flying"){
            this.sprite = enemySprites.flying;
            this.width = 128;
            this.frameW = 128; 
            this.height = 128;
            this.frameH = 128;
            this.speed = 1;
            this.health = 200;
            this.maxHealth = 200;
            this.money = 5;
            this.isFlying = true;
            this.frameCount = 11;
        } else if (type == "boss") {
            this.sprite = enemySprites.boss; 
            this.width = 160;
            this.frameW = 192;
            this.height = 160;
            this.frameH = 192;
            this.speed = 0.5;
            this.health = 15000;
            this.maxHealth = 15000;
            this.money = 50;
            this.isFlying = false;
            this.frameCount = 7;
        } 
    }
    update(deltatime) {
        if (this.waypointIndex >= waypoints.length) return;

        const target = waypoints[this.waypointIndex];
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const moveSpeed = this.speed * deltatime;

        if (dist < this.speed) {
            // Snap to waypoint and go to next
            this.x = target.x;
            this.y = target.y;
            this.waypointIndex++;
        } else {
            this.x += (dx / dist) * this.speed;
            this.y += (dy / dist) * this.speed;
        }
        this.frameTimer += deltatime;
        if (this.frameTimer >= this.frameInterval) {
            this.frameTimer = 0;
            this.frame = (this.frame + 1) % this.frameCount;
        }
    }
    takeDamage(amount) {
        this.health -= amount;
    }
    draw(ctx) {
    const img = enemySprites[this.type];
        if (img && img.complete && img.naturalWidth !== 0) {
            ctx.drawImage(
                img,
                this.frame * this.frameW, 0, this.frameW, this.frameH,
                this.x - this.width / 2, this.y - this.height / 2, this.width, this.height
            );
        } else {
            ctx.fillStyle = this.isFlying ? "blue" : "red";
            ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        }

        // Health bar
    const barWidth = this.width * 0.8;
    const barHeight = 10;
    const barX = this.x - barWidth / 2;
    const barY = this.y - this.height / 2 - 16; 

    // Background
    ctx.fillStyle = "#222";
    ctx.fillRect(barX, barY, barWidth, barHeight);

    // Health (dynamic color based on health)
    const healthRatio = Math.max(this.health / (this.maxHealth || this.health), 0);
    ctx.fillStyle = healthRatio > 0.5 ? "#4caf50" : (healthRatio > 0.2 ? "#ffc107" : "#f44336");
    ctx.fillRect(barX, barY, barWidth * healthRatio, barHeight);

    // Border
    ctx.strokeStyle = "#000";
    ctx.strokeRect(barX, barY, barWidth, barHeight);
    }
}