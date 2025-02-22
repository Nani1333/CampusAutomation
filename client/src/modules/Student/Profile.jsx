import { useState, useRef } from 'react';
import { FiEdit2, FiUpload, FiTrash2, FiGithub, FiLinkedin } from 'react-icons/fi';

const Profile = () => {
  // State management for student data
  const [studentData, setStudentData] = useState({
    personalInfo: {
      name: 'John Doe',
      email: 'john.doe@university.edu',
      contact: '+1 234 567 8900',
      profilePicture: '/default-avatar.png'
    },
    academicInfo: {
      studentId: 'STU123456',
      department: 'Computer Science',
      year: '3rd Year',
      cgpa: '3.85'
    },
    socialLinks: {
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe'
    },
    settings: {
      emailNotifications: true,
      smsNotifications: false
    }
  });

  const [resume, setResume] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editSection, setEditSection] = useState('');
  const fileInputRef = useRef(null);

  // Handlers
  const handleEditClick = (section) => {
    setEditSection(section);
    setIsEditing(true);
  };

  const handleSaveChanges = (section, newData) => {
    setStudentData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...newData }
    }));
    setIsEditing(false);
  };

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setResume(file);
    }
  };

  const handleDeleteResume = () => {
    setResume(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        {/* Header Section */}
        <div className="relative h-48 rounded-t-lg bg-gradient-to-r from-blue-500 to-blue-600">
          <div className="absolute -bottom-16 left-8">
            <div className="relative">
              <img
                src={studentData.personalInfo.profilePicture}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white bg-white"
              />
              <button
                onClick={() => handleEditClick('profilePicture')}
                className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600"
                aria-label="Edit profile picture"
              >
                <FiEdit2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="pt-20 px-8 pb-8">
          {/* Personal Information */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
              <button
                onClick={() => handleEditClick('personalInfo')}
                className="flex items-center text-blue-500 hover:text-blue-600"
                aria-label="Edit personal information"
              >
                <FiEdit2 className="w-4 h-4 mr-1" />
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{studentData.personalInfo.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{studentData.personalInfo.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Contact</p>
                <p className="font-medium">{studentData.personalInfo.contact}</p>
              </div>
            </div>
          </section>

          {/* Academic Information */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Academic Information</h2>
              <button
                onClick={() => handleEditClick('academicInfo')}
                className="flex items-center text-blue-500 hover:text-blue-600"
                aria-label="Edit academic information"
              >
                <FiEdit2 className="w-4 h-4 mr-1" />
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Student ID</p>
                <p className="font-medium">{studentData.academicInfo.studentId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium">{studentData.academicInfo.department}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Year</p>
                <p className="font-medium">{studentData.academicInfo.year}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">CGPA</p>
                <p className="font-medium">{studentData.academicInfo.cgpa}</p>
              </div>
            </div>
          </section>

          {/* Resume Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Resume</h2>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleResumeUpload}
                accept=".pdf,.doc,.docx"
                className="hidden"
                id="resume-upload"
              />
              <label
                htmlFor="resume-upload"
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
              >
                <FiUpload className="w-4 h-4 mr-2" />
                {resume ? 'Update Resume' : 'Upload Resume'}
              </label>
              {resume && (
                <button
                  onClick={handleDeleteResume}
                  className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  aria-label="Delete resume"
                >
                  <FiTrash2 className="w-4 h-4 mr-2" />
                  Delete
                </button>
              )}
            </div>
            {resume && (
              <p className="mt-2 text-sm text-gray-600">
                Current resume: {resume.name}
              </p>
            )}
          </section>

          {/* Social Links */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Social Links</h2>
            <div className="flex space-x-4">
              <a
                href={studentData.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
              >
                <FiGithub className="w-4 h-4 mr-2" />
                GitHub
              </a>
              <a
                href={studentData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <FiLinkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
