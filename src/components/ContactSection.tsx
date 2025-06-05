
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Mail, Clock, MapPin, MessageSquare } from 'lucide-react';
import { clinicInfo } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: 'تم إرسال الرسالة بنجاح',
        description: 'سنقوم بالرد عليك في أقرب وقت ممكن',
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'الهاتف',
      details: [clinicInfo.phone],
      color: 'text-blue-600',
    },
    {
      icon: MessageSquare,
      title: 'واتساب',
      details: [clinicInfo.whatsapp],
      color: 'text-green-600',
    },
    {
      icon: Mail,
      title: 'البريد الإلكتروني',
      details: [clinicInfo.email],
      color: 'text-blue-600',
    },
    {
      icon: Clock,
      title: 'ساعات العمل',
      details: [clinicInfo.workingHours],
      color: 'text-gray-600',
    },
    {
      icon: MapPin,
      title: 'العنوان',
      details: [clinicInfo.address],
      color: 'text-gray-600',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">تواصل معنا</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نحن هنا لخدمتك، تواصل معنا في أي وقت للاستفسارات أو حجز المواعيد
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-right">معلومات التواصل</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className={`bg-gray-50 rounded-lg p-3 ${info.color}`}>
                      <info.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 text-right">
                      <h4 className="font-semibold text-gray-900 mb-1">{info.title}</h4>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-right">تابعنا على</h3>
              <div className="flex space-x-4 rtl:space-x-reverse justify-end">
                {[
                  { name: 'فيسبوك', url: clinicInfo.socialMedia.facebook, color: 'bg-blue-600' },
                  { name: 'تويتر', url: clinicInfo.socialMedia.twitter, color: 'bg-blue-400' },
                  { name: 'إنستغرام', url: clinicInfo.socialMedia.instagram, color: 'bg-pink-600' },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className={`${social.color} text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <MapPin className="h-12 w-12 mx-auto mb-2" />
                <p>خريطة موقع العيادة</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 text-right">أرسل لنا رسالة</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="contact-name" className="text-right block">الاسم الكامل</Label>
                  <Input
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="text-right"
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-email" className="text-right block">البريد الإلكتروني</Label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="text-right"
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-phone" className="text-right block">رقم الهاتف</Label>
                  <Input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="text-right"
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message" className="text-right block">الرسالة</Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="text-right resize-none"
                    dir="rtl"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full medical-gradient text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
