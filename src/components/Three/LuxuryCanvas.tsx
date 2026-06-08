import { useEffect, useRef } from 'react';

export default function LuxuryCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Mouse coordinates for interaction
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // 3D Point projection helper
    interface Point3D {
      x: number;
      y: number;
      z: number;
    }

    // Define a 3D geometric architectural structure (looks like a minimalist luxury building or pavilion)
    const vertices: Point3D[] = [
      // Base square (ground)
      { x: -100, y: 100, z: -100 },
      { x: 100, y: 100, z: -100 },
      { x: 100, y: 100, z: 100 },
      { x: -100, y: 100, z: 100 },
      // Middle plate (roof of level 1)
      { x: -100, y: 0, z: -100 },
      { x: 100, y: 0, z: -100 },
      { x: 100, y: 0, z: 100 },
      { x: -100, y: 0, z: 100 },
      // Top plates (level 2)
      { x: -60, y: -100, z: -60 },
      { x: 60, y: -100, z: -60 },
      { x: 60, y: -100, z: 60 },
      { x: -60, y: -100, z: 60 },
    ];

    // Connect vertices to draw structural columns and architectural beams
    const edges = [
      // Base links
      [0, 1], [1, 2], [2, 3], [3, 0],
      // Level 1 links
      [4, 5], [5, 6], [6, 7], [7, 4],
      // Columns from ground to level 1
      [0, 4], [1, 5], [2, 6], [3, 7],
      // Top level links
      [8, 9], [9, 10], [10, 11], [11, 8],
      // Columns from level 1 to top
      [4, 8], [5, 9], [6, 10], [7, 11],
      // Diagonals for modern architectural reinforcement structure
      [4, 10], [5, 11]
    ];

    // Golden dust particles
    const particles: Array<{
      x: number;
      y: number;
      z: number;
      size: number;
      speed: number;
      opacity: number;
    }> = Array.from({ length: 45 }, () => ({
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 400,
      z: (Math.random() - 0.5) * 400,
      size: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.4 + 0.1,
      opacity: Math.random() * 0.6 + 0.2
    }));

    let angleX = 0.005;
    let angleY = 0.008;

    // Rotation functions
    const rotateX = (point: Point3D, angle: number): Point3D => {
      const rad = angle;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      return {
        x: point.x,
        y: point.y * cos - point.z * sin,
        z: point.y * sin + point.z * cos,
      };
    };

    const rotateY = (point: Point3D, angle: number): Point3D => {
      const rad = angle;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      return {
        x: point.x * cos + point.z * sin,
        y: point.y,
        z: -point.x * sin + point.z * cos,
      };
    };

    const rotateZ = (point: Point3D, angle: number): Point3D => {
      const rad = angle;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      return {
        x: point.x * cos - point.y * sin,
        y: point.x * sin + point.y * cos,
        z: point.z,
      };
    };

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse tracking
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Mouse influence on rotation angles
      const speedMultiplierX = (mouse.y - height / 2) * 0.00002;
      const speedMultiplierY = (mouse.x - width / 2) * 0.00002;

      angleX += speedMultiplierX + 0.002;
      angleY += speedMultiplierY + 0.003;

      const fov = 400; // Camera field of view
      const centerX = width / 2;
      const centerY = height / 2;

      // Draw particle system
      particles.forEach((p) => {
        // Slow float
        p.y -= p.speed;
        if (p.y < -200) p.y = 200;

        // Rotate
        let pt = rotateY({ x: p.x, y: p.y, z: p.z }, angleY * 0.5);
        pt = rotateX(pt, angleX * 0.5);

        // Project
        const scale = fov / (fov + pt.z + 200);
        const projX = pt.x * scale + centerX;
        const projY = pt.y * scale + centerY;

        if (projX >= 0 && projX <= width && projY >= 0 && projY <= height) {
          ctx.beginPath();
          ctx.arc(projX, projY, p.size * scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(223, 186, 72, ${p.opacity * scale})`;
          ctx.fill();
        }
      });

      // Project vertices to 2D
      const projected = vertices.map((v) => {
        // Apply rotations
        let pt = rotateY(v, angleY);
        pt = rotateX(pt, angleX);
        pt = rotateZ(pt, 0.1); // subtle skew

        // Camera perspective projection
        const scale = fov / (fov + pt.z + 150);
        return {
          x: pt.x * scale + centerX,
          y: pt.y * scale + centerY,
          scale: scale,
        };
      });

      // Draw glass floor grids
      ctx.strokeStyle = 'rgba(223, 186, 72, 0.05)';
      ctx.lineWidth = 1;
      for (let i = -3; i <= 3; i++) {
        let pt1 = rotateY({ x: i * 50, y: 100, z: -150 }, angleY);
        pt1 = rotateX(pt1, angleX);
        const s1 = fov / (fov + pt1.z + 150);

        let pt2 = rotateY({ x: i * 50, y: 100, z: 150 }, angleY);
        pt2 = rotateX(pt2, angleX);
        const s2 = fov / (fov + pt2.z + 150);

        ctx.beginPath();
        ctx.moveTo(pt1.x * s1 + centerX, pt1.y * s1 + centerY);
        ctx.lineTo(pt2.x * s2 + centerX, pt2.y * s2 + centerY);
        ctx.stroke();

        let pt3 = rotateY({ x: -150, y: 100, z: i * 50 }, angleY);
        pt3 = rotateX(pt3, angleX);
        const s3 = fov / (fov + pt3.z + 150);

        let pt4 = rotateY({ x: 150, y: 100, z: i * 50 }, angleY);
        pt4 = rotateX(pt4, angleX);
        const s4 = fov / (fov + pt4.z + 150);

        ctx.beginPath();
        ctx.moveTo(pt3.x * s3 + centerX, pt3.y * s3 + centerY);
        ctx.lineTo(pt4.x * s4 + centerX, pt4.y * s4 + centerY);
        ctx.stroke();
      }

      // Draw structural architectural frame edges
      edges.forEach(([startIdx, endIdx]) => {
        const p1 = projected[startIdx];
        const p2 = projected[endIdx];

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);

        // Render line with color gradient depending on depth
        const avgScale = (p1.scale + p2.scale) / 2;
        ctx.strokeStyle = `rgba(223, 186, 72, ${0.15 + (avgScale - 0.7) * 0.8})`;
        ctx.lineWidth = (1 + (avgScale - 0.7) * 2) * (window.devicePixelRatio || 1);
        ctx.stroke();
      });

      // Draw luxury node accents at vertices
      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, (2.5 + (p.scale - 0.7) * 3) * (window.devicePixelRatio || 1), 0, Math.PI * 2);
        ctx.fillStyle = '#dfba48';
        ctx.shadowColor = 'rgba(223, 186, 72, 0.6)';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center bg-transparent">
      {/* Editorial technical label overlay */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 font-mono text-[8px] text-accent/40 uppercase tracking-widest pointer-events-none">
        <span className="w-1.5 h-1.5 bg-accent/30 rounded-full animate-ping" />
        Kinash Renders System v3.12
      </div>
      <div className="absolute bottom-4 left-4 font-mono text-[7px] text-muted-foreground/30 uppercase tracking-[0.2em] pointer-events-none">
        GRID PROJECTION: PERSPECTIVE RENDER / SCALE 1.0
      </div>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
