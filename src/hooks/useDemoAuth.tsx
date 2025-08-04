import { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../lib/mockUsers';
import { User } from '../lib/types';

interface DemoAuthContextType {
  currentUser: User | null;
  switchRole: (userId: string) => void;
  availableUsers: User[];
}

const DemoAuthContext = createContext<DemoAuthContextType | undefined>(undefined);

export function DemoAuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

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