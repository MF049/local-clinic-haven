
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Department } from '@/types';

interface DoctorSelectionProps {
  selectedDept: Department;
  selectedDoctor: string;
  onSelectDoctor: (doctorId: string) => void;
}

export const DoctorSelection: React.FC<DoctorSelectionProps> = ({
  selectedDept,
  selectedDoctor,
  onSelectDoctor,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-right">اختر الطبيب:</h3>
      <div className="space-y-3">
        {selectedDept.doctors && selectedDept.doctors.length > 0 ? (
          selectedDept.doctors.map((doctor) => (
            <Card
              key={doctor.id}
              className={`cursor-pointer transition-all ${
                selectedDoctor === doctor.id
                  ? 'ring-2 ring-blue-500 bg-blue-50'
                  : 'hover:shadow-md'
              }`}
              onClick={() => onSelectDoctor(doctor.id)}
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
          ))
        ) : (
          <p className="text-gray-500 text-center">لا توجد أطباء متاحون في هذا القسم حالياً</p>
        )}
      </div>
    </div>
  );
};
