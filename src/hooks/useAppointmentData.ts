
import { useState, useEffect } from 'react';
import { Department } from '@/types';

export const useAppointmentData = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const loadDepartmentsAndDoctors = () => {
    // Load departments and doctors from localStorage
    const savedDepartments = localStorage.getItem('departments');
    const savedDoctors = localStorage.getItem('doctors');
    
    if (savedDepartments && savedDoctors) {
      const departmentsData = JSON.parse(savedDepartments);
      const doctorsData = JSON.parse(savedDoctors);
      
      // Group doctors by department
      const departmentsWithDoctors = departmentsData.map((dept: any) => ({
        ...dept,
        doctors: doctorsData.filter((doctor: any) => doctor.department === dept.name)
      }));
      
      setDepartments(departmentsWithDoctors);
    } else {
      // Fallback to mock data if no data in localStorage
      import('@/data/mockData').then(({ departments: mockDepartments }) => {
        setDepartments(mockDepartments);
      });
    }
  };

  useEffect(() => {
    loadDepartmentsAndDoctors();
  }, [refreshKey]);

  // Listen for storage changes (when admin adds new data)
  useEffect(() => {
    const handleStorageChange = () => {
      setRefreshKey(prev => prev + 1);
    };

    // Listen for storage events from other tabs/windows
    window.addEventListener('storage', handleStorageChange);
    
    // Listen for focus events (when user returns to this tab)
    window.addEventListener('focus', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);

  return { departments };
};
