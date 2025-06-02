import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './Login/login'
import MenuAdmin from './MenuAdmin'
import MenuMaestro from './MenuMaestro'
import MenuAlumno from './MenuAlumno'
import ProtectedRoute from './ProtectedRoute';

function App() {
   return (
       <Router>
          <Routes>
             {/* Ruta raíz redirige al login */}
             <Route path="/" element={<Navigate to="/Login/login" replace />} />
             <Route path="/Login/login" element={<Login />} />
             {/* Rutas protegidas */}
             <Route path="/MenuAdmin" element={
                <ProtectedRoute allowedRole="admin">
                   <MenuAdmin />
                </ProtectedRoute>
             } />
             <Route path="/MenuMaestro" element={
                <ProtectedRoute allowedRole="maestro">
                   <MenuMaestro />
                </ProtectedRoute>
             } />
             <Route path="/MenuAlumno" element={
                <ProtectedRoute allowedRole="alumno">
                   <MenuAlumno />
                </ProtectedRoute>
             } />
             {/* Ruta para manejar rutas no encontradas */}
             <Route path="*" element={<Navigate to="/Login/login" replace />} />
          </Routes>
       </Router>
   );
}


// Verificamos que el elemento 'root' exista antes de intentar renderizar
const rootElement = document.getElementById('root');
if (rootElement) {
   ReactDOM.createRoot(rootElement).render(
       <React.StrictMode>
          <App />
       </React.StrictMode>,
   );
} else {
   console.error("No se encontró el elemento con ID 'root'. Asegúrate de tenerlo en tu HTML.");
}

// Exportar App para que pueda ser importado en otros archivos si es necesario

export default App;