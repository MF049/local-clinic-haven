
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Department } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Heart } from 'lucide-react';

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
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string>('');
  const { toast } = useToast();

  const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit for icons
        toast({
          title: 'خطأ',
          description: 'حجم الأيقونة يجب أن يكون أقل من 2 ميجابايت',
          variant: 'destructive',
        });
        return;
      }

      setIconFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setIconPreview(result);
        setFormData({ ...formData, icon: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeIcon = () => {
    setIconFile(null);
    setIconPreview('');
    setFormData({ ...formData, icon: 'Heart' });
  };

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
    setIconFile(null);
    setIconPreview('');
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
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
            <Label>أيقونة القسم</Label>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                {iconPreview ? (
                  <img
                    src={iconPreview}
                    alt="معاينة الأيقونة"
                    className="w-16 h-16 rounded-lg object-cover border-2 border-gray-200"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-lg border-2 border-gray-200 flex items-center justify-center bg-gray-50">
                    <Heart className="h-8 w-8 text-gray-400" />
                  </div>
                )}
                {iconFile && (
                  <button
                    type="button"
                    onClick={removeIcon}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
              
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <input
                  type="file"
                  id="dept-icon"
                  accept="image/*"
                  onChange={handleIconUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('dept-icon')?.click()}
                  className="flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <Upload className="h-4 w-4" />
                  <span>اختر أيقونة</span>
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 text-center">
                حجم الأيقونة يجب أن يكون أقل من 2 ميجابايت
              </p>
            </div>
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
