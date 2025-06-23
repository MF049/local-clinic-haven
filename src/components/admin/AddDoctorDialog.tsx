
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Doctor, Department } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Upload, X } from 'lucide-react';

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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('/placeholder.svg');
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: 'خطأ',
          description: 'حجم الصورة يجب أن يكون أقل من 5 ميجابايت',
          variant: 'destructive',
        });
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData({ ...formData, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('/placeholder.svg');
    setFormData({ ...formData, image: '/placeholder.svg' });
  };

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
    setImageFile(null);
    setImagePreview('/placeholder.svg');
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
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
            <Label>صورة الطبيب</Label>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="معاينة الصورة"
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                />
                {imageFile && (
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
              
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <input
                  type="file"
                  id="doctor-image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('doctor-image')?.click()}
                  className="flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <Upload className="h-4 w-4" />
                  <span>اختر صورة</span>
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 text-center">
                حجم الصورة يجب أن يكون أقل من 5 ميجابايت
              </p>
            </div>
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
