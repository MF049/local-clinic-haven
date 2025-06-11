
import React from 'react';
import { Button } from '@/components/ui/button';
import { Department, Doctor } from '@/types';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface BookingSummaryProps {
  selectedDept: Department;
  selectedDoc: Doctor;
  selectedDate: Date;
  selectedTime: string;
  paymentMethod: 'card' | 'cash';
  isBooking: boolean;
  onConfirmBooking: () => void;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  selectedDept,
  selectedDoc,
  selectedDate,
  selectedTime,
  paymentMethod,
  isBooking,
  onConfirmBooking,
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4 text-right">ملخص الحجز:</h3>
      <div className="space-y-2 text-right">
        <p><strong>القسم:</strong> {selectedDept.name}</p>
        <p><strong>الطبيب:</strong> {selectedDoc.name}</p>
        <p><strong>التاريخ:</strong> {format(selectedDate, 'dd MMMM yyyy', { locale: ar })}</p>
        <p><strong>الوقت:</strong> {selectedTime}</p>
        <p><strong>طريقة الدفع:</strong> {paymentMethod === 'cash' ? 'نقداً' : 'بطاقة ائتمان'}</p>
      </div>
      <Button
        onClick={onConfirmBooking}
        disabled={isBooking}
        className="w-full mt-6 medical-gradient text-white text-lg py-3"
      >
        {isBooking ? 'جاري الحجز...' : 'تأكيد الحجز'}
      </Button>
    </div>
  );
};
