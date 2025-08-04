import { createContext, useContext, ReactNode } from 'react';

// Mock user for demo purposes
const mockUser = {
  id: 'yousef-ceo',
  email: 'yousef@mco.com',
  full_name: 'Yousef Al-Rashid',
  role: 'ceo',
  team_id: 'team-1',
  username: 'yousef',
  avatar_url: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  department: 'Executive',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z'
};

// Mock users list for demo
const mockUsers = [
  mockUser,
  {
    id: 'mariam-admin',
    email: 'mariam@mco.com',
    full_name: 'Mariam Wael',
    role: 'admin',
    team_id: 'team-1',
    username: 'mariam',
    avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    department: 'Administration',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'imran-it',
    email: 'imran@mco.com',
    full_name: 'Imran Khan',
    role: 'it',
    team_id: 'team-1',
    username: 'imran',
    avatar_url: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    department: 'Technical & IT',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

interface AuthContextType {
  user: typeof mockUser | null;
  users: typeof mockUsers;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<{ error?: any }>;
  signUp: (email: string, password: string, username: string, fullName: string, role: string) => Promise<{ error?: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const value = {
    user: mockUser, // Always return the mock user for demo
    users: mockUsers,
    loading: false,
    signIn: async () => ({ error: null }),
    signUp: async () => ({ error: null }),
    signOut: async () => {},
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}