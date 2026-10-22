import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  onClick?: () => void;
  strength?: number; // pull strength (0 to 1)
  type?: 'button' | 'submit';
  as?: React.ElementType;
  ariaLabel?: string;
}

export default function MagneticButton({
  children,
  className = '',
  containerClassName = '',
  onClick,
  strength = 30,
  type = 'button',
  as: Component = 'button',
  ariaLabel,
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const element = elementRef.current;
    if (!container || !element) return;

    // No magnetic pull for touch-only devices or motion-sensitive users.
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || prefersReducedMotion) return;

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
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(element);
      gsap.set(element, { clearProps: 'transform' });
    };
  }, [strength]);

  const isFullWidth = className.includes('w-full') || containerClassName.includes('w-full');

  return (
    <div
      ref={containerRef}
      className={`${isFullWidth ? 'w-full sm:w-auto block sm:inline-block' : 'inline-block'} ${containerClassName}`}
    >
      <Component
        ref={elementRef}
        {...(Component === 'button' ? { type, onClick } : { onClick })}
        aria-label={ariaLabel}
        className={`relative select-none ${className}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </Component>
    </div>
  );
}
