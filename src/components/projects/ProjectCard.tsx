import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

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
  hasPdf: boolean;
  pdfPath: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const isEquipmentMarketplace = project.title.includes('Equipment Marketplace');
  const isMultiAgentRLWar = project.slug === 'multi-agent-rl-war';
  const isLiteratureReview = project.hasPdf;
  const thumbnailUrl = project.thumbnail || 'https://via.placeholder.com/600x400?text=No+Image';

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef}
      className="card group overflow-hidden transition-all duration-300 hover:shadow-lg relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-48">
        {(isEquipmentMarketplace || isMultiAgentRLWar) ? (
          <div className="w-full h-full relative">
            <iframe
              ref={iframeRef}
              src={project.liveUrl}
              className="w-full h-full border-0"
              title={project.title + ' Live Demo'}
              loading="lazy"
              sandbox="allow-same-origin allow-scripts"
            />
          </div>
        ) : (
          <img
            src={thumbnailUrl}
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        )}
        
        {/* Hover overlay with buttons */}
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center transition-opacity duration-300 p-4">
            <div className="space-y-3 w-full max-w-xs">
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
              <Link 
                to={`/projects/${project.slug}`} 
                className="w-full flex justify-center items-center px-4 py-2 rounded-full bg-white text-primary-600 font-medium border border-primary-100 transition-all duration-300 hover:shadow-lg hover:bg-primary-50 transform hover:-translate-y-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Source Code
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies && project.technologies.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700"
            >
              {typeof tech === 'string' ? tech : tech.name}
            </span>
          ))}
          {project.technologies && project.technologies.length > 3 && (
            <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 