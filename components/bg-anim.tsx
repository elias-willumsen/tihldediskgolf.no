"use client";
import React, { useEffect, useRef } from "react";

export type AnimatedBackgroundProps = {
  particleCount?: number;
  colorPalette?: string[];
  enableMouseRepel?: boolean;
  zIndex?: number;
  opacity?: number;
  className?: string;
};

export default function AnimatedBackground({
  particleCount,
  colorPalette = ["#60a5fa", "#c084fc", "#f472b6", "#34d399"],
  enableMouseRepel = true,
  zIndex = -1,
  opacity = 0.9,
  className = "",
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const isReducedMotionRef = useRef<boolean>(false);

  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
    });
    if (!context) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const setReduced = () => {
      isReducedMotionRef.current = mediaQuery.matches;
    };
    setReduced();
    mediaQuery.addEventListener?.("change", setReduced);

    const devicePixelRatioValue = Math.min(window.devicePixelRatio || 1, 2);
    function resizeCanvas() {
      const { innerWidth, innerHeight } = window;
      if (!context) return;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      canvas.width = Math.floor(innerWidth * devicePixelRatioValue);
      canvas.height = Math.floor(innerHeight * devicePixelRatioValue);
      context.setTransform(
        devicePixelRatioValue,
        0,
        0,
        devicePixelRatioValue,
        0,
        0
      );
    }
    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    type Particle = {
      x: number;
      y: number;
      velocityX: number;
      velocityY: number;
      radius: number;
      color: string;
    };

    function random(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    function chooseColor(): string {
      return (
        colorPalette[Math.floor(Math.random() * colorPalette.length)] ?? "#fff"
      );
    }

    const particleArray: Particle[] = [];

    function computeDefaultParticleCount() {
      const area = window.innerWidth * window.innerHeight;

      return Math.max(40, Math.min(220, Math.floor(area / 9000)));
    }

    const targetParticleCount = particleCount ?? computeDefaultParticleCount();

    for (let index = 0; index < targetParticleCount; index++) {
      particleArray.push({
        x: random(0, window.innerWidth),
        y: random(0, window.innerHeight),
        velocityX: random(-0.25, 0.25),
        velocityY: random(-0.25, 0.25),
        radius: random(0.8, 2.2),
        color: chooseColor(),
      });
    }

    function drawGradientBackdrop(timeMilliseconds: number) {
      const width = canvas.width / devicePixelRatioValue;
      const height = canvas.height / devicePixelRatioValue;
      if (context == null) return;
      const gradient = context.createLinearGradient(0, 0, width, height);

      const t = (timeMilliseconds * 0.00008) % 1;
      function lerp(a: number, b: number, u: number) {
        return a + (b - a) * u;
      }
      const hueA = lerp(210, 300, t);
      const hueB = lerp(160, 260, (t + 0.35) % 1);
      gradient.addColorStop(0, `hsla(${hueA}, 60%, 10%, ${opacity})`);
      gradient.addColorStop(1, `hsla(${hueB}, 60%, 8%, ${opacity})`);

      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);
    }

    function drawLinks() {
      const maxDistance = 120;
      for (let i = 0; i < particleArray.length; i++) {
        for (let j = i + 1; j < particleArray.length; j++) {
          if (!context) return;
          const dx = particleArray[i].x - particleArray[j].x;
          const dy = particleArray[i].y - particleArray[j].y;
          const distance = Math.hypot(dx, dy);
          if (distance < maxDistance) {
            const linkAlpha = 1 - distance / maxDistance;
            context.strokeStyle = `rgba(255,255,255,${0.18 * linkAlpha})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(particleArray[i].x, particleArray[i].y);
            context.lineTo(particleArray[j].x, particleArray[j].y);
            context.stroke();
          }
        }
      }
    }

    function step(timeMilliseconds: number) {
      if (!context) return;
      if (isReducedMotionRef.current) {
        drawGradientBackdrop(0);

        for (const particle of particleArray) {
          context.fillStyle = particle.color;
          context.globalAlpha = 0.8;
          context.beginPath();
          context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          context.fill();
        }
        context.globalAlpha = 1;
        return;
      }

      drawGradientBackdrop(timeMilliseconds);

      const hasMouse = enableMouseRepel && mouseRef.current.active;
      const repelRadius = 120;
      for (const particle of particleArray) {
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;

        if (particle.x < -10) particle.x = window.innerWidth + 10;
        if (particle.x > window.innerWidth + 10) particle.x = -10;
        if (particle.y < -10) particle.y = window.innerHeight + 10;
        if (particle.y > window.innerHeight + 10) particle.y = -10;

        if (hasMouse) {
          const dx = particle.x - mouseRef.current.x;
          const dy = particle.y - mouseRef.current.y;
          const distance = Math.hypot(dx, dy);
          if (distance < repelRadius && distance > 0.0001) {
            const force = (repelRadius - distance) / repelRadius;
            const unitX = dx / distance;
            const unitY = dy / distance;
            particle.x += unitX * force * 2.2;
            particle.y += unitY * force * 2.2;
          }
        }
        context.fillStyle = particle.color;
        context.globalAlpha = 0.9;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
      drawLinks();

      animationFrameIdRef.current = window.requestAnimationFrame(step);
    }

    animationFrameIdRef.current = window.requestAnimationFrame(step);

    function onPointerMove(event: PointerEvent) {
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
      mouseRef.current.active = true;
    }
    function onPointerLeave() {
      mouseRef.current.active = false;
    }

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);

    return () => {
      if (animationFrameIdRef.current)
        cancelAnimationFrame(animationFrameIdRef.current);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      mediaQuery.removeEventListener?.("change", setReduced);
    };
  }, [colorPalette, enableMouseRepel, opacity, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none fixed inset-0 h-screen w-screen ${className}`}
      style={{ zIndex }}
    />
  );
}
