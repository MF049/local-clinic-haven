
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AddDoctorDialog } from './AddDoctorDialog';
import { AddDepartmentDialog } from './AddDepartmentDialog';
import { Doctor, Department, Appointment } from '@/types';
import { UserPlus, Building, Calendar, Users, Trash2, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const AdminDashboard: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [showAddDepartment, setShowAddDepartment] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load data from localStorage
    const savedDoctors = localStorage.getItem('doctors');
    const savedDepartments = localStorage.getItem('departments');
    const savedAppointments = localStorage.getItem('appointments');

    if (savedDoctors) setDoctors(JSON.parse(savedDoctors));
    if (savedDepartments) setDepartments(JSON.parse(savedDepartments));
    if (savedAppointments) setAppointments(JSON.parse(savedAppointments));
  }, []);

  const deleteDoctor = (doctorId: string) => {
    const updatedDoctors = doctors.filter(d => d.id !== doctorId);
    setDoctors(updatedDoctors);
    localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
    
    toast({
      title: 'تم حذف الطبيب',
      description: 'تم حذف الطبيب بنجاح',
    });
  };

  const deleteDepartment = (departmentId: string) => {
    const updatedDepartments = departments.filter(d => d.id !== departmentId);
    setDepartments(updatedDepartments);
    localStorage.setItem('departments', JSON.stringify(updatedDepartments));
    
    toast({
      title: 'تم حذف القسم',
      description: 'تم حذف القسم بنجاح',
    });
  };

  const getTotalPatients = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.filter((u: any) => u.role === 'patient').length;
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي الأطباء</p>
                <p className="text-3xl font-bold text-blue-600">{doctors.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الأقسام</p>
                <p className="text-3xl font-bold text-green-600">{departments.length}</p>
              </div>
              <Building className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي المرضى</p>
                <p className="text-3xl font-bold text-purple-600">{getTotalPatients()}</p>
              </div>
              <UserPlus className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي المواعيد</p>
                <p className="text-3xl font-bold text-orange-600">{appointments.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Management Tabs */}
      <Tabs defaultValue="doctors" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="doctors">إدارة الأطباء</TabsTrigger>
          <TabsTrigger value="departments">إدارة الأقسام</TabsTrigger>
        </TabsList>

        <TabsContent value="doctors" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">الأطباء</h3>
            <Button onClick={() => setShowAddDoctor(true)} className="medical-gradient">
              <UserPlus className="mr-2 h-4 w-4" />
              إضافة طبيب جديد
            </Button>
          </div>
          
          <div className="grid gap-4">
            {doctors.map((doctor) => (
              <Card key={doctor.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="text-right">
                        <h4 className="text-lg font-semibold">{doctor.name}</h4>
                        <p className="text-gray-600">{doctor.specialty}</p>
                        <p className="text-sm text-gray-500">{doctor.department}</p>
                        <Badge variant="secondary">{doctor.experience}</Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => deleteDoctor(doctor.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">الأقسام</h3>
            <Button onClick={() => setShowAddDepartment(true)} className="medical-gradient">
              <Building className="mr-2 h-4 w-4" />
              إضافة قسم جديد
            </Button>
          </div>
          
          <div className="grid gap-4">
            {departments.map((department) => (
              <Card key={department.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-right">
                      <h4 className="text-lg font-semibold">{department.name}</h4>
                      <p className="text-gray-600">{department.description}</p>
                      <p className="text-sm text-gray-500">عدد الأطباء: {department.doctors?.length || 0}</p>
                    </div>
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => deleteDepartment(department.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <AddDoctorDialog 
        open={showAddDoctor} 
        onOpenChange={setShowAddDoctor}
        departments={departments}
        onDoctorAdded={(doctor) => {
          const updatedDoctors = [...doctors, doctor];
          setDoctors(updatedDoctors);
          localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
        }}
      />
      
      <AddDepartmentDialog 
        open={showAddDepartment} 
        onOpenChange={setShowAddDepartment}
        onDepartmentAdded={(department) => {
          const updatedDepartments = [...departments, department];
          setDepartments(updatedDepartments);
          localStorage.setItem('departments', JSON.stringify(updatedDepartments));
        }}
      />
    </div>
  );
};
