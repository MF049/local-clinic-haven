
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Appointment } from '@/types';
import { Calendar, Clock, User, MapPin, CreditCard, Banknote } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';

export const MyAppointments: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const loadAppointments = () => {
    if (user) {
      const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      const userAppointments = allAppointments.filter((apt: Appointment) => apt.patientId === user.id);
      setAppointments(userAppointments);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, [user]);

  // Listen for appointment changes from admin panel
  useEffect(() => {
    const handleStorageChange = () => {
      loadAppointments();
    };

    // Listen for storage events from other tabs/windows
    window.addEventListener('storage', handleStorageChange);
    
    // Listen for focus events (when user returns to this tab)
    window.addEventListener('focus', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, [user]);

  const cancelAppointment = (appointmentId: string) => {
    const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const updatedAppointments = allAppointments.map((apt: Appointment) =>
      apt.id === appointmentId ? { ...apt, status: 'cancelled' } : apt
    );
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    
    setAppointments(prev => prev.map(apt =>
      apt.id === appointmentId ? { ...apt, status: 'cancelled' } : apt
    ));

    toast({
      title: 'تم إلغاء الموعد',
      description: 'تم إلغاء موعدك بنجاح',
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

  const getStatusText = (status: string) => {
    const statusMap = {
      pending: 'في الانتظار',
      confirmed: 'مؤكد', 
      completed: 'مكتمل',
      cancelled: 'ملغي',
    };
    
    return statusMap[status as keyof typeof statusMap] || 'في الانتظار';
  };

  if (!user) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">يرجى تسجيل الدخول أولاً</h2>
        <p className="text-gray-600">لعرض مواعيدك، يجب تسجيل الدخول إلى حسابك</p>
      </div>
    );
  }

  return (
    <section id="my-appointments" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">مواعيدي</h2>
          <p className="text-xl text-gray-600">تتبع مواعيدك الطبية</p>
        </div>

        {appointments.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">لا توجد مواعيد</h3>
              <p className="text-gray-600 mb-6">لم تقم بحجز أي مواعيد بعد</p>
              <Button className="medical-gradient text-white">
                احجز موعدك الأول
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {appointments.map((appointment) => (
              <Card key={appointment.id} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="text-right">
                      <CardTitle className="text-xl mb-2">موعد رقم #{appointment.id.slice(-6)}</CardTitle>
                      {getStatusBadge(appointment.status)}
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-500">
                        {format(new Date(appointment.date), 'dd MMMM yyyy', { locale: ar })}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <User className="h-5 w-5 text-blue-600" />
                        <div className="text-right">
                          <p className="font-semibold">{appointment.doctorName}</p>
                          <p className="text-sm text-gray-600">{appointment.department}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Calendar className="h-5 w-5 text-green-600" />
                        <div className="text-right">
                          <p className="font-medium">
                            {format(new Date(appointment.date), 'EEEE, dd MMMM yyyy', { locale: ar })}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Clock className="h-5 w-5 text-orange-600" />
                        <div className="text-right">
                          <p className="font-medium">{appointment.time}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        {appointment.paymentMethod === 'cash' ? (
                          <Banknote className="h-5 w-5 text-green-600" />
                        ) : (
                          <CreditCard className="h-5 w-5 text-blue-600" />
                        )}
                        <div className="text-right">
                          <p className="font-medium">
                            {appointment.paymentMethod === 'cash' ? 'الدفع نقداً' : 'الدفع بالبطاقة'}
                          </p>
                          <p className="text-sm text-gray-600">
                            الحالة: {getStatusText(appointment.status)}
                          </p>
                        </div>
                      </div>

                      {appointment.notes && (
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm text-gray-700 text-right">
                            <strong>ملاحظات:</strong> {appointment.notes}
                          </p>
                        </div>
                      )}

                      {appointment.status === 'pending' && (
                        <div className="flex space-x-2 rtl:space-x-reverse">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => cancelAppointment(appointment.id)}
                          >
                            إلغاء الموعد
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                          >
                            تعديل الموعد
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
