import { GitHubIcon, GITHUB_URL, LinkedInIcon, LINKEDIN_URL } from '../SocialIcons';

const Footer = () => {
  return (
    <footer className="bg-primary-700 border-t border-primary-600/50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4">
          <small className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-gray-300" style={{ fontSize: '0.8rem' }}>
            <span className="flex items-center gap-1">
              Made with{' '}
              <span 
                role="img" 
                aria-label="fire"
                className="text-orange-400"
              >
                🔥
              </span>{' '}
              by Bala Subramanyam
            </span>
            <span className="hidden sm:inline text-white/60">·</span>
            <span>
              © 2023–<span id="current-year">Present</span> Bala Subramanyam.{' '}
              <a 
                href="/LICENSE" 
                rel="license" 
                className="text-blue-300 hover:text-blue-200 transition-colors duration-200"
                target="_blank"
              >
                MIT License
              </a>
              <span className="sr-only">SPDX-License-Identifier: MIT</span>
            </span>
          </small>
          <div className="flex items-center gap-3">
            <a
              href={LINKEDIN_URL}
              title="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group p-2.5 rounded-full bg-[#0A66C2] hover:bg-[#004182] transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer"
            >
              <LinkedInIcon className="w-5 h-5 text-white group-hover:text-primary-100 transition-colors duration-300" />
            </a>
            <a
              href={GITHUB_URL}
              title="GitHub"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group p-2.5 rounded-full bg-[#181717] hover:bg-[#0f1419] transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer"
            >
              <GitHubIcon className="w-5 h-5 text-white group-hover:text-gray-100 transition-colors duration-300" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
