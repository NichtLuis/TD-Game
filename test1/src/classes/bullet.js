const bulletImages = {
    antiAir: new Image()
};
bulletImages.antiAir.src = './assets/bullet/antiAirBullet.png';

export class Bullet {
    constructor(x, y, vx, vy, damage, type) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.damage = damage;
        this.type = type;
        if (type === "cannon") {
            this.radius = 14;
            this.speed = 2;
        } else if (type === "antiAir") {
            this.image = bulletImages.antiAir;
            this.radius = 32; 
            this.speed = 3;
        }
    }
    update(deltaTime) {
        this.x += (this.vx * this.speed) * deltaTime;
        this.y += (this.vy * this.speed) * deltaTime;
    }
    draw(ctx) {
    const img = bulletImages[this.type];
    if ( // Anti-air tower bullets are drawn with rotation
        this.type === "antiAir" &&
        img && img.complete && img.naturalWidth !== 0
    ) {
        const angle = Math.atan2(this.vy, this.vx);
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(angle);
        ctx.drawImage(
            img,
            -this.radius, -this.radius,
            this.radius * 2, this.radius * 2
        );
        ctx.restore();
    } else if (img && img.complete && img.naturalWidth !== 0) {
        ctx.drawImage(
            img,
            this.x - this.radius,
            this.y - this.radius,
            this.radius * 2,
            this.radius * 2
        );
    } else {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}
}