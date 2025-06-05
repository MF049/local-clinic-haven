
import { Doctor, Department, Appointment } from '@/types';

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'د. أحمد محمد',
    specialty: 'طبيب قلب',
    department: 'القلب والأوعية الدموية',
    experience: '15 سنة خبرة',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
    availableSlots: ['09:00', '10:00', '11:00', '14:00', '15:00'],
    rating: 4.8,
  },
  {
    id: '2',
    name: 'د. فاطمة علي',
    specialty: 'طبيبة أطفال',
    department: 'طب الأطفال',
    experience: '12 سنة خبرة',
    image: 'https://images.unsplash.com/photo-1594824388467-00d8ac9b0c97?w=400',
    availableSlots: ['09:30', '10:30', '11:30', '14:30', '15:30'],
    rating: 4.9,
  },
  {
    id: '3',
    name: 'د. محمد حسن',
    specialty: 'طبيب عظام',
    department: 'العظام والمفاصل',
    experience: '18 سنة خبرة',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400',
    availableSlots: ['08:00', '09:00', '10:00', '13:00', '14:00'],
    rating: 4.7,
  },
];

export const departments: Department[] = [
  {
    id: '1',
    name: 'القلب والأوعية الدموية',
    description: 'تشخيص وعلاج أمراض القلب والشرايين',
    icon: 'heart',
    doctors: [doctors[0]],
  },
  {
    id: '2',
    name: 'طب الأطفال',
    description: 'رعاية صحية شاملة للأطفال من الولادة حتى 18 سنة',
    icon: 'baby',
    doctors: [doctors[1]],
  },
  {
    id: '3',
    name: 'العظام والمفاصل',
    description: 'علاج إصابات وأمراض العظام والمفاصل',
    icon: 'bone',
    doctors: [doctors[2]],
  },
];

export const clinicInfo = {
  name: 'عيادة الشفاء الطبية',
  slogan: 'صحتك أولويتنا',
  phone: '+966 11 123 4567',
  whatsapp: '+966 50 123 4567',
  email: 'info@alshifa-clinic.com',
  address: 'شارع الملك فهد، الرياض، المملكة العربية السعودية',
  workingHours: 'السبت - الخميس: 8:00 ص - 10:00 م',
  socialMedia: {
    facebook: 'https://facebook.com/alshifa-clinic',
    twitter: 'https://twitter.com/alshifa-clinic',
    instagram: 'https://instagram.com/alshifa-clinic',
  },
};
