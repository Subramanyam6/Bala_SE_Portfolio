import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RobotAnimation from '../components/welcome/RobotAnimation';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';

// Custom CSS for advanced animations
const customStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes glow {
    0%, 100% { text-shadow: 0 0 40px rgba(14, 165, 233, 0.4); }
    50% { text-shadow: 0 0 60px rgba(14, 165, 233, 0.7), 0 0 80px rgba(2, 132, 199, 0.5); }
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  .float-animation {
    animation: float 6s ease-in-out infinite;
  }
  
  .glow-animation {
    animation: glow 4s ease-in-out infinite;
  }
  
  .shimmer-text {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    background-size: 200% 100%;
    animation: shimmer 3s infinite;
    -webkit-background-clip: text;
    background-clip: text;
  }
  
  .glass-morphism {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  
  .button-glow:hover {
    box-shadow: 0 0 30px rgba(14, 165, 233, 0.6), 0 0 60px rgba(2, 132, 199, 0.4);
  }
`;

// Apple-style greeting transition component
const GreetingTransition: React.FC<{ loaded: boolean }> = ({ loaded }) => {
  const greetings = [
    { text: 'Hello', lang: 'English' },
    { text: 'नमस्ते', lang: 'Hindi' },
    { text: 'నమస్తే', lang: 'Telugu' }
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
      }, 500); // Half second for fade out
      
    }, 3000); // Change every 3 seconds
    
    return () => clearInterval(interval);
  }, [loaded, greetings.length]);
  
  return (
    <span 
      className={`transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      {greetings[currentIndex].text}
    </span>
  );
};

