class tower {
  // Add static LEVELS for all towers
  static LEVELS = [
    { damage: 2, fireRate: 2, range: 300, color: "gray", upgradeCost: 15 },
    { damage: 3, fireRate: 2, range: 320, color: "blue", upgradeCost: 30 },
    { damage: 4, fireRate: 2, range: 340, color: "purple", upgradeCost: 60 },
    { damage: 6, fireRate: 1.5, range: 360, color: "gold", upgradeCost: null }
  ];

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
    this.level = 1; // Start at level 1
  }

  getGlowColor() {
    return tower.LEVELS[this.level - 1].color;
  }

  canUpgrade() {
    return this.level < tower.LEVELS.length;
  }

  getUpgradeCost() {
    if (this.canUpgrade()) {
      return tower.LEVELS[this.level].upgradeCost;
    }
    return null;
  }

  levelUp() {
    if (this.canUpgrade()) {
      this.level++;
      const stats = tower.LEVELS[this.level - 1];
      this.damage = stats.damage;
      this.fireRate = stats.fireRate;
      this.range = stats.range;
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
// Reichweiten Final von Spiel Design festgelegt
class tower_normal extends tower {
  static LEVELS = [
    { damage: 2, fireRate: 2, range: 300, color: "gray", upgradeCost: 15 },
    { damage: 3, fireRate: 2, range: 320, color: "blue", upgradeCost: 30 },
    { damage: 4, fireRate: 2, range: 340, color: "purple", upgradeCost: 60 },
    { damage: 6, fireRate: 1.5, range: 360, color: "gold", upgradeCost: null }
  ];
  constructor(x, y) {
    super(x, y, 2, 2, 300, true);
    this.placeId = 2; // Unique ID for this tower type
    this.image = new Image();
    this.imageR = new Image(); // imageR = rotating image --> for example a guy that rotates his gun
    this.image.src = "images/towerAnim/tesla/turm1.5.png";
    this.level = 1;
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

  getGlowColor() {
    return tower_normal.LEVELS[this.level - 1].color;
  }

  canUpgrade() {
    return this.level < tower_normal.LEVELS.length;
  }

  getUpgradeCost() {
    if (this.canUpgrade()) {
      return tower_normal.LEVELS[this.level].upgradeCost;
    }
    return null;
  }

  levelUp() {
    if (this.canUpgrade()) {
      this.level++;
      const stats = tower_normal.LEVELS[this.level - 1];
      this.damage = stats.damage;
      this.fireRate = stats.fireRate;
      this.range = stats.range;
    }
  }
}

class tower_cannon extends tower {
  static LEVELS = [
    { damage: 4, fireRate: 0.5, range: 220, color: "gray", upgradeCost: 20 },
    { damage: 6, fireRate: 0.6, range: 240, color: "blue", upgradeCost: 40 },
    { damage: 8, fireRate: 0.7, range: 260, color: "purple", upgradeCost: 80 },
    { damage: 12, fireRate: 0.8, range: 280, color: "gold", upgradeCost: null }
  ];
  constructor(x, y) {
    super(x, y, 4, 0.5, 220, false);
    this.placeId = 3; // Unique ID for this tower type
    this.image = new Image();
    this.imageR = new Image(); // imageR = rotating image --> for example a guy that rotates his gun
    this.image.src = "images/towerAnim/cannon/turm_vorne-removebg-preview.png";
    this.level = 1;
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

  getGlowColor() {
    return tower_cannon.LEVELS[this.level - 1].color;
  }

  canUpgrade() {
    return this.level < tower_cannon.LEVELS.length;
  }

  getUpgradeCost() {
    if (this.canUpgrade()) {
      return tower_cannon.LEVELS[this.level].upgradeCost;
    }
    return null;
  }

  levelUp() {
    if (this.canUpgrade()) {
      this.level++;
      const stats = tower_cannon.LEVELS[this.level - 1];
      this.damage = stats.damage;
      this.fireRate = stats.fireRate;
      this.range = stats.range;
    }
  }
}

class tower_smg extends tower {
  static LEVELS = [
    { damage: 1, fireRate: 4, range: 400, color: "gray", upgradeCost: 20 },
    { damage: 2, fireRate: 4.5, range: 420, color: "blue", upgradeCost: 40 },
    { damage: 3, fireRate: 5, range: 440, color: "purple", upgradeCost: 80 },
    { damage: 5, fireRate: 6, range: 480, color: "gold", upgradeCost: null }
  ];
  constructor(x, y) {
    super(x, y, 1, 4, 400, 50, true);
    this.placeId = 4; // Unique ID for this tower type
    this.image = new Image();
    this.imageR = new Image(); // imageR = rotating image --> for example a guy that rotates his gun
    this.image.src = "images/towerAnim/smg/tower2.png";
    this.level = 1;
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

  getGlowColor() {
    return tower_smg.LEVELS[this.level - 1].color;
  }

  canUpgrade() {
    return this.level < tower_smg.LEVELS.length;
  }

  getUpgradeCost() {
    if (this.canUpgrade()) {
      return tower_smg.LEVELS[this.level].upgradeCost;
    }
    return null;
  }

  levelUp() {
    if (this.canUpgrade()) {
      this.level++;
      const stats = tower_smg.LEVELS[this.level - 1];
      this.damage = stats.damage;
      this.fireRate = stats.fireRate;
      this.range = stats.range;
    }
  }
}

export { tower_normal, tower_cannon, tower_smg };
