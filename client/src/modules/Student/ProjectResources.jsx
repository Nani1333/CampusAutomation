import { useState } from 'react';
import { FaSearch, FaDownload, FaBookmark, FaRegBookmark, FaFilter, FaFile, FaFilePdf, FaFileWord, FaFileExcel } from 'react-icons/fa';

function ProjectResources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    faculty: 'all',
    date: 'newest',
    fileType: 'all'
  });
  const [bookmarkedResources, setBookmarkedResources] = useState(new Set());

  const resources = [
    {
      id: 1,
      title: 'Project Management Guidelines 2024',
      description: 'Comprehensive guide for managing final year projects',
      uploadedBy: 'Dr. Smith',
      date: '2024-02-15',
      fileType: 'pdf',
      size: '2.5 MB'
    },
    {
      id: 2,
      title: 'Research Paper Template',
      description: 'Standard template for research paper submissions',
      uploadedBy: 'Prof. Johnson',
      date: '2024-02-10',
      fileType: 'docx',
      size: '1.2 MB'
    },
    // Add more resources as needed
  ];

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'pdf': return <FaFilePdf className="text-red-500" />;
      case 'docx': return <FaFileWord className="text-blue-500" />;
      case 'xlsx': return <FaFileExcel className="text-green-500" />;
      default: return <FaFile className="text-gray-500" />;
    }
  };

  const handleBookmark = (resourceId) => {
    setBookmarkedResources(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(resourceId)) {
        newBookmarks.delete(resourceId);
      } else {
        newBookmarks.add(resourceId);
      }
      return newBookmarks;
    });
  };

  const filteredResources = resources.filter(resource => {
    return resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           resource.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Search and Filters */}
        <div className="flex space-x-4 mb-6">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <FaFilter className="text-gray-500" />
            <span>Filters</span>
          </button>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(resource => (
            <div key={resource.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getFileIcon(resource.fileType)}
                  <h3 className="font-semibold text-lg">{resource.title}</h3>
                </div>
                <button
                  onClick={() => handleBookmark(resource.id)}
                  className="text-gray-400 hover:text-yellow-500"
                >
                  {bookmarkedResources.has(resource.id) ? (
                    <FaBookmark className="text-yellow-500" />
                  ) : (
                    <FaRegBookmark />
                  )}
                </button>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{resource.uploadedBy}</span>
                <span>{new Date(resource.date).toLocaleDateString()}</span>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">{resource.size}</span>
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                  <FaDownload />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectResources;
