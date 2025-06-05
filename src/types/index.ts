
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'patient' | 'doctor' | 'admin';
  createdAt: Date;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  experience: string;
  image: string;
  availableSlots: string[];
  rating: number;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
  doctors: Doctor[];
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  paymentMethod?: 'card' | 'cash';
  paymentStatus?: 'pending' | 'paid';
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}
