import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RobotAnimation from '../components/welcome/RobotAnimation';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';

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
    <div 
      className="min-h-screen flex flex-col relative overflow-hidden bg-white"
    >
      {/* Particles background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: "#ffffff",
              },
            },
            fpsLimit: 60,
            particles: {
              color: {
                value: "#4f46e5",
              },
              links: {
                color: "#4f46e5",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
              },
              move: {
                enable: true,
                speed: 0.8,
                direction: "none",
                random: true,
                straight: false,
                outModes: "out",
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 30,
              },
              opacity: {
                value: 0.3,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 3 },
              },
            },
            detectRetina: true,
          }}
        />
      </div>
      
      {/* Welcome message section */}
      <div className="pt-16 pb-4 text-center z-10">
        <div className="overflow-hidden">
          <h1 
            className={`relative text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-primary-600 inline-block
              after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-primary-600 after:transform transition-all duration-1000 
              ${loaded ? 'after:translate-x-0' : 'after:-translate-x-full'}
              ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
            style={{
              textShadow: '2px 2px 4px rgba(79, 70, 229, 0.2)',
              fontFamily: 'Poppins, sans-serif',
              backgroundImage: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Namaste!
          </h1>
        </div>
        
        <div className="overflow-hidden">
          <p 
            className={`relative text-xl md:text-2xl text-gray-700 max-w-xl mx-auto transition-all duration-1000 delay-300
              ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            <span className="inline-block animate-fade-in-up"
                style={{ animationDelay: '0.4s' }}>I'm</span>
                <span> </span>
            <span className="font-semibold inline-block animate-fade-in-up"
                style={{ animationDelay: '0.6s', color: '#4f46e5' }}>Bala Subramanyam</span>
            <span className="inline-block animate-fade-in-up font-semibold"
                style={{ animationDelay: '0.8s' }}>, Full Stack SE </span>
                <span> & </span>
            <span className="inline-block animate-fade-in-up font-semibold"
                style={{ animationDelay: '1.0s' }}>AI Researcher</span>
                <br></br>
                <span>Note: This Website is under construction :)</span>
          </p>
        </div>
      </div>
      
      {/* Robot animation in the middle */}
      <div className="flex-1 my-4 z-10 relative">
        <RobotAnimation />
      </div>
      
      {/* Check out my portfolio button */}
      <div className="pb-16 pt-4 w-full flex justify-center z-10">
        <Link 
          to="/home" 
          className={`group relative inline-flex items-center px-8 py-3 overflow-hidden rounded-full bg-primary-600 text-white shadow-lg transition-all duration-300 hover:bg-primary-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          } transition-all duration-1000 delay-500`}
        >
          <span className="relative z-10 font-medium">Check out my portfolio</span>
          <span className="absolute bottom-0 left-0 h-1 w-0 bg-white rounded-full mb-0 group-hover:w-full group-hover:opacity-70 transition-all duration-500 ease-out"></span>
          <svg 
            className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage; 