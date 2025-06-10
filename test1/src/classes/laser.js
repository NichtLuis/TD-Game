export class Laser {
    constructor(x1, y1, x2, y2, damage, type = "tesla", duration = 5) {
        this.x1 = x1; // Tower y-position
        this.y1 = y1; // Tower y-position
        this.x2 = x2; // Enemy x-position
        this.y2 = y2; // Enemy y-position
        this.damage = damage;
        this.type = type;
        this.timer = duration;
    }

    update(deltaTime) {
        this.timer -= deltaTime;
    }

    draw(ctx, lightningImg = null) {
        if (this.type === "tesla" && lightningImg && lightningImg.complete && lightningImg.naturalWidth !== 0) {
            // Draw lightning 
            const dx = this.x2 - this.x1;
            const dy = this.y2 - this.y1;
            const angle = Math.atan2(dy, dx);
            const length = Math.sqrt(dx * dx + dy * dy);

            ctx.save();
            ctx.translate(this.x1, this.y1);
            ctx.rotate(angle);
            ctx.globalAlpha = 0.8;
            ctx.drawImage(lightningImg, 0, -lightningImg.height / 2, length, lightningImg.height);
            ctx.restore();
        } else {
            // If no image, then draw a colored line
            ctx.save();
            ctx.strokeStyle = this.type === "tesla" ? "#00ffff" : "#ff0000";
            ctx.lineWidth = this.type === "tesla" ? 4 : 2;
            ctx.globalAlpha = 0.7;
            ctx.beginPath();
            ctx.moveTo(this.x1, this.y1);
            ctx.lineTo(this.x2, this.y2);
            ctx.stroke();
            ctx.restore();
        }
    }

    isAlive() {
        return this.timer > 0;
    }
}