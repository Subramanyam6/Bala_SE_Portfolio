import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import ReactPlayer from 'react-player/lazy';
import { projectService } from '../services/api';

interface Technology {
  id: number;
  name: string;
  icon?: string;
}

interface Tag {
  id: number;
  name: string;
}

interface Video {
  id: number;
  title: string;
  url: string;
  thumbnail?: string;
  description?: string;
}

interface Image {
  id: number;
  url: string;
  altText?: string;
}

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  thumbnail: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  userId: number;
  username: string;
  technologies: Technology[];
  tags: Tag[];
  videos: Video[];
  images: Image[];
}

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        setError(null);
        const data = await projectService.getProjectBySlug(slug);
        setProject(data);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Failed to load project details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  // Dummy project content based on slug
  const getProjectContent = () => {
    // You can customize this function to return different content based on slug
    return {
      title: slug?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'Project Details',
      description: 'This is a detailed overview of this innovative project.',
      content: `
        <h2>Project Overview</h2>
        <p>This project was developed to address specific needs in the target market. The primary goal was to create a solution that is both user-friendly and technically robust.</p>
        
        <h2>Technical Challenges</h2>
        <p>During development, several challenges were encountered, particularly in:</p>
        <ul>
          <li>Optimizing database queries for better performance</li>
          <li>Implementing secure authentication mechanisms</li>
          <li>Creating a responsive and intuitive user interface</li>
          <li>Ensuring cross-browser compatibility</li>
        </ul>
        
        <h2>Key Features</h2>
        <p>The project includes several key features that set it apart:</p>
        <ul>
          <li>Advanced search functionality</li>
          <li>Real-time notifications</li>
          <li>User preference customization</li>
          <li>Comprehensive analytics dashboard</li>
          <li>Seamless third-party integrations</li>
        </ul>
        
        <h2>Technologies Used</h2>
        <p>This project leverages a modern technology stack including:</p>
        <ul>
          <li>Frontend: React, TypeScript, Tailwind CSS</li>
          <li>Backend: Node.js, Express, MongoDB</li>
          <li>Deployment: Docker, AWS</li>
          <li>Testing: Jest, Cypress</li>
        </ul>
        
        <h2>Future Plans</h2>
        <p>Future development plans include expanding functionality with additional features such as:</p>
        <ul>
          <li>Mobile application development</li>
          <li>AI-powered recommendations</li>
          <li>Enhanced reporting capabilities</li>
          <li>Expanded language support</li>
        </ul>
      `,
      liveUrl: slug === 'equipment-marketplace' 
        ? 'https://miniequipmarketplace-factgzd7cpeabne8.canadacentral-01.azurewebsites.net'
        : '#',
      githubUrl: '#',
      technologies: [
        'React', 'TypeScript', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS',
        'Docker', 'AWS', 'Jest', 'Cypress'
      ],
      images: [
        'https://via.placeholder.com/1200x600',
        'https://via.placeholder.com/1200x600',
        'https://via.placeholder.com/1200x600'
      ]
    };
  };

  const projectContent = getProjectContent();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto flex items-center justify-center h-[60vh]">
            <div className="animate-pulse space-y-6 w-full">
              <div className="h-10 bg-gray-300 rounded w-3/4"></div>
              <div className="h-6 bg-gray-300 rounded w-full"></div>
              <div className="h-6 bg-gray-300 rounded w-5/6"></div>
              <div className="h-64 bg-gray-300 rounded"></div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-6 bg-gray-300 rounded col-span-2"></div>
                <div className="h-6 bg-gray-300 rounded col-span-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p className="text-gray-600 mb-8">{error}</p>
        <Link to="/projects" className="btn btn-primary">
          Back to Projects
        </Link>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p className="text-gray-600 mb-8">The project you're looking for doesn't exist or has been removed.</p>
        <Link to="/projects" className="btn btn-primary">
          Back to Projects
        </Link>
      </div>
    );
  }

  // Default placeholder image if thumbnail is null
  const thumbnailUrl = project.thumbnail || 'https://via.placeholder.com/1200x600?text=No+Image';

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <div className="mb-8">
            <Link
              to="/projects"
              className="inline-flex items-center text-primary-600 hover:text-primary-700"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Projects
            </Link>
          </div>

          {/* Project Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-4">
              {project.liveUrl !== '#' && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  View Live Site
                </a>
              )}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                View Code
              </a>
            </div>
          </div>

          {/* Project Image Gallery */}
          <div className="mb-12">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-auto"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <img
                src={project.images[1]}
                alt={`${project.title} screenshot 2`}
                className="w-full h-auto rounded-lg shadow-sm"
              />
              <img
                src={project.images[2]}
                alt={`${project.title} screenshot 3`}
                className="w-full h-auto rounded-lg shadow-sm"
              />
            </div>
          </div>

          {/* Project Content */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: project.content }}
            />
          </div>

          {/* Technologies Used */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-gray-100 rounded-full px-4 py-2 text-sm font-medium text-gray-700"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-primary-700 text-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Interested in similar projects?</h2>
            <p className="mb-6">
              Check out my other work or get in touch to discuss your project ideas.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/projects" className="btn bg-white text-primary-700 hover:bg-gray-100">
                More Projects
              </Link>
              <Link to="/contact" className="btn border border-white text-white hover:bg-primary-600">
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage; 