import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LoginDialog } from '@/components/auth/LoginDialog';
import { RegisterDialog } from '@/components/auth/RegisterDialog';
import { Menu, X, Heart, Settings, Calendar } from 'lucide-react';
import { clinicInfo } from '@/data/mockData';

export const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const navigation = [
    { name: 'الرئيسية', href: '#hero' },
    { name: 'من نحن', href: '#about' },
    { name: 'خدماتنا', href: '#services' },
    { name: 'تواصل معنا', href: '#contact' },
  ];

  const authNavigation = [
    ...navigation,
    { name: 'حجز موعد', href: '#appointment-booking' },
    { name: 'مواعيدي', href: '#my-appointments' },
  ];

  const currentNavigation = isAuthenticated ? authNavigation : navigation;

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleDashboard = () => {
    setShowDashboard(!showDashboard);
    // Hide dashboard sections when navigating back
    const dashboardSections = document.querySelectorAll('#admin-dashboard, #doctor-dashboard');
    dashboardSections.forEach(section => {
      (section as HTMLElement).style.display = showDashboard ? 'none' : 'block';
    });
    
    // Show/hide main content
    const mainSections = document.querySelectorAll('#hero, #about, #services, #appointment-booking, #my-appointments, #contact');
    mainSections.forEach(section => {
      (section as HTMLElement).style.display = showDashboard ? 'block' : 'none';
    });
  };

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
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <span className="text-gray-700">مرحباً، {user?.name}</span>
                  
                  {/* Dashboard button for admin and doctor */}
                  {(user?.role === 'admin' || user?.role === 'doctor') && (
                    <Button
                      variant="outline"
                      onClick={toggleDashboard}
                      className="border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                      {user?.role === 'admin' ? <Settings className="mr-2 h-4 w-4" /> : <Calendar className="mr-2 h-4 w-4" />}
                      {showDashboard ? 'العودة للموقع' : (user?.role === 'admin' ? 'لوحة الإدارة' : 'لوحة الطبيب')}
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    onClick={logout}
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    تسجيل الخروج
                  </Button>
                  
                  {!showDashboard && (
                    <Button 
                      className="medical-gradient text-white"
                      onClick={() => scrollToSection('#appointment-booking')}
                    >
                      حجز موعد
                    </Button>
                  )}
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
                  <button
                    key={item.name}
                    onClick={() => {
                      scrollToSection(item.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-right"
                  >
                    {item.name}
                  </button>
                ))}
                
                {isAuthenticated ? (
                  <div className="flex flex-col space-y-2 pt-4 border-t">
                    <span className="text-gray-700">مرحباً، {user?.name}</span>
                    
                    {(user?.role === 'admin' || user?.role === 'doctor') && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          toggleDashboard();
                          setIsMobileMenuOpen(false);
                        }}
                        className="border-blue-600 text-blue-600 hover:bg-blue-50"
                      >
                        {user?.role === 'admin' ? 'لوحة الإدارة' : 'لوحة الطبيب'}
                      </Button>
                    )}
                    
                    <Button
                      variant="outline"
                      onClick={logout}
                      className="border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                      تسجيل الخروج
                    </Button>
                    
                    {!showDashboard && (
                      <Button 
                        className="medical-gradient text-white"
                        onClick={() => {
                          scrollToSection('#appointment-booking');
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        حجز موعد
                      </Button>
                    )}
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
