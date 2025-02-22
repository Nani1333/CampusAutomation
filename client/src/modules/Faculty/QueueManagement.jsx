import React from 'react';
import { Clock, X } from 'react-feather';

const QueueManagement = ({ queue, setQueue, isPaused }) => {
  const handleRemoveStudent = (studentId) => {
    setQueue(prev => prev.filter(s => s.id !== studentId));
  };

  const calculateWaitTime = (position) => {
    const avgTimePerStudent = 15; // minutes
    return position * avgTimePerStudent;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Current Queue</h2>
        <span className="text-sm text-gray-500">
          {queue.length} student{queue.length !== 1 ? 's' : ''} waiting
        </span>
      </div>

      {isPaused && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <p className="text-yellow-700">Queue is currently paused</p>
        </div>
      )}

      <div className="space-y-4">
        {queue.map((student, index) => (
          <div 
            key={student.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                {index + 1}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{student.name}</h3>
                <p className="text-sm text-gray-500">{student.course}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                <span>{calculateWaitTime(index)} min wait</span>
              </div>
              <button
                onClick={() => handleRemoveStudent(student.id)}
                className="text-gray-400 hover:text-red-500"
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

export default QueueManagement; 