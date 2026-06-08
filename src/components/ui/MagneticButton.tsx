import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number; // pull strength (0 to 1)
  type?: 'button' | 'submit';
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  strength = 30,
  type = 'button',
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const element = elementRef.current;
    if (!container || !element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Animate the button towards mouse position
      gsap.to(element, {
        x: x * (strength / 100),
        y: y * (strength / 100),
        duration: 0.6,
        ease: 'power3.out',
      });
    };

    const handleMouseLeave = () => {
      // Spring back to center
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={containerRef} className="inline-block p-4 -m-4">
      <button
        ref={elementRef}
        type={type}
        onClick={onClick}
        className={`relative select-none ${className}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </button>
    </div>
  );
}
