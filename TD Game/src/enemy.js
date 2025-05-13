export class Enemy {
  constructor(
    x,
    y,
    speed,
    money,
    health,
    damage,
    flying,
    width,
    height,
    image
  ) {
    this.x = x;
    this.y = y;
    this.health = health; // Health of the enemy
    this.speed = speed;
    this.damage = damage; // Damage dealt by the enemy
    this.money = money;
    this.flying = flying;
    this.width = width;
    this.height = height;

    if (image) {
      this.image = new Image();
      this.image.src = image;
    } else {
      this.image = null; // If no image is provided, set it to null
    }
  }

  //draw(ctx) {
  //ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  //}

  //move() {
  // this.x -= this.speed; // Move left
}
