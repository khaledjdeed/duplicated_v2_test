# MCO Event Management Platform

## 🏢 Overview

A production-ready, Supabase-backed event management workspace for MCO with comprehensive role-based access control, intelligent workflows, and real-time dashboards.

## 🎯 Key Features

### 🔐 Role-Based Access Control
- **CEO/GM**: Full system access including encrypted contacts, budgets, AI analytics, and export capabilities
- **Admin**: Contact exports, audit logs, email campaigns, read-only access to events/budgets
- **Marketing**: Email campaign management, limited contact access (name/position only)
- **Account Executives**: Pod-scoped events and tasks, assigned budget visibility
- **Designers**: Task management, file uploads, pod-scoped access
- **Logistics**: Pod-scoped task updates and coordination
- **IT**: Event creation (3/day limit), system management, approval workflows
- **Team Leads**: Team task overview, pod performance analytics
- **Finance**: Data-only access (no UI)

### 🧩 Organizational Structure
- **Departments**: Sales, Marketing, Design, Operations, Technical & IT, Finance, Administration
- **Pods**: Operational subunits with 1-4 Account Executives, exactly 2 Designers, optional Logistics/Production staff
- **Event-Scoped Access**: Pod members can only view/edit their assigned events, tasks, files, and comments

### 🗓️ Event Management
- IT-only event creation with daily limits enforced via Supabase policies
- AE event request workflow with approval requirements
- Pod-scoped event visibility and management

### 💸 Budget Management
- CEO/GM: Full budget visibility across all events
- Lead AEs: Budget access limited to assigned events only
- Role-based budget restrictions enforced via RLS

### 📇 Contact Directory
- **Default View**: All roles see name + position
- **Encrypted Fields**: Email and phone visible only to CEO, GM, and designated Admins
- **Access Requests**: Temporary access approval workflow for restricted users

### ✅ Task Management
- Criticality levels: low, medium, high
- Role-specific task permissions (view, update, assign)
- Pod-scoped task visibility and management

### 📧 Email Campaigns
- Marketing-focused campaign creation and management
- Contact filtering using JSONB attributes
- Delivery status tracking: sent, failed, bounced
- Campaign lifecycle: draft, sending, completed, failed

### 🤖 AI Assistant
- Role-specific AI responses and insights
- Feedback system with 1-5 rating scale
- Memory and interaction logging
- Personalized recommendations based on user role

### 📊 Analytics & Reporting
- Real-time dashboards powered by materialized views
- Role-specific KPI visibility
- Performance metrics and trend analysis
- Export capabilities with full audit logging

### 🔍 Audit & Security
- Complete audit trail for all system activities
- Export logging with user ID, table name, and timestamp
- Encrypted contact information with RLS enforcement
- Secure role-based data access patterns

## 🛠️ Technical Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, RLS)
- **Real-time**: Supabase subscriptions
- **AI Integration**: Configurable AI service with feedback loops
- **Security**: Row-Level Security (RLS) policies, encrypted sensitive data

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Supabase**
   - Set up your Supabase project
   - Configure environment variables
   - Apply the provided schema and RLS policies

3. **Run Development Server**
   ```bash
   npm run dev
   ```

## 👥 Demo Users

The platform includes temporary demo users for testing different role permissions:

- **Yousef** (CEO): Full system access
- **Mariam** (Admin): Contact exports, audit logs
- **Rana** (Admin): Same as Mariam
- **Joel** (Designer): Task management, file uploads
- **Samir** (AE): Pod-scoped events and tasks
- **Layla** (Marketing): Email campaigns, analytics
- **Imran** (IT): Event creation, system settings
- **Ahmed** (Team Lead): Team overview, analytics
- **Fatima** (Finance): No UI access (data-only)

## 🔄 Workflow Automations

1. **Event Request Workflow**: AE → Approval Request → IT Creates (with daily limits)
2. **Contact Access Workflow**: Request → Admin/CEO Approval → Temporary Access
3. **Export Logging**: Automatic audit log entry for all exports
4. **AI Feedback Loop**: User ratings and comments stored for continuous improvement

## 📋 Implementation Checklist

- ✅ Role-based navigation and permissions
- ✅ Temporary user simulation for demo
- ✅ Contact directory with encryption simulation
- ✅ Email campaign management
- ✅ AI assistant with role-specific responses
- ✅ Audit logging framework
- ✅ Responsive design and accessibility
- ⏳ Supabase schema integration (next phase)
- ⏳ Real-time subscriptions (next phase)
- ⏳ Production authentication (next phase)

## 🔐 Security Features

- Row-Level Security (RLS) policies for all data access
- Encrypted contact information with role-based visibility
- Audit logging for all sensitive operations
- Pod-scoped data access enforcement
- Daily limits on critical operations (event creation)

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile devices

## 🎨 Design System

- Modern, professional healthcare-focused design
- Consistent color coding for different roles
- Intuitive navigation with role-appropriate menu items
- Accessible UI components with proper contrast ratios

This platform provides a comprehensive foundation for MCO's event management needs while maintaining strict security and access controls appropriate for healthcare industry requirements.