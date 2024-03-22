import { useCallback, useEffect, useRef, useState } from 'react';

import { Ball } from '../models/Ball';
import { resolveCollisions } from '../physics/resolveCollisions';

export function useCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const balls = useRef<Ball[]>([
        new Ball(50, 60, 10, 0, 0, 'red'),
        new Ball(150, 160, 20, 0, 0, 'blue'),
        new Ball(100, 120, 15, 0, 0, 'green'),
        new Ball(200, 250, 40, 0, 0, 'gray'),
    ]);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [contextMenu, setContextMenu] = useState<{
      x: number;
      y: number;
      visible: boolean
    }>({ x: 0, y: 0, visible: false });
    const [activeBall, setActiveBall] = useState<Ball | null>(null);

    const handleMouseDown = useCallback(() => setIsMouseDown(true), []);
    const handleMouseUp = useCallback(() => setIsMouseDown(false), []);

    const handleBallClick = useCallback((event: MouseEvent) => {
        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const clickedBall = balls.current.find(ball => {
            const distance = Math.sqrt((ball.x - mouseX) ** 2 + (ball.y - mouseY) ** 2);
            return distance < ball.radius;
        });

        if (clickedBall) {
            setActiveBall(clickedBall);
            setContextMenu({
                x: event.clientX,
                y: event.clientY,
                visible: true,
            });
        }
    }, []);

    const pushBallOnHover = useCallback((event: MouseEvent) => {
        if (!isMouseDown || !canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        balls.current.forEach(ball => {
            const dx = ball.x - mouseX;
            const dy = ball.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < ball.radius) {
                const angle = Math.atan2(dy, dx);
                ball.vx = Math.cos(angle) * 5;
                ball.vy = Math.sin(angle) * 5;
            }
        });
    }, [isMouseDown]);

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;

        const animate = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            resolveCollisions(balls.current);
            balls.current.forEach(ball => {
                ball.update(canvas);
                ball.draw(context);
            });
            requestAnimationFrame(animate);
        };

        canvas.addEventListener('mousemove', pushBallOnHover);
        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('click', handleBallClick);

        requestAnimationFrame(animate);

        return () => {
            canvas.removeEventListener('mousemove', pushBallOnHover);
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('click', handleBallClick);
        };
    }, [canvasRef, handleBallClick, handleMouseDown, handleMouseUp, isMouseDown, pushBallOnHover]);

    const changeBallColor = (color: string) => {
        if (activeBall) {
            activeBall.color = color;
            setContextMenu({ ...contextMenu, visible: false });
        }
    };

    return { canvasRef, contextMenu, changeBallColor };
}