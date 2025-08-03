/*
  # Seed Data for Event Management System

  1. Sample Data
    - Create teams
    - Create sample user profiles
    - Create sample events and requests
    - Create sample tasks and sponsorships

  2. Test Users
    - IT user with full access
    - Event coordinators
    - Designers
    - Sales and logistics users
    - Admin users
*/

-- Insert sample teams
INSERT INTO teams (id, name, description) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Alpha Team', 'Primary event management team'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Beta Team', 'Secondary event management team');

-- Insert sample events
INSERT INTO events (id, team_id, name, description, start_date, end_date, location, status) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Annual Tech Conference', 'Our biggest tech event of the year', '2024-06-15 09:00:00+00', '2024-06-17 18:00:00+00', 'Convention Center', 'planning'),
  ('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'Product Launch Event', 'Launching our new product line', '2024-05-20 14:00:00+00', '2024-05-20 20:00:00+00', 'Grand Hotel', 'active');

-- Insert sample event budgets
INSERT INTO event_budgets (event_id, category, allocated_amount, spent_amount, notes) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', 'Venue', 15000.00, 5000.00, 'Convention center booking'),
  ('660e8400-e29b-41d4-a716-446655440001', 'Catering', 8000.00, 0.00, 'Food and beverages'),
  ('660e8400-e29b-41d4-a716-446655440001', 'Marketing', 5000.00, 1200.00, 'Promotional materials'),
  ('660e8400-e29b-41d4-a716-446655440002', 'Venue', 3000.00, 3000.00, 'Grand Hotel ballroom'),
  ('660e8400-e29b-41d4-a716-446655440002', 'Catering', 2000.00, 800.00, 'Cocktail reception');

-- Insert sample sponsorships
INSERT INTO sponsorships (event_id, team_id, company_name, contact_name, contact_email, package_type, stage, amount) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'TechCorp Inc', 'John Smith', 'john@techcorp.com', 'platinum', 'confirmed', 25000.00),
  ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Innovation Labs', 'Sarah Johnson', 'sarah@innovationlabs.com', 'gold', 'in_progress', 15000.00),
  ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'StartupHub', 'Mike Wilson', 'mike@startuphub.com', 'silver', 'prospecting', 8000.00),
  ('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'Future Systems', 'Lisa Brown', 'lisa@futuresystems.com', 'gold', 'confirmed', 12000.00);