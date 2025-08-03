/*
  # Event Management System Database Schema

  1. New Tables
    - `teams` - Organization teams with IT, coordinators, designers, etc.
    - `profiles` - User profiles with role-based access
    - `events` - Official events (only IT can create)
    - `event_requests` - Event creation requests from coordinators
    - `tasks` - Tasks assigned to designers
    - `event_budgets` - Budget tracking per event
    - `sponsorships` - Sales pipeline for event sponsorships
    - `logistics_notifications` - Logistics team notifications
    - `notifications` - General notification system
    - `uploads` - File uploads from designers

  2. Security
    - Enable RLS on all tables
    - Role-based policies for each user type
    - Team-based data isolation
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Teams table
CREATE TABLE IF NOT EXISTS teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  team_id uuid REFERENCES teams(id) ON DELETE SET NULL,
  username text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL CHECK (role IN ('it', 'event_coordinator', 'designer', 'sales', 'logistics', 'admin')),
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Events table (only IT can create)
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid REFERENCES teams(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  location text,
  status text DEFAULT 'planning' CHECK (status IN ('planning', 'active', 'completed', 'cancelled')),
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Event requests table (coordinators request events)
CREATE TABLE IF NOT EXISTS event_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid REFERENCES teams(id) ON DELETE CASCADE,
  requested_by uuid REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  location text,
  justification text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  team_id uuid REFERENCES teams(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  assigned_to uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  due_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Event budgets table
CREATE TABLE IF NOT EXISTS event_budgets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  category text NOT NULL,
  allocated_amount decimal(10,2) DEFAULT 0,
  spent_amount decimal(10,2) DEFAULT 0,
  notes text,
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Sponsorships table (sales pipeline)
CREATE TABLE IF NOT EXISTS sponsorships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  team_id uuid REFERENCES teams(id) ON DELETE CASCADE,
  company_name text NOT NULL,
  contact_name text,
  contact_email text,
  package_type text NOT NULL CHECK (package_type IN ('platinum', 'gold', 'silver', 'bronze')),
  stage text DEFAULT 'prospecting' CHECK (stage IN ('prospecting', 'in_progress', 'confirmed', 'fulfilled')),
  amount decimal(10,2),
  notes text,
  managed_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Logistics notifications table
CREATE TABLE IF NOT EXISTS logistics_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  team_id uuid REFERENCES teams(id) ON DELETE CASCADE,
  message text NOT NULL,
  attendee_info jsonb,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'acknowledged', 'completed')),
  created_by uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- General notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text DEFAULT 'info' CHECK (type IN ('info', 'task_assigned', 'event_request', 'logistics', 'system')),
  read boolean DEFAULT false,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

-- Uploads table (for designer file uploads)
CREATE TABLE IF NOT EXISTS uploads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid REFERENCES tasks(id) ON DELETE CASCADE,
  uploaded_by uuid REFERENCES profiles(id) ON DELETE CASCADE,
  file_name text NOT NULL,
  file_path text NOT NULL,
  file_size integer,
  file_type text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsorships ENABLE ROW LEVEL SECURITY;
ALTER TABLE logistics_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE uploads ENABLE ROW LEVEL SECURITY;

-- RLS Policies for teams
CREATE POLICY "Users can view their team" ON teams
  FOR SELECT TO authenticated
  USING (
    id IN (
      SELECT team_id FROM profiles WHERE id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('it', 'admin')
    )
  );

-- RLS Policies for profiles
CREATE POLICY "Users can view profiles in their team or if IT/admin" ON profiles
  FOR SELECT TO authenticated
  USING (
    team_id IN (
      SELECT team_id FROM profiles WHERE id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('it', 'admin')
    )
  );

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE TO authenticated
  USING (id = auth.uid());

-- RLS Policies for events
CREATE POLICY "IT and admins can view all events" ON events
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('it', 'admin')
    )
  );

CREATE POLICY "Team members can view their team events" ON events
  FOR SELECT TO authenticated
  USING (
    team_id IN (
      SELECT team_id FROM profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Only IT can create events" ON events
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'it'
    )
  );

CREATE POLICY "IT and admins can update events" ON events
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('it', 'admin')
    )
  );

-- RLS Policies for event_requests
CREATE POLICY "Users can view requests from their team" ON event_requests
  FOR SELECT TO authenticated
  USING (
    team_id IN (
      SELECT team_id FROM profiles WHERE id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('it', 'admin')
    )
  );

CREATE POLICY "Event coordinators can create requests" ON event_requests
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'event_coordinator'
    ) AND
    team_id IN (
      SELECT team_id FROM profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "IT can update event requests" ON event_requests
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'it'
    )
  );

-- RLS Policies for tasks
CREATE POLICY "Users can view tasks in their team" ON tasks
  FOR SELECT TO authenticated
  USING (
    team_id IN (
      SELECT team_id FROM profiles WHERE id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('it', 'admin')
    )
  );

CREATE POLICY "Coordinators can create tasks" ON tasks
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('event_coordinator', 'it', 'admin')
    ) AND
    team_id IN (
      SELECT team_id FROM profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Assigned users and coordinators can update tasks" ON tasks
  FOR UPDATE TO authenticated
  USING (
    assigned_to = auth.uid() OR
    created_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('it', 'admin', 'event_coordinator')
    )
  );

-- RLS Policies for event_budgets
CREATE POLICY "Admins and IT can view all budgets" ON event_budgets
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('it', 'admin')
    )
  );

CREATE POLICY "Coordinators can view their event budgets" ON event_budgets
  FOR SELECT TO authenticated
  USING (
    event_id IN (
      SELECT id FROM events WHERE team_id IN (
        SELECT team_id FROM profiles WHERE id = auth.uid() AND role = 'event_coordinator'
      )
    )
  );

CREATE POLICY "Coordinators and admins can manage budgets" ON event_budgets
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('it', 'admin', 'event_coordinator')
    )
  );

-- RLS Policies for sponsorships
CREATE POLICY "Sales and admins can view sponsorships" ON sponsorships
  FOR SELECT TO authenticated
  USING (
    team_id IN (
      SELECT team_id FROM profiles WHERE id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('it', 'admin')
    )
  );

CREATE POLICY "Sales can manage sponsorships" ON sponsorships
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('sales', 'it', 'admin')
    ) AND
    team_id IN (
      SELECT team_id FROM profiles WHERE id = auth.uid()
    )
  );

-- RLS Policies for logistics_notifications
CREATE POLICY "Logistics and coordinators can view notifications" ON logistics_notifications
  FOR SELECT TO authenticated
  USING (
    team_id IN (
      SELECT team_id FROM profiles WHERE id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('it', 'admin')
    )
  );

CREATE POLICY "Coordinators can create logistics notifications" ON logistics_notifications
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('event_coordinator', 'it', 'admin')
    )
  );

-- RLS Policies for notifications
CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "System can create notifications" ON notifications
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their own notifications" ON notifications
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

-- RLS Policies for uploads
CREATE POLICY "Users can view uploads from their team" ON uploads
  FOR SELECT TO authenticated
  USING (
    uploaded_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM tasks t
      JOIN profiles p ON p.id = auth.uid()
      WHERE t.id = task_id AND t.team_id = p.team_id
    ) OR
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('it', 'admin')
    )
  );

CREATE POLICY "Designers can upload files for their tasks" ON uploads
  FOR INSERT TO authenticated
  WITH CHECK (
    uploaded_by = auth.uid() AND
    EXISTS (
      SELECT 1 FROM tasks WHERE id = task_id AND assigned_to = auth.uid()
    )
  );

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON teams FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_event_requests_updated_at BEFORE UPDATE ON event_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_event_budgets_updated_at BEFORE UPDATE ON event_budgets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sponsorships_updated_at BEFORE UPDATE ON sponsorships FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();