import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { About } from './pages/About';
import { RecordedLessons } from './pages/RecordedLessons';
import { TeachingMaterials } from './pages/TeachingMaterials';
import { ScientificArticles } from './pages/ScientificArticles';
import { PedagogicalGames } from './pages/PedagogicalGames';
import { PhysicsSimulations } from './pages/PhysicsSimulations';
import { TeacherPanel } from './pages/TeacherPanel';
import { StudentEvaluations } from './pages/StudentEvaluations';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/about" element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          } />
          <Route path="/lessons" element={<PrivateRoute><RecordedLessons /></PrivateRoute>} />
          <Route path="/materials" element={<PrivateRoute><TeachingMaterials /></PrivateRoute>} />
          <Route path="/articles" element={<PrivateRoute><ScientificArticles /></PrivateRoute>} />
          <Route path="/games" element={<PrivateRoute><PedagogicalGames /></PrivateRoute>} />
          <Route path="/simulations" element={<PrivateRoute><PhysicsSimulations /></PrivateRoute>} />
          <Route path="/evaluations" element={<PrivateRoute><StudentEvaluations /></PrivateRoute>} />
          <Route path="/teacher-panel" element={<PrivateRoute><TeacherPanel /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
