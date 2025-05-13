class tower {
  constructor(x, y, damage, fireRate, range, hitflying, image, sound) {
    this.x = x;
    this.y = y;
    this.damage = damage;
    this.fireRate = fireRate;
    this.range = range;
    this.hitflying = hitflying;
    this.sound = sound;
    this.lastShotTime = 0;

    if (image) {
      this.image = new Image();
      this.image.src = image;
    } else {
      this.image = null; // If no image is provided, set it to null
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.range, 0, Math.PI * 2);
    ctx.fillStyle = argb(0, 150, 255, 0.5); // Semi-transparent red for range
    ctx.fill();
    ctx.closePath();
  }

  shoot(target) {
    if (this.canShoot(target)) {
      this.lastShotTime = Date.now();
      this.projectile = new projectile(this.x, this.y, target.x, target.y);
      this.projectile.update();
      this.projectile.draw(ctx);
      if (this.sound) {
        const audio = new Audio(this.sound);
        audio.play();
      }
    }
  }
}

class tower_normal extends tower {
  constructor(x, y) {
    super(x, y, 20, 10, 1000, 100, false);
  }

  canShoot(target) {
    return (
      Date.now() - this.lastShotTime >= this.fireRate && this.isInRange(target)
    );
  }

  isInRange(target) {
    const distance = Math.sqrt(
      Math.pow(this.x - target.x, 2) + Math.pow(this.y - target.y, 2)
    );
    return distance <= this.range;
  }
}

class tower_cannon extends tower {
  constructor(x, y) {
    super(x, y, 20, 20, 2000, 150, true);
  }

  canShoot(target) {
    return (
      Date.now() - this.lastShotTime >= this.fireRate && this.isInRange(target)
    );
  }

  isInRange(target) {
    const distance = Math.sqrt(
      Math.pow(this.x - target.x, 2) + Math.pow(this.y - target.y, 2)
    );
    return distance <= this.range;
  }
}

class tower_smg extends tower {
  constructor(x, y) {
    super(x, y, 20, 5, 500, 50, false);
  }

  canShoot(target) {
    return (
      Date.now() - this.lastShotTime >= this.fireRate && this.isInRange(target)
    );
  }

  isInRange(target) {
    const distance = Math.sqrt(
      Math.pow(this.x - target.x, 2) + Math.pow(this.y - target.y, 2)
    );
    return distance <= this.range;
  }
}
