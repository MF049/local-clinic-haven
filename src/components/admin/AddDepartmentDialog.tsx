
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Department } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface AddDepartmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDepartmentAdded: (department: Department) => void;
}

export const AddDepartmentDialog: React.FC<AddDepartmentDialogProps> = ({
  open,
  onOpenChange,
  onDepartmentAdded,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'Heart',
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description) {
      toast({
        title: 'خطأ',
        description: 'يرجى ملء جميع الحقول المطلوبة',
        variant: 'destructive',
      });
      return;
    }

    const newDepartment: Department = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      icon: formData.icon,
      doctors: [],
    };

    onDepartmentAdded(newDepartment);
    
    toast({
      title: 'تم إضافة القسم',
      description: 'تم إضافة القسم بنجاح',
    });

    setFormData({
      name: '',
      description: '',
      icon: 'Heart',
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-right">إضافة قسم جديد</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dept-name">اسم القسم</Label>
            <Input
              id="dept-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="قسم القلب"
              className="text-right"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">وصف القسم</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="قسم متخصص في علاج أمراض القلب والأوعية الدموية"
              className="text-right min-h-[80px]"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="icon">أيقونة القسم</Label>
            <Input
              id="icon"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              placeholder="Heart"
              className="text-right"
            />
          </div>
          
          <div className="flex space-x-2 rtl:space-x-reverse pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit" className="medical-gradient">
              إضافة القسم
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
