import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import ProjectCard from '../components/projects/ProjectCard';
import TechStackModal from '../components/home/TechStackModal';
import TechWheelAnimation from '../components/home/TechWheelAnimation';
import { featuredProjects } from '../data/featuredProjects';

const HomePage = () => {
  const [isTechStackModalOpen, setIsTechStackModalOpen] = useState(false);

  return (
    <div>
      {/* Tech Stack Modal */}
      <TechStackModal isOpen={isTechStackModalOpen} onClose={() => setIsTechStackModalOpen(false)} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-400 text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full mx-auto">
            <div className="flex justify-between items-center w-full">
              <div className="text-left max-w-2xl pl-0">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                  Hello, World!
                </h1>
                <p className="mt-6 text-xl">
                  I'm a full-stack developer passionate about creating beautiful and functional web applications.
                </p>
              </div>
              
              <div className="flex items-center justify-end">
                <TechWheelAnimation />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Featured Projects
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Check out some of my recent work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/home/projects"
              className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
            >
              View all projects
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 