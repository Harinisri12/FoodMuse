import React, { useState } from 'react';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Navbar } from './components/Navbar';
import { IngredientInput } from './components/IngredientInput';
import { UserProvider, useUser } from './context/UserContext';
import type { User } from './types';

function AppContent() {
  const { user, setUser, tempRegistrationData, setTempRegistrationData } = useUser();
  const [isRegistering, setIsRegistering] = useState(true);

  const handleLogin = (email: string, password: string) => {
    // Use the stored registration data if available, otherwise fallback to email
    if (tempRegistrationData && tempRegistrationData.email === email) {
      setUser(tempRegistrationData);
    } else {
      const username = email.split('@')[0];
      setUser({ username, email, fullName: username });
    }
  };

  const handleRegister = (username: string, email: string, password: string, fullName: string) => {
    const userData = { username, email, fullName };
    setTempRegistrationData(userData);
    setIsRegistering(false); // Automatically switch to login
  };

  const handleLogout = () => {
    setUser(null);
    setTempRegistrationData(null);
  };

  if (!user) {
    return isRegistering ? (
      <Register 
        onRegister={handleRegister} 
        onSwitchToLogin={() => setIsRegistering(false)} 
      />
    ) : (
      <Login 
        onLogin={handleLogin} 
        onSwitchToRegister={() => setIsRegistering(true)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar username={user.fullName} onLogout={handleLogout} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to Food Muse, {user.fullName}!
          </h1>
          <p className="text-lg text-gray-600">
            Enter your ingredients and let's create something delicious
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">What's in your kitchen?</h2>
          <IngredientInput />
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;