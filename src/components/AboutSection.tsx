
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Heart, Users, Clock } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const features = [
    {
      icon: Heart,
      title: 'رعاية طبية متميزة',
      description: 'نقدم أعلى مستويات الرعاية الطبية مع التركيز على راحة المريض وسلامته',
    },
    {
      icon: Users,
      title: 'فريق طبي متخصص',
      description: 'أطباء واستشاريون معتمدون مع سنوات من الخبرة في مختلف التخصصات الطبية',
    },
    {
      icon: Award,
      title: 'معايير عالمية',
      description: 'نلتزم بأعلى معايير الجودة والسلامة المعتمدة دولياً في جميع خدماتنا',
    },
    {
      icon: Clock,
      title: 'خدمة على مدار الساعة',
      description: 'متاحون لخدمتكم في أي وقت مع فريق طوارئ مدرب على أعلى مستوى',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">من نحن؟</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            عيادة الشفاء الطبية هي مؤسسة طبية رائدة تأسست عام 2003، نفخر بتقديم خدمات طبية شاملة
            ومتطورة لأكثر من 20 عاماً من الخبرة في خدمة المجتمع
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">رؤيتنا ورسالتنا</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">رؤيتنا</h4>
                <p className="text-gray-600">
                  أن نكون المرجع الأول في الرعاية الصحية بالمنطقة، ونقدم خدمات طبية متميزة
                  تحقق أعلى معايير الجودة والسلامة لمرضانا الكرام
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">رسالتنا</h4>
                <p className="text-gray-600">
                  نلتزم بتقديم رعاية طبية شاملة ومتطورة من خلال فريق طبي متخصص ومرافق حديثة،
                  مع التركيز على راحة المريض وتحقيق أفضل النتائج العلاجية
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600"
              alt="فريق طبي متخصص"
              className="rounded-2xl shadow-lg w-full h-80 object-cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="bg-gradient-to-br from-blue-500 to-green-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Management Team */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">إدارة العيادة</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'د. محمد الأحمد',
                position: 'المدير التنفيذي',
                image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
                experience: 'أكثر من 25 سنة خبرة في الإدارة الطبية',
              },
              {
                name: 'د. سارة محمد',
                position: 'مديرة الجودة والسلامة',
                image: 'https://images.unsplash.com/photo-1594824388467-00d8ac9b0c97?w=400',
                experience: 'خبيرة في معايير الجودة الطبية الدولية',
              },
              {
                name: 'أ. أحمد علي',
                position: 'مدير العمليات',
                image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400',
                experience: 'متخصص في إدارة المرافق الطبية',
              },
            ].map((member, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h4 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h4>
                  <p className="text-blue-600 font-medium mb-2">{member.position}</p>
                  <p className="text-gray-600 text-sm">{member.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
