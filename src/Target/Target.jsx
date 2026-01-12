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
    this.dy = (Math.random() * 0.5 + 0.2) * (Math.random() < 0.5 ? 1 : -1);
  }

  update(logicalWidth, logicalHeight) {
    this.x += this.dx;
    this.y += this.dy;

    // Bounce off walls (Horizontal)
    if (this.x <= 0 || this.x + this.width >= logicalWidth) {
      this.dx *= -1;
    }

    // Bounce off walls (Vertical)
    if (this.y <= 0 || (this.y + this.height >= logicalHeight && this.dy > 0)) {
        this.dy *= -1;
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
    ctx.save();
    ctx.font = "bold 10px Arial"; // Reduced from 12px
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    
    // Center text
    const textX = this.x + this.width / 2;
    const textY = this.y + this.height - 5; 

    ctx.textAlign = "center";
    ctx.strokeText(this.health, textX, textY);
    ctx.fillText(this.health, textX, textY);
    ctx.restore();
  }

  takeDamage(damage) {
    this.health -= damage;
  }
}