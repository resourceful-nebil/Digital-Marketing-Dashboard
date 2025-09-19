'use client';

import { useState, useEffect } from 'react';
import { dummyData } from '../lib/dummyData';

type Student = typeof dummyData.students[0];
type Attendance = Student['attendance'][0];
type Query = Student['queries'][0];

export const useDashboardData = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStudents(dummyData.students);
      setLoading(false);
    }, 500);
  }, []);

  const getAttendanceTrend = () => {
    const allAttendance = students.flatMap(s => s.attendance);
    return allAttendance.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const getEngagementByGrade = () => {
    return students.reduce((acc, student) => {
      if (!acc[student.grade]) acc[student.grade] = { totalSessions: 0, totalDuration: 0, count: 0 };
      acc[student.grade].totalSessions += student.engagement.weeklySessions;
      acc[student.grade].totalDuration += student.engagement.avgDurationHours;
      acc[student.grade].count += 1;
      return acc;
    }, {} as Record<number, { totalSessions: number; totalDuration: number; count: number }>);
  };

  const applyFilters = (filters: { grade?: string; startDate?: string; endDate?: string }) => {
    let filtered = [...dummyData.students]; // Use original data for filtering
    if (filters.grade && filters.grade !== 'all') filtered = filtered.filter(s => s.grade === Number(filters.grade));
    if (filters.startDate || filters.endDate) {
      const start = filters.startDate ? new Date(filters.startDate) : new Date(0);
      const end = filters.endDate ? new Date(filters.endDate) : new Date();
      filtered = filtered.map(s => ({
        ...s,
        attendance: s.attendance.filter(a => {
          const date = new Date(a.date);
          return date >= start && date <= end;
        }),
      })).filter(s => s.attendance.length > 0);
    }
    setStudents(filtered);
  };

  return { students, loading, getAttendanceTrend, getEngagementByGrade, applyFilters };
};