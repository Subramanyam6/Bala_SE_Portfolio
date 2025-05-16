import { useState, useEffect } from 'react';
import ProjectCard from '../components/projects/ProjectCard';

// Import the same featured projects data that we use on the home page
import { featuredProjects } from '../data/featuredProjects';

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail: string | null;
  technologies: string[];
  liveUrl?: string;
}

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTechnology, setSelectedTechnology] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [allTechnologies, setAllTechnologies] = useState<string[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Mock data for additional projects
        const mockProjects = [
          {
            id: 101,
            title: "Professional Portfolio Website",
            slug: "professional-portfolio-website",
            description: "A personal portfolio website showcasing my skills and projects",
            thumbnail: "https://via.placeholder.com/800x600",
            technologies: ["React", "TypeScript", "Tailwind CSS"],
            liveUrl: "#"
          },
          {
            id: 102,
            title: "E-commerce Platform",
            slug: "e-commerce-platform",
            description: "A full-featured e-commerce platform with product management and checkout",
            thumbnail: "https://via.placeholder.com/800x600",
            technologies: ["React", "Node.js", "MongoDB", "Express"],
            liveUrl: "#"
          },
          {
            id: 103,
            title: "Task Management System",
            slug: "task-management-system",
            description: "A project management tool for tracking tasks and team collaboration",
            thumbnail: "https://via.placeholder.com/800x600",
            technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
            liveUrl: "#"
          }
        ];

        // Combine mock projects with featured projects from home page
        // ensuring no duplicate IDs by using different ID ranges
        const allProjects = [...featuredProjects, ...mockProjects];
        
        // Filter by search term if provided
        let filteredProjects = allProjects;
        if (searchTerm.trim()) {
          const searchLower = searchTerm.toLowerCase();
          filteredProjects = allProjects.filter(project => 
            project.title.toLowerCase().includes(searchLower) ||
            project.description.toLowerCase().includes(searchLower) ||
            project.technologies.some(tech => 
              typeof tech === 'string' 
                ? tech.toLowerCase().includes(searchLower)
                : (tech as any).name?.toLowerCase().includes(searchLower)
            )
          );
        }
        
        setProjects(filteredProjects);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError('Failed to load projects. Please try again later.');
        console.error('Error fetching projects:', err);
      }
    };

    fetchProjects();
  }, [searchTerm]);

  useEffect(() => {
    // Extract all unique technologies from projects
    if (projects.length > 0) {
      const techs = Array.from(
        new Set(
          projects.flatMap(project => 
            project.technologies.map(tech => 
              typeof tech === 'string' ? tech : (tech as any).name
            )
          )
        )
      );
      setAllTechnologies(techs);
    }
  }, [projects]);

  const filteredProjects = projects.filter((project) => {
    // Filter by technology
    return selectedTechnology
      ? project.technologies.some(tech => 
          typeof tech === 'string' 
            ? tech === selectedTechnology
            : (tech as any).name === selectedTechnology
        )
      : true;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            My Projects
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            A collection of my work and personal projects
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={selectedTechnology || ''}
                onChange={(e) => setSelectedTechnology(e.target.value || null)}
              >
                <option value="">All Technologies</option>
                {allTechnologies.map((tech) => (
                  <option key={tech} value={tech}>
                    {tech}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-white rounded-lg shadow-md p-4">
                <div className="bg-gray-300 h-48 rounded-md mb-4"></div>
                <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded mb-4 w-full"></div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-6 bg-gray-300 rounded-full w-16"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-medium text-gray-900">No projects found</h3>
                <p className="mt-2 text-gray-500">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage; 