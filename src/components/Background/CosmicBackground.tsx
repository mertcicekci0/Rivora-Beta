'use client';

import React, { useEffect, useRef, useState } from 'react';

const CosmicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [showConstellations, setShowConstellations] = useState(false);
  const idleTimeRef = useRef(0);
  const lastInteractionRef = useRef(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking for parallax
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      };
      lastInteractionRef.current = Date.now();
    };

    // Click interactions
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      
      // Create ripple effect at click position
      ripples.push({
        x: clickX,
        y: clickY,
        radius: 0,
        maxRadius: 100,
        alpha: 1,
        speed: 3
      });

      // Trigger constellation easter egg
      if (Math.random() < 0.3) {
        setShowConstellations(true);
        setTimeout(() => setShowConstellations(false), 3000);
      }

      lastInteractionRef.current = Date.now();
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);

    // Star field configuration with parallax layers
    const stars: Array<{
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      brightness: number;
      twinkleSpeed: number;
      twinkleOffset: number;
      layer: number;
      glowing: boolean;
      glowIntensity: number;
    }> = [];

    // Shooting stars
    const shootingStars: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      length: number;
      brightness: number;
      life: number;
      maxLife: number;
    }> = [];

    // Interactive ripples
    const ripples: Array<{
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
      speed: number;
    }> = [];

    // Satellite
    const satellite = {
      x: -100,
      y: canvas.height * 0.3,
      speed: 0.5,
      angle: 0
    };

    // Orbital paths
    const orbitalPaths: Array<{
      centerX: number;
      centerY: number;
      radiusX: number;
      radiusY: number;
      angle: number;
      speed: number;
      opacity: number;
    }> = [];

    // Cosmic event
    const cosmicEvent = {
      active: false,
      x: 0,
      y: 0,
      size: 0,
      maxSize: 200,
      alpha: 0,
      hue: 0
    };

    // Initialize stars with base positions
    for (let i = 0; i < 300; i++) {
      const baseX = Math.random() * canvas.width;
      const baseY = Math.random() * canvas.height;
      stars.push({
        x: baseX,
        y: baseY,
        baseX,
        baseY,
        size: Math.random() * 2.5 + 0.5,
        brightness: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2,
        layer: Math.floor(Math.random() * 3) + 1,
        glowing: false,
        glowIntensity: 0
      });
    }

    // Initialize orbital paths
    for (let i = 0; i < 3; i++) {
      orbitalPaths.push({
        centerX: Math.random() * canvas.width,
        centerY: Math.random() * canvas.height,
        radiusX: 100 + Math.random() * 200,
        radiusY: 80 + Math.random() * 150,
        angle: Math.random() * Math.PI * 2,
        speed: 0.005 + Math.random() * 0.01,
        opacity: 0.1 + Math.random() * 0.2
      });
    }

    let animationFrame: number;
    let time = 0;

    const animate = () => {
      time += 0.01;
      idleTimeRef.current = Date.now() - lastInteractionRef.current;
      
      // Clear canvas with deep space gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a0a1a');
      gradient.addColorStop(0.3, '#1a1a2e');
      gradient.addColorStop(0.7, '#16213e');
      gradient.addColorStop(1, '#0f0f23');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw distant nebula clouds with mouse parallax
      ctx.globalCompositeOperation = 'screen';
      
      const parallaxX = mouseRef.current.x * 20;
      const parallaxY = mouseRef.current.y * 20;

      // Purple nebula with parallax
      const nebulaGradient1 = ctx.createRadialGradient(
        canvas.width * 0.2 + parallaxX * 0.5, canvas.height * 0.3 + parallaxY * 0.5, 0,
        canvas.width * 0.2 + parallaxX * 0.5, canvas.height * 0.3 + parallaxY * 0.5, canvas.width * 0.4
      );
      nebulaGradient1.addColorStop(0, 'rgba(128, 51, 255, 0.15)');
      nebulaGradient1.addColorStop(0.5, 'rgba(128, 51, 255, 0.08)');
      nebulaGradient1.addColorStop(1, 'rgba(128, 51, 255, 0)');
      
      ctx.fillStyle = nebulaGradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Cyan nebula with parallax
      const nebulaGradient2 = ctx.createRadialGradient(
        canvas.width * 0.8 + parallaxX * 0.3, canvas.height * 0.7 + parallaxY * 0.3, 0,
        canvas.width * 0.8 + parallaxX * 0.3, canvas.height * 0.7 + parallaxY * 0.3, canvas.width * 0.3
      );
      nebulaGradient2.addColorStop(0, 'rgba(0, 255, 224, 0.12)');
      nebulaGradient2.addColorStop(0.5, 'rgba(0, 255, 224, 0.06)');
      nebulaGradient2.addColorStop(1, 'rgba(0, 255, 224, 0)');
      
      ctx.fillStyle = nebulaGradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = 'source-over';

      // Draw orbital paths
      orbitalPaths.forEach(path => {
        path.angle += path.speed;
        
        ctx.save();
        ctx.globalAlpha = path.opacity;
        ctx.strokeStyle = '#8033ff';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 10]);
        ctx.beginPath();
        ctx.ellipse(path.centerX, path.centerY, path.radiusX, path.radiusY, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Draw small object on orbital path
        const objX = path.centerX + Math.cos(path.angle) * path.radiusX;
        const objY = path.centerY + Math.sin(path.angle) * path.radiusY;
        
        ctx.save();
        ctx.globalAlpha = path.opacity * 2;
        ctx.fillStyle = '#00FFE0';
        ctx.beginPath();
        ctx.arc(objX, objY, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Update and draw stars with parallax and interactions
      stars.forEach((star, index) => {
        // Apply parallax based on layer
        const parallaxStrength = star.layer * 10;
        star.x = star.baseX + mouseRef.current.x * parallaxStrength;
        star.y = star.baseY + mouseRef.current.y * parallaxStrength;

        // Wrap around screen
        if (star.x < -10) star.baseX = canvas.width + 10;
        if (star.x > canvas.width + 10) star.baseX = -10;
        if (star.y < -10) star.baseY = canvas.height + 10;
        if (star.y > canvas.height + 10) star.baseY = -10;

        // Random glow effect
        if (Math.random() < 0.001) {
          star.glowing = true;
          star.glowIntensity = 1;
        }

        if (star.glowing) {
          star.glowIntensity -= 0.02;
          if (star.glowIntensity <= 0) {
            star.glowing = false;
            star.glowIntensity = 0;
          }
        }

        // Twinkling effect
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
        const alpha = star.brightness * twinkle + star.glowIntensity * 0.5;

        // Draw star with enhanced glow
        ctx.save();
        ctx.globalAlpha = alpha;
        
        // Main star
        ctx.fillStyle = star.glowing ? '#00FFE0' : '#ffffff';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Enhanced glow for glowing stars
        if (star.glowing || star.size > 1.5) {
          ctx.globalAlpha = (alpha * 0.4) + (star.glowIntensity * 0.6);
          const glowGradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.size * (3 + star.glowIntensity * 5)
          );
          glowGradient.addColorStop(0, star.glowing ? '#00FFE0' : '#ffffff');
          glowGradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * (3 + star.glowIntensity * 5), 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();
      });

      // Generate shooting stars randomly
      if (Math.random() < 0.003) {
        const side = Math.floor(Math.random() * 4);
        let startX, startY, vx, vy;
        
        switch(side) {
          case 0: // Top
            startX = Math.random() * canvas.width;
            startY = -10;
            vx = (Math.random() - 0.5) * 4;
            vy = Math.random() * 3 + 2;
            break;
          case 1: // Right
            startX = canvas.width + 10;
            startY = Math.random() * canvas.height;
            vx = -(Math.random() * 3 + 2);
            vy = (Math.random() - 0.5) * 4;
            break;
          case 2: // Bottom
            startX = Math.random() * canvas.width;
            startY = canvas.height + 10;
            vx = (Math.random() - 0.5) * 4;
            vy = -(Math.random() * 3 + 2);
            break;
          default: // Left
            startX = -10;
            startY = Math.random() * canvas.height;
            vx = Math.random() * 3 + 2;
            vy = (Math.random() - 0.5) * 4;
        }

        shootingStars.push({
          x: startX,
          y: startY,
          vx,
          vy,
          length: 20 + Math.random() * 30,
          brightness: 0.8 + Math.random() * 0.2,
          life: 0,
          maxLife: 60 + Math.random() * 40
        });
      }

      // Update and draw shooting stars
      shootingStars.forEach((shootingStar, index) => {
        shootingStar.x += shootingStar.vx;
        shootingStar.y += shootingStar.vy;
        shootingStar.life++;

        const alpha = shootingStar.brightness * (1 - shootingStar.life / shootingStar.maxLife);
        
        if (alpha > 0) {
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.lineCap = 'round';
          
          // Draw trail
          const gradient = ctx.createLinearGradient(
            shootingStar.x, shootingStar.y,
            shootingStar.x - shootingStar.vx * shootingStar.length / 5,
            shootingStar.y - shootingStar.vy * shootingStar.length / 5
          );
          gradient.addColorStop(0, '#ffffff');
          gradient.addColorStop(1, 'transparent');
          
          ctx.strokeStyle = gradient;
          ctx.beginPath();
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(
            shootingStar.x - shootingStar.vx * shootingStar.length / 5,
            shootingStar.y - shootingStar.vy * shootingStar.length / 5
          );
          ctx.stroke();
          
          // Draw bright head
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(shootingStar.x, shootingStar.y, 2, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.restore();
        }

        if (shootingStar.life >= shootingStar.maxLife) {
          shootingStars.splice(index, 1);
        }
      });

      // Update and draw satellite
      satellite.x += satellite.speed;
      satellite.angle += 0.02;
      
      if (satellite.x > canvas.width + 50) {
        satellite.x = -100;
        satellite.y = Math.random() * canvas.height * 0.6 + canvas.height * 0.2;
      }

      // Draw satellite
      ctx.save();
      ctx.globalAlpha = 0.7;
      ctx.translate(satellite.x, satellite.y);
      ctx.rotate(satellite.angle);
      
      // Satellite body
      ctx.fillStyle = '#666';
      ctx.fillRect(-8, -3, 16, 6);
      
      // Solar panels
      ctx.fillStyle = '#00FFE0';
      ctx.fillRect(-12, -2, 3, 4);
      ctx.fillRect(9, -2, 3, 4);
      
      // Antenna
      ctx.strokeStyle = '#999';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -3);
      ctx.lineTo(0, -8);
      ctx.stroke();
      
      ctx.restore();

      // Update and draw ripples
      ripples.forEach((ripple, index) => {
        ripple.radius += ripple.speed;
        ripple.alpha = 1 - (ripple.radius / ripple.maxRadius);
        
        if (ripple.alpha > 0) {
          ctx.save();
          ctx.globalAlpha = ripple.alpha * 0.5;
          ctx.strokeStyle = '#8033ff';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        if (ripple.radius >= ripple.maxRadius) {
          ripples.splice(index, 1);
        }
      });

      // Cosmic event on long idle
      if (idleTimeRef.current > 30000 && !cosmicEvent.active && Math.random() < 0.001) {
        cosmicEvent.active = true;
        cosmicEvent.x = Math.random() * canvas.width;
        cosmicEvent.y = Math.random() * canvas.height;
        cosmicEvent.size = 0;
        cosmicEvent.alpha = 0;
        cosmicEvent.hue = Math.random() * 360;
      }

      if (cosmicEvent.active) {
        cosmicEvent.size += 2;
        cosmicEvent.alpha = Math.sin(cosmicEvent.size * 0.1) * 0.5 + 0.5;
        cosmicEvent.hue += 2;
        
        ctx.save();
        ctx.globalAlpha = cosmicEvent.alpha * 0.3;
        ctx.fillStyle = `hsl(${cosmicEvent.hue}, 100%, 50%)`;
        
        const eventGradient = ctx.createRadialGradient(
          cosmicEvent.x, cosmicEvent.y, 0,
          cosmicEvent.x, cosmicEvent.y, cosmicEvent.size
        );
        eventGradient.addColorStop(0, `hsla(${cosmicEvent.hue}, 100%, 50%, 0.8)`);
        eventGradient.addColorStop(0.5, `hsla(${cosmicEvent.hue}, 100%, 50%, 0.3)`);
        eventGradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = eventGradient;
        ctx.beginPath();
        ctx.arc(cosmicEvent.x, cosmicEvent.y, cosmicEvent.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (cosmicEvent.size > cosmicEvent.maxSize) {
          cosmicEvent.active = false;
        }
      }

      // Draw constellation lines (easter egg)
      if (showConstellations) {
        ctx.save();
        ctx.globalAlpha = 0.4;
        ctx.strokeStyle = '#8033ff';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 4]);
        
        // Draw some constellation patterns
        const constellationStars = stars.slice(0, 12);
        for (let i = 0; i < constellationStars.length - 1; i += 3) {
          if (constellationStars[i + 1]) {
            ctx.beginPath();
            ctx.moveTo(constellationStars[i].x, constellationStars[i].y);
            ctx.lineTo(constellationStars[i + 1].x, constellationStars[i + 1].y);
            if (constellationStars[i + 2]) {
              ctx.lineTo(constellationStars[i + 2].x, constellationStars[i + 2].y);
            }
            ctx.stroke();
          }
        }
        
        ctx.restore();
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrame);
    };
  }, [showConstellations]);

  return (
    <>
      {/* Canvas for interactive starfield */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 cursor-pointer"
        style={{ background: 'transparent' }}
      />
      
      {/* Static background elements with parallax */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Base deep space gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0E1014] via-[#0A0E13] to-[#0E1014]"></div>
        
        {/* Distant planet - large, blurred with parallax */}
        <div 
          className="absolute w-96 h-96 rounded-full opacity-5 blur-3xl transition-transform duration-1000 ease-out"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #4a5568, #2d3748, #1a202c)',
            top: '10%',
            right: '15%',
            transform: 'translateY(-20px)',
            animation: 'slowFloat 20s ease-in-out infinite',
          }}
        ></div>

        {/* Smaller moon with parallax */}
        <div 
          className="absolute w-32 h-32 rounded-full opacity-3 blur-xl transition-transform duration-1000 ease-out"
          style={{
            background: 'radial-gradient(circle at 40% 20%, #718096, #4a5568, #2d3748)',
            bottom: '20%',
            left: '10%',
            animation: 'slowFloat 15s ease-in-out infinite reverse',
            animationDelay: '5s',
          }}
        ></div>

        {/* Distant galaxy spiral */}
        <div 
          className="absolute w-64 h-64 rounded-full opacity-2 blur-2xl"
          style={{
            background: 'conic-gradient(from 0deg, transparent, rgba(128, 51, 255, 0.3), transparent, rgba(0, 255, 224, 0.2), transparent)',
            top: '60%',
            right: '5%',
            animation: 'spin 60s linear infinite',
          }}
        ></div>

        {/* Enhanced floating cosmic dust particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `slowFloat ${15 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 10}s`,
              filter: 'blur(0.5px)',
            }}
          />
        ))}

        {/* Enhanced aurora-like effects */}
        <div 
          className="absolute inset-0 opacity-2 transition-opacity duration-2000"
          style={{
            background: `
              radial-gradient(ellipse at 20% 80%, rgba(128, 51, 255, 0.4) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 20%, rgba(0, 255, 224, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse at 40% 40%, rgba(255, 0, 168, 0.2) 0%, transparent 50%)
            `,
          }}
        ></div>
      </div>
    </>
  );
};

export default CosmicBackground;