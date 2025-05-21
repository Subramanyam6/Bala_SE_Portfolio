import { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/home' },
  { name: 'Projects', href: '/home/projects' },
  { name: 'About', href: '/home/about' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false);
  const [emailTooltipVisible, setEmailTooltipVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setContactDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="flex-1 flex items-start pl-0">
          <Link to="/" className="flex items-start">
            <span className="text-2xl font-bold text-primary-600">Bala Subramanyam Duggirala</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex md:space-x-8">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                isActive
                  ? 'font-medium text-primary-600 border-b-2 border-primary-600 pb-1'
                  : 'font-medium text-gray-600 hover:text-primary-600 hover:border-b-2 hover:border-primary-600 pb-1'
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* Contact Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setContactDropdownOpen(!contactDropdownOpen)}
              onMouseEnter={() => setContactDropdownOpen(true)}
              onMouseLeave={() => {
                setTimeout(() => {
                  if (!dropdownRef.current?.contains(document.activeElement)) {
                    setContactDropdownOpen(false);
                  }
                }, 5000);
              }}
              className={`group flex items-center font-medium text-gray-600 hover:text-primary-600 focus:outline-none transition-all duration-300 ${contactDropdownOpen ? 'text-primary-600' : ''}`}
              aria-expanded={contactDropdownOpen}
            >
              <span className={`${contactDropdownOpen ? 'border-b-2 border-primary-600' : 'group-hover:border-b-2 group-hover:border-primary-600'} pb-1 transition-all duration-300`}>
                Contact
              </span>
              <ChevronDownIcon 
                className={`ml-1 h-4 w-4 transition-transform duration-300 ease-in-out ${
                  contactDropdownOpen 
                    ? 'rotate-180 text-primary-600' 
                    : 'group-hover:text-primary-600'
                }`} 
                aria-hidden="true" 
              />
            </button>

            {/* Dropdown menu with animation */}
            <div 
              className={`absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none origin-top-right transition-all duration-200 ease-in-out transform ${
                contactDropdownOpen 
                  ? 'opacity-100 scale-100 translate-y-0' 
                  : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
              }`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              onMouseEnter={() => setContactDropdownOpen(true)}
              onMouseLeave={() => setContactDropdownOpen(false)}
            >
              <div className="py-1" role="none">
                {/* LinkedIn Option */}
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors duration-150"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 mr-3 group-hover:scale-110 transition-transform">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform duration-150">LinkedIn</span>
                </a>

                {/* Email Option with Tooltip */}
                <div className="relative">
                  <Link 
                    to="/home/contact"
                    className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors duration-150 dropdown-item-appear"
                    style={{ animationDelay: '0.1s' }}
                    onMouseEnter={() => setEmailTooltipVisible(true)}
                    onMouseLeave={() => setEmailTooltipVisible(false)}
                    onClick={() => setContactDropdownOpen(false)}
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 mr-3 group-hover:scale-110 transition-transform">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-150">Contact Form</span>
                  </Link>

                  {/* Tooltip */}
                  <div 
                    className={`absolute right-0 top-0 transform -translate-y-full -translate-x-1/4 w-52 px-3 py-2 bg-gray-800 rounded-lg text-white text-xs transition-all duration-300 ${
                      emailTooltipVisible 
                        ? 'opacity-100 scale-100 tooltip-pulse' 
                        : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                  >
                    <div className="flex items-center space-x-1">
                      <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                      </svg>
                      <span>Send me a message through the contact form!</span>
                    </div>
                    <div className="absolute bottom-0 right-16 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <NavLink
            to="/home/login"
            className="btn btn-primary"
          >
            Bala's Login
          </NavLink>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 py-2 bg-white">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  isActive
                    ? 'block py-2 font-medium text-primary-600'
                    : 'block py-2 font-medium text-gray-600 hover:text-primary-600'
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}

            {/* Mobile Contact Options */}
            <div className="py-2">
              <div className="font-medium text-primary-600">Contact</div>
              <div className="pl-4 mt-1 space-y-1">
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center py-1 text-sm text-gray-600 hover:text-primary-600"
                >
                  <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </a>
                <Link 
                  to="/home/contact"
                  className="flex items-center py-1 text-sm text-gray-600 hover:text-primary-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Form
                </Link>
              </div>
            </div>

            <NavLink
              to="/home/login"
              className="block py-2 font-medium text-primary-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Bala's Login
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar; 