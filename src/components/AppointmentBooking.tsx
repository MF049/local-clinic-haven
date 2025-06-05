
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { useAuth } from '@/contexts/AuthContext';
import { departments } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { CalendarIcon, Clock, User, CreditCard, Banknote } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

export const AppointmentBooking: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('cash');
  const [isBooking, setIsBooking] = useState(false);

  const selectedDept = departments.find(d => d.id === selectedDepartment);
  const selectedDoc = selectedDept?.doctors.find(d => d.id === selectedDoctor);

  const handleBooking = async () => {
    if (!selectedDepartment || !selectedDoctor || !selectedDate || !selectedTime) {
      toast({
        title: 'بيانات ناقصة',
        description: 'يرجى تعبئة جميع البيانات المطلوبة',
        variant: 'destructive',
      });
      return;
    }

    setIsBooking(true);

    // Simulate booking process
    setTimeout(() => {
      const newAppointment = {
        id: Date.now().toString(),
        patientId: user?.id || '',
        patientName: user?.name || '',
        doctorId: selectedDoctor,
        doctorName: selectedDoc?.name || '',
        department: selectedDept?.name || '',
        date: format(selectedDate, 'yyyy-MM-dd'),
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
            {/* Department Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-right">اختر القسم:</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {departments.map((dept) => (
                  <Card
                    key={dept.id}
                    className={`cursor-pointer transition-all ${
                      selectedDepartment === dept.id
                        ? 'ring-2 ring-blue-500 bg-blue-50'
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => {
                      setSelectedDepartment(dept.id);
                      setSelectedDoctor('');
                    }}
                  >
                    <CardContent className="p-4 text-center">
                      <h4 className="font-semibold text-gray-900">{dept.name}</h4>
                      <p className="text-sm text-gray-600 mt-2">{dept.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Doctor Selection */}
            {selectedDept && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-right">اختر الطبيب:</h3>
                <div className="space-y-3">
                  {selectedDept.doctors.map((doctor) => (
                    <Card
                      key={doctor.id}
                      className={`cursor-pointer transition-all ${
                        selectedDoctor === doctor.id
                          ? 'ring-2 ring-blue-500 bg-blue-50'
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedDoctor(doctor.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                          <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div className="flex-1 text-right">
                            <h4 className="font-semibold text-gray-900">{doctor.name}</h4>
                            <p className="text-gray-600">{doctor.specialty}</p>
                            <p className="text-sm text-blue-600">{doctor.experience}</p>
                            <div className="flex items-center justify-end space-x-1 rtl:space-x-reverse mt-2">
                              <span className="text-yellow-400">★</span>
                              <span className="text-sm">{doctor.rating}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Date Selection */}
            {selectedDoctor && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-right flex items-center space-x-2 rtl:space-x-reverse">
                  <CalendarIcon className="h-5 w-5" />
                  <span>اختر التاريخ:</span>
                </h3>
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 5} // Disable past dates and Fridays
                    className="rounded-md border"
                  />
                </div>
              </div>
            )}

            {/* Time Selection */}
            {selectedDate && selectedDoc && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-right flex items-center space-x-2 rtl:space-x-reverse">
                  <Clock className="h-5 w-5" />
                  <span>اختر الوقت:</span>
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  {selectedDoc.availableSlots.map((slot) => (
                    <Button
                      key={slot}
                      variant={selectedTime === slot ? "default" : "outline"}
                      onClick={() => setSelectedTime(slot)}
                      className={selectedTime === slot ? "medical-gradient text-white" : ""}
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Method */}
            {selectedTime && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-right">طريقة الدفع:</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Card
                    className={`cursor-pointer transition-all ${
                      paymentMethod === 'cash'
                        ? 'ring-2 ring-blue-500 bg-blue-50'
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setPaymentMethod('cash')}
                  >
                    <CardContent className="p-4 text-center">
                      <Banknote className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <span className="font-medium">نقداً</span>
                    </CardContent>
                  </Card>
                  <Card
                    className={`cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'ring-2 ring-blue-500 bg-blue-50'
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <CardContent className="p-4 text-center">
                      <CreditCard className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <span className="font-medium">بطاقة ائتمان</span>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Booking Summary and Confirm */}
            {selectedTime && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-right">ملخص الحجز:</h3>
                <div className="space-y-2 text-right">
                  <p><strong>القسم:</strong> {selectedDept?.name}</p>
                  <p><strong>الطبيب:</strong> {selectedDoc?.name}</p>
                  <p><strong>التاريخ:</strong> {selectedDate && format(selectedDate, 'dd MMMM yyyy', { locale: ar })}</p>
                  <p><strong>الوقت:</strong> {selectedTime}</p>
                  <p><strong>طريقة الدفع:</strong> {paymentMethod === 'cash' ? 'نقداً' : 'بطاقة ائتمان'}</p>
                </div>
                <Button
                  onClick={handleBooking}
                  disabled={isBooking}
                  className="w-full mt-6 medical-gradient text-white text-lg py-3"
                >
                  {isBooking ? 'جاري الحجز...' : 'تأكيد الحجز'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
