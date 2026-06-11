import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = useCallback((email, password) => {
    // Mock login - in production this would call the API
    if (email === 'admin@miradasvip.com' && password === 'admin123') {
      const adminUser = {
        id: '0',
        firstName: 'Vanessa',
        lastName: 'Fernández',
        email: 'admin@miradasvip.com',
        role: 'admin',
        avatar: null
      };
      setUser(adminUser);
      setIsAuthenticated(true);
      return { success: true, user: adminUser };
    }

    // Mock student login
    if (email === 'alumna@test.com' && password === '123456') {
      const studentUser = {
        id: '1',
        firstName: 'Valentina',
        lastName: 'Muñoz',
        email: 'alumna@test.com',
        role: 'student',
        isCertified: false,
        avatar: null
      };
      setUser(studentUser);
      setIsAuthenticated(true);
      return { success: true, user: studentUser };
    }

    // Mock certified stylist login
    if (email === 'estilista@test.com' && password === '123456') {
      const stylistUser = {
        id: '2',
        firstName: 'Daniela',
        lastName: 'Ospina',
        email: 'estilista@test.com',
        role: 'student',
        isCertified: true,
        slug: 'daniela-ospina',
        avatar: null
      };
      setUser(stylistUser);
      setIsAuthenticated(true);
      return { success: true, user: stylistUser };
    }

    return { success: false, message: 'Credenciales incorrectas' };
  }, []);

  const register = useCallback((userData) => {
    // Mock register
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      role: 'student',
      isCertified: false,
      avatar: null
    };
    setUser(newUser);
    setIsAuthenticated(true);
    return { success: true, user: newUser };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
