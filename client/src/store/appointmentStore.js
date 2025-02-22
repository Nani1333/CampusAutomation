import { create } from 'zustand';

// Dummy data for faculty members
const dummyFaculty = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    imageUrl: 'https://ui-avatars.com/api/?name=Sarah+Johnson',
    designation: 'Professor',
    department: 'Computer Science',
    availability: 'available',
    queueLength: 0,
    nextAvailableSlot: '2:00 PM',
    expertise: ['Artificial Intelligence', 'Machine Learning'],
    rating: 4.8,
    cabinNumber: 'C-201'
  },
  {
    id: 2,
    name: 'Prof. Michael Chen',
    imageUrl: 'https://ui-avatars.com/api/?name=Michael+Chen',
    designation: 'Associate Professor',
    department: 'Electrical Engineering',
    availability: 'busy',
    queueLength: 3,
    nextAvailableSlot: '3:40 PM',
    expertise: ['Digital Electronics', 'VLSI Design'],
    rating: 4.5,
    cabinNumber: 'C-202'
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    imageUrl: 'https://ui-avatars.com/api/?name=Emily+Rodriguez',
    designation: 'Assistant Professor',
    department: 'Computer Science',
    availability: 'available',
    queueLength: 1,
    nextAvailableSlot: '2:40 PM',
    expertise: ['Software Engineering', 'Web Development'],
    rating: 4.7,
    cabinNumber: 'C-203'
  },
  {
    id: 4,
    name: 'Prof. David Kim',
    imageUrl: 'https://ui-avatars.com/api/?name=David+Kim',
    designation: 'Professor',
    department: 'Information Technology',
    availability: 'busy',
    queueLength: 2,
    nextAvailableSlot: '4:00 PM',
    expertise: ['Cybersecurity', 'Network Systems'],
    rating: 4.9,
    cabinNumber: 'C-204'
  }
];

// Dummy data for notifications
const dummyNotifications = [
  {
    id: 1,
    type: 'status',
    message: 'Dr. Sarah Johnson is now available for appointments',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    read: false
  },
  {
    id: 2,
    type: 'appointment',
    message: 'Your appointment with Prof. Michael Chen is confirmed for 3:40 PM',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: true
  },
  {
    id: 3,
    type: 'queue',
    message: "You're 2nd in line for Dr. Emily Rodriguez",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    read: false
  }
];

const useAppointmentStore = create((set, get) => ({
  // State
  faculty: dummyFaculty,
  notifications: dummyNotifications,
  loading: false,
  wsConnection: null,
  searchTerm: '',
  filter: 'all',

  // Actions
  setFaculty: (faculty) => set({ faculty }),
  setLoading: (loading) => set({ loading }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setFilter: (filter) => set({ filter }),
  setWsConnection: (wsConnection) => set({ wsConnection }),

  // Notification actions
  addNotification: (notification) => set((state) => ({
    notifications: [{
      id: Date.now(),
      read: false,
      ...notification
    }, ...state.notifications]
  })),

  markNotificationAsRead: (notificationId) => set((state) => ({
    notifications: state.notifications.map(n =>
      n.id === notificationId ? { ...n, read: true } : n
    )
  })),

  // Faculty actions
  updateFacultyStatus: (facultyId, newStatus, queueLength) => set((state) => ({
    faculty: state.faculty.map(f =>
      f.id === facultyId
        ? { ...f, availability: newStatus, queueLength: queueLength || f.queueLength }
        : f
    )
  })),

  updateQueueLength: (facultyId, queueLength) => set((state) => ({
    faculty: state.faculty.map(f =>
      f.id === facultyId ? { ...f, queueLength } : f
    )
  })),

  // Filtered faculty getter
  getFilteredFaculty: () => {
    const state = get();
    return state.faculty.filter(facultyMember => {
      const matchesSearch = facultyMember.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
                           facultyMember.department.toLowerCase().includes(state.searchTerm.toLowerCase());
      const matchesFilter = state.filter === 'all' || facultyMember.availability === state.filter;
      return matchesSearch && matchesFilter;
    });
  }
}));

export default useAppointmentStore; 