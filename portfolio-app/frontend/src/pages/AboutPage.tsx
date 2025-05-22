import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import {
  SiOpenjdk as SiJava,
  SiPython,
  SiMysql,
  SiCplusplus,
  SiNodedotjs,
  SiGooglecloud,
  SiAmazon as SiAws,
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiReact,
  SiAngular,
  SiApachekafka,
  SiSpring,
  SiD3Dotjs,
  SiMysql as SiMssql,
  SiPostgresql,
  SiOracle,
  SiMongodb,
  SiGooglebigquery,
  SiTensorflow,
  SiPytorch,
  SiPandas,
  SiNumpy,
  SiScikitlearn
} from 'react-icons/si';

interface IconProps {
  className?: string;
  color?: string;
}

const iconMap: Record<string, React.ComponentType<IconProps>> = {
  'Java (Spring Boot)': SiJava,
  'Python (Flask/Django)': SiPython,
  'SQL': SiMysql,
  'C/C++': SiCplusplus,
  'Node.js': SiNodedotjs,
  'GCP': SiGooglecloud,
  'AWS': SiAws,
  'Docker': SiDocker,
  'Kubernetes': SiKubernetes,
  'Terraform': SiTerraform,
  'React.js': SiReact,
  'AngularJS': SiAngular,
  'Kafka': SiApachekafka,
  'Spring Data JPA': SiSpring,
  'D3.js': SiD3Dotjs,
  'MS SQL Server': SiMssql,
  'PostgreSQL': SiPostgresql,
  'Oracle': SiOracle,
  'MongoDB': SiMongodb,
  'BigQuery': SiGooglebigquery,
  'TensorFlow': SiTensorflow,
  'PyTorch': SiPytorch,
  'Pandas': SiPandas,
  'NumPy': SiNumpy,
  'Scikit-learn': SiScikitlearn,
};

const colorMap: Record<string, string> = {
  'Java (Spring Boot)': '#007396',
  'Python (Flask/Django)': '#3776AB',
  'SQL': '#4479A1',
  'C/C++': '#00599C',
  'Node.js': '#339933',
  'GCP': '#4285F4',
  'AWS': '#FF9900',
  'Docker': '#2496ED',
  'Kubernetes': '#326CE5',
  'Terraform': '#623CE4',
  'React.js': '#61DAFB',
  'AngularJS': '#DD0031',
  'Kafka': '#231F20',
  'Spring Data JPA': '#6DB33F',
  'D3.js': '#F87C09',
  'MS SQL Server': '#CC2927',
  'PostgreSQL': '#336791',
  'Oracle': '#F80000',
  'MongoDB': '#47A248',
  'BigQuery': '#4285F4',
  'TensorFlow': '#FF6F00',
  'PyTorch': '#EE4C2C',
  'Pandas': '#150458',
  'NumPy': '#013243',
  'Scikit-learn': '#F7931E',
};

const skills = [
  {
    category: 'Languages',
    items: [
      { name: 'Java (Spring Boot)', level: 95 },
      { name: 'Python (Flask/Django)', level: 90 },
      { name: 'SQL', level: 90 },
      { name: 'C/C++', level: 80 },
      { name: 'Node.js', level: 80 },
    ],
  },
  {
    category: 'Cloud & DevOps',
    items: [
      { name: 'GCP', level: 90 },
      { name: 'AWS', level: 85 },
      { name: 'Docker', level: 90 },
      { name: 'Kubernetes', level: 80 },
      { name: 'Terraform', level: 75 },
    ],
  },
  {
    category: 'Frameworks & Tools',
    items: [
      { name: 'React.js', level: 90 },
      { name: 'AngularJS', level: 75 },
      { name: 'Kafka', level: 80 },
      { name: 'Spring Data JPA', level: 85 },
      { name: 'D3.js', level: 80 },
    ],
  },
  {
    category: 'Databases',
    items: [
      { name: 'MS SQL Server', level: 85 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'Oracle', level: 75 },
      { name: 'MongoDB', level: 75 },
      { name: 'BigQuery', level: 70 },
    ],
  },
  {
    category: 'AI/ML & Data',
    items: [
      { name: 'TensorFlow', level: 80 },
      { name: 'PyTorch', level: 75 },
      { name: 'Pandas', level: 85 },
      { name: 'NumPy', level: 85 },
      { name: 'Scikit-learn', level: 80 },
    ],
  },
];

