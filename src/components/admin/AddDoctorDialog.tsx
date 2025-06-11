
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Doctor, Department } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface AddDoctorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  departments: Department[];
  onDoctorAdded: (doctor: Doctor) => void;
}

export const AddDoctorDialog: React.FC<AddDoctorDialogProps> = ({
  open,
  onOpenChange,
  departments,
  onDoctorAdded,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    department: '',
    experience: '',
    image: '/placeholder.svg',
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.specialty || !formData.department || !formData.experience) {
      toast({
        title: 'خطأ',
        description: 'يرجى ملء جميع الحقول المطلوبة',
        variant: 'destructive',
      });
      return;
    }

    const newDoctor: Doctor = {
      id: Date.now().toString(),
      name: formData.name,
      specialty: formData.specialty,
      department: formData.department,
      experience: formData.experience,
      image: formData.image,
      availableSlots: [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
      ],
      rating: 0,
    };

    onDoctorAdded(newDoctor);
    
    toast({
      title: 'تم إضافة الطبيب',
      description: 'تم إضافة الطبيب بنجاح',
    });

    setFormData({
      name: '',
      specialty: '',
      department: '',
      experience: '',
      image: '/placeholder.svg',
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-right">إضافة طبيب جديد</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="doctor-name">اسم الطبيب</Label>
            <Input
              id="doctor-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="د. أحمد محمد"
              className="text-right"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="specialty">التخصص</Label>
            <Input
              id="specialty"
              value={formData.specialty}
              onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
              placeholder="أخصائي القلب"
              className="text-right"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="department">القسم</Label>
            <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
              <SelectTrigger>
                <SelectValue placeholder="اختر القسم" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.name}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="experience">سنوات الخبرة</Label>
            <Input
              id="experience"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              placeholder="10 سنوات خبرة"
              className="text-right"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">رابط الصورة (اختياري)</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="/placeholder.svg"
              className="text-right"
            />
          </div>
          
          <div className="flex space-x-2 rtl:space-x-reverse pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit" className="medical-gradient">
              إضافة الطبيب
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
