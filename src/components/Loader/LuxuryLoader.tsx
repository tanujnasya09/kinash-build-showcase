import { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function LuxuryLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fake progress loading counter
    const obj = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        // Slide up the loading panels
        gsap.to('.loader-container', {
          yPercent: -100,
          duration: 1.2,
          ease: 'power4.inOut',
          onComplete: onComplete,
        });
        
        // Scale down the text slightly as it slides
        gsap.to('.loader-content', {
          y: -50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.in',
        });
      }
    });

    tl.to(obj, {
      val: 100,
      duration: 2.2,
      ease: 'power1.out',
      onUpdate: () => {
        setProgress(Math.floor(obj.val));
      }
    });

    // Stagger reveal of KINASH logo letters
    gsap.fromTo('.loader-letter', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: 'power3.out' }
    );

  }, [onComplete]);

  const brandName = "KINASH ASSOCIATES";

  return (
    <div className="loader-container fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0c0d10] text-white">
      {/* Decorative clean line grid */}
      <div className="absolute inset-0 flex justify-between pointer-events-none opacity-5 px-12">
        <div className="w-[1px] h-full bg-white" />
        <div className="w-[1px] h-full bg-white hidden md:block" />
        <div className="w-[1px] h-full bg-white hidden md:block" />
        <div className="w-[1px] h-full bg-white" />
      </div>

      <div className="loader-content flex flex-col items-center justify-center z-10 text-center">
        {/* Editorial Subtitle */}
        <span className="text-[9px] tracking-[0.3em] text-accent uppercase font-sans font-bold mb-4 opacity-70">
          ESTABLISHED IN UTTARAKHAND
        </span>

        {/* Staggered Title */}
        <h1 className="text-2xl md:text-5xl font-display font-light tracking-[0.2em] mb-12 flex select-none">
          {brandName.split("").map((char, index) => (
            <span 
              key={index} 
              className={`loader-letter inline-block ${char === ' ' ? 'mr-3 md:mr-6' : ''}`}
            >
              {char}
            </span>
          ))}
        </h1>

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
        </div>
      </div>
    </div>
  );
}
