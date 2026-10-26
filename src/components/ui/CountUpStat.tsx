'use client';

import React, { useState, useEffect, useRef } from 'react';

interface CountUpStatProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  formattedFallback?: string;
}

export const CountUpStat: React.FC<CountUpStatProps> = ({
  value,
  suffix = '',
  prefix = '',
  duration = 1200,
  className = '',
  formattedFallback,
}) => {
  const fallback = formattedFallback ?? `${prefix}${value}${suffix}`;
  const [displayValue, setDisplayValue] = useState<string>(fallback);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  useEffect(() => {
    // If user prefers reduced motion, keep final value
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayValue(fallback);
      return;
    }

    const startAnimation = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;

      const startTime = performance.now();
      const startValue = 0;

      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutExpo
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentNum = Math.floor(startValue + (value - startValue) * easeProgress);

        setDisplayValue(`${prefix}${currentNum}${suffix}`);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          // Ensure exact final formatted string
          setDisplayValue(fallback);
        }
      };

      requestAnimationFrame(step);
    };

    // Use IntersectionObserver if available
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined' && elementRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startAnimation();
              if (elementRef.current && observer) {
                observer.unobserve(elementRef.current);
              }
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(elementRef.current);
    } else {
      // Fallback: run on mount
      startAnimation();
    }

    // Safety timeout: ensure final formatted value is ALWAYS guaranteed after duration + 300ms
    const safetyTimer = setTimeout(() => {
      setDisplayValue(fallback);
    }, duration + 300);

    return () => {
      if (observer) {
        observer.disconnect();
      }
      clearTimeout(safetyTimer);
    };
  }, [value, prefix, suffix, duration, fallback]);

  return (
    <span ref={elementRef} className={className}>
      {displayValue}
    </span>
  );
};

export default CountUpStat;
