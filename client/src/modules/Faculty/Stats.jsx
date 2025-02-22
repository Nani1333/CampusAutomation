import React from 'react';
import { Users, Clock, Calendar, TrendingUp } from 'react-feather';

const Stats = ({ faculty }) => {
  // Default values if faculty data is not available
  const defaultStats = {
    queueLength: 0,
    averageWaitTime: '15 mins',
    todayAppointments: 0,
    popularTimeSlot: '2:00 PM - 4:00 PM'
  };

  // Safely access faculty data with fallbacks
  const stats = [
    {
      label: 'Students in Queue',
      value: faculty?.queueLength ?? defaultStats.queueLength,
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'Average Wait Time',
      value: faculty?.averageWaitTime ?? defaultStats.averageWaitTime,
      icon: Clock,
      color: 'text-green-500',
      bgColor: 'bg-green-100'
    },
    {
      label: 'Today\'s Appointments',
      value: faculty?.todayAppointments ?? defaultStats.todayAppointments,
      icon: Calendar,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100'
    },
    {
      label: 'Popular Time Slot',
      value: faculty?.popularTimeSlot ?? defaultStats.popularTimeSlot,
      icon: TrendingUp,
      color: 'text-red-500',
      bgColor: 'bg-red-100'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Stats</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-gray-50"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats; 