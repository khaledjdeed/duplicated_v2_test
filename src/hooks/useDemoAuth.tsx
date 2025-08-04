import { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers, MockUser } from '../lib/mockData';

interface DemoAuthContextType {
  currentUser: MockUser | null;
  switchRole: (userId: string) => void;
  availableUsers: MockUser[];
}

const DemoAuthContext = createContext<DemoAuthContextType | undefined>(undefined);

export function DemoAuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<MockUser | null>(null);

  useEffect(() => {
    // Default to IT user
    setCurrentUser(mockUsers[0]);
  }, []);

  const switchRole = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  };

  const value = {
    currentUser,
    switchRole,
    availableUsers: mockUsers
  };

  return (
    <DemoAuthContext.Provider value={value}>
      {children}
    </DemoAuthContext.Provider>
  );
}

export function useDemoAuth() {
  const context = useContext(DemoAuthContext);
  if (context === undefined) {
    throw new Error('useDemoAuth must be used within a DemoAuthProvider');
  }
  return context;
}