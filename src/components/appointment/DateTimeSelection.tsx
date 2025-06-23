
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Clock } from 'lucide-react';
import { Doctor } from '@/types';
import { useAppointmentConflicts } from '@/hooks/useAppointmentConflicts';

interface DateTimeSelectionProps {
  selectedDate: Date | undefined;
  selectedTime: string;
  selectedDoc: Doctor;
  onSelectDate: (date: Date | undefined) => void;
  onSelectTime: (time: string) => void;
}

export const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({
  selectedDate,
  selectedTime,
  selectedDoc,
  onSelectDate,
  onSelectTime,
}) => {
  const { getUnavailableSlots } = useAppointmentConflicts();

  const unavailableSlots = selectedDate 
    ? getUnavailableSlots(selectedDoc.id, selectedDate.toISOString().split('T')[0])
    : [];

  return (
    <>
      {/* Date Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-right flex items-center space-x-2 rtl:space-x-reverse">
          <CalendarIcon className="h-5 w-5" />
          <span>اختر التاريخ:</span>
        </h3>
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onSelectDate}
            disabled={(date) => date < new Date() || date.getDay() === 5} // Disable past dates and Fridays
            className="rounded-md border"
          />
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-right flex items-center space-x-2 rtl:space-x-reverse">
            <Clock className="h-5 w-5" />
            <span>اختر الوقت:</span>
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {selectedDoc.availableSlots.map((slot) => {
              const isUnavailable = unavailableSlots.includes(slot);
              return (
                <Button
                  key={slot}
                  variant={selectedTime === slot ? "default" : "outline"}
                  onClick={() => !isUnavailable && onSelectTime(slot)}
                  disabled={isUnavailable}
                  className={`${
                    selectedTime === slot 
                      ? "medical-gradient text-white" 
                      : isUnavailable 
                        ? "bg-red-100 text-red-500 cursor-not-allowed" 
                        : ""
                  }`}
                >
                  {slot}
                  {isUnavailable && <span className="text-xs block">محجوز</span>}
                </Button>
              );
            })}
          </div>
          {unavailableSlots.length > 0 && (
            <p className="text-sm text-gray-600 mt-2 text-right">
              المواعيد المحجوزة بالفعل تظهر باللون الأحمر
            </p>
          )}
        </div>
      )}
    </>
  );
};
