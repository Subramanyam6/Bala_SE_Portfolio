import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import ProjectCard from '../components/projects/ProjectCard';
import TechStackModal from '../components/home/TechStackModal';
import TechWheelAnimation from '../components/home/TechWheelAnimation';
import { featuredProjects } from '../data/featuredProjects';
import RotatingText from '../components/RotatingText';

const HomePage = () => {
  const [isTechStackModalOpen, setIsTechStackModalOpen] = useState(false);
  const fullHeroText =
    "If you want a battle-tested AI/ML engineer who ships, you’re in the right place. I build end-to-end systems from prototype to production, turning messy real-world problems into reliable, scalable solutions.";
  const [typedHeroText, setTypedHeroText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setTypedHeroText(fullHeroText.slice(0, index));
      if (index >= fullHeroText.length) {
        clearInterval(interval);
      }
    }, 18);

    return () => clearInterval(interval);
  }, [fullHeroText]);

  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes hero-caret {
              0%, 100% { opacity: 0; }
              50% { opacity: 1; }
            }
            .hero-caret {
              display: inline-block;
              width: 2px;
              height: 1em;
              margin-left: 2px;
              background: rgba(255, 255, 255, 0.85);
              animation: hero-caret 0.9s step-end infinite;
              vertical-align: -2px;
            }
          `,
        }}
      />
      {/* Tech Stack Modal */}
      <TechStackModal isOpen={isTechStackModalOpen} onClose={() => setIsTechStackModalOpen(false)} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-400 text-white py-[5.5rem] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full mx-auto">
            <div className="relative w-full">
              <div className="text-left max-w-3xl pl-0 pr-6 md:pr-24">
                <h1 className="text-4xl font-extrabold tracking-tight leading-[1.15] sm:text-5xl md:text-6xl flex flex-wrap items-baseline gap-2">
                  <span>Hello,&nbsp;</span>
                  <RotatingText
                    texts={[
                      'World!',
                      'Techies!',
                      'CTOs!',
                      'Entrepreneurs!',
                      'Recruiters!',
                      'Hiring Managers!',
                      'Founders!',
                      'Developers!',
                      'Innovators!'
                    ]}
                    mainClassName="inline-flex overflow-hidden pb-2 max-w-[15ch]"
                    splitLevelClassName="overflow-hidden pb-2 max-w-[15ch]"
                    elementLevelClassName="text-white drop-shadow-sm"
                    rotationInterval={2000}
                    staggerDuration={0.02}
                    splitBy="characters"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '-120%' }}
                  />
                </h1>
                <p className="mt-6 text-xl">
                  <span>{typedHeroText}</span>
                  <span className="hero-caret" aria-hidden="true" />
                </p>
              </div>
              
              <div className="absolute right-0 top-1/2 -translate-y-1/2">
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
              Featured (Live!) Projects
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Feel free to visit the actual websites!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.slice(0, 3).map((project) => (
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
