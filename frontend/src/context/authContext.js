// import React, { createContext, useState } from 'react';
// import { jwtDecode } from 'jwt-decode';  // named import, NOT default

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     const token = localStorage.getItem('token');
//     try {
//       return token ? jwtDecode(token) : null;
//     } catch (error) {
//       console.error('Invalid token:', error);
//       return null;
//     }
//   });

//   const login = (token) => {
//     localStorage.setItem('token', token);
//     try {
//       setUser(jwtDecode(token));
//     } catch (error) {
//       console.error('Invalid token:', error);
//       setUser(null);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// === src/context/authContext.js ===
import React, { createContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    try {
      return token ? jwtDecode(token) : null;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  });

  const login = (token) => {
    localStorage.setItem('token', token);
    try {
      setUser(jwtDecode(token));
    } catch (error) {
      console.error('Invalid token:', error);
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};