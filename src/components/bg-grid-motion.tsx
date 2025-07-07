'use client';

import { gsap } from 'gsap';
import { type FC, useEffect, useRef } from 'react';

interface GridMotionProps {
  items?: string[];
  gradientColor?: string;
}

const GridMotion: FC<GridMotionProps> = ({
  items = [],
  gradientColor = 'black',
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseXRef = useRef<number>(0);

  const totalItems = 28;
  const defaultItems = Array.from(
    { length: totalItems },
    (_, itemIndex) => `Item ${itemIndex + 1}`
  );

  // If items are provided, cycle through them to fill all grid positions
  const combinedItems =
    items.length > 0
      ? Array.from(
          { length: totalItems },
          (_, index) => items[index % items.length]
        )
      : defaultItems;

  // Generate stable grid structure
  const gridRows = Array.from({ length: 4 }, (_, rowNumber) => ({
    id: `row-${rowNumber}`,
    rowIndex: rowNumber,
    items: Array.from({ length: 7 }, (__, colNumber) => ({
      id: `item-${rowNumber * 7 + colNumber}`,
      position: rowNumber * 7 + colNumber,
      content: combinedItems[rowNumber * 7 + colNumber],
    })),
  }));

  useEffect(() => {
    // Initialize mouse position safely
    mouseXRef.current = window.innerWidth / 2;

    gsap.ticker.lagSmoothing(0);

    const handleMouseMove = (e: MouseEvent): void => {
      mouseXRef.current = e.clientX;
    };

    const updateMotion = (): void => {
      const maxMoveAmount = 300;
      const baseDuration = 0.8;
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2];

      rowRefs.current.forEach((row, rowIdx) => {
        if (row) {
          const direction = rowIdx % 2 === 0 ? 1 : -1;
          const moveAmount =
            ((mouseXRef.current / window.innerWidth) * maxMoveAmount -
              maxMoveAmount / 2) *
            direction;

          gsap.to(row, {
            x: moveAmount,
            duration:
              baseDuration + inertiaFactors[rowIdx % inertiaFactors.length],
            ease: 'power3.out',
            overwrite: 'auto',
          });
        }
      });
    };

    const removeAnimationLoop = gsap.ticker.add(updateMotion);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      removeAnimationLoop();
    };
  }, []);

  const isImagePath = (content: string): boolean => {
    // Check for HTTP URLs or local paths starting with '/'
    if (content.startsWith('http') || content.startsWith('/')) {
      // Additional check for common image extensions
      const imageExtensions = [
        '.png',
        '.jpg',
        '.jpeg',
        '.gif',
        '.svg',
        '.webp',
      ];
      return imageExtensions.some((ext) => content.toLowerCase().includes(ext));
    }
    return false;
  };

  return (
    <div className="h-full w-full overflow-hidden" ref={gridRef}>
      <section
        className="relative flex h-screen w-full items-center justify-center overflow-hidden"
        style={{
          background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`,
        }}
      >
        <div className="pointer-events-none absolute inset-0 z-[4] bg-[length:250px]" />
        <div className="relative z-[2] grid h-[150vh] w-[150vw] flex-none origin-center rotate-[-15deg] grid-cols-1 grid-rows-4 gap-4">
          {gridRows.map((row) => (
            <div
              className="grid grid-cols-7 gap-4"
              key={row.id}
              ref={(el) => {
                if (el) {
                  rowRefs.current[row.rowIndex] = el;
                }
              }}
              style={{ willChange: 'transform, filter' }}
            >
              {row.items.map((item) => (
                <div className="relative" key={item.id}>
                  <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[10px] bg-[#111] text-[1.5rem] text-white">
                    {typeof item.content === 'string' &&
                    isImagePath(item.content) ? (
                      <div
                        className="absolute top-0 left-0 h-full w-full bg-center bg-cover"
                        style={{ backgroundImage: `url(${item.content})` }}
                      />
                    ) : (
                      <div className="z-[1] p-4 text-center">
                        {item.content}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="pointer-events-none relative top-0 left-0 h-full w-full" />
      </section>
    </div>
  );
};

export default GridMotion;
