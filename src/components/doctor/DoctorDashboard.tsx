
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useDoctorDashboard } from '@/hooks/useDoctorDashboard';
import { DoctorSelection } from './DoctorSelection';
import { DoctorInfo } from './DoctorInfo';
import { DoctorStatistics } from './DoctorStatistics';
import { AppointmentsList } from './AppointmentsList';

export const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();
  const {
    appointments,
    doctors,
    selectedDoctorId,
    setSelectedDoctorId,
    selectedDoctor,
    updateAppointmentStatus
  } = useDoctorDashboard();

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card className="medical-gradient text-white">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2">مرحباً، {user?.name}</h2>
          <p className="text-blue-100">اختر طبيباً لعرض مواعيده</p>
        </CardContent>
      </Card>

      {/* Doctor Selection */}
      <DoctorSelection
        doctors={doctors}
        selectedDoctorId={selectedDoctorId}
        onDoctorSelect={setSelectedDoctorId}
      />

      {selectedDoctor && (
        <>
          {/* Selected Doctor Info */}
          <DoctorInfo doctor={selectedDoctor} />

          {/* Statistics */}
          <DoctorStatistics appointments={appointments} />

          {/* Appointments List */}
          <AppointmentsList
            appointments={appointments}
            doctorName={selectedDoctor.name}
            onUpdateStatus={updateAppointmentStatus}
          />
        </>
      )}
    </div>
  );
};
