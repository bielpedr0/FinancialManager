// src/App.jsx
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './screens/DashboardPage';
import LoginScreen from './screens/LoginScreen';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FinancesProvider } from './context/FinancesContext';

// Componente para gerenciar as rotas protegidas
const AppRoutes = () => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) { // Mostra o loading inicial enquanto verifica o token
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Carregando...</div>;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={!isLoggedIn ? <LoginScreen /> : <Navigate to="/" replace />}
      />
      <Route
        path="/*"
        element={
          isLoggedIn ? <DashboardPage /> : <Navigate to="/login" replace />
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <FinancesProvider>
          <AppRoutes />
        </FinancesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
