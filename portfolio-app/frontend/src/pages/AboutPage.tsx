import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-8">
            About Me
          </h1>

          {/* Profile section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="w-48 h-48 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src="https://via.placeholder.com/300x300"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">John Doe</h2>
                <p className="text-xl text-primary-600 mb-4">Full Stack Developer</p>
                <p className="text-gray-600 mb-6">
                  I'm a passionate full stack developer with expertise in building modern web applications.
                  With over 5 years of experience in software development, I specialize in creating
                  responsive, user-friendly applications using the latest technologies.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    LinkedIn
                  </a>
                  <Link to="/contact" className="btn btn-primary">
                    Contact Me
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bio section */}
          <div className="prose prose-lg max-w-none mb-12">
            <h2>My Journey</h2>
            <p>
              I started my journey in web development during college, where I built my first website
              using HTML and CSS. Fascinated by the possibilities of creating interactive experiences,
              I delved deeper into JavaScript and modern frameworks.
            </p>
            <p>
              After graduating with a degree in Computer Science, I joined a tech startup where I
              honed my skills in full stack development. I've since worked with various companies,
              from startups to established enterprises, helping them build scalable and efficient
              web applications.
            </p>
            <h2>My Approach</h2>
            <p>
              I believe in writing clean, maintainable code and following best practices. My approach
              to development focuses on creating solutions that not only meet the technical requirements
              but also provide an excellent user experience.
            </p>
            <p>
              I'm passionate about continuous learning and staying updated with the latest technologies
              and trends in the industry. This allows me to bring innovative solutions to the projects
              I work on.
            </p>
          </div>

          {/* Skills section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Skills</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Frontend</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-32 font-medium">JavaScript/TypeScript</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-primary-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <span className="w-32 font-medium">React</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-primary-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <span className="w-32 font-medium">HTML/CSS</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-primary-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <span className="w-32 font-medium">Tailwind CSS</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-primary-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Backend</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-32 font-medium">Node.js</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-primary-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <span className="w-32 font-medium">Java/Spring</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-primary-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <span className="w-32 font-medium">MongoDB</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-primary-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <span className="w-32 font-medium">PostgreSQL</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-primary-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Experience section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Work Experience</h2>
            
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">Senior Full Stack Developer</h3>
                    <p className="text-primary-600">Tech Solutions Inc.</p>
                  </div>
                  <p className="text-gray-500">Jan 2020 - Present</p>
                </div>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Lead the development of a customer-facing web application using React and Node.js</li>
                  <li>Implemented authentication and authorization using JWT and OAuth2</li>
                  <li>Optimized database queries resulting in a 40% improvement in application performance</li>
                  <li>Mentored junior developers and conducted code reviews</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">Full Stack Developer</h3>
                    <p className="text-primary-600">Web Innovators</p>
                  </div>
                  <p className="text-gray-500">Mar 2017 - Dec 2019</p>
                </div>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Developed and maintained multiple client websites using React and Express.js</li>
                  <li>Created RESTful APIs for mobile and web applications</li>
                  <li>Implemented responsive designs using CSS frameworks</li>
                  <li>Collaborated with UX/UI designers to implement user-friendly interfaces</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Education</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">Bachelor of Science in Computer Science</h3>
                  <p className="text-primary-600">University of Technology</p>
                </div>
                <p className="text-gray-500">2013 - 2017</p>
              </div>
              <p className="text-gray-600">
                Graduated with honors. Specialized in software engineering and web development.
              </p>
            </div>
          </div>

          {/* Call to action */}
          <div className="bg-primary-700 text-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Interested in working together?</h2>
            <p className="mb-6">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <Link to="/contact" className="btn bg-white text-primary-700 hover:bg-gray-100">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 