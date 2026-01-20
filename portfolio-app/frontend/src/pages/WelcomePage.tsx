import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RobotAnimation from '../components/welcome/RobotAnimation';
import Hyperspeed from '../components/Hyperspeed';
import { hyperspeedPresets } from '../components/HyperSpeedPresets';
import { GitHubIcon, GITHUB_URL, LinkedInIcon, LINKEDIN_URL } from '../components/SocialIcons';

// Custom CSS for advanced animations
const customStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes glow {
    0%, 100% { text-shadow: 0 0 18px rgba(2, 132, 199, 0.25); }
    50% { text-shadow: 0 0 28px rgba(2, 132, 199, 0.45), 0 0 44px rgba(56, 189, 248, 0.35); }
  }
  
  .float-animation {
    animation: float 6s ease-in-out infinite;
  }
  
  .glow-animation {
    animation: glow 4s ease-in-out infinite;
  }
  
  .glass-morphism {
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid rgba(2, 132, 199, 0.16);
    box-shadow: 0 18px 48px rgba(2, 132, 199, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.7);
  }
  
  .button-glow:hover {
    box-shadow: 0 0 24px rgba(2, 132, 199, 0.45), 0 0 48px rgba(56, 189, 248, 0.3);
  }
  @keyframes glitch-shift {
    0%, 100% { transform: translate(0, 0); }
    20% { transform: translate(1px, -1px); }
    40% { transform: translate(-1px, 1px); }
    60% { transform: translate(2px, 0); }
    80% { transform: translate(-2px, -1px); }
  }

  @keyframes scanline {
    0% { background-position: 0 0; opacity: 0.6; }
    100% { background-position: 0 100%; opacity: 0.2; }
  }

  @keyframes flicker {
    0%, 100% { opacity: 1; text-shadow: 0 0 10px rgba(56, 189, 248, 0.45); }
    30% { opacity: 0.85; text-shadow: 0 0 16px rgba(56, 189, 248, 0.55); }
    60% { opacity: 0.95; text-shadow: 0 0 8px rgba(34, 197, 94, 0.35); }
    80% { opacity: 0.9; text-shadow: 0 0 14px rgba(56, 189, 248, 0.5); }
  }

  @keyframes pulse-glow {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  .glitch-date {
    position: relative;
    font-family: "Courier New", Courier, monospace;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 600;
    background: linear-gradient(90deg, #0ea5e9, #38bdf8, #0ea5e9);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s ease-in-out infinite, flicker 2.8s infinite;
  }

  .glitch-date::before,
  .glitch-date::after {
    content: attr(data-text);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    overflow: hidden;
    pointer-events: none;
    mix-blend-mode: difference;
    animation: glitch-shift 2s infinite;
  }

  .glitch-date::before {
    color: #38bdf8;
    opacity: 0.7;
    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
  }

  .glitch-date::after {
    color: #22c55e;
    animation-duration: 2.5s;
    opacity: 0.5;
    clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
  }

  .status-badge {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1.25rem;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: 9999px;
    box-shadow: 0 4px 20px rgba(2, 132, 199, 0.15), 
                0 0 0 1px rgba(2, 132, 199, 0.1) inset;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .status-badge:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(2, 132, 199, 0.25), 
                0 0 0 1px rgba(2, 132, 199, 0.15) inset;
  }

  .status-indicator {
    position: relative;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .status-indicator.active {
    background: linear-gradient(135deg, #10b981, #34d399);
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.2),
                0 0 12px rgba(16, 185, 129, 0.4);
    animation: pulse-glow 2s ease-in-out infinite;
  }

  .status-indicator.inactive {
    background: linear-gradient(135deg, #e5e7eb, #d1d5db);
    box-shadow: 0 0 0 2px rgba(148, 163, 184, 0.2);
  }
  .greeting-text {
    display: inline-block;
    padding-block: 0.2em;
    -webkit-font-smoothing: antialiased;
    will-change: opacity;
  }
`;

// Apple-style greeting transition component
const GreetingTransition: React.FC<{ loaded: boolean }> = ({ loaded }) => {
  const greetings = [
    { text: 'Hello!', lang: 'English' },
    { text: 'नमस्ते!', lang: 'Hindi' },
    { text: 'నమస్తే!', lang: 'Telugu' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!loaded) return;

    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % greetings.length);
        setIsVisible(true);
      }, 300); // Faster, smoother transition

    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [loaded, greetings.length]);

  return (
    <span
      className={`greeting-text transition-opacity duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        transitionTimingFunction: 'ease-in-out'
      }}
    >
      {greetings[currentIndex].text}
    </span>
  );
};

