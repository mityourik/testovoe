export class Ball {
  public mass: number;

  constructor(public x: number, public y: number, public radius: number, public vx: number, public vy: number, public color: string) {
    this.mass = this.radius ** 3;
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
  
    context.shadowColor = 'rgba(0, 0, 0, 0.5)';
    context.shadowBlur = 15;
    context.shadowOffsetX = 4;
    context.shadowOffsetY = 4;
  
    context.fill();
    context.closePath();
  
    context.shadowColor = 'transparent';
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
  }

  update(canvas: HTMLCanvasElement) {
    const wallEnergyLossFactor = 0.9;
    const friction = 0.995;
  
    if (this.x + this.radius > canvas.width) {
      this.vx = -this.vx * wallEnergyLossFactor;
      this.x = canvas.width - this.radius;
    } else if (this.x - this.radius < 0) {
      this.vx = -this.vx * wallEnergyLossFactor;
      this.x = this.radius;
    }
  
    if (this.y + this.radius > canvas.height) {
      this.vy = -this.vy * wallEnergyLossFactor;
      this.y = canvas.height - this.radius;
    } else if (this.y - this.radius < 0) {
      this.vy = -this.vy * wallEnergyLossFactor;
      this.y = this.radius;
    }

    this.x += this.vx;
    this.y += this.vy;
  
    this.vx *= friction;
    this.vy *= friction;
  }
}
