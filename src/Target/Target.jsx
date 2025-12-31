import duckImg from '../assets/hd_duck.png';

export default class Target {

  constructor(x, y, color, health) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.health = health;
    const scale = 0.06;
    this.width = 438 * scale;
    this.height = 569 * scale;
    this.image = new Image();
    this.image.src = duckImg; // Replace with the actual path to your image
    this.image.onload = () => {
      this.imageLoaded = true;
    };
    
    // Movement properties
    this.dx = (Math.random() * 0.5 + 0.2) * (Math.random() < 0.5 ? 1 : -1); 
  }

  update(logicalWidth) {
    this.x += this.dx;

    // Bounce off walls
    if (this.x <= 0 || this.x + this.width >= logicalWidth) {
      this.dx *= -1;
    }
  }

  draw(ctx) {
    // Draw the image 
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.restore();

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