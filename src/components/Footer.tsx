
import React from 'react';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';
import { clinicInfo } from '@/data/mockData';

export const Footer: React.FC = () => {
  const footerLinks = {
    quickLinks: [
      { name: 'الرئيسية', href: '#hero' },
      { name: 'من نحن', href: '#about' },
      { name: 'خدماتنا', href: '#services' },
      { name: 'تواصل معنا', href: '#contact' },
    ],
    services: [
      { name: 'القلب والأوعية الدموية', href: '#services' },
      { name: 'طب الأطفال', href: '#services' },
      { name: 'العظام والمفاصل', href: '#services' },
      { name: 'الفحوصات الدورية', href: '#services' },
    ],
    support: [
      { name: 'الأسئلة الشائعة', href: '#' },
      { name: 'سياسة الخصوصية', href: '#' },
      { name: 'الشروط والأحكام', href: '#' },
      { name: 'شكاوى ومقترحات', href: '#' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Clinic Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Heart className="h-8 w-8 text-blue-400" />
              <div className="text-right">
                <h3 className="text-xl font-bold">{clinicInfo.name}</h3>
                <p className="text-gray-400">{clinicInfo.slogan}</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed text-right">
              نقدم أفضل الخدمات الطبية المتخصصة مع فريق من أمهر الأطباء والاستشاريين
              في أحدث المرافق الطبية المجهزة بأعلى معايير الجودة والسلامة
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-sm">{clinicInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-sm">{clinicInfo.email}</span>
              </div>
              <div className="flex items-start space-x-2 rtl:space-x-reverse">
                <MapPin className="h-4 w-4 text-blue-400 mt-1" />
                <span className="text-sm text-right">{clinicInfo.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-right">روابط سريعة</h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-right block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-right">خدماتنا</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-right block"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-right">الدعم والمساعدة</h4>
            <ul className="space-y-3 mb-6">
              {footerLinks.support.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-right block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Working Hours */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h5 className="font-semibold mb-2 text-right">ساعات العمل</h5>
              <p className="text-sm text-gray-300 text-right">{clinicInfo.workingHours}</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-right mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © 2024 {clinicInfo.name}. جميع الحقوق محفوظة.
              </p>
            </div>
            
            <div className="flex space-x-4 rtl:space-x-reverse">
              {[
                { name: 'فيسبوك', url: clinicInfo.socialMedia.facebook },
                { name: 'تويتر', url: clinicInfo.socialMedia.twitter },
                { name: 'إنستغرام', url: clinicInfo.socialMedia.instagram },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
