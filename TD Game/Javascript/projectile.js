class projectile {
    constructor(x, y, angle, speed) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = speed;
        this.gravity = 9.8; // Gravity constant
        this.time = 0; // Time since launch
    }

    update() {
        this.time += 0.1; // Increment time
        this.x += this.speed * Math.cos(this.angle) * this.time; // Update x position
        this.y += (this.speed * Math.sin(this.angle) - 0.5 * this.gravity * Math.pow(this.time, 2)); // Update y position
    }
}