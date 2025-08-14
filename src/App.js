// src/App.jsx
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './screens/DashboardPage';
import LoginScreen from './screens/LoginScreen'; // Novo componente
import { FinancesProvider } from './context/FinancesContext'; // Necessário para todo o app

function App() {
  // Simulação de estado de login. Em breve, isso virá do Context
  const isLoggedIn = true; // Por enquanto, vamos simular que o usuário está logado

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />

        <Route
          path="*" // Rota curinga para qualquer caminho não definido
          element={isLoggedIn ? (
            <FinancesProvider>
              <DashboardPage />
            </FinancesProvider>
          ) : (
            <LoginScreen />
          )}
        />
      </Routes>
    </Router>
  );
}

export default App;