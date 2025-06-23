
import { Appointment } from '@/types';

export const useAppointmentConflicts = () => {
  const checkDoctorAvailability = (doctorId: string, date: string, time: string): boolean => {
    const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    
    // Check if doctor already has an appointment at this date and time
    const conflictingAppointment = existingAppointments.find((apt: Appointment) => 
      apt.doctorId === doctorId && 
      apt.date === date && 
      apt.time === time &&
      apt.status !== 'cancelled' // Don't count cancelled appointments
    );
    
    return !conflictingAppointment; // Return true if no conflict (available)
  };

  const checkUserAvailability = (userId: string, date: string, time: string): boolean => {
    const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    
    // Check if user already has an appointment at this date and time
    const conflictingAppointment = existingAppointments.find((apt: Appointment) => 
      apt.patientId === userId && 
      apt.date === date && 
      apt.time === time &&
      apt.status !== 'cancelled' // Don't count cancelled appointments
    );
    
    return !conflictingAppointment; // Return true if no conflict (available)
  };

  const getUnavailableSlots = (doctorId: string, date: string): string[] => {
    const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    
    return existingAppointments
      .filter((apt: Appointment) => 
        apt.doctorId === doctorId && 
        apt.date === date &&
        apt.status !== 'cancelled'
      )
      .map((apt: Appointment) => apt.time);
  };

  return {
    checkDoctorAvailability,
    checkUserAvailability,
    getUnavailableSlots
  };
};
