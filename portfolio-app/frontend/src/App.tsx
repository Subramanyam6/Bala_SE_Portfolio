import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import WelcomePage from './pages/WelcomePage';
import PDFViewerPage from './pages/PDFViewerPage';
import RobotTestPage from './pages/RobotTestPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Welcome page as the initial landing page with no layout */}
        <Route path="/" element={<WelcomePage />} />
        
        {/* Test page for robot hover debugging */}
        <Route path="/robot-test" element={<RobotTestPage />} />
        
        {/* Main application pages with layout */}
        <Route path="/home" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:slug" element={<ProjectDetailPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="pdf/:slug" element={<PDFViewerPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
