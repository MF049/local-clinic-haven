
import React from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ServicesSection } from '@/components/ServicesSection';
import { AppointmentBooking } from '@/components/AppointmentBooking';
import { MyAppointments } from '@/components/MyAppointments';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { AuthProvider } from '@/contexts/AuthContext';

const Index = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white" dir="rtl">
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <AppointmentBooking />
          <MyAppointments />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default Index;