const experience = [
  {
    title: 'Graduate Research Assistant (Data)',
    org: 'University of Nebraska–Lincoln',
    date: 'Jan 2025 – Present',
    bullets: [
      'Built an event-driven ingestion pipeline on GCP: Canvas click events published to Pub/Sub, consumed by Python Flask services on Cloud Run, then loaded into BigQuery.',
      'Developed interactive analytics dashboards using D3.js to visualize student engagement metrics in real time.',
      'Built pytest + Flask-Testing integration tests; enforced an 85% coverage gate with automated reports.',
      'Configured Cloud Build CI/CD pipelines to build Docker images and deploy services to Cloud Run.',
    ],
  },
  {
    title: 'Graduate Research Assistant (GIS)',
    org: 'University of Nebraska–Lincoln',
    date: 'Aug 2024 – Dec 2024',
    bullets: [
      'Developed a RESTful Python Flask API serving geoJSON for 100K+ data points, visualized with Leaflet.js filters and choropleth layers.',
      'Deployed via Docker on a Linux VM with Nginx+Gunicorn, ensuring SSL-secured, high-availability service.',
    ],
  },
  {
    title: 'Graduate Research Assistant (AI/ML)',
    org: 'University of Nebraska–Lincoln',
    date: 'Nov 2021 – Dec 2023',
    bullets: [
      'Conducted advanced research on scalable decision-making AI algorithms (PBVI, I-POMCP-PF) for multi-agent systems, involving intricate algorithmic analysis and optimization.',
      'Implemented complex data structures (e.g., recursive trees, particle filters) in Cython to eliminate Python runtime overhead, reducing runtime by 40%.',
      'Applied TensorFlow for GPU acceleration, enabling real-time processing of millions of decision-making computations and cutting runtime from hours to seconds.',
      'Developed interactive R Shiny web applications to effectively present complex, high-dimensional decision data.',
    ],
  },
  {
    title: 'Programmer Analyst',
    org: 'Cognizant, India',
    date: 'Feb 2018 – Aug 2021',
    bullets: [
      'Developed Java Spring Boot microservices (Spring Data JPA) on AWS ECS, exposing REST APIs and handling Kafka event streams.',
      'Refactored a monolithic application into modular Spring components using dependency injection, cutting maintenance effort by 50%.',
      'Designed IBM DataStage ETL jobs to process 5 TB/month of insurance claims from SQL Server and Oracle.',
      'Implemented Jenkins CI/CD pipelines with JUnit and Mockito tests, achieving zero post-deployment defects for two web portals (20K+ users).',
      'Designed microservices to meet 99.9% uptime SLAs and optimized response times under 100ms, enhancing system reliability.',
    ],
  },
];

const education = [
  {
    degree: 'Master of Science, Computer Science (Thesis)',
    org: 'University of Nebraska–Lincoln',
    date: 'Aug 2021 – Aug 2025',
    details: 'Courses: Advanced Software Engineering, Data Structures and Algorithms, Graph Algorithms, Cybersecurity, Cloud Computing, Databases, Computational Linguistics, Multi-Agent Systems',
  },
  {
    degree: 'Bachelor of Technology, Electrical and Electronics Engineering',
    org: 'SRM Institute of Science and Technology',
    date: 'Aug 2013 – May 2017',
    details: '',
  },
];

const projects = [
  {
    name: 'Mini Equipment Marketplace',
    desc: 'Built using ASP.NET Core MVC, Entity Framework Core (SQL Server), RESTful APIs, and CI/CD via Azure DevOps.',
    link: '',
    hasPdf: false,
    pdfPath: '',
    liveUrl: ''
  },
  {
    name: 'Ethereum DApp Backend',
    desc: 'Developed with Solidity and Truffle Suite—authoring and testing smart contracts and deploying them on AWS EC2 for secure on-chain business logic.',
    link: 'https://github.com/Subramanyam6',
    hasPdf: false,
    pdfPath: '',
    liveUrl: ''
  },
  {
    name: 'Multi-Agent RL War',
    desc: 'A live site for the Multi-Agent RL War game',
    link: 'https://multi-agent-rl-war.web.app',
    hasPdf: false,
    pdfPath: '',
    liveUrl: 'https://multi-agent-rl-war.web.app'
  }
];

const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/balasubramanyamd',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z"/></svg>
    ),
  },
  {
    name: 'GitHub',
    url: 'https://github.com/Subramanyam6',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.63 0-12 5.37-12 12 0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.54 1.236-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576 4.765-1.587 8.2-6.086 8.2-11.385 0-6.63-5.373-12-12-12z"/></svg>
    ),
  },
  {
    name: 'UNL AI Research Group',
    url: 'https://iamas.unl.edu',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
    ),
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeInOut'
    }
  })
};

const skillIconVariants = {
  hidden: { opacity: 0, scale: 0.5, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 10
    }
  },
  hover: {
    scale: 1.2,
    rotate: [0, -10, 10, -10, 0],
    transition: {
      duration: 0.3,
      type: 'spring',
      stiffness: 300
    }
  }
};

const skillGroupVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const AboutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 overflow-x-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header/Profile */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={sectionVariants}
            custom={0}
            className="bg-white rounded-3xl shadow-2xl p-10 mb-14 flex flex-col md:flex-row gap-10 items-center md:items-start relative overflow-hidden"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, type: 'spring' }}
              className="w-44 h-44 rounded-full overflow-hidden border-4 border-primary-600 shadow-lg flex-shrink-0 bg-gradient-to-br from-primary-100 to-primary-300 animate-fade-in-up"
            >
              <img
                src="https://avatars.githubusercontent.com/u/22278408?v=4"
                alt="Bala Subramanyam Duggirala"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 tracking-tight">
                Bala Subramanyam Duggirala
              </h1>
              <p className="text-xl text-primary-600 mb-4 font-semibold">Full Stack Software Engineer</p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-gray-700 mb-6 text-lg"
              >
                Full-Stack Software Engineer with expertise in developing cloud-native microservices, RESTful APIs, and event-driven systems using Java (Spring Boot), Python (Flask), and AWS/GCP infrastructure. Proven track record in designing scalable, maintainable services, optimizing performance, and collaborating cross-functionally to deliver reliable production software.
              </motion.p>
              <div className="flex flex-wrap gap-4 mt-2">
                {socialLinks.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline flex items-center gap-2 px-4 py-2 rounded-lg shadow hover:bg-primary-50 transition-all"
                    whileHover={{ scale: 1.08, backgroundColor: '#f5f3ff' }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {link.icon}
                    <span className="font-medium">{link.name}</span>
                  </motion.a>
                ))}
                <Link to="/contact" className="btn btn-primary px-4 py-2 rounded-lg shadow">
                  Contact Me
                </Link>
              </div>
            </div>
            {/* Animated background shapes */}
            <motion.div
              style={{
                position: 'absolute',
                top: '-2.5rem',
                right: '-2.5rem',
                width: '10rem',
                height: '10rem',
                backgroundColor: 'var(--primary-100)',
                borderRadius: '9999px',
                opacity: 0.4,
                zIndex: 0
              }}
              animate={{ scale: [1, 1.2, 1], rotate: [0, 30, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            />
            <motion.div
              style={{
                position: 'absolute',
                bottom: '-2.5rem',
                left: '-2.5rem',
                width: '8rem',
                height: '8rem',
                backgroundColor: 'var(--primary-200)',
                borderRadius: '9999px',
                opacity: 0.3,
                zIndex: 0
              }}
              animate={{ scale: [1, 1.1, 1], rotate: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Skills */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
            custom={1}
            className="mb-14"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Technical Skills</h2>
            {/* Technical Skills: modern table layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ staggerChildren: 0.1, duration: 0.6, ease: 'easeInOut' }}
              className="overflow-visible"
            >
              <table className="w-full table-auto bg-white rounded-lg shadow-lg overflow-visible">
                <tbody>
                  {skills.map((group, idx) => (
                    <motion.tr
                      key={group.category}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1, type: 'tween', ease: 'easeInOut', duration: 0.4 }}
                      whileHover={{ scale: 1.02 }}
                      className="border-b border-gray-100 hover:bg-gray-100 overflow-visible"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {group.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap overflow-visible">
                        <div className="flex flex-wrap gap-4">
                          {group.items.map((item) => {
                            const Icon = iconMap[item.name];
                            return (
                              <motion.div
                                key={item.name}
                                className="group relative flex-shrink-0"
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.4, rotate: [0, 10, -10, 0] }}
                                transition={{ type: 'spring', stiffness: 200 }}
                              >
                                {Icon && <Icon className="w-8 h-8" color={colorMap[item.name]} />}
                                <div
                                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                                             bg-gray-800 text-white text-xs rounded px-2 py-1
                                             opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50"
                                >
                                  {item.name}
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </motion.div>

          {/* Experience */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
            custom={2}
            className="mb-14"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Experience</h2>
            <div className="space-y-8">
              {experience.map((exp, idx) => (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.3, ease: 'easeInOut' }}
                  className="bg-white p-7 rounded-2xl shadow-md border-l-4 border-primary-600 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-primary-700">{exp.title}</h3>
                      <p className="text-primary-500 font-medium">{exp.org}</p>
                    </div>
                    <p className="text-gray-500 text-sm mt-2 md:mt-0">{exp.date}</p>
                  </div>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-2">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionVariants}
            custom={3}
            className="mb-14"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Education</h2>
            <div className="space-y-6">
              {education.map((edu, idx) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.3, ease: 'easeInOut' }}
                  className="bg-white p-6 rounded-2xl shadow border-l-4 border-primary-400"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-primary-700">{edu.degree}</h3>
                      <p className="text-primary-500 font-medium">{edu.org}</p>
                    </div>
                    <p className="text-gray-500 text-sm mt-2 md:mt-0">{edu.date}</p>
                  </div>
                  {edu.details && <p className="text-gray-700 mt-2 text-sm">{edu.details}</p>}
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default AboutPage; 