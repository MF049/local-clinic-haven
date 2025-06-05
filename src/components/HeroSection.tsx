
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Shield, Clock, Users } from 'lucide-react';
import { clinicInfo } from '@/data/mockData';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative bg-gradient-to-br from-blue-50 to-green-50 pt-16 pb-20 overflow-hidden">
      <div className="absolute inset-0 hero-pattern opacity-10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-right space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                <span className="block">{clinicInfo.name}</span>
                <span className="block text-blue-600 text-2xl md:text-3xl mt-2">
                  {clinicInfo.slogan}
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                نقدم أفضل الخدمات الطبية المتخصصة مع فريق من أمهر الأطباء والاستشاريين
                في أحدث المرافق الطبية المجهزة بأعلى معايير الجودة والسلامة
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="medical-gradient text-white text-lg px-8 py-3">
                احجز موعدك الآن
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-blue-600 text-blue-600 hover:bg-blue-50">
                تواصل معنا
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">15,000+</div>
                <div className="text-sm text-gray-600">مريض سعيد</div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">25+</div>
                <div className="text-sm text-gray-600">طبيب متخصص</div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">خدمة طوارئ</div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">20+</div>
                <div className="text-sm text-gray-600">سنة خبرة</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800"
                alt="عيادة طبية حديثة"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
            </div>
            
            {/* Floating cards */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="bg-green-100 rounded-full p-2">
                  <Heart className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">رعاية متميزة</div>
                  <div className="text-sm text-gray-600">أطباء مختصون</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="bg-blue-100 rounded-full p-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">مواعيد سريعة</div>
                  <div className="text-sm text-gray-600">حجز فوري</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
