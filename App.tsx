import { useState, useEffect, useCallback } from 'react';
import svgPaths from "./imports/svg-keejd3ons1";

function Frame26() {
  return (
    <div className="box-border content-stretch flex flex-row items-center justify-between leading-[0] not-italic p-0 relative shrink-0 text-[#ffffff] text-left w-full">
      <div className="font-['Poppins:Regular',_sans-serif] relative shrink-0 text-[20px] w-[943px]">
        <p className="block leading-[normal]">Type-plg</p>
      </div>
      <div className="font-['Poppins:Bold',_sans-serif] h-[23px] relative shrink-0 text-[16px] tracking-[3.36px] uppercase w-[167px]">
        <p className="adjustLetterSpacing block leading-[1.498]">
          Made by matt
        </p>
      </div>
    </div>
  );
}

function InteractiveM() {
  const [mouseX, setMouseX] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Original M path dimensions
  const originalWidth = 1344;
  const originalHeight = 354;
  
  // Original center valley point
  const originalCenterX = 665.948;
  const originalCenterY = 212.5;

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isHovering) {
      setMouseX(e.clientX);
    }
  }, [isHovering]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  // Calculate the new center X position based on mouse position
  const getNewCenterX = () => {
    if (!isHovering) return originalCenterX;
    
    const viewportWidth = window.innerWidth;
    const minX = originalWidth * 0.3; // Minimum 30% from left
    const maxX = originalWidth * 0.7; // Maximum 70% from left
    
    // Map mouse X (0 to viewport width) to the constrained range
    const normalizedX = mouseX / viewportWidth;
    return minX + (normalizedX * (maxX - minX));
  };

  // Generate dynamic SVG path based on mouse position
  const getDynamicPath = () => {
    const newCenterX = getNewCenterX();
    const centerY = originalCenterY;
    
    // Calculate proportional adjustments for other points
    const leftInnerX = newCenterX * 0.527; // Proportional to center
    const rightInnerX = newCenterX * 1.221; // Proportional to center
    const bottomCenterX = newCenterX * 0.771; // Bottom center width
    
    // Construct the new path with dynamic center points
    return `M1344 0V354H994.971V177.5L${rightInnerX} 354H${bottomCenterX}L${leftInnerX} 177.5V354H0V0H429.575L${newCenterX} ${centerY}L916.005 0H1344Z`;
  };

  return (
    <div 
      className="h-[354px] relative shrink-0 w-full cursor-pointer" 
      data-name="M"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <svg
        className="block size-full transition-all duration-75 ease-out"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 1344 354"
      >
        <path 
          d={getDynamicPath()} 
          fill="var(--fill-0, white)" 
          id="M" 
        />
      </svg>
    </div>
  );
}

export default function App() {
  return (
    <div className="bg-[#1a1a1a] relative size-full" data-name="Desktop - 5">
      <div className="flex flex-col justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-center px-12 py-6 relative size-full">
          <Frame26 />
          <InteractiveM />
        </div>
      </div>
    </div>
  );
}