import React, { useRef, useEffect } from "react";

const STAR_COUNT = 120;
const STAR_COLORS = ["#fff", "#8f5cff", "#00c6fb", "#f4f4f4"];

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function StarBackground() {
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const stars = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Generate stars
    stars.current = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: randomBetween(0.7, 2.2),
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      glow: randomBetween(8, 24),
      speed: randomBetween(0.02, 0.08),
      twinkle: Math.random() * Math.PI * 2,
    }));

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (let star of stars.current) {
        // Twinkle effect
        const twinkle =
          0.5 + 0.5 * Math.sin(star.twinkle + Date.now() * star.speed * 0.5);
        ctx.save();
        ctx.globalAlpha = twinkle;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
        ctx.shadowColor = star.color;
        ctx.shadowBlur = star.glow * twinkle;
        ctx.fillStyle = star.color;
        ctx.fill();
        ctx.restore();
        // Animate twinkle
        star.twinkle += star.speed * 0.1;
      }
      animationRef.current = requestAnimationFrame(draw);
    }
    draw();

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      // Reposition stars
      stars.current.forEach((star) => {
        star.x = Math.random() * width;
        star.y = Math.random() * height;
      });
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="star-bg-canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}

export default StarBackground;
