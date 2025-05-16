import { useState, useEffect, useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface TechStackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TechStackModal: React.FC<TechStackModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const frontendTech = [
    { name: 'React', icon: '⚛️', description: 'JavaScript library for building user interfaces' },
    { name: 'TypeScript', icon: '📝', description: 'Typed superset of JavaScript' },
    { name: 'Tailwind CSS', icon: '🎨', description: 'Utility-first CSS framework' },
    { name: 'Formik', icon: '📋', description: 'Form management library for React' },
    { name: 'React Router', icon: '🧭', description: 'Routing library for React applications' },
  ];

  const backendTech = [
    { name: 'Java', icon: '☕', description: 'Object-oriented programming language' },
    { name: 'Spring Boot', icon: '🍃', description: 'Java-based framework for building web applications' },
    { name: 'MongoDB', icon: '🍃', description: 'NoSQL database' },
    { name: 'JWT', icon: '🔑', description: 'JSON Web Token for authentication' },
  ];

  const devOpsTech = [
    { name: 'Docker', icon: '🐳', description: 'Platform for containerized applications' },
    { name: 'GitHub Actions', icon: '🔄', description: 'CI/CD workflow automation' },
    { name: 'AWS', icon: '☁️', description: 'Cloud computing services' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div 
        ref={modalRef} 
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all"
        style={{ animation: 'modal-pop 0.3s ease-out forwards' }}
      >
        <div className="p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          <div className="mb-8 text-center">
            <div className="inline-block p-4 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Technology Stack</h2>
            <p className="text-lg text-gray-600">
              Powerful technologies used to build this portfolio
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Frontend */}
            <div className="bg-gradient-to-b from-blue-50 to-transparent rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center">
                <span className="mr-2">💻</span> Frontend
              </h3>
              <ul className="space-y-4">
                {frontendTech.map((tech, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-xl">{tech.icon}</span>
                    <div>
                      <h4 className="font-medium text-gray-900">{tech.name}</h4>
                      <p className="text-sm text-gray-600">{tech.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Backend */}
            <div className="bg-gradient-to-b from-green-50 to-transparent rounded-lg p-6">
              <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center">
                <span className="mr-2">🖥️</span> Backend
              </h3>
              <ul className="space-y-4">
                {backendTech.map((tech, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-xl">{tech.icon}</span>
                    <div>
                      <h4 className="font-medium text-gray-900">{tech.name}</h4>
                      <p className="text-sm text-gray-600">{tech.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* DevOps */}
            <div className="bg-gradient-to-b from-purple-50 to-transparent rounded-lg p-6">
              <h3 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
                <span className="mr-2">⚙️</span> DevOps
              </h3>
              <ul className="space-y-4">
                {devOpsTech.map((tech, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-xl">{tech.icon}</span>
                    <div>
                      <h4 className="font-medium text-gray-900">{tech.name}</h4>
                      <p className="text-sm text-gray-600">{tech.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes modal-pop {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default TechStackModal; 