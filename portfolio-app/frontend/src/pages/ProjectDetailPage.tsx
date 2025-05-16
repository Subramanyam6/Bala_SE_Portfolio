import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
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

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Project Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-20">
        <div className="container mx-auto px-4">
          <Link 
            to="/projects" 
            className="inline-flex items-center text-white mb-6 hover:underline"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{project.title}</h1>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech: any) => (
              <span 
                key={tech.name} 
                className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm"
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Project Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-12">
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: project.content }} />
        </div>
        
        {/* Project Info */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Project Details</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech: any) => (
                  <span 
                    key={tech.name} 
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
              
              <h3 className="text-xl font-semibold mb-4">Project Links</h3>
              <div className="flex flex-wrap gap-4">
                {project.liveUrl && (
                  <a
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                    href={project.liveUrl || undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>View Live</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors flex items-center gap-2"
                    href={project.githubUrl || undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>GitHub Repo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Project Image Gallery */}
        <div className="mb-12">
          {project.images && project.images.length > 0 && (
            <img
              className="w-full h-auto object-cover rounded-md"
              src={typeof project.images[0] === 'string' ? project.images[0] : project.images[0].url}
              alt={`Project screenshot 1`}
            />
          )}
          {project.images && project.images.length > 1 && (
            <img
              className="w-full h-auto object-cover rounded-md"
              src={typeof project.images[1] === 'string' ? project.images[1] : project.images[1].url}
              alt={`Project screenshot 2`}
            />
          )}
          {project.images && project.images.length > 2 && (
            <img
              className="w-full h-auto object-cover rounded-md"
              src={typeof project.images[2] === 'string' ? project.images[2] : project.images[2].url}
              alt={`Project screenshot 3`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage; 