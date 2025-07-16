# System Architecture Documentation

## Project Overview
This is a medical clinic management system built with React, TypeScript, and Tailwind CSS, featuring appointment booking, doctor management, and role-based dashboards.

## Architectural Patterns

### Primary Architecture: Component-Based Architecture with Repository Pattern

The system follows a **Component-Based Architecture** with elements of **Layered Architecture** and **Repository Pattern**.

## Architecture Layers

### 1. Presentation Layer
- **Location**: `src/components/`, `src/pages/`
- **Responsibility**: UI components, user interactions, and presentation logic
- **Technologies**: React components, Tailwind CSS, shadcn/ui

```
src/components/
├── ui/                 # Base UI components (shadcn/ui)
├── admin/              # Admin dashboard components
├── auth/               # Authentication components
├── doctor/             # Doctor-specific components
└── appointment/        # Booking flow components
```

### 2. Business Logic Layer
- **Location**: `src/hooks/`, `src/contexts/`
- **Responsibility**: Data processing, business rules, and application logic
- **Pattern**: Custom hooks acting as controllers/services

```
src/hooks/
├── useAppointmentData.ts      # Department/Doctor data management
├── useDoctorDashboard.ts      # Doctor appointments management
├── useAppointmentConflicts.ts # Conflict checking logic
└── useAppointmentData.ts      # Appointment business logic
```

### 3. Data Access Layer
- **Location**: localStorage operations within hooks
- **Responsibility**: Data persistence and retrieval
- **Pattern**: Repository pattern implementation

## Data Flow Architecture

```
User Interaction → Component → Custom Hook → localStorage → State Update → UI Re-render
```

### Data Flow Example:
1. User books appointment → `AppointmentBooking` component
2. Component calls → `useAppointmentData` hook
3. Hook validates and processes → Business logic
4. Hook updates → localStorage
5. State change triggers → UI re-render

## Component Hierarchy

### 1. Atomic Level (UI Components)
- **Location**: `src/components/ui/`
- **Examples**: Button, Input, Card, Dialog
- **Based on**: Radix UI primitives with shadcn/ui styling

### 2. Molecular Level (Feature Components)
- **Location**: `src/components/`
- **Examples**: AppointmentBooking, DoctorSelection, ServicesSection
- **Combines**: Multiple UI components with business logic

### 3. Organism Level (Page Sections)
- **Location**: `src/components/`
- **Examples**: AdminDashboard, DoctorDashboard, HeroSection
- **Manages**: Complex feature sets and workflows

### 4. Template Level (Pages)
- **Location**: `src/pages/`
- **Examples**: Index, NotFound
- **Orchestrates**: Multiple organisms and handles routing

## State Management Architecture

### Global State
- **Pattern**: Context + Provider pattern
- **Implementation**: `AuthContext` for authentication state
- **Scope**: User authentication, role-based access

### Local State
- **Pattern**: Component state (useState)
- **Scope**: Component-specific UI state
- **Examples**: Form inputs, modal visibility, loading states

### Persistent State
- **Pattern**: localStorage with custom hooks
- **Implementation**: Repository pattern through custom hooks
- **Data**: Users, appointments, doctors, departments

## Role-Based Architecture

### User Roles
1. **Patient**: Can book appointments, view own appointments
2. **Doctor**: Can view assigned appointments, manage schedule
3. **Admin**: Can manage doctors, departments, all appointments

### Role-Based Components
```
src/components/
├── admin/          # Admin-only components
├── doctor/         # Doctor-only components
└── auth/           # Authentication components
```

## Technology Stack

### Core Technologies
- **React 18**: Component-based UI framework
- **TypeScript**: Static typing and enhanced development experience
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework

### UI/UX Libraries
- **shadcn/ui**: Pre-built component library
- **Radix UI**: Accessible headless components
- **Lucide React**: Icon library

### Form & Validation
- **React Hook Form**: Form management
- **Zod**: Schema validation
- **@hookform/resolvers**: Form validation integration

### Additional Libraries
- **React Router DOM**: Client-side routing
- **date-fns**: Date manipulation
- **clsx**: Conditional class names

## Design System Architecture

### Theming System
- **CSS Custom Properties**: Design tokens in `src/index.css`
- **Tailwind Config**: Extended configuration in `tailwind.config.ts`
- **Semantic Tokens**: HSL color system for consistent theming

### Component Variants
- **Pattern**: Compound variant API (CVA)
- **Implementation**: Styled components with multiple variants
- **Examples**: Button variants, Card types, Input states

## File Organization Pattern

```
src/
├── components/         # React components
│   ├── ui/            # Base UI components
│   ├── admin/         # Admin-specific components
│   ├── auth/          # Authentication components
│   ├── doctor/        # Doctor-specific components
│   └── appointment/   # Booking flow components
├── contexts/          # React Context providers
├── hooks/             # Custom hooks (business logic)
├── types/             # TypeScript type definitions
├── data/              # Mock data and constants
├── pages/             # Page-level components
└── lib/               # Utility functions
```

## Data Model Architecture

### Core Entities
```typescript
User {
  id: string
  name: string
  email: string
  phone: string
  role: 'patient' | 'doctor' | 'admin'
  createdAt: Date
}

Doctor {
  id: string
  name: string
  specialty: string
  department: string
  experience: string
  image: string
  availableSlots: string[]
  rating: number
}

Appointment {
  id: string
  patientId: string
  doctorId: string
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  paymentMethod: 'card' | 'cash'
}
```

## Security Architecture

### Authentication
- **Pattern**: Context-based authentication
- **Storage**: localStorage for session persistence
- **Validation**: Role-based access control

### Data Validation
- **Client-side**: Zod schemas for form validation
- **Type Safety**: TypeScript interfaces for compile-time checking

## Performance Considerations

### Optimization Strategies
- **Component Memoization**: React.memo where appropriate
- **Bundle Splitting**: Vite's automatic code splitting
- **Lazy Loading**: Potential for route-based code splitting

### State Management Performance
- **Local Storage**: Minimal read/write operations
- **Context Optimization**: Focused contexts to prevent unnecessary re-renders

## Future Architecture Considerations

### Backend Integration
- **API Layer**: Ready for REST/GraphQL integration
- **Authentication**: Can integrate with JWT or session-based auth
- **Database**: Repository pattern allows easy database integration

### Scalability
- **Microservices**: Component architecture supports service decomposition
- **State Management**: Can integrate Redux/Zustand if needed
- **Caching**: Ready for React Query or SWR integration

## Deployment Architecture

### Build Process
- **Vite**: Optimized production builds
- **Static Assets**: Deployable to CDN
- **Environment**: Configurable for different environments

### Hosting
- **Static Hosting**: Compatible with Netlify, Vercel, GitHub Pages
- **CDN**: Optimized for content delivery networks

## Conclusion

This architecture provides a scalable, maintainable foundation that follows React best practices while maintaining clean separation of concerns. The component-based architecture with repository pattern allows for easy testing, debugging, and future enhancements.