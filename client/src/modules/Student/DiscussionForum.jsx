import React, { useState } from 'react';
import { 
  FaSearch, FaPlus, FaRegStar, FaStar, FaChevronRight, 
  FaFilter, FaTimes, FaCheck 
} from 'react-icons/fa';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { MdOutlineForum, MdTrendingUp } from 'react-icons/md';

const DiscussionForum = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [starredPosts, setStarredPosts] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Topics', count: 150, icon: MdOutlineForum },
    { id: 'trending', name: 'Trending', count: 24, icon: MdTrendingUp },
    { id: 'algorithms', name: 'Algorithms', count: 45, icon: MdOutlineForum },
    { id: 'databases', name: 'Databases', count: 32, icon: MdOutlineForum },
    { id: 'ml', name: 'Machine Learning', count: 28, icon: MdOutlineForum },
    { id: 'web', name: 'Web Development', count: 45, icon: MdOutlineForum }
  ];

  const discussions = [
    {
      id: 1,
      title: "Understanding React Hooks and Custom Hook Patterns",
      content: "I'm trying to grasp the concept of custom hooks in React. What are the best practices for creating reusable hooks?",
      author: "Sarah Chen",
      category: "web",
      votes: 42,
      answers: 5,
      timestamp: "2 hours ago",
      isVerified: true,
      tags: ["react", "javascript", "hooks"]
    },
    {
      id: 2,
      title: "Implementing Binary Search Tree Balancing",
      content: "Looking for guidance on implementing AVL tree balancing algorithm. Any step-by-step examples?",
      author: "Mike Johnson",
      category: "algorithms",
      votes: 28,
      answers: 3,
      timestamp: "5 hours ago",
      isVerified: false,
      tags: ["algorithms", "data-structures", "trees"]
    },
    {
      id: 3,
      title: "Best practices for MongoDB Schema Design",
      content: "What are the recommended approaches for designing MongoDB schemas for a social media application?",
      author: "Alex Kumar",
      category: "databases",
      votes: 35,
      answers: 7,
      timestamp: "1 day ago",
      isVerified: true,
      tags: ["mongodb", "database-design", "nosql"]
    }
  ];

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleSortChange = (e) => setSortBy(e.target.value);
  const handleCategorySelect = (categoryId) => setSelectedCategory(categoryId);
  
  const handleStarPost = (postId, e) => {
    e.stopPropagation();
    setStarredPosts(prev => {
      const newSet = new Set(prev);
      newSet.has(postId) ? newSet.delete(postId) : newSet.add(postId);
      return newSet;
    });
  };

  const handleVote = (e, type) => {
    e.stopPropagation();
    // Implement voting logic
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="fixed w-72 h-full bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 p-6">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Categories</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Browse discussions by topic</p>
        </div>
        
        <nav className="space-y-2">
          {categories.map(category => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`
                  w-full text-left p-3 rounded-xl flex items-center gap-3 
                  transition-all duration-200 group
                  ${isSelected 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }
                `}
                aria-label={`Select ${category.name} category`}
              >
                <Icon className={`text-xl ${isSelected ? 'text-white' : 'text-indigo-600 dark:text-indigo-400'}`} />
                <div className="flex-1">
                  <span className="font-medium">{category.name}</span>
                  <span className="ml-2 text-sm opacity-75">({category.count})</span>
                </div>
                <FaChevronRight className={`text-sm ${isSelected ? 'opacity-100' : 'opacity-50'}`} />
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Discussion Forum</h1>
            <button
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 
                hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg"
              onClick={() => {/* Add new discussion modal logic */}}
              aria-label="Create new discussion"
            >
              <FaPlus className="text-sm" /> New Discussion
            </button>
          </div>

          {/* Search and Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-8 shadow-sm">
            <div className="flex gap-4 mb-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search discussions..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 
                    dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 
                    focus:border-transparent transition-all duration-200 dark:text-white"
                  aria-label="Search discussions"
                />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-6 py-3 border border-gray-200 dark:border-gray-600 rounded-xl 
                  hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 
                  flex items-center gap-2 text-gray-700 dark:text-gray-300"
                aria-label="Toggle filters"
              >
                <FaFilter /> Filters
              </button>
            </div>

            {showFilters && (
              <div className="flex gap-4 items-center">
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 
                    dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300"
                  aria-label="Sort discussions"
                >
                  <option value="newest">Newest First</option>
                  <option value="popular">Most Voted</option>
                  <option value="unanswered">Unanswered</option>
                </select>
                
                <div className="flex gap-2">
                  {["Faculty Verified", "Has Answers", "My Posts"].map(filter => (
                    <button
                      key={filter}
                      className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 
                        hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Discussion Cards */}
          <div className="space-y-4">
            {discussions.map(discussion => (
              <article 
                key={discussion.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 
                  dark:border-gray-700 hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => {/* Navigate to discussion detail */}}
                role="button"
                tabIndex={0}
              >
                <div className="flex items-start gap-4">
                  {/* Voting */}
                  <div className="flex flex-col items-center gap-1">
                    <button
                      onClick={(e) => handleVote(e, 'up')}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
                        transition-colors text-gray-600 dark:text-gray-400"
                      aria-label="Upvote"
                    >
                      <BiUpvote className="text-xl" />
                    </button>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {discussion.votes}
                    </span>
                    <button
                      onClick={(e) => handleVote(e, 'down')}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
                        transition-colors text-gray-600 dark:text-gray-400"
                      aria-label="Downvote"
                    >
                      <BiDownvote className="text-xl" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 
                          hover:text-indigo-600 dark:hover:text-indigo-400">
                          {discussion.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                          {discussion.content}
                        </p>
                      </div>
                      <button
                        onClick={(e) => handleStarPost(discussion.id, e)}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
                          transition-colors"
                        aria-label={starredPosts.has(discussion.id) ? "Unstar post" : "Star post"}
                      >
                        {starredPosts.has(discussion.id) ? (
                          <FaStar className="text-xl text-yellow-400" />
                        ) : (
                          <FaRegStar className="text-xl text-gray-400" />
                        )}
                      </button>
                    </div>

                    {/* Tags and Meta */}
                    <div className="flex flex-wrap items-center gap-3">
                      {discussion.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900 text-indigo-600 
                            dark:text-indigo-300 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Posted by {discussion.author} • {discussion.timestamp}
                      </span>
                      <div className="flex-1" />
                      <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <MdOutlineForum /> {discussion.answers} answers
                      </span>
                      {discussion.isVerified && (
                        <span className="px-3 py-1 bg-green-50 dark:bg-green-900 text-green-600 
                          dark:text-green-300 rounded-full text-sm font-medium flex items-center gap-1">
                          <FaCheck className="text-xs" /> Faculty Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DiscussionForum;