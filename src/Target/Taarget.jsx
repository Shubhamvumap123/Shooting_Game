import images from './target.png';

export default class Taarget {
    
  constructor(x_axis, y_axis, color, health) {
    this.x = x_axis;
    this.y = y_axis;
    this.color = color;
    this.health = health;
    this.width = 30;
    this.height = 40;
    this.image = new Image();

    this.image.src = images; // Replace with the actual path to your image
    this.image.onload = () => {
      this.imageLoaded = true;
    };
  }

  draw(ctx) {
    // Draw the image 
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

    // Draw the border
    ctx.strokeStyle = "transparent";
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    // Draw the health text
   ctx.fillStyle = "black"; // Set the text color to a very dark color
  ctx.font = "bold 8px Arial"
    ctx.fillText(
      this.health,
      this.x + this.width / 2.5,
      this.y + this.height / 1.3
    );
  }

  takeDamage(damage) {
    this.health -= damage;
    console.log(this.health);
  }
}