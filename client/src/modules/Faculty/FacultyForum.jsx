import React, { useState } from 'react';
import { 
  FaSearch, FaPlus, FaRegStar, FaStar, FaChevronRight, 
  FaFilter, FaTimes, FaCheck, FaEdit 
} from 'react-icons/fa';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { MdOutlineForum, MdTrendingUp } from 'react-icons/md';

const FacultyForum = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [starredPosts, setStarredPosts] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const [discussions] = useState([
    {
      id: 1,
      title: "Advanced Data Structures Implementation Guide",
      content: "I've created a comprehensive guide for implementing advanced data structures. Looking for peer review before verification.",
      author: "Dr. Sarah Chen",
      category: "algorithms",
      votes: 42,
      answers: 5,
      timestamp: "2 hours ago",
      isVerified: true,
      tags: ["data-structures", "algorithms", "teaching"]
    },
    {
      id: 2,
      title: "Student Query: React Hooks Implementation",
      content: "A student is asking about custom hooks implementation. Need verification on my proposed solution.",
      author: "Prof. Mike Johnson",
      category: "web",
      votes: 28,
      answers: 3,
      timestamp: "5 hours ago",
      isVerified: false,
      tags: ["react", "javascript", "teaching-materials"]
    },
    {
      id: 3,
      title: "Database Normalization Exercise Solutions",
      content: "Posted solutions for the recent database normalization exercise. Pending verification.",
      author: "Dr. Alex Kumar",
      category: "databases",
      votes: 35,
      answers: 7,
      timestamp: "1 day ago",
      isVerified: false,
      tags: ["database-design", "solutions", "verification-needed"]
    }
  ]);

  const categories = [
    { id: 'all', name: 'All Topics', count: 150, icon: MdOutlineForum },
    { id: 'my-discussions', name: 'My Discussions', count: 15, icon: MdOutlineForum },
    { id: 'unverified', name: 'Pending Verification', count: 8, icon: MdOutlineForum },
    { id: 'trending', name: 'Trending', count: 24, icon: MdTrendingUp },
    { id: 'algorithms', name: 'Algorithms', count: 45, icon: MdOutlineForum },
    { id: 'databases', name: 'Databases', count: 32, icon: MdOutlineForum }
  ];

  const handleVerifyPost = (postId, e) => {
    e.stopPropagation();
    // Implement verification logic
  };

  // ... rest of the component structure remains similar ...

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar - Same as DiscussionForum */}
      
      {/* Main Content */}
      <main className="flex-1 ml-72 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header with Faculty-specific title */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Faculty Discussion Forum</h1>
            <div className="flex gap-3">
              <button
                className="bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 
                  hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                onClick={() => {/* Add verification queue modal logic */}}
                aria-label="View verification queue"
              >
                <FaCheck className="text-sm" /> Verification Queue
              </button>
              <button
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 
                  hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                onClick={() => {/* Add new discussion modal logic */}}
                aria-label="Create new discussion"
              >
                <FaPlus className="text-sm" /> New Discussion
              </button>
            </div>
          </div>

          {/* Search and Filters - Same as DiscussionForum with faculty-specific filters */}
          
          {/* Discussion Cards with faculty-specific actions */}
          <div className="space-y-4">
            {discussions.map(discussion => (
              <article 
                key={discussion.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 
                  dark:border-gray-700 hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                {/* ... existing discussion card structure ... */}
                
                {/* Additional faculty actions */}
                <div className="mt-4 flex justify-end gap-3">
                  <button
                    onClick={(e) => handleVerifyPost(discussion.id, e)}
                    className="px-4 py-2 text-sm font-medium text-green-600 bg-green-50 
                      rounded-lg hover:bg-green-100 flex items-center gap-2"
                    aria-label="Verify post"
                  >
                    <FaCheck /> Verify
                  </button>
                  <button
                    className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 
                      rounded-lg hover:bg-blue-100 flex items-center gap-2"
                    aria-label="Edit post"
                  >
                    <FaEdit /> Edit
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FacultyForum;
