
import { useState, useEffect } from 'react';
import { Appointment, Doctor } from '@/types';

export const useDoctorDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    // Load doctors from localStorage
    const allDepartments = JSON.parse(localStorage.getItem('departments') || '[]');
    const savedDoctors = JSON.parse(localStorage.getItem('doctors') || '[]');
    
    // Combine doctors from departments and saved doctors
    const allDoctors: Doctor[] = [...savedDoctors];
    allDepartments.forEach((dept: any) => {
      if (dept.doctors) {
        dept.doctors.forEach((doctor: Doctor) => {
          // Only add if not already in the list
          if (!allDoctors.find(d => d.id === doctor.id)) {
            allDoctors.push(doctor);
          }
        });
      }
    });
    
    setDoctors(allDoctors);
    console.log('Loaded doctors:', allDoctors);
  }, []);

  useEffect(() => {
    if (selectedDoctorId) {
      const doctor = doctors.find(d => d.id === selectedDoctorId);
      setSelectedDoctor(doctor || null);
      
      if (doctor) {
        const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        console.log('All appointments:', allAppointments);
        console.log('Looking for appointments for doctor:', doctor.name);
        
        // Filter appointments by both doctorName and doctorId to ensure we catch all matches
        const doctorAppointments = allAppointments.filter((apt: Appointment) => 
          apt.doctorName === doctor.name || apt.doctorId === doctor.id
        );
        
        console.log('Filtered appointments for doctor:', doctorAppointments);
        setAppointments(doctorAppointments);
      }
    } else {
      setAppointments([]);
      setSelectedDoctor(null);
    }
  }, [selectedDoctorId, doctors]);

  // Listen for appointment changes
  useEffect(() => {
    const handleStorageChange = () => {
      if (selectedDoctorId && selectedDoctor) {
        const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        const doctorAppointments = allAppointments.filter((apt: Appointment) => 
          apt.doctorName === selectedDoctor.name || apt.doctorId === selectedDoctor.id
        );
        setAppointments(doctorAppointments);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, [selectedDoctorId, selectedDoctor]);

  const updateAppointmentStatus = (appointmentId: string, newStatus: 'confirmed' | 'completed' | 'cancelled') => {
    const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const updatedAppointments = allAppointments.map((apt: Appointment) =>
      apt.id === appointmentId ? { ...apt, status: newStatus } : apt
    );
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    
    setAppointments(prev => prev.map(apt =>
      apt.id === appointmentId ? { ...apt, status: newStatus } : apt
    ));
  };

  return {
    appointments,
    doctors,
    selectedDoctorId,
    setSelectedDoctorId,
    selectedDoctor,
    updateAppointmentStatus
  };
};
