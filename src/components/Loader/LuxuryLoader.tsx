'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useLanguage } from '@/context/LanguageContext';
import siteConfig from '@/config/site';

interface LuxuryLoaderProps {
  onComplete: () => void;
}

export default function LuxuryLoader({ onComplete }: LuxuryLoaderProps) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isFinishedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  const { t } = useLanguage();

  // Keep latest onComplete reference
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const finishLoader = useCallback(() => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;

    setProgress(100);

    if (!containerRef.current) {
      onCompleteRef.current();
      return;
    }

    gsap.killTweensOf('.loader-container, .loader-content, .loader-letter');

    const exitTl = gsap.timeline({
      onComplete: () => {
        onCompleteRef.current();
      },
    });

    exitTl.to('.loader-content', {
      y: -40,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.in',
    }, 0);

    exitTl.to(containerRef.current, {
      yPercent: -100,
      duration: 0.6,
      ease: 'power4.inOut',
    }, 0.1);
  }, []);

  useEffect(() => {
    // 1. Force GSAP ticker to wake up immediately.
    // In many browsers, requestAnimationFrame might be paused until interaction or window focus.
    gsap.ticker.wake();

    const handleWake = () => {
      gsap.ticker.wake();
    };

    window.addEventListener('focus', handleWake);
    window.addEventListener('pointerdown', handleWake);
    window.addEventListener('touchstart', handleWake);
    document.addEventListener('visibilitychange', handleWake);

    // 2. Failsafe: if the browser or ticker drops frames or freezes,
    // guarantee loader finishes within 1.6s so the user is NEVER stuck.
    const failsafeTimer = setTimeout(() => {
      if (!isFinishedRef.current) {
        finishLoader();
      }
    }, 1600);

    // 3. Main GSAP animation context
    const ctx = gsap.context(() => {
      const obj = { val: 0 };

      // Letter stagger animation
      gsap.fromTo(
        '.loader-letter',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: 'power3.out',
        }
      );

      // Progress counter animation
      gsap.to(obj, {
        val: 100,
        duration: 1.0,
        ease: 'power2.out',
        onUpdate: () => {
          if (!isFinishedRef.current) {
            setProgress(Math.floor(obj.val));
          }
        },
        onComplete: () => {
          finishLoader();
        },
      });
    }, containerRef);

    return () => {
      clearTimeout(failsafeTimer);
      window.removeEventListener('focus', handleWake);
      window.removeEventListener('pointerdown', handleWake);
      window.removeEventListener('touchstart', handleWake);
      document.removeEventListener('visibilitychange', handleWake);
      ctx.revert();
    };
  }, [finishLoader]);

  const brandName = siteConfig.shortName.toUpperCase();

  return (
    <div
      ref={containerRef}
      role="status"
      aria-live="polite"
      aria-label={t('common.loading', { brand: siteConfig.shortName })}
      onClick={finishLoader}
      className="loader-container fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0c0d10] text-white cursor-pointer select-none"
      title="Click anywhere to skip"
    >
      {/* Decorative clean line grid */}
      <div className="absolute inset-0 flex justify-between pointer-events-none opacity-5 px-12">
        <div className="w-[1px] h-full bg-white" />
        <div className="w-[1px] h-full bg-white hidden md:block" />
        <div className="w-[1px] h-full bg-white hidden md:block" />
        <div className="w-[1px] h-full bg-white" />
      </div>

      <div className="loader-content flex flex-col items-center justify-center z-10 text-center pointer-events-none">
        {/* Editorial Subtitle */}
        <span className="text-[9px] tracking-[0.3em] text-accent uppercase font-sans font-bold mb-4 opacity-70">
          ESTABLISHED IN UTTARAKHAND
        </span>

        {/* Staggered Title */}
        <div aria-hidden="true" className="text-2xl md:text-5xl font-display font-light tracking-[0.2em] mb-12 flex select-none">
          {brandName.split("").map((char, index) => (
            <span 
              key={index} 
              className={`loader-letter inline-block ${char === ' ' ? 'mr-3 md:mr-6' : ''}`}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Minimal Progress Counter */}
        <div className="flex flex-col items-center">
          <div className="text-4xl md:text-6xl font-display font-extralight text-accent mb-2">
            {progress}%
          </div>
          <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-accent transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] tracking-[0.18em] text-white/40 uppercase font-mono mt-3">
            Click to continue
          </span>
        </div>
      </div>
    </div>
  );
}
