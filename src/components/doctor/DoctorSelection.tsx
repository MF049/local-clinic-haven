
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Doctor } from '@/types';

interface DoctorSelectionProps {
  doctors: Doctor[];
  selectedDoctorId: string;
  onDoctorSelect: (doctorId: string) => void;
}

export const DoctorSelection: React.FC<DoctorSelectionProps> = ({
  doctors,
  selectedDoctorId,
  onDoctorSelect
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>اختيار الطبيب</CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={selectedDoctorId} onValueChange={onDoctorSelect}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="اختر طبيباً لعرض مواعيده" />
          </SelectTrigger>
          <SelectContent>
            {doctors.map((doctor) => (
              <SelectItem key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};
