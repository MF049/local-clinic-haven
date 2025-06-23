import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { User } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { useAppointmentData } from '@/hooks/useAppointmentData';
import { useAppointmentConflicts } from '@/hooks/useAppointmentConflicts';
import { DepartmentSelection } from '@/components/appointment/DepartmentSelection';
import { DoctorSelection } from '@/components/appointment/DoctorSelection';
import { DateTimeSelection } from '@/components/appointment/DateTimeSelection';
import { PaymentMethodSelection } from '@/components/appointment/PaymentMethodSelection';
import { BookingSummary } from '@/components/appointment/BookingSummary';

export const AppointmentBooking: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { departments } = useAppointmentData();
  const { checkDoctorAvailability, checkUserAvailability } = useAppointmentConflicts();
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('cash');
  const [isBooking, setIsBooking] = useState(false);

  const selectedDept = departments.find(d => d.id === selectedDepartment);
  const selectedDoc = selectedDept?.doctors.find(d => d.id === selectedDoctor);

  const handleDepartmentSelect = (departmentId: string) => {
    setSelectedDepartment(departmentId);
    setSelectedDoctor('');
  };

  const handleBooking = async () => {
    if (!selectedDepartment || !selectedDoctor || !selectedDate || !selectedTime || !user) {
      toast({
        title: 'بيانات ناقصة',
        description: 'يرجى تعبئة جميع البيانات المطلوبة',
        variant: 'destructive',
      });
      return;
    }

    const dateString = format(selectedDate, 'yyyy-MM-dd');

    // Check for conflicts
    const isDoctorAvailable = checkDoctorAvailability(selectedDoctor, dateString, selectedTime);
    const isUserAvailable = checkUserAvailability(user.id, dateString, selectedTime);

    if (!isDoctorAvailable) {
      toast({
        title: 'موعد غير متاح',
        description: 'هذا الموعد محجوز بالفعل مع الطبيب. يرجى اختيار موعد آخر',
        variant: 'destructive',
      });
      return;
    }

    if (!isUserAvailable) {
      toast({
        title: 'تعارض في المواعيد',
        description: 'لديك موعد آخر في نفس هذا الوقت. يرجى اختيار وقت مختلف',
        variant: 'destructive',
      });
      return;
    }

    setIsBooking(true);

    // Simulate booking process
    setTimeout(() => {
      const newAppointment = {
        id: Date.now().toString(),
        patientId: user.id,
        patientName: user.name,
        doctorId: selectedDoctor,
        doctorName: selectedDoc?.name || '',
        department: selectedDept?.name || '',
        date: dateString,
        time: selectedTime,
        status: 'pending' as const,
        paymentMethod,
        paymentStatus: 'pending' as const,
      };

      // Save to localStorage
      const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      existingAppointments.push(newAppointment);
      localStorage.setItem('appointments', JSON.stringify(existingAppointments));

      toast({
        title: 'تم حجز الموعد بنجاح',
        description: `موعدك مع ${selectedDoc?.name} في ${format(selectedDate, 'dd MMMM yyyy', { locale: ar })} الساعة ${selectedTime}`,
      });

      // Reset form
      setSelectedDepartment('');
      setSelectedDoctor('');
      setSelectedDate(undefined);
      setSelectedTime('');
      setIsBooking(false);
    }, 2000);
  };

  if (!user) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">يرجى تسجيل الدخول أولاً</h2>
        <p className="text-gray-600">لحجز موعد، يجب تسجيل الدخول إلى حسابك</p>
      </div>
    );
  }

  return (
    <section id="appointment-booking" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">حجز موعد</h2>
          <p className="text-xl text-gray-600">احجز موعدك مع أفضل الأطباء</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-right flex items-center space-x-2 rtl:space-x-reverse">
              <User className="h-6 w-6 text-blue-600" />
              <span>مرحباً {user.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <DepartmentSelection
              departments={departments}
              selectedDepartment={selectedDepartment}
              onSelectDepartment={handleDepartmentSelect}
            />

            {selectedDept && (
              <DoctorSelection
                selectedDept={selectedDept}
                selectedDoctor={selectedDoctor}
                onSelectDoctor={setSelectedDoctor}
              />
            )}

            {selectedDoctor && selectedDoc && (
              <DateTimeSelection
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                selectedDoc={selectedDoc}
                onSelectDate={setSelectedDate}
                onSelectTime={setSelectedTime}
              />
            )}

            {selectedTime && (
              <PaymentMethodSelection
                paymentMethod={paymentMethod}
                onSelectPaymentMethod={setPaymentMethod}
              />
            )}

            {selectedTime && selectedDept && selectedDoc && selectedDate && (
              <BookingSummary
                selectedDept={selectedDept}
                selectedDoc={selectedDoc}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                paymentMethod={paymentMethod}
                isBooking={isBooking}
                onConfirmBooking={handleBooking}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