const WelcomePage: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const statusTimestamp = new Date().toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'America/Chicago',
  });

  useEffect(() => {
    // Add a small delay for animation purposes
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Inject custom styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: customStyles,
        }}
      />

      <div 
        className="min-h-screen flex flex-col relative overflow-hidden bg-primary-50 text-slate-900 w-screen"
      >
      {/* Hyperspeed background - centered with golden theme */}
      <div className="absolute inset-0 z-0 pointer-events-none w-full h-full flex items-center justify-center">
        <div className="w-full h-full">
          <Hyperspeed effectOptions={hyperspeedPresets.six} />
        </div>
      </div>
      
      {/* Content container - constrained width for text, but allows robot to be full width */}
      <div className="flex flex-col flex-1 w-full relative z-10">
        {/* Welcome message section with glassmorphism - constrained width */}
        <div className="pt-16 pb-4 text-center z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Glassmorphism Container */}
          <div className="glass-morphism float-animation transform scale-95 bg-white/85 rounded-3xl px-8 py-4 sm:px-12 sm:py-6 shadow-2xl mb-6">
            
            {/* Namaste Text Section - Perfectly Centered */}
            <div className="text-center mb-8">
              <div className="overflow-hidden">
                <h1
                  className={`glow-animation relative font-black tracking-tight leading-relaxed mb-6 text-primary-600 opacity-0 transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0 scale-100' : 'translate-y-10 scale-95'} glow-animation z-20`}
                  style={{
                    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                    textShadow:
                      '0 0 16px rgba(2, 132, 199, 0.25), 0 0 30px rgba(56, 189, 248, 0.25)',
                    fontSize: 'clamp(3rem, 8vw, 8rem)',
                  }}
                >
                  <GreetingTransition loaded={loaded} />
                </h1>
              </div>
              
              {/* Robot positioned to float above separator line */}
              <div className="relative h-0">
                <div
                  className={`absolute right-0 -top-[240px] h-[300px] w-[350px] pointer-events-auto z-30 opacity-0 transition-all duration-1000 delay-300 ${
                    loaded ? 'opacity-100 translate-y-0 scale-100' : 'translate-y-10 scale-95'
                  }`}
                >
                  <div className="h-full w-full cursor-pointer transition-transform duration-300 hover:scale-105">
                    <RobotAnimation />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="overflow-hidden mb-6 mt-4">
              <div 
                className={`h-1 bg-gradient-to-r from-transparent via-primary-200 to-transparent rounded-full opacity-0 transition-all duration-1000 delay-200 ${loaded ? 'opacity-100 scale-x-100' : 'scale-x-0'}`}
              />
            </div>
            
            <div className="overflow-hidden">
              <div 
                className={`relative max-w-3xl mx-auto opacity-0 transition-all duration-1000 delay-400 ${loaded ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}
                style={{
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-primary-600">
                  I'm <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent font-black">
                      Bala Subramanyam
                    </span>
                  </span>
                </div>
                
                <p className="text-lg sm:text-xl md:text-2xl text-primary-700 leading-relaxed font-semibold">
                AI & ML Engineer
                </p>
                
                <div className="mt-6 w-full">
                  <div className="relative mx-auto max-w-4xl">
                    {/* Status badges - modern pill design */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4">
                      <div className="status-badge">
                        <span className="status-indicator active"></span>
                        <span className="text-sm sm:text-base font-semibold text-primary-700">
                          Actively seeking opportunities
                        </span>
                      </div>
                      
                      <div className="status-badge opacity-60">
                        <span className="status-indicator inactive"></span>
                        <span className="text-sm sm:text-base font-medium text-primary-600/70">
                          Currently working (details soon)
                        </span>
                      </div>
                    </div>

                    {/* Glitch date - modern floating style */}
                    <div className="flex justify-center mt-4">
                      <div
                        className="glitch-date text-xs sm:text-sm"
                        data-text={statusTimestamp}
                      >
                        {statusTimestamp}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Modern CTA Section - constrained width */}
        <div className="pb-16 pt-4 w-full flex flex-col items-center z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation-style Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <Link 
              to="/home"
              className={`inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/95 text-primary-700 font-semibold shadow-md border border-primary-200
     transform transition-all duration-300 ease-in-out 
     hover:scale-105 hover:shadow-2xl 
     hover:ring-4 hover:ring-primary-200 ring-opacity-50 
     hover:bg-primary-600 hover:text-white 
     text-lg sm:text-xl 
     opacity-0 delay-600 ${loaded ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}
            >
              Explore Portfolio
            </Link>
            <div className="relative inline-block">
              <Link
                to="/home/contact"
                className={`inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/95 text-primary-700 font-semibold shadow-md border border-primary-200
     transform transition-all duration-300 ease-in-out 
     hover:scale-105 hover:shadow-2xl 
     hover:ring-4 hover:ring-primary-200 ring-opacity-50 
     hover:bg-primary-600 hover:text-white 
     text-lg sm:text-xl 
     opacity-0 delay-600 ${loaded ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}
              >
                Get In Touch
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary-700 border-t border-primary-600/50 py-6 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4">
            <small className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-primary-50" style={{ fontSize: '0.8rem' }}>
              <span className="flex items-center gap-1">
                Made with{' '}
                <span 
                  role="img" 
                  aria-label="fire"
                  className="text-orange-200"
                >
                  🔥
                </span>{' '}
                by Bala Subramanyam
              </span>
              <span className="hidden sm:inline text-white/60">·</span>
              <span>
                © 2023–<span id="current-year">2025</span> Bala Subramanyam.{' '}
                <a
                  href="/LICENSE"
                  target="_blank"
                  rel="license noopener noreferrer"
                  className="text-sky-200 hover:text-sky-100 hover:underline transition-all duration-200 cursor-pointer relative z-40 inline-block px-1 py-0.5 rounded hover:bg-sky-600/30"
                  style={{ textDecoration: 'none' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecoration = 'none';
                  }}
                >
                  MIT License
                </a>
                <span className="sr-only">SPDX-License-Identifier: MIT</span>
              </span>
            </small>
            <div className="flex items-center gap-3">
              <a
                href={LINKEDIN_URL}
                title="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group p-2.5 rounded-full bg-[#0A66C2] hover:bg-[#004182] transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer"
              >
                <LinkedInIcon className="w-5 h-5 text-white group-hover:text-primary-100 transition-colors duration-300" />
              </a>
              <a
                href={GITHUB_URL}
                title="GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group p-2.5 rounded-full bg-[#181717] hover:bg-[#0f1419] transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer"
              >
                <GitHubIcon className="w-5 h-5 text-white group-hover:text-gray-100 transition-colors duration-300" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Script to update current year */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const currentYearElement = document.getElementById('current-year');
              if (currentYearElement) {
                currentYearElement.textContent = new Date().getFullYear().toString();
              }
            })();
          `
        }}
      />
    </div>
    </>
  );
};

export default WelcomePage; 
