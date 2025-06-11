
import React from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ServicesSection } from '@/components/ServicesSection';
import { AppointmentBooking } from '@/components/AppointmentBooking';
import { MyAppointments } from '@/components/MyAppointments';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { DoctorDashboard } from '@/components/doctor/DoctorDashboard';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

const MainContent = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <Header />
      <main>
        {/* Admin Dashboard */}
        {user?.role === 'admin' && (
          <section id="admin-dashboard" className="py-20 bg-gray-50" style={{ display: 'none' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">لوحة إدارة العيادة</h2>
                <p className="text-xl text-gray-600">إدارة الأطباء والأقسام والمواعيد</p>
              </div>
              <AdminDashboard />
            </div>
          </section>
        )}

        {/* Doctor Dashboard */}
        {user?.role === 'doctor' && (
          <section id="doctor-dashboard" className="py-20 bg-gray-50" style={{ display: 'none' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">لوحة الطبيب</h2>
                <p className="text-xl text-gray-600">إدارة مواعيدك ومتابعة المرضى</p>
              </div>
              <DoctorDashboard />
            </div>
          </section>
        )}

        {/* Main Website Sections */}
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <AppointmentBooking />
        <MyAppointments />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
};

export default Index;
