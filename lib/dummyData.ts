export const dummyData = {
  students: [
    {
      studentId: 'S001',
      name: 'Abebe Kebede',
      grade: 9,
      engagement: { weeklySessions: 5, avgDurationHours: 2.5, completionRate: 75 },
      attendance: [
        { classId: 'C001', date: '2025-09-01', percentage: 90, absences: 1 },
        { classId: 'C001', date: '2025-09-08', percentage: 85, absences: 2 },
      ],
      queries: [
        { id: 'Q001', category: 'exam tips', text: 'How to prepare for math?', status: 'open' },
        { id: 'Q002', category: 'course content', text: 'Missing notes for science', status: 'resolved' },
      ],
    },
    // Add more students as needed (e.g., S002, S003, S004 from previous example)
    {
      studentId: 'S002',
      name: 'Selam Tesfaye',
      grade: 10,
      engagement: { weeklySessions: 6, avgDurationHours: 3.0, completionRate: 80 },
      attendance: [
        { classId: 'C002', date: '2025-09-01', percentage: 95, absences: 0 },
        { classId: 'C002', date: '2025-09-08', percentage: 90, absences: 1 },
      ],
      queries: [
        { id: 'Q003', category: 'technical issues', text: 'Login not working', status: 'open' },
      ],
    },
    {
      studentId: 'S003',
      name: 'Tsegaye Alemu',
      grade: 11,
      engagement: { weeklySessions: 4, avgDurationHours: 2.0, completionRate: 70 },
      attendance: [
        { classId: 'C003', date: '2025-09-01', percentage: 88, absences: 1 },
        { classId: 'C003', date: '2025-09-08', percentage: 92, absences: 0 },
      ],
      queries: [
        { id: 'Q004', category: 'exam tips', text: 'Tips for physics exam', status: 'resolved' },
      ],
    },
    {
      studentId: 'S004',
      name: 'Lidya Getachew',
      grade: 12,
      engagement: { weeklySessions: 7, avgDurationHours: 3.5, completionRate: 85 },
      attendance: [
        { classId: 'C004', date: '2025-09-01', percentage: 93, absences: 0 },
        { classId: 'C004', date: '2025-09-08', percentage: 87, absences: 1 },
      ],
      queries: [
        { id: 'Q005', category: 'study materials', text: 'Need biology notes', status: 'open' },
      ],
    },
  ],
};