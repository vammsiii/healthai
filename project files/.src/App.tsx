import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PatientChat from './components/PatientChat';
import DiseasePrediction from './components/DiseasePrediction';
import TreatmentPlans from './components/TreatmentPlans';
import HealthAnalytics from './components/HealthAnalytics';
import PatientManagement from './components/PatientManagement';
import Login from './components/Login';

interface User {
  name: string;
  role: string;
}

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('dashboard');
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onViewChange={setCurrentView} />;
      case 'chat':
        return <PatientChat />;
      case 'prediction':
        return <DiseasePrediction />;
      case 'treatment':
        return <TreatmentPlans />;
      case 'analytics':
        return <HealthAnalytics />;
      case 'patients':
        return <PatientManagement />;
      default:
        return <Dashboard onViewChange={setCurrentView} />;
    }
  };

  return (
    <Layout 
      currentView={currentView} 
      onViewChange={setCurrentView}
      user={user}
      onLogout={handleLogout}
    >
      {renderCurrentView()}
    </Layout>
  );
}

export default App;