
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Doctor } from '@/types';

interface DoctorInfoProps {
  doctor: Doctor;
}

export const DoctorInfo: React.FC<DoctorInfoProps> = ({ doctor }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <img 
            src={doctor.image} 
            alt={doctor.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="text-xl font-bold">{doctor.name}</h3>
            <p className="text-gray-600">{doctor.specialty}</p>
            <p className="text-sm text-gray-500">{doctor.experience}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
