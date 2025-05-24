/* ----- TechWheelAnimation.tsx ----- */
import React, { useState } from 'react';
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiOpenjdk as SiJava,
  SiSpring,
  SiMongodb,
  SiDocker,
  SiAmazon as SiAws,
  SiGithub
} from 'react-icons/si';

interface Technology {
  name: string;
  icon: React.ComponentType<{ className?: string; color?: string }>;
  color: string;
}

const TechWheelAnimation: React.FC = () => {
  const [animationFinished, setAnimationFinished] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  let hoverTimeout: ReturnType<typeof setTimeout>;
  // Technology data with icons and names
  const technologies: Technology[] = [
    { name: 'React', icon: SiReact, color: '#61DAFB' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'Java', icon: SiJava, color: '#007396' },
    { name: 'Spring', icon: SiSpring, color: '#6DB33F' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'Docker', icon: SiDocker, color: '#2496ED' },
    { name: 'AWS', icon: SiAws, color: '#FF9900' },
    { name: 'GitHub', icon: SiGithub, color: '#181717' }
  ];

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        setIsHovering(true);
        setAnimationFinished(false);
        setTimeout(() => setAnimationFinished(true), 3300);
      }}
      onMouseLeave={() => {
        if (animationFinished) {
          hoverTimeout = setTimeout(() => setIsHovering(false), 4500);
        }
      }}
    >
      {/* Tech panel (wheel then banner) */}
      {isHovering && (
        <div
          className="absolute right-full mr-6 top-1/2 transform -translate-y-1/2 flex items-center space-x-4"
          onMouseEnter={() => clearTimeout(hoverTimeout)}
          onMouseLeave={() => {
            if (animationFinished) {
              clearTimeout(hoverTimeout);
              hoverTimeout = setTimeout(() => setIsHovering(false), 1500);
            }
          }}
        >
          {/* Tech wheel container (250×250 for proper centering) */}
          <div className="relative" style={{ width: '250px', height: '250px', marginTop: '-2.9rem', transform: 'translateX(5.5rem)'}}>
            {technologies.map((tech, index) => {
              // Calculate position on a vertical semi-circle (90° to -90°)
              const totalAngle = Math.PI;
              const startAngle = Math.PI / 2;
              const angle = startAngle - (totalAngle / (technologies.length - 1)) * index;
              const radius = 125;
              const x = -Math.cos(angle) * radius;
              const y = -Math.sin(angle) * radius;
              const delay = index * 0.15;

              return (
                <div
                  key={index}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center group cursor-pointer hover:scale-150 transition-transform duration-300"
                  onMouseEnter={() => clearTimeout(hoverTimeout)}
                  onMouseLeave={() => {
                    hoverTimeout = setTimeout(() => setIsHovering(false), 1500);
                  }}
                  style={{
                    left: `${radius + x}px`, 
                    top: `${radius + y}px`,
                    width: '32px',
                    height: '32px',
                    opacity: 0,
                    animation: `fadeIn 0.5s ease forwards ${delay}s, pulse 2s infinite ${delay + 0.5}s`
                  }}
                >
                  <div className="flex flex-col items-center relative">
                    <div style={{ filter: 'brightness(1.2) saturate(1.3)' }} className="drop-shadow-lg">
                      <tech.icon className="text-3xl" color={tech.color} />
                    </div>
                    {/* Tooltip */}
                    <div className="absolute right-full mr-2 -mt-1 px-3 py-1 bg-white rounded-lg shadow-lg pointer-events-none opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap z-10">
                      <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-white rotate-45"></div>
                      <span className="text-sm font-medium text-gray-800">{tech.name}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Text banner between wheel and bulb */}
          <div className="text-white font-semibold text-center px-4 py-2 bg-primary-600 bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg">
            <p className="text-sm">Here's the tech that went into this website</p>
          </div>
        </div>
      )}

      {/* Bulb button */}
      <button
        className="relative group p-3 bg-white text-primary-600 rounded-full transform transition-all duration-300 hover:scale-110 hover:shadow-lg z-10 cursor-pointer"
        aria-label="View Tech Stack"
      >
        <div className="absolute -inset-2 rounded-full bg-yellow-300 opacity-0 group-hover:opacity-30 transition-opacity duration-300 group-hover:animate-pulse"></div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </button>
    </div>
  );
};

export default TechWheelAnimation;
