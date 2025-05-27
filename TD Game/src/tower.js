class tower {
  constructor(
    x,
    y,
    damage,
    fireRate,
    range,
    hitflying,
    image,
    imageR,
    sound,
    placeId
  ) {
    this.x = x;
    this.y = y;
    this.damage = damage;
    this.fireRate = fireRate;
    this.range = range;
    this.hitflying = hitflying;
    this.sound = sound;
    this.lastShotTime = 0;
    this.placeId = placeId;
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
    super(x, y, 20, 10, 1000, false);
    this.placeId = 2; // Unique ID for this tower type
    this.image = new Image();
    this.imageR = new Image(); // imageR = rotating image --> for example a guy that rotates his gun
    this.image.src = "images/images-enemy/BigGuyWalkAnimatin.png";
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

export { tower_normal, tower_cannon, tower_smg };
