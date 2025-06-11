
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Department } from '@/types';

interface DepartmentSelectionProps {
  departments: Department[];
  selectedDepartment: string;
  onSelectDepartment: (departmentId: string) => void;
}

export const DepartmentSelection: React.FC<DepartmentSelectionProps> = ({
  departments,
  selectedDepartment,
  onSelectDepartment,
}) => {
  return (
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
            onClick={() => onSelectDepartment(dept.id)}
          >
            <CardContent className="p-4 text-center">
              <h4 className="font-semibold text-gray-900">{dept.name}</h4>
              <p className="text-sm text-gray-600 mt-2">{dept.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
