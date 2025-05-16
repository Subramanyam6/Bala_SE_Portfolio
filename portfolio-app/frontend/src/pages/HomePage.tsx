import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import ProjectCard from '../components/projects/ProjectCard';
import SkillsSection from '../components/skills/SkillsSection';
import TechStackModal from '../components/home/TechStackModal';
import { featuredProjects } from '../data/featuredProjects';

const HomePage = () => {
  const [isTechStackModalOpen, setIsTechStackModalOpen] = useState(false);

  return (
    <div>
      {/* Tech Stack Modal */}
      <TechStackModal isOpen={isTechStackModalOpen} onClose={() => setIsTechStackModalOpen(false)} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Welcome to My Portfolio
            </h1>
            <p className="mt-6 text-xl max-w-2xl mx-auto">
              I'm a full-stack developer passionate about creating beautiful and functional web applications.
            </p>
            <div className="mt-10 flex justify-center items-center gap-x-6">
              <Link to="/projects" className="btn bg-white text-primary-600 hover:bg-gray-100">
                View Projects
              </Link>
              <button 
                className="relative group"
                onClick={() => setIsTechStackModalOpen(true)}
                aria-label="View Tech Stack"
              >
                <div className="absolute -inset-2 rounded-full bg-yellow-300 opacity-0 group-hover:opacity-30 transition-opacity duration-300 group-hover:animate-pulse"></div>
                <div className="relative p-3 bg-white text-primary-600 rounded-full transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </button>
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
              to="/projects"
              className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
            >
              View all projects
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <SkillsSection />
    </div>
  );
};

export default HomePage; 