class tower {
    constructor(x, y, radius, damage, fireRate, range, hitflying) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.damage = damage;
        this.fireRate = fireRate;
        this.range = range;
        this.hitflying = hitflying;
        this.lastShotTime = 0;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();
    }

    shoot(target) {
        if (this.canShoot(target)) {
            target.takeDamage(this.damage);
            this.lastShotTime = Date.now();
        }
    }
}