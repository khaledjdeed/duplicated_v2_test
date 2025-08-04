import { createContext, useContext, useState, useEffect } from 'react';

interface NavigationContextType {
  history: string[];
  currentPage: string;
  navigateTo: (page: string) => void;
  goBack: () => void;
  canGoBack: boolean;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<string[]>(['dashboard']);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const navigateTo = (page: string) => {
    if (page !== currentPage) {
      setHistory(prev => [...prev, page]);
      setCurrentPage(page);
    }
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); // Remove current page
      const previousPage = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setCurrentPage(previousPage);
    }
  };

  const canGoBack = history.length > 1;

  return (
    <NavigationContext.Provider value={{
      history,
      currentPage,
      navigateTo,
      goBack,
      canGoBack
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}