import React from 'react';
import { Clock, X, MessageCircle } from 'react-feather';

const StudentList = ({ queue, onRemoveStudent }) => {
  const handleMessageStudent = (studentId) => {
    // Implementation for messaging student
    console.log('Messaging student:', studentId);
  };

  const calculateWaitTime = (position) => {
    const avgTimePerStudent = 15; // minutes
    return position * avgTimePerStudent;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Student Queue</h2>
        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
          {queue.length} waiting
        </span>
      </div>

      <div className="space-y-4">
        {queue.map((student, index) => (
          <div
            key={student.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-medium">
                {index + 1}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{student.name}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Waiting: {calculateWaitTime(index)} mins</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleMessageStudent(student.id)}
                className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                aria-label={`Message ${student.name}`}
              >
                <MessageCircle className="w-5 h-5" />
              </button>
              <button
                onClick={() => onRemoveStudent(student.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                aria-label={`Remove ${student.name} from queue`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        {queue.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No students in queue
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentList; 