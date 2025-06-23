
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, User, CheckCircle } from 'lucide-react';
import { Appointment } from '@/types';

interface DoctorStatisticsProps {
  appointments: Appointment[];
}

export const DoctorStatistics: React.FC<DoctorStatisticsProps> = ({ appointments }) => {
  const getTodayAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === today);
  };

  const getUpcomingAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(apt => apt.date > today);
  };

  const getCompletedAppointments = () => {
    return appointments.filter(apt => apt.status === 'completed');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">مواعيد اليوم</p>
              <p className="text-3xl font-bold text-blue-600">{getTodayAppointments().length}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">المواعيد القادمة</p>
              <p className="text-3xl font-bold text-green-600">{getUpcomingAppointments().length}</p>
            </div>
            <Clock className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">إجمالي المواعيد</p>
              <p className="text-3xl font-bold text-purple-600">{appointments.length}</p>
            </div>
            <User className="h-8 w-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">المواعيد المكتملة</p>
              <p className="text-3xl font-bold text-orange-600">{getCompletedAppointments().length}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-orange-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
