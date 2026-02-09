import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ElectricBorder from '../ElectricBorder';

interface Technology {
  id?: number;
  name?: string;
}

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail: string | null;
  technologies: string[] | Technology[];
  liveUrl?: string;
  previewUrl?: string;
  hasPdf: boolean;
  pdfPath: string;
  showNewBadge?: boolean;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showAllTechnologies, setShowAllTechnologies] = useState(false);
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [iframeScale, setIframeScale] = useState(1);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const isEquipmentMarketplace = project.title.includes('Equipment Marketplace');
  const isMultiAgentRLWar = project.slug === 'multi-agent-rl-war';
  const isThesisCard = project.slug === 'my-thesis';
  const iframeUrl = project.previewUrl || project.liveUrl;
  const hasIframeUrl = Boolean(iframeUrl);
  const isNewProject = !hasIframeUrl && !project.hasPdf;
  const shouldShowLivePreview = hasIframeUrl && !project.hasPdf;
  const iframeViewportWidth = 1280;
  const iframeViewportHeight = 720;
  const thumbnailUrl = project.thumbnail || 'https://via.placeholder.com/600x400?text=No+Image';
  const pdfHref = project.pdfPath ? encodeURI(project.pdfPath) : '';

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!previewContainerRef.current) return;

    const container = previewContainerRef.current;
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const { width, height } = entry.contentRect;
      if (!width || !height) return;

      const scaleX = width / iframeViewportWidth;
      const scaleY = height / iframeViewportHeight;
      setIframeScale(Math.min(scaleX, scaleY));
    });

    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [iframeViewportHeight, iframeViewportWidth]);

  const handleIframeLoad = () => {
    setIsIframeLoading(false);
  };

  // Upper portion: image/iframe/PDF display area
  const upperPortion = (
    <div 
      className="relative overflow-hidden w-full"
      style={{ aspectRatio: '16 / 9' }}
    >
        {project.showNewBadge && (
          <span className="absolute top-2 right-2 z-[100] px-2.5 py-1 rounded-md font-bold text-xs uppercase tracking-wider bg-primary-600 text-white border border-primary-400 badge-new-pulse">
            New
          </span>
        )}
        {project.hasPdf && project.pdfPath ? (
          <div className={`w-full h-full relative ${isThesisCard ? 'z-10' : ''}`}>
            {isIframeLoading && (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mb-2"></div>
                  <p className="text-sm text-gray-600">Loading PDF...</p>
                </div>
              </div>
            )}
            <iframe
              ref={iframeRef}
              src={`${pdfHref}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&scrollbar=0&view=FitH`}
              className={`w-full h-full border-0 ${isThesisCard ? 'relative z-10' : ''}`}
              title={project.title + ' PDF Document'}
              loading="lazy"
              onLoad={handleIframeLoad}
              allow="fullscreen"
            />
          </div>
        ) : shouldShowLivePreview ? (
          <div ref={previewContainerRef} className="w-full h-full relative">
            {isIframeLoading && (
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center z-10">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200"></div>
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent absolute top-0 left-0"></div>
                  </div>
                  <p className="text-sm text-primary-700 mt-3 font-medium">Loading live website...</p>
                  <div className="flex space-x-1 mt-2">
                    <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <iframe
              ref={iframeRef}
              src={iframeUrl}
              className="w-full h-full border-0"
              title={project.title + ' Live Demo'}
              loading="lazy"
              sandbox="allow-same-origin allow-scripts"
              style={{
                width: `${iframeViewportWidth}px`,
                height: `${iframeViewportHeight}px`,
                transform: `scale(${iframeScale})`,
                transformOrigin: 'top left',
              }}
              onLoad={handleIframeLoad}
            />
          </div>
        ) : isNewProject ? (
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            <div className="text-center p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <p className="text-white text-sm font-medium">Not Live Currently.</p>
              <p className="text-gray-300 text-xs mt-1">Check Bala's GitHub</p>
            </div>
          </div>
        ) : (
          <img
            src={thumbnailUrl}
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        )}
        
        {/* Hover overlay with buttons */}
        {isHovered && !isNewProject && (
          <div className={`absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center transition-opacity duration-300 p-4 ${isThesisCard ? 'z-20' : ''}`}>
            <div className="space-y-3 w-full max-w-xs">
              {project.hasPdf && project.pdfPath ? (
                <>
                  <a 
                    href={pdfHref} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full flex justify-center items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium transition-all duration-300 hover:shadow-lg hover:from-primary-600 hover:to-primary-700 transform hover:-translate-y-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zM13 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V4zM13 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3z" clipRule="evenodd" />
                    </svg>
                    View
                  </a>
                  <a 
                    href={pdfHref} 
                    download
                    className="w-full flex justify-center items-center px-4 py-2 rounded-full bg-white text-primary-600 font-medium border border-primary-100 transition-all duration-300 hover:shadow-lg hover:bg-primary-50 transform hover:-translate-y-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Download
                  </a>
                </>
              ) : (
                <>
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full flex justify-center items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium transition-all duration-300 hover:shadow-lg hover:from-primary-600 hover:to-primary-700 transform hover:-translate-y-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      Website
                    </a>
                  )}
                  {/* Source Code Button for specific projects */}
                  {(isEquipmentMarketplace || isMultiAgentRLWar) && (
                    <a 
                      href={
                        isEquipmentMarketplace 
                          ? "https://github.com/Subramanyam6/MiniEquipmentMarketPlace"
                          : "https://github.com/Subramanyam6/Multi-Agent-War-Simulation-using-Reinforcement-Learning"
                      }
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full flex justify-center items-center px-4 py-2 rounded-full bg-white text-primary-600 font-medium border border-primary-100 transition-all duration-300 hover:shadow-lg hover:bg-primary-50 transform hover:-translate-y-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Source Code
                    </a>
                  )}
                  {/* Default Source Code Link for other projects */}
                  {!isEquipmentMarketplace && !isMultiAgentRLWar && (
                    <Link 
                      to={`/home/projects/${project.slug}`} 
                      className="w-full flex justify-center items-center px-4 py-2 rounded-full bg-white text-primary-600 font-medium border border-primary-100 transition-all duration-300 hover:shadow-lg hover:bg-primary-50 transform hover:-translate-y-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Source Code
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        )}
    </div>
  );

  // Lower portion: text details section
  const lowerPortion = (
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
        {project.title}
      </h3>
      {project.description && (
        <p className={`text-gray-600 mb-4 transition-all duration-300 ${isHovered ? '' : 'line-clamp-2'}`}>
          {project.description}
        </p>
      )}
      {project.technologies && project.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {(showAllTechnologies ? project.technologies : project.technologies.slice(0, 3)).map((tech, index) => (
            <span
              key={index}
              className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700"
            >
              {typeof tech === 'string' ? tech : tech.name}
            </span>
          ))}
          {project.technologies.length > 3 && !showAllTechnologies && (
            <button
              onClick={() => setShowAllTechnologies(true)}
              className="inline-block bg-primary-100 hover:bg-primary-200 rounded-full px-3 py-1 text-xs font-semibold text-primary-700 transition-colors duration-200 cursor-pointer"
            >
              +{project.technologies.length - 3} more
            </button>
          )}
          {showAllTechnologies && project.technologies.length > 3 && (
            <button
              onClick={() => setShowAllTechnologies(false)}
              className="inline-block bg-gray-200 hover:bg-gray-300 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 transition-colors duration-200 cursor-pointer"
            >
              Show less
            </button>
          )}
        </div>
      )}
    </div>
  );

  // Wrap only the upper portion with ElectricBorder for thesis card
  const wrappedUpperPortion = isThesisCard ? (
    <div className="relative" style={{ padding: '8px' }}>
      <ElectricBorder 
        color="#7c3aed" 
        speed={1.7} 
        chaos={0.16} 
        borderRadius={12}
        className="rounded-lg thunder-border"
      >
        {upperPortion}
      </ElectricBorder>
    </div>
  ) : upperPortion;

  return (
    <div 
      ref={cardRef}
      className={`card group transition-all duration-300 hover:shadow-lg relative ${isThesisCard ? 'overflow-visible' : 'overflow-hidden'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {wrappedUpperPortion}
      {lowerPortion}
    </div>
  );
};

export default ProjectCard; 
