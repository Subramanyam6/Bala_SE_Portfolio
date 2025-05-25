const Footer = () => {
  return (
    <footer className="bg-primary-700 border-t border-primary-600/50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      </div>
    </footer>
  );
};

export default Footer; 