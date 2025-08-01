
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LoginDialog: React.FC<LoginDialogProps> = ({ open, onOpenChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: 'تم تسجيل الدخول بنجاح',
          description: 'مرحباً بك في عيادة الشفاء الطبية',
        });
        onOpenChange(false);
        setEmail('');
        setPassword('');
      } else {
        toast({
          title: 'خطأ في تسجيل الدخول',
          description: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء تسجيل الدخول',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fillAdminCredentials = () => {
    setEmail('admin@alshifa-clinic.com');
    setPassword('admin123');
  };

  const fillDoctorCredentials = () => {
    setEmail('doctor@alshifa-clinic.com');
    setPassword('doctor123');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-right">تسجيل الدخول</DialogTitle>
          <DialogDescription className="text-right">
            أدخل بياناتك للوصول إلى حسابك
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-right block">البريد الإلكتروني</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-right"
              dir="rtl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-right block">كلمة المرور</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-right"
              dir="rtl"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full medical-gradient text-white"
            disabled={isLoading}
          >
            {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
          </Button>
        </form>
        
        <div className="space-y-3 pt-4 border-t">
          <div className="text-center text-sm text-gray-600 mb-2">
            حسابات تجريبية:
          </div>
          <div className="flex flex-col space-y-2">
            <Button 
              type="button"
              variant="outline"
              onClick={fillAdminCredentials}
              className="text-sm"
            >
              مدير النظام: admin@alshifa-clinic.com
            </Button>
            <Button 
              type="button"
              variant="outline"
              onClick={fillDoctorCredentials}
              className="text-sm"
            >
              طبيب: doctor@alshifa-clinic.com
            </Button>
          </div>
          <div className="text-center text-xs text-gray-500">
            كلمة المرور لجميع الحسابات: admin123 أو doctor123
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
