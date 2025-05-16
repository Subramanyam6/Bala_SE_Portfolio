import { useState, useEffect, useRef } from 'react';
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
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isEquipmentMarketplace = project.title.includes('Equipment Marketplace');

  // Default placeholder image if thumbnail is null
  const thumbnailUrl = project.thumbnail || 'https://via.placeholder.com/600x400?text=No+Image';

  // Load iframe only when in viewport for better performance
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set up intersection observer to detect when card is in viewport
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
        {isEquipmentMarketplace && isInView ? (
          <div className="w-full h-full relative">
            <iframe 
              ref={iframeRef}
              src="https://miniequipmarketplace-factgzd7cpeabne8.canadacentral-01.azurewebsites.net"
              className="w-full h-full border-0"
              title="Equipment Marketplace Live Demo"
              loading="lazy"
              sandbox="allow-same-origin allow-scripts"
            />
            {!isHovered && (
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <div className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Hover to interact
                </div>
              </div>
            )}
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
                  className="w-full btn bg-primary-600 text-white hover:bg-primary-700 flex justify-center"
                >
                  Go to Website
                </a>
              )}
              <Link 
                to={`/projects/${project.slug}`} 
                className="w-full btn bg-white text-primary-600 hover:bg-gray-100 flex justify-center"
              >
                View Details
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