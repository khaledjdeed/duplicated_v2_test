import React from 'react';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Healthcare Event Management System
        </h1>
        {user ? (
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-lg">Welcome, {user.email}!</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-lg">Please sign in to continue.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;