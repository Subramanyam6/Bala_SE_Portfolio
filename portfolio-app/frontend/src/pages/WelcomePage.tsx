declare global {
  interface Window {
    popupTimeoutRef?: ReturnType<typeof setTimeout>;
  }
}
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

// Contact Popup Component
const ContactPopup: React.FC<{ isVisible: boolean; onClose: () => void; setShowCopyBanner: (show: boolean) => void }> = ({
  isVisible,
  onClose,
  setShowCopyBanner,
}) => {
  const navigate = useNavigate();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('bduggirala2@huskers.unl.edu');
      setShowCopyBanner(true);
      setTimeout(() => setShowCopyBanner(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
    onClose();
  };

  const goToContact = () => {
    navigate('/home/contact');
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div
      className="absolute left-full top-1/2 transform -translate-y-1/2 ml-0 z-50 bg-white/90 rounded-2xl shadow-xl border border-gray-300 p-4 w-72 backdrop-blur-md transition-all duration-300"
      data-contact-popup="true"
      style={{
        animation: isVisible ? 'popup-appear 0.5s ease-out forwards' : 'popup-disappear 0.5s ease-in forwards',
      }}
    >
      <div className="space-y-3">
        <button
          onClick={goToContact}
          className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-all duration-150 border border-transparent hover:border-primary-200 group"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 mr-3 group-hover:scale-110 transition-transform">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </span>
          <span className="group-hover:translate-x-1 transition-transform duration-150 font-medium text-left">This website can send emails to Bala!</span>
        </button>

        <button
          onClick={copyEmail}
          className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-150 border border-transparent hover:border-blue-200 group"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 mr-3 group-hover:scale-110 transition-transform">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </span>
          <span className="group-hover:translate-x-1 transition-transform duration-150 font-medium text-left">Or Copy Bala's Email</span>
        </button>
      </div>

      {/* Tooltip arrow */}
      <div className="absolute left-0 top-0 transform -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white/90 border border-gray-300 w-4 h-4 shadow-md backdrop-blur-md" />
    </div>
  );
};

const WelcomePage: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [contactPopupVisible, setContactPopupVisible] = useState(false);
  const [showCopyBanner, setShowCopyBanner] = useState(false);

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

  const handleContactClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setContactPopupVisible(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('[data-contact-popup]') && !target.closest('[data-contact-button]')) {
      setContactPopupVisible(false);
    }
  };

  useEffect(() => {
    if (contactPopupVisible) {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [contactPopupVisible]);

  const closePopup = () => {
    setContactPopupVisible(false);
    if (window.popupTimeoutRef) {
      clearTimeout(window.popupTimeoutRef);
    }
  };

  return (
    <>
      {/* Inject custom styles */}
      <style
        dangerouslySetInnerHTML={{
          __html:
            customStyles +
            `
        @keyframes popup-appear {
          from { opacity: 0; transform: translateY(-10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes popup-disappear {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(-10px) scale(0.95); }
        }
      `,
        }}
      />

      {/* Copy banner */}
      {showCopyBanner && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          Email copied to clipboard!
        </div>
      )}

      {/* Contact Popup removed from here */}
      
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
          <div className="glass-morphism float-animation transform scale-95 backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl px-8 py-4 sm:px-12 sm:py-6 shadow-2xl mb-6">
            
            {/* Namaste Text Section - Perfectly Centered */}
            <div className="text-center mb-8">
              <div className="overflow-hidden">
                <h1
                  className={`glow-animation relative font-black tracking-tight leading-relaxed mb-6 text-white opacity-0 transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0 scale-100' : 'translate-y-10 scale-95'} glow-animation z-20`}
                  style={{
                    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                    textShadow:
                      '0 0 20px rgba(255, 255, 255, 0.6), 0 0 40px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 1)',
                    fontSize: 'clamp(3rem, 8vw, 8rem)',
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
                    top: '-240px', // Position so robot's feet touch the separator line
                    pointerEvents: 'auto' // Ensure robot is interactive
                  }}
                  onMouseEnter={() => {
                    // Add hover effect
                  }}
                  onMouseLeave={() => {
                    // Remove hover effect
                  }}
                  onClick={() => {
                    // Handle click
                  }}
                >
                  <div 
                    style={{ width: '100%', height: '100%', cursor: 'pointer' }}
                    className="hover:scale-105 transition-transform duration-300"
                  >
                    <RobotAnimation />
                  </div>
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
                    <span className="text-white font-black">
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
          {/* Navigation-style Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <Link 
              to="/home"
              className={`inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/90 text-primary-700 font-semibold shadow-md 
     transform transition-all duration-300 ease-in-out 
     hover:scale-105 hover:shadow-2xl 
     hover:ring-4 hover:ring-primary-300 ring-opacity-50 
     hover:bg-white hover:text-primary-900 
     text-lg sm:text-xl 
     opacity-0 delay-600 ${loaded ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}
            >
              Explore Portfolio
            </Link>
            <div className="relative inline-block">
              <a
                href="#contact"
                onClick={handleContactClick}
                data-contact-button="true"
                className={`inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/90 text-primary-700 font-semibold shadow-md 
     transform transition-all duration-300 ease-in-out 
     hover:scale-105 hover:shadow-2xl 
     hover:ring-4 hover:ring-primary-300 ring-opacity-50 
     hover:bg-white hover:text-primary-900 
     text-lg sm:text-xl 
     opacity-0 delay-600 ${loaded ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}
              >
                Get In Touch
              </a>
              <ContactPopup
                isVisible={contactPopupVisible}
                onClose={closePopup}
                setShowCopyBanner={setShowCopyBanner}
              />
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
          <small className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-gray-300" style={{ fontSize: '0.8rem' }}>
            <span className="flex items-center gap-1">
              Made with{' '}
              <span 
                role="img" 
                aria-label="fire"
                className="text-orange-400"
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
                className="text-blue-300 hover:text-blue-100 hover:underline transition-all duration-200 cursor-pointer relative z-40 inline-block px-1 py-0.5 rounded hover:bg-blue-600/20"
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