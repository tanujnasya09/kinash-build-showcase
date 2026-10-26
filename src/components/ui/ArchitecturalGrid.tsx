import React from 'react';

interface ArchitecturalGridProps {
  columns?: number;
  className?: string;
}

/**
 * Editorial Architectural Drafting Blueprint Grid (Turner & Hill Reference)
 * Renders delicate, ultra-clean vertical hairline guide columns.
 */
export const ArchitecturalGrid: React.FC<ArchitecturalGridProps> = ({
  columns = 5,
  className = '',
}) => {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-0 ${className}`}
    >
      <div className="container mx-auto h-full px-4 md:px-8 flex justify-between">
        {Array.from({ length: columns }).map((_, idx) => (
          <div
            key={idx}
            className={`w-[1px] h-full bg-black/[0.02] dark:bg-white/[0.018] ${
              idx > 1 && idx < columns - 1 ? 'hidden sm:block' : ''
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ArchitecturalGrid;
