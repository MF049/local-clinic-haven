
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Baby, Activity, Eye, Brain, Bone } from 'lucide-react';
import { departments, doctors } from '@/data/mockData';

export const ServicesSection: React.FC = () => {
  const departmentIcons = {
    heart: Heart,
    baby: Baby,
    bone: Bone,
    activity: Activity,
    eye: Eye,
    brain: Brain,
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">خدماتنا الطبية</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نقدم مجموعة شاملة من الخدمات الطبية المتخصصة على يد أفضل الأطباء والاستشاريين
            في أحدث المرافق الطبية المجهزة بأعلى التقنيات
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {departments.map((department) => {
            const IconComponent = departmentIcons[department.icon as keyof typeof departmentIcons] || Heart;
            
            return (
              <Card key={department.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
                    <div className="bg-gradient-to-br from-blue-500 to-green-500 rounded-lg p-3">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl text-gray-900 text-right">{department.name}</CardTitle>
                    </div>
                  </div>
                  <p className="text-gray-600 text-right">{department.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 text-right">الأطباء المتوفرون:</h4>
                    <div className="space-y-3">
                      {department.doctors.map((doctor) => (
                        <div key={doctor.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                            <img
                              src={doctor.image}
                              alt={doctor.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1 text-right">
                              <h5 className="font-semibold text-gray-900">{doctor.name}</h5>
                              <p className="text-sm text-gray-600">{doctor.specialty}</p>
                              <p className="text-xs text-blue-600">{doctor.experience}</p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                <span className="text-yellow-400 text-lg">★</span>
                                <span className="text-sm font-medium">{doctor.rating}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <p className="text-sm font-medium text-gray-700 mb-2 text-right">المواعيد المتاحة اليوم:</p>
                            <div className="flex flex-wrap gap-2 justify-end">
                              {doctor.availableSlots.slice(0, 3).map((slot, index) => (
                                <Badge key={index} variant="outline" className="text-green-600 border-green-600">
                                  {slot}
                                </Badge>
                              ))}
                              {doctor.availableSlots.length > 3 && (
                                <Badge variant="outline" className="text-gray-600">
                                  +{doctor.availableSlots.length - 3} أخرى
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <Button className="w-full medical-gradient text-white">
                            احجز مع {doctor.name}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Services */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">خدمات إضافية</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'فحوصات دورية', description: 'برامج فحص شاملة للوقاية' },
              { title: 'تحاليل مخبرية', description: 'نتائج دقيقة وسريعة' },
              { title: 'أشعة تشخيصية', description: 'أحدث أجهزة التصوير الطبي' },
              { title: 'استشارات عن بُعد', description: 'متابعة طبية أونلاين' },
            ].map((service, index) => (
              <Card key={index} className="text-center border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">{service.title}</h4>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
