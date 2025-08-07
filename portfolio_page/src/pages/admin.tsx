import { useState } from 'react';
import AdminAuth from '../components/admin-auth';
import CrudManager from '../components/crud-manager';
import Layout from '../components/layout';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');

  const handleAuthenticated = (authToken: string) => {
    setToken(authToken);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setToken('');
  };

  return (
    <Layout>
      <div style={{ minHeight: '80vh' }}>
        {!isAuthenticated ? (
          <AdminAuth onAuthenticated={handleAuthenticated} />
        ) : (
          <div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '1rem 2rem',
              borderBottom: '1px solid #e9ecef'
            }}>
              <h1>Admin Dashboard</h1>
              <button 
                onClick={handleLogout}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </div>
            <CrudManager token={token} />
          </div>
        )}
      </div>
    </Layout>
  );
}