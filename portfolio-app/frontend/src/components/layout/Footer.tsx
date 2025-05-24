const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com/Subramanyam6" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                  GitHub
                </a>
              </li>
              <li>
                <a href="linkedin.com/in/balasubramanyamd" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <address className="not-italic text-gray-300">
              <p>Email: bduggirala2@huskers.unl.edu</p>
              <p>Location: Lincoln, NE</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Bala Subramanyam Duggirala — Licensed under the MIT License.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 