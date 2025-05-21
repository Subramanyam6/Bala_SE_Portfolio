import { useParams, Link } from 'react-router-dom';

const pdfMap: Record<string, { title: string; path: string }> = {
  'literature-review-rl-mas': {
    title: 'A Literature Review on RL in Single & Multi-Agent Systems, its Scalability, and Applications',
    path: '/Literature Review Document.pdf',
  },
};

const PDFViewerPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const pdf = slug ? pdfMap[slug] : undefined;

  if (!pdf) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">PDF Not Found</h2>
        <Link to="/home/projects" className="btn btn-primary">Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-2">
      <div className="w-full max-w-4xl mb-4 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">{pdf.title}</h1>
        <Link to="/home/projects" className="btn btn-primary">Back to Projects</Link>
      </div>
      <div className="w-full max-w-4xl flex-1 rounded-lg overflow-hidden shadow-lg bg-white" style={{ minHeight: '80vh', height: '80vh' }}>
        <iframe
          src={pdf.path}
          title={pdf.title}
          className="w-full h-full border-0"
          style={{ minHeight: '100%', minWidth: '100%' }}
        />
      </div>
    </div>
  );
};

export default PDFViewerPage; 