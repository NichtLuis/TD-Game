export{enemy_normal,enemy_speedey,enemy_flying,enemy_tank,enemy_miniboss,enemy_boss}
 class Enemy {
    constructor(x, y, health,speed, damage, coins, money, flying, width, height, image) {
        this.x = x;
        this.y = y;
        this.health = health; // Health of the enemy
        this.speed = speed;
        this.damage = damage; // Damage dealt by the enemy   
        this.coins = coins;
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
      // }
    }
    
    class enemy_normal extends Enemy{
        constructor(x,y){
            super(x, y, 6, 1, 1, 5, 0, false )

        }
    }
    class enemy_speedey extends Enemy{
        constructor(x,y,width,height){
            super(x, y, 3, 2, 3, 6, 0, false, width, height)
        }
    }
    class enemy_flying extends Enemy{
        constructor(x,y){
            super(x, y, 6, 0.75, 3, 8, 1, true, 0, 0)
        }
    }
    class enemy_tank extends Enemy{
        constructor(x,y){
            super(x, y, 10, 0.5, 5, 10, 0, false, 0, 0)
        }
    }
    class enemy_miniboss extends Enemy{
        constructor(x,y){
            super(x, y, 50, 0.5, 100, 0, 10, false, 0, 0)
        }
    }
    class enemy_boss extends Enemy{
        constructor(x,y){
            super(x, y, 100, 0.5, 200, 0, 0, false, 0, 0)
        }
    }