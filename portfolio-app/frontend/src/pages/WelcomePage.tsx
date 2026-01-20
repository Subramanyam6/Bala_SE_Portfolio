import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RobotAnimation from '../components/welcome/RobotAnimation';
import Hyperspeed from '../components/Hyperspeed';
import { hyperspeedPresets } from '../components/HyperSpeedPresets';

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
                Software Engineer (AI/ML, GIS, Data)
                </p>
                
                <p className="text-base sm:text-lg text-primary-700/80 mt-4 leading-relaxed">
                  I am actively seeking a challenging and rewarding opportunity
                </p>
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

          {/* Floating Social Icons */}
          <div className={`flex gap-6 mt-8 opacity-0 transition-all duration-1000 delay-800 ${loaded ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}>
            <a 
              href="https://www.linkedin.com/in/balasubramanyamd" 
              title="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group p-3 rounded-full bg-[#0A66C2] hover:bg-[#004182] transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer"
            >
              <svg className="w-6 h-6 text-white group-hover:text-primary-100 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            
            <a 
              href="https://github.com/Subramanyam6" 
              title="GitHub"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group p-3 rounded-full bg-[#181717] hover:bg-[#0f1419] transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer"
            >
              <svg className="w-6 h-6 text-white group-hover:text-gray-100 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary-700 border-t border-primary-600/50 py-6 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
