
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Appointment } from '@/types';
import { Calendar, Clock, User, Phone, CreditCard, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';

export const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (user) {
      const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      // Filter appointments for this doctor by name since we don't have doctorId in user
      const doctorAppointments = allAppointments.filter((apt: Appointment) => 
        apt.doctorName === user.name
      );
      setAppointments(doctorAppointments);
    }
  }, [user]);

  const updateAppointmentStatus = (appointmentId: string, newStatus: 'confirmed' | 'completed' | 'cancelled') => {
    const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const updatedAppointments = allAppointments.map((apt: Appointment) =>
      apt.id === appointmentId ? { ...apt, status: newStatus } : apt
    );
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    
    setAppointments(prev => prev.map(apt =>
      apt.id === appointmentId ? { ...apt, status: newStatus } : apt
    ));

    const statusMessages = {
      confirmed: 'تم تأكيد الموعد',
      completed: 'تم إكمال الموعد',
      cancelled: 'تم إلغاء الموعد'
    };

    toast({
      title: statusMessages[newStatus],
      description: 'تم تحديث حالة الموعد بنجاح',
    });
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { label: 'في الانتظار', variant: 'secondary' as const },
      confirmed: { label: 'مؤكد', variant: 'default' as const },
      completed: { label: 'مكتمل', variant: 'secondary' as const },
      cancelled: { label: 'ملغي', variant: 'destructive' as const },
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.pending;
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  const getTodayAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === today);
  };

  const getUpcomingAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(apt => apt.date > today);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card className="medical-gradient text-white">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2">مرحباً، {user?.name}</h2>
          <p className="text-blue-100">لديك {getTodayAppointments().length} مواعيد اليوم</p>
        </CardContent>
      </Card>

      {/* Statistics */}
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
                <p className="text-3xl font-bold text-orange-600">
                  {appointments.filter(apt => apt.status === 'completed').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointments List */}
      <Card>
        <CardHeader>
          <CardTitle>مواعيدي</CardTitle>
        </CardHeader>
        <CardContent>
          {appointments.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">لا توجد مواعيد</h3>
              <p className="text-gray-600">لم يتم حجز أي مواعيد معك بعد</p>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <Card key={appointment.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-right">
                        <h4 className="font-semibold text-lg">{appointment.patientName}</h4>
                        {getStatusBadge(appointment.status)}
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-gray-500">
                          {format(new Date(appointment.date), 'dd MMMM yyyy', { locale: ar })}
                        </p>
                        <p className="text-sm font-medium">{appointment.time}</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">
                            {format(new Date(appointment.date), 'EEEE, dd MMMM yyyy', { locale: ar })}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Clock className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{appointment.time}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <CreditCard className="h-4 w-4 text-purple-600" />
                          <span className="text-sm">
                            {appointment.paymentMethod === 'cash' ? 'نقداً' : 'بطاقة ائتمان'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {appointment.notes && (
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-sm text-gray-700">
                              <strong>ملاحظات:</strong> {appointment.notes}
                            </p>
                          </div>
                        )}
                        
                        {appointment.status === 'pending' && (
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <Button
                              size="sm"
                              onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              تأكيد
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              إلغاء
                            </Button>
                          </div>
                        )}
                        
                        {appointment.status === 'confirmed' && (
                          <Button
                            size="sm"
                            onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            إكمال الموعد
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
