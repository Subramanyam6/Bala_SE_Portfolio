import { motion } from 'framer-motion';
import { type ComponentType, type CSSProperties } from 'react';

import FlowingMenu from '../components/FlowingMenu';
import ProfileCard from '../components/ProfileCard';
import { GitHubIcon, GITHUB_URL, LinkedInIcon, LINKEDIN_URL } from '../components/SocialIcons';

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

const iconMap: Record<string, ComponentType<IconProps>> = {
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

const experienceItems = [
  {
    text: 'Graduate Research Assistant — UE & SS',
    subtitle: 'University of Nebraska–Lincoln | Jan 2025 – May 2025',
    details: [
      'Built high-volume engagement dashboards to surface student risk and participation signals.',
      'Strengthened validation and monitoring to catch data breaks early and improve model quality.',
      'Owned production reliability with automated checks, on-call triage, and clear documentation.',
    ],
  },
  {
    text: 'Graduate Research Assistant — GIS Lab',
    subtitle: 'University of Nebraska–Lincoln | Aug 2024 – Dec 2024',
    details: [
      'Delivered ML-backed GIS services supporting access-to-justice research workflows.',
      'Reduced data defects by standardizing quality checks and review processes.',
      'Created runbooks and mentored assistants on coding and data practices.',
    ],
  },
  {
    text: 'Graduate Research Assistant — MAS Lab',
    subtitle: 'University of Nebraska–Lincoln | Nov 2021 – Dec 2023',
    details: [
      'Led multi-agent decision research and improved planning performance in cyber-defense simulations.',
      'Built scalable experiment pipelines and analysis tools for policy evaluation.',
      'Ensured reproducibility and stability through rigorous testing and documentation.',
    ],
  },
  {
    text: 'Programmer Analyst',
    subtitle: 'Cognizant | Feb 2018 – Aug 2021',
    details: [
      'Delivered AI/ML solutions for healthcare payers across risk scoring and analytics.',
      'Owned model pipelines and production rollouts, improving predictive performance.',
      'Partnered with compliance and operations to keep services reliable in production.',
    ],
  },
];


const educationItems = [
  {
    text: 'Master of Science, Computer Science (Thesis)',
    subtitle: 'University of Nebraska–Lincoln | Aug 2021 – Aug 2025',
    details: [
      'Thesis: Investigating the Impact of Agent Openness on Planning in Multi-Agent Systems.',
      'Coursework across advanced software engineering, algorithms, databases, and cloud systems.',
    ],
  },
  {
    text: 'Bachelor of Technology, Electrical and Electronics Engineering',
    subtitle: 'SRM Institute of Science and Technology | Aug 2013 – May 2017',
    details: [
      'Built a strong foundation in systems thinking and applied engineering design.',
      'Completed rigorous lab and capstone work focused on real-world problem solving.',
    ],
  },
];

const socialLinks = [
  {
    name: 'LinkedIn',
    url: LINKEDIN_URL,
    bgColor: '#0A66C2',
    hoverBg: '#004182',
    icon: <LinkedInIcon className="w-5 h-5 text-white" />,
  },
  {
    name: 'GitHub',
    url: GITHUB_URL,
    bgColor: '#181717',
    hoverBg: '#0f1419',
    icon: <GitHubIcon className="w-5 h-5 text-white" />,
  },
  {
    name: 'UNL AI Research Group',
    url: 'https://iamas.unl.edu',
    bgColor: '#0ea5e9',
    hoverBg: '#0284c7',
    icon: (
      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
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
  }),
  exit: { opacity: 0, y: -50 }
};

const AboutPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen pb-6">
      <div className="container mx-auto px-4 pt-10">
        <div className="max-w-4xl mx-auto">
          {/* Header/Profile */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, amount: 0.6 }}
            variants={sectionVariants}
            custom={0}
            className="bg-white rounded-3xl shadow-2xl p-10 mb-14 flex flex-col md:flex-row gap-10 items-center md:items-start relative overflow-hidden"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, type: 'spring' }}
              className="flex-shrink-0"
            >
              <ProfileCard
                avatarUrl="/Bala DP.jpg"
                name="Bala Subramanyam Duggirala"
                title="Software Engineer | AI/ML"
                showUserInfo={false}
                showDetails={false}
                behindGlowEnabled={false}
                cardHeight="280px"
                cardMaxHeight="320px"
                cardAspectRatio="0.8"
                className="w-full max-w-[260px] md:max-w-[300px]"
              />
            </motion.div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
                Bala Subramanyam Duggirala
              </h1>
              <p className="text-xl text-primary-600 mb-5 font-semibold">Software Engineer | AI/ML</p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-gray-700 mb-6 text-lg"
              >
                Software engineer and AI/ML builder who ships end-to-end systems from data pipelines and model validation to reliable services and product UX. I focus on turning ambiguous, real-world problems into trustworthy, scalable solutions teams can operate with confidence.
              </motion.p>
              <div className="flex flex-wrap gap-4 mt-2">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-4 py-2 rounded-full bg-white/90 shadow border border-slate-200 hover:shadow-md transition-all"
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    style={
                      {
                        '--icon-bg': link.bgColor,
                        '--icon-bg-hover': link.hoverBg
                      } as CSSProperties
                    }
                  >
                    <span
                      className="flex items-center justify-center w-10 h-10 rounded-full transition-colors bg-[var(--icon-bg)] group-hover:bg-[var(--icon-bg-hover)]"
                    >
                      {link.icon}
                    </span>
                    <span className="font-medium text-gray-700">{link.name}</span>
                  </motion.a>
                ))}
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
            exit="exit"
            viewport={{ once: false, amount: 0.2 }}
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
            exit="exit"
            viewport={{ once: false, amount: 0.2 }}
            variants={sectionVariants}
            custom={2}
            className="mb-14"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Experience</h2>
            <div className="space-y-6">
              {experienceItems.map((exp, idx) => (
                <motion.div
                  key={exp.text}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: idx * 0.12, duration: 0.5, ease: 'easeOut' }}
                  className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden"
                  style={{ height: '160px' }}
                >
                  <FlowingMenu
                    items={[
                      {
                        text: exp.text,
                        subtitle: exp.subtitle,
                        details: exp.details
                      }
                    ]}
                    speed={12}
                    textColor="#0f172a"
                    bgColor="#ffffff"
                    marqueeBgColor="#e0f2fe"
                    marqueeTextColor="#0f172a"
                    borderColor="#e2e8f0"
                    itemHeight="160px"
                    textClassName="text-lg md:text-xl normal-case tracking-normal"
                    subtitleClassName="text-sm md:text-base normal-case text-slate-500"
                    detailsClassName="text-sm md:text-base text-slate-800"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, amount: 0.5 }}
            variants={sectionVariants}
            custom={3}
            className="mb-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Education</h2>
            <div className="space-y-5">
              {educationItems.map((edu, idx) => (
                <motion.div
                  key={edu.text}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: idx * 0.12, duration: 0.5, ease: 'easeOut' }}
                  className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden"
                  style={{ height: '130px' }}
                >
                  <FlowingMenu
                    items={[
                      {
                        text: edu.text,
                        subtitle: edu.subtitle,
                        details: edu.details
                      }
                    ]}
                    speed={12}
                    textColor="#0f172a"
                    bgColor="#ffffff"
                    marqueeBgColor="#e0f2fe"
                    marqueeTextColor="#0f172a"
                    borderColor="#e2e8f0"
                    itemHeight="130px"
                    textClassName="text-base md:text-lg normal-case tracking-normal"
                    subtitleClassName="text-sm md:text-base normal-case text-slate-500"
                    detailsClassName="text-sm md:text-base text-slate-800"
                  />
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
