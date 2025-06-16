// // === src/App.js ===
// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import Project from './pages/Project';
// import Ticket from './pages/Ticket';
// import ProjectsPage from './pages/ProjectsPage';
// import TicketsPage from './pages/TicketsPage';
// import ProtectedRoute from './routes/ProtectedRoute';

// function App() {
//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route
//         path="/"
//         element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/projects/:id"
//         element={
//           <ProtectedRoute>
//             <Project />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/tickets/:id"
//         element={
//           <ProtectedRoute>
//             <Ticket />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/projects"
//         element={
//           <ProtectedRoute>
//             <ProjectsPage />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="api/tickets"
//         element={
//           <ProtectedRoute>
//             <TicketsPage />
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   );
// }

// export default App;
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Project from './pages/Project';
import Ticket from './pages/Ticket';
import ProjectsPage from './pages/ProjectsPage';
import TicketsPage from './pages/TicketsPage';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <ProjectsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/projects/:id"
        element={
          <ProtectedRoute>
            <Project />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tickets"
        element={
          <ProtectedRoute>
            <TicketsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tickets/:id"
        element={
          <ProtectedRoute>
            <Ticket />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
