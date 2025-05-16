import {
  CodeBracketIcon,
  ServerIcon,
  CircleStackIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

interface Skill {
  name: string;
  icon: JSX.Element;
}

interface SkillCategory {
  name: string;
  icon: JSX.Element;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    icon: <CodeBracketIcon className="w-6 h-6" />,
    skills: [
      { name: 'JavaScript', icon: <i className="devicon-javascript-plain text-yellow-400" /> },
      { name: 'TypeScript', icon: <i className="devicon-typescript-plain text-blue-500" /> },
      { name: 'React', icon: <i className="devicon-react-original text-blue-400" /> },
      { name: 'Tailwind CSS', icon: <i className="devicon-tailwindcss-plain text-teal-500" /> },
    ],
  },
  {
    name: 'Backend',
    icon: <ServerIcon className="w-6 h-6" />,
    skills: [
      { name: 'Java', icon: <i className="devicon-java-plain text-red-500" /> },
      { name: 'Spring Boot', icon: <i className="devicon-spring-plain text-green-500" /> },
      { name: 'Node.js', icon: <i className="devicon-nodejs-plain text-green-600" /> },
    ],
  },
  {
    name: 'Database',
    icon: <CircleStackIcon className="w-6 h-6" />,
    skills: [
      { name: 'PostgreSQL', icon: <i className="devicon-postgresql-plain text-blue-400" /> },
      { name: 'MongoDB', icon: <i className="devicon-mongodb-plain text-green-500" /> },
    ],
  },
  {
    name: 'DevOps & Tools',
    icon: <WrenchScrewdriverIcon className="w-6 h-6" />,
    skills: [
      { name: 'Docker', icon: <i className="devicon-docker-plain text-blue-500" /> },
      { name: 'AWS', icon: <i className="devicon-amazonwebservices-original text-orange-500" /> },
      { name: 'Git', icon: <i className="devicon-git-plain text-red-500" /> },
    ],
  },
];

const SkillsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            My Skills
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Technologies and tools I work with
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.name}
              className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4 text-primary-600">
                {category.icon}
                <h3 className="ml-2 text-xl font-semibold">{category.name}</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center p-2 bg-white rounded-md shadow-sm"
                  >
                    <div className="text-2xl">{skill.icon}</div>
                    <span className="ml-2 text-gray-700">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection; 