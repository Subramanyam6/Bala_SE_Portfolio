/* ----- TechWheelAnimation.tsx ----- */
import React, { useState } from 'react';
import { FaReact, FaJava, FaGithub, FaCloud, FaDatabase } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiSpring, SiDocker } from 'react-icons/si';

interface Technology {
  name: string;
  icon: React.ComponentType<{ className?: string; color?: string }>;
  color: string;
}

const TechWheelAnimation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Technology data with icons and names
  const technologies: Technology[] = [
    { name: 'React', icon: FaReact, color: '#61DAFB' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'Java', icon: FaJava, color: '#007396' },
    { name: 'Spring', icon: SiSpring, color: '#6DB33F' },
    { name: 'MS SQL', icon: FaDatabase, color: '#CC2927' },
    { name: 'Docker', icon: SiDocker, color: '#2496ED' },
    { name: 'Azure', icon: FaCloud, color: '#0072C6' },
    { name: 'GitHub', icon: FaGithub, color: '#181717' }
  ];

  const wheelSize = 280;
  const radius = wheelSize / 2;
  const arcGap = 90;
  const arcCenterOffset = radius + arcGap;
  const bannerOffset = arcCenterOffset * 0.7;

  const revealStepMs = 70;
  const revealDurationMs = 260;
  const iconCount = technologies.length;

  return (
    <div className="relative flex items-center justify-center" style={{ width: '64px', height: '64px' }}>
      {/* Tech panel (wheel then banner) */}
      <>
        {/* Tech wheel container: perfect circle centered between bulb and arc */}
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: `${wheelSize}px`,
            height: `${wheelSize}px`,
            transform: `translate(calc(-50% - ${arcCenterOffset}px), -50%)`,
            pointerEvents: isOpen ? 'auto' : 'none'
          }}
          aria-hidden={!isOpen}
        >
          {technologies.map((tech, index) => {
            // Left half of a perfect circle (center sits between bulb and arc)
            const startAngle = Math.PI / 2;
            const endAngle = (3 * Math.PI) / 2;
            const angle =
              startAngle +
              ((endAngle - startAngle) / (technologies.length - 1)) * index;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const delayIndex = iconCount - 1 - index;

            return (
              <div
                key={index}
                className="absolute flex items-center justify-center group cursor-pointer hover:z-50 hover:scale-150 transition-transform duration-300"
                style={{
                  left: `${radius + x}px`,
                  top: `${radius + y}px`,
                  width: '32px',
                  height: '32px',
                  opacity: 1,
                  transform: `translate(-50%, -50%) scale(${isOpen ? 1 : 0})`,
                  transition: `transform ${revealDurationMs}ms ease`,
                  transitionDelay: isOpen ? `${delayIndex * revealStepMs}ms` : '0ms'
                }}
              >
                <div className="flex flex-col items-center relative">
                  <div
                    className="group p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer ring-2 ring-white/70 shadow-[0_6px_14px_rgba(0,0,0,0.25)]"
                    style={{ backgroundColor: tech.color }}
                  >
                    <tech.icon
                      className="w-6 h-6 text-white transition-colors duration-300"
                    />
                  </div>
                  {/* Tooltip */}
                  <div className="absolute right-full mr-2 -mt-1 px-3 py-1 bg-white rounded-lg shadow-lg pointer-events-none opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-transform duration-200 whitespace-nowrap z-20">
                    <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-white rotate-45"></div>
                    <span className="text-sm font-medium text-gray-800">{tech.name}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Text banner between wheel and bulb */}
        <div
          className="absolute left-1/2 top-1/2 -translate-y-1/2 text-white font-semibold text-center px-6 py-3 bg-primary-600 bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg w-[200px] sm:w-[200px] max-w-none"
          style={{
            transform: `translate(calc(-50% - ${bannerOffset}px), -50%) scale(${isOpen ? 1 : 0})`,
            transition: `transform ${revealDurationMs}ms ease`,
            transitionDelay: isOpen ? `${iconCount * revealStepMs}ms` : '0ms',
            pointerEvents: isOpen ? 'auto' : 'none'
          }}
          aria-hidden={!isOpen}
        >
          <p className="text-sm leading-snug">Here&apos;s the tech that went into this website</p>
        </div>
      </>

      {/* Bulb button */}
      <button
        className="relative group flex h-14 w-14 items-center justify-center bg-white text-primary-600 rounded-full transform transition-all duration-300 hover:scale-110 hover:shadow-[0_0_35px_rgba(250,204,21,0.8)] z-10 cursor-pointer"
        onClick={() => {
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setIsOpen(false);
          }
        }}
        aria-label="View Tech Stack"
      >
        <div className="absolute -inset-4 rounded-full bg-yellow-300/80 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-70"></div>
        <div className="absolute -inset-2 rounded-full bg-yellow-200 opacity-0 group-hover:opacity-40 transition-opacity duration-300 group-hover:animate-pulse"></div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </button>
    </div>
  );
};

export default TechWheelAnimation;