const WelcomePage: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };

  const particlesLoaded = async () => {
    // Particles loaded successfully
  };
  
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
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      <div 
        className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-400 text-white w-screen"
      >
      {/* Enhanced Particles background - full width */}
      <div className="absolute inset-0 z-0 pointer-events-none w-full">
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: { color: { value: "transparent" } },
            fpsLimit: 120,
            interactivity: {
              events: {
                onHover: { enable: true, mode: ["repulse", "bubble"] },
                onClick: { enable: true, mode: "push" },
                resize: true,
              },
              modes: {
                repulse: { distance: 120, duration: 0.4 },
                bubble: { distance: 200, size: 8, duration: 0.4 },
                push: { quantity: 3 },
              },
            },
            particles: {
              color: { 
                value: ["#0ea5e9", "#0284c7", "#0369a1", "#38bdf8", "#7dd3fc"] 
              },
              number: { value: 80, density: { enable: true, area: 800 } },
              shape: { 
                type: ["circle", "triangle", "polygon"],
                polygon: { nb_sides: 6 }
              },
              opacity: {
                value: 0.7,
                random: { enable: true, minimumValue: 0.3 },
                animation: {
                  enable: true,
                  speed: 0.5,
                  minimumValue: 0.3,
                  sync: false
                }
              },
              size: {
                value: { min: 1, max: 6 },
                random: true,
                animation: {
                  enable: true,
                  speed: 2,
                  minimumValue: 1,
                  sync: false
                }
              },
              move: {
                enable: true,
                speed: { min: 0.5, max: 2 },
                direction: "none",
                random: true,
                straight: false,
                outModes: "out",
                attract: {
                  enable: true,
                  rotateX: 600,
                  rotateY: 600
                }
              },
              links: {
                enable: true,
                distance: 150,
                color: "#0ea5e9",
                opacity: 0.3,
                width: 1,
                triangles: {
                  enable: true,
                  color: "#38bdf8",
                  opacity: 0.1
                }
              },
            },
            detectRetina: true,
          }}
        />
      </div>

      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-r from-primary-500/20 to-primary-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-r from-primary-400/20 to-primary-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-primary-300/10 to-primary-400/10 rounded-full blur-2xl animate-ping"></div>
      </div>
      
      {/* Content container - constrained width for text, but allows robot to be full width */}
      <div className="flex flex-col flex-1 w-full relative z-10">
        {/* Welcome message section with glassmorphism - constrained width */}
        <div className="pt-16 pb-4 text-center z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Glassmorphism Container */}
          <div className="glass-morphism float-animation backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 sm:p-12 shadow-2xl mb-8">
            
            {/* Namaste Text Section - Perfectly Centered */}
            <div className="text-center mb-8">
              <div className="overflow-hidden">
                <h1 
                  className={`glow-animation shimmer-text relative font-black tracking-tight mb-6 bg-gradient-to-r from-white via-primary-100 to-primary-200 bg-clip-text text-transparent opacity-0 transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0 scale-100' : 'translate-y-10 scale-95'}`}
                  style={{
                    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                    filter: 'drop-shadow(0 0 30px rgba(14, 165, 233, 0.4))',
                    textShadow: '0 0 40px rgba(14, 165, 233, 0.3)',
                    fontSize: 'clamp(3rem, 8vw, 8rem)'
                  }}
                >
                  <GreetingTransition loaded={loaded} />
                </h1>
              </div>
              
              {/* Robot positioned to float above separator line */}
              <div className="relative flex justify-center">
                <div 
                  className={`absolute opacity-0 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0 scale-100' : 'translate-y-10 scale-95'}`}
                  style={{ 
                    height: '300px', 
                    width: '350px',
                    right: '-0%', // Slightly more to the right
                    top: '-240px' // Position so robot's feet touch the separator line
                  }}
                >
                  <RobotAnimation />
                </div>
              </div>
            </div>
            
            <div className="overflow-hidden mb-6 mt-4">
              <div 
                className={`h-1 bg-gradient-to-r from-transparent via-primary-300 to-transparent rounded-full opacity-0 transition-all duration-1000 delay-200 ${loaded ? 'opacity-100 scale-x-100' : 'scale-x-0'}`}
              />
            </div>
            
            <div className="overflow-hidden">
              <div 
                className={`relative max-w-3xl mx-auto opacity-0 transition-all duration-1000 delay-400 ${loaded ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}
                style={{
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-primary-100 to-primary-200 bg-clip-text text-transparent">
                  I'm <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-primary-300 to-primary-200 bg-clip-text text-transparent font-black">
                      Bala Subramanyam
                    </span>
                    <span className="absolute -right-2 top-0 text-2xl">✨</span>
                  </span>
                </div>
                
                <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed font-light">
                  Full Stack Software Engineer & AI Researcher
                </p>
                
                <p className="text-base sm:text-lg text-white/80 mt-4 leading-relaxed">
                  Crafting modern web experiences and exploring intelligent solutions 
                  <span className="inline-block ml-2 animate-bounce">🚀</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Modern CTA Section - constrained width */}
        <div className="pb-16 pt-4 w-full flex flex-col items-center z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Multiple Modern Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Link 
              to="/home" 
              className={`button-glow group relative inline-flex items-center px-8 py-4 sm:px-10 sm:py-5 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-2xl opacity-0 transition-all duration-1000 delay-600 transform hover:scale-105 hover:shadow-primary-500/25 ${loaded ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}
              style={{
                boxShadow: '0 20px 40px rgba(14, 165, 233, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
              }}
            >
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-400 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
              <span className="relative z-10 text-lg sm:text-xl font-bold tracking-wide">
                Explore Portfolio
              </span>
              <svg 
                className="ml-3 h-6 w-6 transform transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M3 10a1 1 0 011-1h10.586l-2.293-2.293a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </Link>

            <a 
              href="#contact" 
              className={`group relative inline-flex items-center px-8 py-4 sm:px-10 sm:py-5 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 text-white shadow-xl opacity-0 transition-all duration-1000 delay-700 transform hover:scale-105 hover:bg-white/20 ${loaded ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}
            >
              <span className="relative z-10 text-lg sm:text-xl font-semibold tracking-wide">
                Get In Touch
              </span>
              <svg 
                className="ml-3 h-6 w-6 transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </a>
          </div>

          {/* Floating Social Icons */}
          <div className={`flex gap-6 mt-8 opacity-0 transition-all duration-1000 delay-800 ${loaded ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}>
            <a 
              href="https://linkedin.com/in/bala-subramanyam" 
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-full backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-primary-500/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary-500/25"
            >
              <svg className="w-6 h-6 text-primary-300 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            
            <a 
              href="https://github.com/bala-subramanyam" 
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-full backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-gray-500/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-gray-500/25"
            >
              <svg className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            
            <a 
              href="mailto:subramanyam.duggirala@outlook.com"
              className="group p-3 rounded-full backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-primary-500/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary-500/25"
            >
              <svg className="w-6 h-6 text-primary-300 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.749L12 9.5l9.615-5.679h.749c.904 0 1.636.732 1.636 1.636z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default WelcomePage; 