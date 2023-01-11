

export default class Taarget {
    
    constructor(x_axis, y_axis, color, health) {
      this.x = x_axis    ;
      this.y = y_axis;
      this.color = color;
      this.health = health;
      this.width = 20;
      this.height = 20;
    }

    draw(ctx) {
      ctx.fillStyle = this.color;
      if (this.health > 1) {
        ctx.strokeStyle = "white";
      } else {
        ctx.strokeStyle = this.color;
      }
      
      ctx.fillRect(this.x, this.y, this.width, this.height);
  
      //Draw Text
      ctx.fillStyle = "White";
      ctx.font = "10px Arial";
      ctx.fillText(
        this.health,
        this.x + this.width / 3.5,
        this.y + this.height / 1.5
      );
    }

    takeDamage(damage) {
      this.health -= damage;
      console.log(this.health)
    }
  }

