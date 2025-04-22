class enemy {
    constructor(x, y, speed, money, health, damage, flying) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.money = money;
        this.health = health; // Health of the enemy
        this.damage = damage; // Damage dealt by the enemy   
        this.flying = flying;
        this.width = 64;
        this.height = 64;
        this.image = new Image();
        this.image.src = "enemy.png"; // Path to enemy image
    }

    //draw(ctx) {
        //ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    //}

    //move() {
       // this.x -= this.speed; // Move left
      // }
    }