export class Tower {
    static images = {
        tesla: (() => {
            const img = new Image();
            img.src = "../../assets/turret/teslaTower.png";
            return img;
        })(),
        cannon: (() => {
            const img = new Image();
            img.src = "../../assets/turret/cannonTower.png";
            return img;
        })(),
    };
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.cooldown = 0;
        this.level = 1;

        if (type == "tesla") {
            this.damage = 5;
            this.fireRate = 10; 
            this.range = 200;
        } else if (type == "cannon") {
            this.damage = 100;
            this.fireRate = 150;
            this.range = 300; 
        } else if (type == "antiAir") {
            this.damage = 35;
            this.fireRate = 50;
            this.range = 250; 
        } else {
            this.damage = 15;
            this.fireRate = 30;
            this.range = 150;
        }
    }
    canShoot() {
        return this.cooldown <= 0;
    }
    shoot(enemy) {
        // Anti-air only shoots flying, others only shoot ground
        if (this.cooldown > 0) return null;
        if (this.type === "antiAir" && !enemy.isFlying) return null;
        if (this.type !== "antiAir" && enemy.isFlying) return null;

        const dx = enemy.x - this.x;
        const dy = enemy.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.range) {
            const speed = 5;
            const vx = (dx / dist) * speed;
            const vy = (dy / dist) * speed;
            this.cooldown = this.fireRate;
            return { x: this.x, y: this.y, vx, vy, damage: this.damage };
        }
        return null;
    }

    update() {
        if (this.cooldown > 0) this.cooldown--;
    }
    draw(ctx) {
    const img = Tower.images[this.type];
    const size = 128;
    let offsetY = 0;
    if (this.type === "tesla") {
        offsetY = -32; 
    }
    if (img && img.complete && img.naturalWidth !== 0) {
        ctx.drawImage(img, this.x - size / 2, this.y - size / 2 + offsetY, size, size);
    } else {
        // If no image, then draw a colored circle
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