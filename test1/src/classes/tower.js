function isInsideCanvas(x, y) {
    return x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height;
}

const antiAirImages = {
    0: new Image(),
    45: new Image(),
    90: new Image(),
    135: new Image(),
    180: new Image(),
    225: new Image(),
    270: new Image(),
    315: new Image()
};

antiAirImages[0].src = './assets/turret/antiAir/0.png';
antiAirImages[45].src = './assets/turret/antiAir/45.png';
antiAirImages[90].src = './assets/turret/antiAir/90.png';
antiAirImages[135].src = './assets/turret/antiAir/135.png';
antiAirImages[180].src = './assets/turret/antiAir/180.png';
antiAirImages[225].src = './assets/turret/antiAir/225.png';
antiAirImages[270].src = './assets/turret/antiAir/270.png';
antiAirImages[315].src = './assets/turret/antiAir/315.png';

const cannonImages = {
    0: new Image(),
    45: new Image(),
    90: new Image(),    
    135: new Image(),
    180: new Image(),
    225: new Image(),
    270: new Image(),
    315: new Image()
};

cannonImages[0].src = './assets/turret/cannon/0.png';
cannonImages[45].src = './assets/turret/cannon/45.png';
cannonImages[90].src = './assets/turret/cannon/90.png';  
cannonImages[135].src = './assets/turret/cannon/135.png';
cannonImages[180].src = './assets/turret/cannon/180.png';
cannonImages[225].src = './assets/turret/cannon/225.png';
cannonImages[270].src = './assets/turret/cannon/270.png';
cannonImages[315].src = './assets/turret/cannon/315.png';

function getClosestCannonImage(angle) {
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];
  angle = ((angle % 360) + 360) % 360;
  let closest = angles.reduce((prev, curr) =>
    Math.abs(curr - angle) < Math.abs(prev - angle) ? curr : prev
  );
  return cannonImages[closest];
}

function getClosestAntiAirImage(angle) {
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];
  angle = ((angle % 360) + 360) % 360;
  let closest = angles.reduce((prev, curr) =>
    Math.abs(curr - angle) < Math.abs(prev - angle) ? curr : prev
  );
  return antiAirImages[closest];
}

export class Tower {
    static images = {
        tesla: (() => {
            const img = new Image();
            img.src = "./assets/turret/teslaTower.png";
            return img;
        })(),
        // cannon: (() => {
        //    const img = new Image();
        //    img.src = "./assets/turret/cannonTower.png";
        //    return img;
        //})(),
    };
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.cooldown = 0;
        this.level = 1;

        if (type == "tesla") {
            this.damage = 25;
            this.fireRate = 37.5; 
            this.range = 270;
        } else if (type == "cannon") {
            this.damage = 100;
            this.fireRate = 150;
            this.range = 230; 
        } else if (type == "antiAir") {
            this.damage = 100;
            this.fireRate = 75;
            this.range = 400; 
        } else {
            this.damage = 15;
            this.fireRate = 30;
            this.range = 150;
        }
    }
    canShoot() {
        return this.cooldown <= 0;
    }
    shoot(enemies) {
        if (
            !this.target ||
            this.target.health <= 0 ||
            !isInsideCanvas(this.target.x, this.target.y) ||
            Math.hypot(this.target.x - this.x, this.target.y - this.y) > this.range
        ) {
            let closest = null;
            let minDist = Infinity;
            for (let enemy of enemies) {
                if (this.type === "antiAir" && !enemy.isFlying) continue;
                if (this.type !== "antiAir" && enemy.isFlying) continue;
                if (!isInsideCanvas(enemy.x, enemy.y)) continue;
                const dx = enemy.x - this.x;
                const dy = enemy.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist <= this.range && dist < minDist) {
                    minDist = dist;
                    closest = enemy;
                }
            }
            this.target = closest;
        }

        if (!this.target) return null;

        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > this.range) {
            this.target = null;
            return null;
        }

        if (this.cooldown > 0) return null;

        if (this.type === "tesla") {
            this.cooldown = this.fireRate || 40;
            return { x: this.x, y: this.y, damage: this.damage, target: this.target };
        } else {
            const speed = 5;
            const vx = (dx / dist) * speed;
            const vy = (dy / dist) * speed;
            this.cooldown = this.fireRate || 10;
            return { x: this.x, y: this.y, vx, vy, damage: this.damage };
        }
    }

    update(deltaTime) {
        if (this.cooldown > 0) this.cooldown -= deltaTime;

        if (this.type === "cannon" && this.target) {
            const dx = this.target.x - this.x;
            const dy = this.target.y - this.y;
            this.angle = (Math.atan2(this.target.y - this.y, this.target.x - this.x) * 180 / Math.PI + 90 + 360) % 360;
        }
        if (this.type === "antiAir" && this.target) {
            const dx = this.target.x - this.x;
            const dy = this.target.y - this.y;
            this.angle = (Math.atan2(this.target.y - this.y, this.target.x - this.x) * 180 / Math.PI + 90 + 360) % 360;
        }
    }
    draw(ctx) {
    const size = 128;
    let offsetY = 0;

    if (this.type === "tesla") {
        offsetY = -32; 
    }
    else if (this.type === "cannon") {
        offsetY = -32; 
    } else if (this.type === "antiAir") {
        offsetY = -16; 
    }

    let img;
    if (this.type === "cannon") {
        img = getClosestCannonImage(this.angle); 
    } else if (this.type === "antiAir") {
        img = getClosestAntiAirImage(this.angle);
    } else {
        img = Tower.images[this.type];
    }

    if (img && img.complete && img.naturalWidth !== 0) {
        ctx.drawImage(img, this.x - size / 2, this.y - size / 2 + offsetY, size, size);
    } else {
        if (this.type === "tesla") ctx.fillStyle = 'cyan';
        else if (this.type === "cannon") ctx.fillStyle = 'gray';
        else if (this.type === "antiAir") ctx.fillStyle = 'orange';
        else ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x, this.y + offsetY, size / 2, 0, Math.PI * 2);
        ctx.fill();
    }
 }
}

export { getClosestCannonImage };
export { getClosestAntiAirImage };