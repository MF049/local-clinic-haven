
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LoginDialog } from '@/components/auth/LoginDialog';
import { RegisterDialog } from '@/components/auth/RegisterDialog';
import { Menu, X, Heart } from 'lucide-react';
import { clinicInfo } from '@/data/mockData';

export const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'الرئيسية', href: '#hero' },
    { name: 'من نحن', href: '#about' },
    { name: 'خدماتنا', href: '#services' },
    { name: 'تواصل معنا', href: '#contact' },
  ];

  const authNavigation = [
    ...navigation,
    { name: 'مواعيدي', href: '#appointments' },
  ];

  const currentNavigation = isAuthenticated ? authNavigation : navigation;

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Heart className="h-8 w-8 text-blue-600" />
              <div className="text-right">
                <h1 className="text-xl font-bold text-gray-900">{clinicInfo.name}</h1>
                <p className="text-xs text-gray-600">{clinicInfo.slogan}</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 rtl:space-x-reverse">
              {currentNavigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <span className="text-gray-700">مرحباً، {user?.name}</span>
                  <Button
                    variant="outline"
                    onClick={logout}
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    تسجيل الخروج
                  </Button>
                  <Button className="medical-gradient text-white">
                    حجز موعد
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Button
                    variant="outline"
                    onClick={() => setShowLogin(true)}
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    تسجيل الدخول
                  </Button>
                  <Button
                    onClick={() => setShowRegister(true)}
                    className="medical-gradient text-white"
                  >
                    إنشاء حساب
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-4">
                {currentNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                
                {isAuthenticated ? (
                  <div className="flex flex-col space-y-2 pt-4 border-t">
                    <span className="text-gray-700">مرحباً، {user?.name}</span>
                    <Button
                      variant="outline"
                      onClick={logout}
                      className="border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                      تسجيل الخروج
                    </Button>
                    <Button className="medical-gradient text-white">
                      حجز موعد
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowLogin(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                      تسجيل الدخول
                    </Button>
                    <Button
                      onClick={() => {
                        setShowRegister(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="medical-gradient text-white"
                    >
                      إنشاء حساب
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <LoginDialog open={showLogin} onOpenChange={setShowLogin} />
      <RegisterDialog open={showRegister} onOpenChange={setShowRegister} />
    </>
  );
};
