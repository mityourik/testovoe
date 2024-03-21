import { Ball } from "../models/Ball";

export const resolveCollisions = (balls: Ball[]) => {
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        const ball1 = balls[i];
        const ball2 = balls[j];
  
        const dx = ball2.x - ball1.x;
        const dy = ball2.y - ball1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < ball1.radius + ball2.radius) {
          const nx = dx / distance;
          const ny = dy / distance;
  
          const dvx = ball2.vx - ball1.vx;
          const dvy = ball2.vy - ball1.vy;
  
          const dotProduct = dvx * nx + dvy * ny;
  
          if (dotProduct > 0) return;
  
          const j = -(1 + 1) * dotProduct / (1 / ball1.mass + 1 / ball2.mass);
  
          ball1.vx -= j / ball1.mass * nx;
          ball1.vy -= j / ball1.mass * ny;
          ball2.vx += j / ball2.mass * nx;
          ball2.vy += j / ball2.mass * ny;
  
          const overlap = 0.5 * (ball1.radius + ball2.radius - distance + 0.01);
          ball1.x -= overlap * nx;
          ball1.y -= overlap * ny;
          ball2.x += overlap * nx;
          ball2.y += overlap * ny;
        }
      }
    }
  }